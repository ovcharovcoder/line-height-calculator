import * as vscode from 'vscode';
import { LineHeightCalculator } from './calculator';
import { LineHeightHoverProvider } from './hoverProvider';
import { LineHeightCompletionProvider } from './completionProvider';

/**
 * Extension activation
 */
export function activate(context: vscode.ExtensionContext) {
  console.log('Line Height Calculator activated!');

  // Register calculate command
  const calculateCommand = vscode.commands.registerCommand(
    'line-height-calculator.calculate',
    async () => {
      const editor = vscode.window.activeTextEditor;
      if (!editor) {
        vscode.window.showErrorMessage('No active editor');
        return;
      }

      const selection = editor.selection;
      const text = editor.document.getText(selection);

      // Look for font-size in selected text
      const match = text.match(/(\d+(?:\.\d+)?)(px|rem|em|pt)/i);
      if (!match) {
        vscode.window.showErrorMessage('No font size found');
        return;
      }

      const fontSize = LineHeightCalculator.parseFontSizeValue(match[0]);
      if (!fontSize) return;

      // Show QuickPick with variants
      const variants = LineHeightCalculator.getVariants(fontSize);
      const items = variants.map(v => ({
        label: `${v.multiplier} (${v.value}px)`,
        description: v.description,
        detail: `${v.multiplier} × ${fontSize}px = ${v.value}px`,
      }));

      const selected = await vscode.window.showQuickPick(items, {
        placeHolder: 'Select line-height value',
      });

      if (selected) {
        // Insert selected value
        await editor.edit(editBuilder => {
          editBuilder.insert(
            selection.end,
            `\nline-height: ${selected.label.split(' ')[0]};`,
          );
        });
      }
    },
  );

  // Command to insert optimal value for headings
  const headingCommand = vscode.commands.registerCommand(
    'line-height-calculator.insertHeading',
    () => insertWithMultiplier(1.2),
  );

  // Command to insert optimal value for text
  const textCommand = vscode.commands.registerCommand(
    'line-height-calculator.insertText',
    () => insertWithMultiplier(1.5),
  );

  // Register hover provider for CSS/SCSS/LESS files
  const hoverProvider = vscode.languages.registerHoverProvider(
    [{ language: 'css' }, { language: 'scss' }, { language: 'less' }],
    new LineHeightHoverProvider(),
  );

  // Register completion provider
  const completionProvider = vscode.languages.registerCompletionItemProvider(
    [{ language: 'css' }, { language: 'scss' }, { language: 'less' }],
    new LineHeightCompletionProvider(),
    ':',
    ' ',
    ';',
  );

  context.subscriptions.push(
    calculateCommand,
    headingCommand,
    textCommand,
    hoverProvider,
    completionProvider,
  );
}

/**
 * Helper function to insert line-height with multiplier
 */
async function insertWithMultiplier(multiplier: number) {
  const editor = vscode.window.activeTextEditor;
  if (!editor) return;

  const position = editor.selection.active;
  await editor.edit(editBuilder => {
    editBuilder.insert(position, `line-height: ${multiplier};`);
  });
}

/**
 * Extension deactivation
 */
export function deactivate() {}
