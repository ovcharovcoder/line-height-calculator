/**
 * Line Height Calculator
 * Uses formula: line-height = font-size × multiplier
 * With different multipliers for different text types
 */
export class LineHeightCalculator {
  /**
   * Calculates optimal multiplier based on font size
   */
  static getRecommendedMultiplier(fontSize: number): number {
    if (fontSize < 16) {
      return 1.5; // small text
    } else if (fontSize <= 30) {
      return 1.4; // medium text
    } else if (fontSize <= 50) {
      return 1.3; // headings
    } else {
      return 1.2; // large headings
    }
  }

  /**
   * Calculates line-height based on font size and multiplier
   */
  static calculate(fontSize: number, multiplier: number): number {
    return Number((fontSize * multiplier).toFixed(1));
  }

  /**
   * Gets all variants for a specific font size
   */
  static getVariants(
    fontSize: number,
  ): Array<{ multiplier: number; value: number; description: string }> {
    return [
      {
        multiplier: 1.0,
        value: this.calculate(fontSize, 1.0),
        description: 'compact',
      },
      {
        multiplier: 1.1,
        value: this.calculate(fontSize, 1.1),
        description: 'headings',
      },
      {
        multiplier: 1.2,
        value: this.calculate(fontSize, 1.2),
        description: 'headings (optimal)',
      },
      {
        multiplier: 1.3,
        value: this.calculate(fontSize, 1.3),
        description: 'subheadings',
      },
      {
        multiplier: 1.4,
        value: this.calculate(fontSize, 1.4),
        description: 'text',
      },
      {
        multiplier: 1.5,
        value: this.calculate(fontSize, 1.5),
        description: 'text (optimal)',
      },
      {
        multiplier: 1.6,
        value: this.calculate(fontSize, 1.6),
        description: 'large text',
      },
    ];
  }

  /**
   * Parses font-size value from CSS
   */
  static parseFontSizeValue(text: string): number | null {
    const match = text.match(/(\d+(?:\.\d+)?)(px|rem|em|pt)/i);
    if (!match) return null;

    let value = parseFloat(match[1]);
    const unit = match[2].toLowerCase();

    // Convert to px for calculation
    switch (unit) {
      case 'pt':
        value = value * 1.33333; // 1pt = 1.33333px
        break;
      case 'rem':
      case 'em':
        // Assume 1rem = 16px
        value = value * 16;
        break;
    }

    return Math.round(value);
  }
}
