# Line Height Calculator

> **Line Height Calculator** — A smart VS Code extension that calculates optimal `line-height` values based on your font-size, following typography best practices.

---

## ✨ Features

- **Hover information:** Hover over any `font-size` value to see recommended `line-height` options instantly.
- **Intelligent autocomplete:** Get contextual suggestions when typing `line-height`: with calculated values in both multiplier and pixel formats.
- **Smart multipliers:** Automatically suggests different multipliers based on font size:<br>
  -- `<16px` → 1.5 (optimal for small text)<br>
  -- `16-30px` → 1.4 (optimal for body text)<br>
  -- `30-50px` → 1.3 (optimal for headings)<br>
  -- `>50px` → 1.2 (optimal for large headings)
- **Intelligent autocomplete:** Works with px, rem, em, and pt units
- **Quick commands:** Insert optimal values with a single keyboard shortcut.
- **Customizable:** Adjust default multipliers in VS Code settings..

---

## 🛠 Installation

1. Open **VS Code → Extensions** (`Ctrl+Shift+X` / `Cmd+Shift+X`).
2. Search for **Line Height Calculator** and click **Install**.
3. Restart VS Code to activate the extension.

---

## 🚀 Usage

**Method 1: Hover**

Examle CSS:

// Hover over any font-size value <br>
font-size: 24px; 👈 hover here

A popup will show recommended values.

--

**Method 2: Autocomplete**

Examle CSS:

.element {<br>
font-size: 24px;<br>
line-height: 👈 suggestions will appear <br>
}

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

Customize the extension in VS Code settings (`Ctrl+,`):

JSON:<br>
{<br>
"lineHeightCalculator.defaultHeading": 1.2,<br>
"lineHeightCalculator.defaultText": 1.5<br>
}

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

---

Happy coding with perfect typography!
