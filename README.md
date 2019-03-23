# VS HTML to CSS

Generate CSS classes from HTML structure

## Features

Generates CSS boilerplate based on the selected HTML

- Only cares about classes, ignores id's/other possible selectors

## Extension Settings

Open `Preferences` -> `Settings`

```json
// Character(s) to be added after the classes CSS (including blank spaces)
"vs-html-to-css.append": " {\n}\n",
// Disable notification
"vs-html-to-css.disableNotification": false,
// Lists of classes CSS to ignore
"vs-html-to-css.ignore": ["container", "row"],
```

## Keyboard shortcuts

```json
{
  "key": "alt+x",
  "command": "vs-html-to-css.generate"
}
```

## Release Notes

### 0.0.1

- Initial release