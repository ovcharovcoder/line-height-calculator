import * as vscode from 'vscode';
import { LineHeightCalculator } from './calculator';

/**
 * Provider for line-height autocompletion
 */
export class LineHeightCompletionProvider
  implements vscode.CompletionItemProvider
{
  provideCompletionItems(
    document: vscode.TextDocument,
    position: vscode.Position,
  ): vscode.ProviderResult<vscode.CompletionItem[] | vscode.CompletionList> {
    // Check if we are in line-height context
    const linePrefix = document
      .lineAt(position)
      .text.substring(0, position.character);
    if (!linePrefix.match(/line-height\s*:\s*$/i)) {
      return null;
    }

    // Look for font-size above in the document
    const fontSize = this.findFontSizeInDocument(document, position);
    if (!fontSize) return null;

    const items: vscode.CompletionItem[] = [];
    
    // Get optimal variant
    const optimal = LineHeightCalculator.getOptimalVariant(fontSize);

    // Add multiplier option (optimal)
    const multiplierItem = new vscode.CompletionItem(
      `${optimal.multiplier} (${optimal.value}px) ✨`,
      vscode.CompletionItemKind.Value,
    );
    multiplierItem.insertText = optimal.multiplier.toString();
    multiplierItem.detail = `${optimal.description} — ${optimal.value}px`;
    multiplierItem.documentation = new vscode.MarkdownString(
      `**✨ Optimal for ${fontSize}px**\n\n` +
      `${optimal.multiplier} × ${fontSize}px = **${optimal.value}px**\n\n` +
      `👉 ${optimal.description}\n\n` +
      `Based on professional design practices.`
    );
    multiplierItem.sortText = '000'; // Make it appear first
    items.push(multiplierItem);

    // Add exact pixel value option
    const pxItem = new vscode.CompletionItem(
      `${optimal.value}px ✨`,
      vscode.CompletionItemKind.Value,
    );
    pxItem.insertText = `${optimal.value}px`;
    pxItem.detail = `exact value — ${optimal.description}`;
    pxItem.sortText = '001';
    items.push(pxItem);

    // Add common alternatives (tight/loose)
    const alternatives = [
      { multiplier: optimal.multiplier - 0.1, description: 'tight' },
      { multiplier: optimal.multiplier + 0.1, description: 'loose' },
    ];

    alternatives.forEach(alt => {
      if (alt.multiplier >= 1.0 && alt.multiplier <= 1.8) {
        const altValue = LineHeightCalculator.calculate(fontSize, alt.multiplier);
        
        // Multiplier alternative
        const altItem = new vscode.CompletionItem(
          `${alt.multiplier.toFixed(1)} (${altValue}px)`,
          vscode.CompletionItemKind.Value,
        );
        altItem.insertText = alt.multiplier.toFixed(1);
        altItem.detail = `${alt.description} — ${altValue}px`;
        altItem.documentation = new vscode.MarkdownString(
          `${alt.multiplier.toFixed(1)} × ${fontSize}px = **${altValue}px**\n\n` +
          `${alt.description} alternative`
        );
        altItem.sortText = '002';
        items.push(altItem);

        // Pixel alternative
        const altPxItem = new vscode.CompletionItem(
          `${altValue}px`,
          vscode.CompletionItemKind.Value,
        );
        altPxItem.insertText = `${altValue}px`;
        altPxItem.detail = `exact value — ${alt.description}`;
        altPxItem.sortText = '003';
        items.push(altPxItem);
      }
    });

    return items;
  }

  /**
   * Finds font-size in the document
   */
  private findFontSizeInDocument(
    document: vscode.TextDocument,
    position: vscode.Position,
  ): number | null {
    // Search in the current block
    for (let i = position.line; i >= 0; i--) {
      const line = document.lineAt(i).text;
      const match = line.match(
        /font-size\s*:\s*(\d+(?:\.\d+)?)(px|rem|em|pt)/i,
      );
      if (match) {
        return LineHeightCalculator.parseFontSizeValue(match[0]);
      }
    }
    return null;
  }
}
