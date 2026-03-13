# Line Height Calculator

> **Line Height Calculator** — A smart VS Code extension that calculates optimal `line-height` values based on your font-size, following typography best practices and WCAG accessibility standards.

---

## ✨ Features

- **Hover information:** Hover over any `font-size` value to see recommended `line-height` options instantly with detailed explanations.
- **Intelligent autocomplete:** Get contextual suggestions when typing `line-height`: with calculated values in both multiplier and pixel formats
- **Smart multipliers:** Automatically suggests different multipliers based on font size:<br>
  -- `<14px` → 1.6 (optimal for small text)<br>
  -- `14-18px` → 1.5 (optimal for body text)<br>
  -- `19-24px` → 1.4 (optimal for lead text, subheadings)<br>
  -- `25-32px` → 1.3 (optimal for medium headings (H3-H4))<br>
  -- `33-48px` → 1.2 (optimal for large headings (H1-H2))<br>
  -- `>48px` → 1.1 (optimal for hero headlines)<br>
- **Multiple unit support:** Works seamlessly with px, rem, em, and pt units (automatically converts to pixels for calculation).
- **Quick commands:** Insert optimal values with a single keyboard shortcut.
- **Accessibility compliant:** All recommendations meet WCAG 2.1 contrast and readability standards.
- **Design-system ready:** Perfect for consistent typography across projects.

---

## 📊 Why These Values?

This extension is built on real design research and standards:

- WCAG 2.1
- Material Design
- Apple HIG
- Readability Research
- Professional Practice

---

## 🛠 Installation

1. Open **VS Code → Extensions** (`Ctrl+Shift+X` / `Cmd+Shift+X`).
2. Search for **Line Height Calculator** and click **Install**.
3. Restart VS Code to activate the extension.

---

## 🚀 Usage

**Method 1: Hover**

Examle CSS:
```
// Hover over any font-size value <br>
font-size: 24px; 👈 hover here to see recommendations
```

A popup will show recommended values.

--

**Method 2: Autocomplete**

Examle CSS:
```
.element {
font-size: 24px;<br>
line-height: 👈 suggestions will appear <br>
}
```

--

**Method 3: Commands**

Press `Ctrl+Shift+P` and use:

- `Line Height: Calculate for current font-size`<br>
- `Line Height: Insert optimal for heading`<br>
- `Line Height: Insert optimal for text`

--

**Method 4: Keyboard Shortcut**

Press `Ctrl+Alt+L` (Windows/Linux) or `Cmd+Alt+L` (Mac) for quick calculation.

---

## 🚀 Settings

Customize the extension in VS Code settings (`Ctrl+,` or `Cmd+,`):

JSON:<br>
```
{
"lineHeightCalculator.defaultHeading": 1.2,<br>
"lineHeightCalculator.defaultText": 1.5<br>
}
```

---

## 👤 Author

<img 
  src="https://raw.githubusercontent.com/ovcharovcoder/line-height-calculator/main/images/avatar.png"
  alt="Andrii Ovcharov"
  width="60"
/>

Andrii Ovcharov  
📧 ovcharovcoder@gmail.com

---

## ☕ Support

If you enjoy DevFoundry Umber, consider supporting the author:  
[Donate via PayPal](https://www.paypal.com/donate/?business=datoshcode@gmail.com)

---

## 🪪 License

Released under the [MIT License](https://raw.githubusercontent.com/ovcharovcoder/line-height-calculator/main/LICENSE)
Copyright © 2026 Andrii Ovcharov

---

Happy coding with perfect typography!


## 🧑‍💻 Development & Build

**Requirements**

- Node.js 18+
- npm 9+
- VS Code 1.81+

**Install & Build**

# Clone the repository

`git clone https://github.com/ovcharovcoder/line-height-calculator.git`<br>
`cd line-height-calculator`

# Install dependencies

`npm install`

# Install VS Code extension manager globally

`npm install -g @vscode/vsce`

# Package the extension

`vsce package`












