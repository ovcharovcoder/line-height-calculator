# Line Height Calculator

> **Line Height Calculator** — A smart VS Code extension that calculates optimal `line-height` values based on your `font-size`, following typography best practices and **WCAG accessibility standards**.

---

## ✨ Features

- **Hover information:** Hover over any `font-size` value to see recommended `line-height` options instantly with detailed explanations.
- **Intelligent autocomplete:** Get contextual suggestions when typing `line-height:` with calculated values in both multiplier and pixel formats.
- **Smart multipliers:** Automatically suggests optimal multipliers based on font size:
  | Font Size | Multiplier | Use Case |
  |-----------|:----------:|----------|
  | `< 14px` | **1.6** | Small text, captions |
  | `14-18px` | **1.5** | Body text (WCAG 2.1 compliant) |
  | `19-24px` | **1.4** | Lead text, subheadings |
  | `25-32px` | **1.3** | Medium headings (H3-H4) |
  | `33-48px` | **1.2** | Large headings (H1-H2) |
  | `> 48px` | **1.1** | Hero headlines |
- **Multiple unit support:** Works seamlessly with `px`, `rem`, `em`, and `pt` units (automatically converts to pixels for calculation).
- **Quick commands:** Insert optimal values with a single keyboard shortcut.
- **Accessibility compliant:** All recommendations meet **WCAG 2.1** contrast and readability standards.
- **Design-system ready:** Perfect for consistent typography across projects.

---

## 📊 Why These Values?

This extension is built on real design research and industry standards:

| Standard                  | Influence                              |
| ------------------------- | -------------------------------------- |
| **WCAG 2.1**              | Minimum 1.5 for body text              |
| **Material Design**       | 1.4 for subheadings, 1.2 for headlines |
| **Apple HIG**             | 1.1-1.2 for large titles               |
| **Readability Research**  | 1.6 for small text (< 14px)            |
| **Professional Practice** | 1.3 for medium headings                |

---

## 🛠 Installation

1. Open **VS Code → Extensions** (`Ctrl+Shift+X` / `Cmd+Shift+X`).
2. Search for **"Line Height Calculator"** and click **Install**.
3. Restart VS Code to activate the extension.

---

## 🚀 Usage

### **Method 1: Hover**

Examle CSS:

```css
/* Hover over any font-size value */
font-size: 24px; /* 👈 hover here to see recommendations */
```

A popup will show:

- Optimal multiplier and exact pixel value
- Alternative options (tight/loose)
- Usage recommendations

---

### **Method 2: Autocomplete**

Examle CSS:

```css
.element {
  font-size: 24px;
  line-height:; /* 👈 suggestions will appear */
}
```

---

### **Method 3: Commands**

Press Ctrl+Shift+P (or Cmd+Shift+P on Mac) and use:

| Command                                        | Description                  |
| ---------------------------------------------- | ---------------------------- |
| `Line Height: Calculate for current font-size` | Opens interactive calculator |
| `Line Height: Insert optimal for heading`      | Inserts line-height: 1.2;    |
| `Line Height: Insert optimal for text`         | Inserts line-height: 1.5;    |

---

### **Method 4: Keyboard Shortcut**

- Select the font size in your code (for example, 24px)<br>
- Press `Ctrl+Alt+L` (Windows/Linux) or `Cmd+Alt+L` (Mac)<br>
- A selection window will appear with optimal options<br>
- Choose and press `Enter` to insert!

---

## ⚙️ Settings

Customize the extension in VS Code settings (Ctrl+, or Cmd+,):

JSON:<br>

```
{

"lineHeightCalculator.defaultHeading": 1.2,
"lineHeightCalculator.defaultText": 1.5

}
```

---

## 📝 Example Usage

```css
/* Before - guessing line-height */
h1 {
  font-size: 48px;
  /* line-height: ? */
}

/* After - using the extension */
h1 {
  font-size: 48px;
  line-height: 1.2; /* 57.6px - optimal for large headings */
}

p {
  font-size: 16px;
  line-height: 1.5; /* 24px - WCAG compliant body text */
}

.caption {
  font-size: 12px;
  line-height: 1.6; /* 19.2px - optimal for small text */
}
```

---

## 👤 Author

<img
  src="https://raw.githubusercontent.com/ovcharovcoder/line-height-calculator/main/images/avatar.png"
  alt="Andrii Ovcharov"
  width="60"
/>

Andrii Ovcharov<br>
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

## Clone the repository

`git clone https://github.com/ovcharovcoder/line-height-calculator.git`<br>
`cd line-height-calculator`

## Install dependencies

`npm install`

## Install VS Code extension manager globally

`npm install -g @vscode/vsce`

## Package the extension

`vsce package`
















