import * as vscode from 'vscode';
import { LineHeightCalculator } from './calculator';

/**
 * Provider for showing hints when hovering over font-size
 */
export class LineHeightHoverProvider implements vscode.HoverProvider {
  provideHover(
    document: vscode.TextDocument,
    position: vscode.Position,
  ): vscode.ProviderResult<vscode.Hover> {
    // Get word under cursor
    const range = document.getWordRangeAtPosition(
      position,
      /(\d+(?:\.\d+)?)(px|rem|em|pt)/i,
    );
    if (!range) return null;

    const text = document.getText(range);
    const fontSize = LineHeightCalculator.parseFontSizeValue(text);

    if (!fontSize) return null;

    // Get optimal variant and all variants for display
    const optimal = LineHeightCalculator.getOptimalVariant(fontSize);
    const allVariants = LineHeightCalculator.getAllVariants(fontSize);

    const markdown = new vscode.MarkdownString();
    markdown.appendMarkdown(`## 📐 Line Height Calculator\n\n`);
    markdown.appendMarkdown(`**Font size:** ${fontSize}px\n\n`);
    
    // Show optimal value prominently
    markdown.appendMarkdown(`### ✨ Optimal value:\n\n`);
    markdown.appendMarkdown(
      `**${optimal.multiplier}** → **${optimal.value}px**  \n` +
      `_${optimal.description}_\n\n`
    );
    
    // Show comparison table
    markdown.appendMarkdown(`### 📊 Common alternatives:\n\n`);
    markdown.appendMarkdown(`| Style | Multiplier | Value |\n`);
    markdown.appendMarkdown(`|-------|------------|-------|\n`);
    
    allVariants.forEach(v => {
      const isOptimal = v.multiplier === optimal.multiplier;
      const style = isOptimal ? '✨ **Optimal**' : v.description;
      markdown.appendMarkdown(
        `| ${style} | ${v.multiplier} | ${v.value}px |\n`
      );
    });
    
    markdown.appendMarkdown(`\n---\n`);
    markdown.appendMarkdown(`💡 **Pro tip:** Press **Ctrl+Alt+L** to insert optimal value\n`);
    markdown.appendMarkdown(`📝 Based on professional design practices`);

    markdown.isTrusted = true;

    return new vscode.Hover(markdown, range);
  }
}
