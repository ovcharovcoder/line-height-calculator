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

    // Create hover content
    const variants = LineHeightCalculator.getVariants(fontSize);
    const recommended = LineHeightCalculator.getRecommendedMultiplier(fontSize);
    const recommendedValue = LineHeightCalculator.calculate(
      fontSize,
      recommended,
    );

    const markdown = new vscode.MarkdownString();
    markdown.appendMarkdown(`## 📐 Line Height Calculator\n\n`);
    markdown.appendMarkdown(`**Font size:** ${fontSize}px\n\n`);
    markdown.appendMarkdown(
      `**Recommended:** ${recommended} (${recommendedValue}px)\n\n`,
    );
    markdown.appendMarkdown(`### Options:\n\n`);

    variants.forEach(v => {
      const isRecommended = v.multiplier === recommended;
      markdown.appendMarkdown(
        `- ${v.multiplier} → **${v.value}px** — ${v.description} ${isRecommended ? '⭐' : ''}\n`,
      );
    });

    markdown.appendMarkdown(`\n> Press Ctrl+Alt+L to calculate`);
    markdown.isTrusted = true;

    return new vscode.Hover(markdown, range);
  }
}
