/**
 * Line Height Calculator
 * Uses formula: line-height = font-size × multiplier
 * With optimal multipliers for different text types based on real design practices
 */
export class LineHeightCalculator {
  /**
   * Calculates optimal multiplier based on font size
   * Values based on professional design systems and accessibility standards
   */
  static getRecommendedMultiplier(fontSize: number): number {
    if (fontSize < 14) {
      return 1.6; // small text (captions, fine print) - for readability
    } else if (fontSize <= 18) {
      return 1.5; // body text (most common) - WCAG recommended
    } else if (fontSize <= 24) {
      return 1.4; // lead text, subheadings
    } else if (fontSize <= 32) {
      return 1.3; // medium headings (H3-H4)
    } else if (fontSize <= 48) {
      return 1.2; // large headings (H1-H2)
    } else {
      return 1.1; // giant headings (hero text)
    }
  }

  /**
   * Gets descriptive text for the recommended multiplier
   */
  static getDescriptionForFontSize(fontSize: number): string {
    if (fontSize < 14) {
      return 'optimal for captions & small text';
    } else if (fontSize <= 18) {
      return 'optimal for body text (WCAG standard)';
    } else if (fontSize <= 24) {
      return 'optimal for lead text & subheadings';
    } else if (fontSize <= 32) {
      return 'optimal for medium headings (H3-H4)';
    } else if (fontSize <= 48) {
      return 'optimal for large headings (H1-H2)';
    } else {
      return 'optimal for giant headlines';
    }
  }

  /**
   * Calculates line-height based on font size and multiplier
   */
  static calculate(fontSize: number, multiplier: number): number {
    return Number((fontSize * multiplier).toFixed(1));
  }

  /**
   * Gets optimal variant for a specific font size
   */
  static getOptimalVariant(fontSize: number): {
    multiplier: number;
    value: number;
    description: string;
  } {
    const multiplier = this.getRecommendedMultiplier(fontSize);
    const description = this.getDescriptionForFontSize(fontSize);

    return {
      multiplier,
      value: this.calculate(fontSize, multiplier),
      description,
    };
  }

  /**
   * Gets all common variants for a specific font size (for hover info)
   */
  static getAllVariants(
    fontSize: number,
  ): Array<{ multiplier: number; value: number; description: string }> {
    const optimal = this.getRecommendedMultiplier(fontSize);

    // Show 5 most relevant variants around the optimal value
    const variants = [];

    // Add tighter options
    if (optimal - 0.2 >= 1.0) {
      variants.push({
        multiplier: Number((optimal - 0.2).toFixed(1)),
        value: this.calculate(fontSize, optimal - 0.2),
        description: 'very tight',
      });
    }
    if (optimal - 0.1 >= 1.0) {
      variants.push({
        multiplier: Number((optimal - 0.1).toFixed(1)),
        value: this.calculate(fontSize, optimal - 0.1),
        description: 'tight',
      });
    }

    // Add optimal
    variants.push({
      multiplier: optimal,
      value: this.calculate(fontSize, optimal),
      description: '✨ optimal',
    });

    // Add looser options
    if (optimal + 0.1 <= 1.8) {
      variants.push({
        multiplier: Number((optimal + 0.1).toFixed(1)),
        value: this.calculate(fontSize, optimal + 0.1),
        description: 'loose',
      });
    }
    if (optimal + 0.2 <= 1.8) {
      variants.push({
        multiplier: Number((optimal + 0.2).toFixed(1)),
        value: this.calculate(fontSize, optimal + 0.2),
        description: 'very loose',
      });
    }

    return variants;
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
        // Assume 1rem = 16px (browser default)
        value = value * 16;
        break;
    }

    return Math.round(value * 10) / 10; // Round to 1 decimal
  }
}
