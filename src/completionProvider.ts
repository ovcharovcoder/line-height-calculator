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
    const variants = LineHeightCalculator.getVariants(fontSize);

    variants.forEach(v => {
      const item = new vscode.CompletionItem(
        `${v.multiplier} (${v.value}px)`,
        vscode.CompletionItemKind.Value,
      );

      item.insertText = v.multiplier.toString();
      item.detail = `${v.description} — ${v.value}px`;
      item.documentation = new vscode.MarkdownString(
        `**${v.multiplier}** × ${fontSize}px = **${v.value}px**\n\n` +
          `Recommended for: ${v.description}`,
      );

      items.push(item);

      // Add exact pixel value
      const pxItem = new vscode.CompletionItem(
        `${v.value}px`,
        vscode.CompletionItemKind.Value,
      );
      pxItem.insertText = `${v.value}px`;
      pxItem.detail = `exact value for ${v.description}`;
      items.push(pxItem);
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
