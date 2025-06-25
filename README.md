# ATR Level Indicator

A comprehensive ATR (Average True Range) Level Indicator for both TradingView and Thinkorswim platforms. This indicator creates dynamic support and resistance levels based on the Average True Range and a moving average.

## Features

### Core Functionality
- **ATR-based Dynamic Levels**: Creates 4 levels above and below a moving average using ATR multipliers
- **Customizable ATR Period**: Default 14, adjustable to any period
- **Multiple Moving Average Types**: SMA, EMA, WMA, RMA (Pine) / Hull MA (ThinkScript)
- **Adjustable Multipliers**: Customize the ATR multiplier for each level (default: 0.5x, 1x, 1.5x, 2x)

### Visual Features
- **Color-coded Levels**: Different colors for each resistance/support level
- **Level Labels**: Shows level names and multiplier values
- **Information Display**: ATR value, percentage, and volatility status
- **Optional Fill Areas**: Can fill between levels for better visualization
- **Moving Average Display**: Central reference line

### Alert System
- Price crossing above/below ATR levels
- Customizable alert messages
- Audio alerts (ThinkScript)

## Installation

### TradingView (PineScript)
1. Open TradingView and go to the Pine Editor
2. Copy the contents of `atr_level_indicator.pine`
3. Paste it into the Pine Editor
4. Click "Add to Chart"
5. Configure the settings as desired

### Thinkorswim (ThinkScript)
1. Open Thinkorswim
2. Go to Studies → Create Study
3. Copy the contents of `atr_level_indicator.ts`
4. Paste it into the ThinkScript editor
5. Save and apply to your chart

## Configuration Options

### Input Parameters
- **ATR Length**: Period for ATR calculation (default: 14)
- **Moving Average Type**: SMA, EMA, WMA, RMA/Hull
- **Moving Average Length**: Period for MA calculation (default: 20)
- **ATR Multipliers**: Customize each level's distance from MA
  - Level 1: 0.5x ATR (default)
  - Level 2: 1.0x ATR (default)
  - Level 3: 1.5x ATR (default)
  - Level 4: 2.0x ATR (default)

### Visual Settings
- **Show/Hide Elements**: MA, levels, labels, fills
- **Color Customization**: Individual colors for each level
- **Information Display**: ATR table and volatility indicator

## How to Use

### Trading Applications
1. **Support/Resistance**: Use ATR levels as dynamic S/R zones
2. **Stop Loss Placement**: Place stops outside ATR levels
3. **Take Profit Targets**: Use higher ATR levels as profit targets
4. **Volatility Assessment**: Monitor ATR percentage for market conditions
5. **Breakout Trading**: Watch for price breaking through ATR levels

### Level Interpretation
- **R1-R4**: Resistance levels above the moving average
- **S1-S4**: Support levels below the moving average
- **Higher ATR %**: More volatile market conditions
- **Level Touches**: Potential reversal or breakout points

### Best Practices
- Combine with other technical indicators
- Consider overall market trend
- Adjust multipliers based on asset volatility
- Use higher timeframes for stronger levels
- Monitor volume at level touches

## Technical Details

### ATR Calculation
- Uses True Range: max(high-low, abs(high-close[1]), abs(low-close[1]))
- Smoothed using specified period (default 14)
- Expressed as absolute value and percentage of price

### Level Calculation
```
Upper Level = Moving Average + (ATR × Multiplier)
Lower Level = Moving Average - (ATR × Multiplier)
```

### Volatility Detection
- Compares current ATR to 20-period ATR average
- High volatility when current ATR > average ATR
- Displayed in indicator labels and table

## Files Included

- `atr_level_indicator.pine` - TradingView PineScript v5
- `atr_level_indicator.ts` - Thinkorswim ThinkScript
- `README.md` - This documentation file

## Customization Tips

1. **Adjust for Asset Volatility**:
   - Crypto: Use higher multipliers (1x, 2x, 3x, 4x)
   - Forex: Use standard multipliers (0.5x, 1x, 1.5x, 2x)
   - Stocks: Adjust based on individual stock volatility

2. **Timeframe Considerations**:
   - Lower timeframes: Reduce ATR period (7-10)
   - Higher timeframes: Standard or higher ATR period (14-21)

3. **Color Schemes**:
   - Modify colors to match your chart theme
   - Use transparency for subtle level indication

## Support and Updates

This indicator provides a solid foundation for ATR-based analysis. Feel free to modify the code to suit your specific trading strategy and requirements. 