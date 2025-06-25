# Xeijs ATR Level Indicator

A comprehensive ATR (Average True Range) Level Indicator for both TradingView and Thinkorswim platforms. This indicator creates **horizontal** support and resistance levels based on the Average True Range calculated from a fixed reference point.

## Features

### Core Functionality
- **Horizontal ATR Levels**: Creates 4 static resistance and 4 support levels from a reference point using ATR multipliers
- **Reference Point Selection**: Choose from Daily Open, Previous Close, Session High/Low, or Current Open
- **Session-Based Calculation**: Levels remain horizontal throughout the trading session
- **Customizable ATR Period**: Default 14, adjustable to any period
- **Adjustable Multipliers**: Customize the ATR multiplier for each level (default: 0.5x, 1x, 1.5x, 2x)

### Visual Features
- **Color-coded Levels**: Different colors for each resistance/support level
- **Level Labels**: Shows level names and multiplier values
- **Reference Point Indicator**: Visual marker showing the base calculation point
- **Information Display**: ATR value, percentage, reference level, and volatility status
- **Optional Fill Areas**: Can fill between levels for better visualization
- **Moving Average Display**: Optional reference line (separate from level calculation)

### Alert System
- Price crossing above/below ATR levels
- Customizable alert messages
- Audio alerts (ThinkScript)

## Configuration Options

### Input Parameters
- **ATR Length**: Period for ATR calculation (default: 14)
- **Reference Point**: Base point for level calculation
  - Daily Open: Uses the daily opening price
  - Previous Close: Uses the previous day's closing price
  - Session High/Low: Uses midpoint of recent 20-period range
  - Current Open: Uses the current session's opening price
- **Moving Average Type**: SMA, EMA, WMA, RMA/Hull (for display reference only)
- **Moving Average Length**: Period for MA calculation (default: 20)
- **ATR Multipliers**: Customize each level's distance from reference point
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
1. **Support/Resistance**: Use horizontal ATR levels as static S/R zones
2. **Stop Loss Placement**: Place stops outside relevant ATR levels
3. **Take Profit Targets**: Use higher ATR levels as profit targets
4. **Volatility Assessment**: Monitor ATR percentage for market conditions
5. **Breakout Trading**: Watch for price breaking through horizontal levels
6. **Intraday Trading**: Levels remain constant throughout the trading session

### Level Interpretation
- **R1-R4**: Horizontal resistance levels above the reference point
- **S1-S4**: Horizontal support levels below the reference point
- **Reference Level**: The base point from which all levels are calculated
- **Higher ATR %**: More volatile market conditions (wider level spacing)
- **Level Touches**: Strong probability of reaction at horizontal levels
- **Level Breaks**: Potential continuation moves beyond the levels

### Best Practices
- Combine with other technical indicators for confirmation
- Consider overall market trend when trading level breaks
- Adjust multipliers based on asset volatility (higher for crypto, lower for forex)
- Choose appropriate reference point (Daily Open most common for intraday)
- Monitor volume at level touches for validation
- Levels work best on higher timeframes (15min+)
- Use session-based reference points for cleaner levels

## Technical Details

### ATR Calculation
- Uses True Range: max(high-low, abs(high-close[1]), abs(low-close[1]))
- Smoothed using specified period (default 14)
- Expressed as absolute value and percentage of price

### Level Calculation
```
Resistance Level = Reference Point + (ATR × Multiplier)
Support Level = Reference Point - (ATR × Multiplier)
```

**Reference Point Options:**
- **Daily Open**: `open(period = AggregationPeriod.DAY)`
- **Previous Close**: `close[1]` 
- **Session High/Low**: `(highest(high, 20) + lowest(low, 20)) / 2`
- **Current Open**: `open` (current session)

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
   - Crypto: Use higher multipliers (1x, 2x, 3x, 4x) due to high volatility
   - Forex: Use standard multipliers (0.5x, 1x, 1.5x, 2x)
   - Stocks: Adjust based on individual stock volatility

2. **Reference Point Selection**:
   - **Daily Open**: Most popular for intraday trading
   - **Previous Close**: Good for overnight gap analysis
   - **Session High/Low**: Useful for range-bound markets
   - **Current Open**: Best for session-based analysis

3. **Timeframe Considerations**:
   - Lower timeframes (1-5min): Reduce ATR period (7-10)
   - Higher timeframes (15min+): Standard ATR period (14-21)
   - Daily/Weekly: Consider longer ATR periods (20-30)

4. **Color Schemes**:
   - Modify colors to match your chart theme
   - Use transparency for subtle level indication
   - Consider different colors for each multiplier level
