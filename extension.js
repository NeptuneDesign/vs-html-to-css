const vscode = require('vscode');
const collect = require('collect.js');

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	context.subscriptions.push(vscode.commands.registerCommand('vs-html-to-css.generate', generateCssFromHtml));
}
exports.activate = activate;

function generateCssFromHtml() {
	if (vscode.window.activeTextEditor) {
		let allSelectedText = '';
		vscode.window.activeTextEditor.selections.forEach((element) => {
			let selectedText = vscode.window.activeTextEditor.document.getText(element);
			allSelectedText += selectedText;
		});

		if (allSelectedText) {
			let regex = /class="(.+?)"|class='(.+?)'/gi;
			let m;
			let allClass = collect([]);

			while ((m = regex.exec(allSelectedText)) !== null) {
				// This is necessary to avoid infinite loops with zero-width matches
				if (m.index === regex.lastIndex) {
					regex.lastIndex++;
				}

				m.forEach((match, index) => {
					if (match && index) {
						match.split(' ').forEach((item) => {
							if (item) {
								allClass.push(item);
							}
						});
					}
				});
			}

			if (allClass.isNotEmpty()) {
				let clipboard = '';
				let config = vscode.workspace.getConfiguration('vs-html-to-css');

				allClass.unique().except(config.get('ignore')).each((item) => {
					clipboard += "." + item + config.get('append');
				});

				vscode.env.clipboard.writeText(clipboard);

				if (!config.get('disableNotification')) {
					vscode.window.showInformationMessage('CSS boilerplate copied to clipboard.');
				}
			}
		}
	}
}

function deactivate() {}

module.exports = {
	activate,
	deactivate
}