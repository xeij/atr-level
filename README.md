# Xeijs ATR Level Indicator

A comprehensive ATR (Average True Range) Level Indicator for both TradingView and Thinkorswim platforms. This indicator creates horizontal support and resistance levels based on the Average True Range calculated from a fixed reference point.

## Features

### Core Functionality

**Horizontal ATR Levels**

Creates 4 static resistance and 4 support levels from a reference point using ATR multipliers.

**Reference Point Selection**

Choose from Daily Open, Previous Close, Session High/Low, or Current Open as the base calculation point.

**Session-Based Calculation**

Levels remain horizontal throughout the trading session, providing static support and resistance zones.

**Customizable ATR Period**

Default period of 14, adjustable to any period to suit different trading styles and market conditions.

**Adjustable Multipliers**

Customize the ATR multiplier for each level with defaults of 0.5x, 1x, 1.5x, and 2x.

### Visual Features

- Color-coded levels with different colors for each resistance and support level
- Level labels showing level names and multiplier values
- Reference point indicator providing a visual marker for the base calculation point
- Information display showing ATR value, percentage, reference level, and volatility status
- Optional fill areas between levels for enhanced visualization
- Moving average display option (separate from level calculation)

### Alert System

- Price crossing above or below ATR levels
- Customizable alert messages
- Audio alerts (ThinkScript)

## Configuration Options

### Input Parameters

**ATR Length**

Period for ATR calculation (default: 14)

**Reference Point**

Base point for level calculation with the following options:

- Daily Open: Uses the daily opening price
- Previous Close: Uses the previous day's closing price
- Session High/Low: Uses midpoint of recent 20-period range
- Current Open: Uses the current session's opening price

**Moving Average Type**

SMA, EMA, WMA, RMA/Hull (for display reference only)

**Moving Average Length**

Period for MA calculation (default: 20)

**ATR Multipliers**

Customize each level's distance from reference point:

- Level 1: 0.5x ATR (default)
- Level 2: 1.0x ATR (default)
- Level 3: 1.5x ATR (default)
- Level 4: 2.0x ATR (default)

### Visual Settings

- Show/Hide Elements: MA, levels, labels, fills
- Color Customization: Individual colors for each level
- Information Display: ATR table and volatility indicator

## Usage Guide

### Trading Applications

**Support and Resistance**

Use horizontal ATR levels as static support and resistance zones for identifying potential reversal points.

**Stop Loss Placement**

Place stops outside relevant ATR levels to account for normal market volatility.

**Take Profit Targets**

Use higher ATR levels as logical profit targets based on volatility-adjusted price movement.

**Volatility Assessment**

Monitor ATR percentage to gauge current market conditions and adjust trading strategies accordingly.

**Breakout Trading**

Watch for price breaking through horizontal levels as potential signals for continuation moves.

**Intraday Trading**

Levels remain constant throughout the trading session, providing reliable reference points for day trading.

### Level Interpretation

R1-R4 represent horizontal resistance levels above the reference point, while S1-S4 represent horizontal support levels below the reference point. The reference level serves as the base point from which all levels are calculated. Higher ATR percentages indicate more volatile market conditions with wider level spacing. Strong probability of price reaction exists at level touches, while level breaks may signal potential continuation moves.

### Best Practices

Combine the indicator with other technical analysis tools for confirmation. Consider the overall market trend when trading level breaks. Adjust multipliers based on asset volatility, using higher values for cryptocurrency and lower values for forex. Choose an appropriate reference point, with Daily Open being most common for intraday trading. Monitor volume at level touches for validation. The indicator works best on higher timeframes of 15 minutes or greater. Use session-based reference points for cleaner level definition.

## Technical Details

### ATR Calculation

The indicator uses True Range calculated as the maximum of high-low, absolute value of high-close[1], and absolute value of low-close[1]. This is smoothed using the specified period (default 14) and expressed as both an absolute value and percentage of price.

### Level Calculation
```
Resistance Level = Reference Point + (ATR × Multiplier)
Support Level = Reference Point - (ATR × Multiplier)
```

**Reference Point Options:**

- Daily Open: `open(period = AggregationPeriod.DAY)`
- Previous Close: `close[1]` 
- Session High/Low: `(highest(high, 20) + lowest(low, 20)) / 2`
- Current Open: `open` (current session)

### Volatility Detection

The system compares current ATR to a 20-period ATR average. High volatility is detected when current ATR exceeds the average ATR, displayed in indicator labels and table.

## Files Included

- `atr_level_indicator.pine` - TradingView PineScript v5
- `atr_level_indicator.ts` - Thinkorswim ThinkScript
- `README.md` - Documentation file

## Customization Guidelines

### Adjust for Asset Volatility

**Cryptocurrency**

Use higher multipliers (1x, 2x, 3x, 4x) due to high volatility characteristics.

**Forex**

Use standard multipliers (0.5x, 1x, 1.5x, 2x) for typical currency pair volatility.

**Stocks**

Adjust based on individual stock volatility characteristics and sector norms.

### Reference Point Selection

**Daily Open**

Most popular choice for intraday trading applications.

**Previous Close**

Effective for overnight gap analysis and continuation patterns.

**Session High/Low**

Useful for range-bound market conditions and consolidation periods.

**Current Open**

Best suited for session-based analysis and intraday strategies.

### Timeframe Considerations

**Lower Timeframes (1-5 minutes)**

Reduce ATR period to 7-10 for more responsive levels.

**Higher Timeframes (15 minutes and above)**

Use standard ATR period of 14-21 for stable level calculation.

**Daily and Weekly Charts**

Consider longer ATR periods of 20-30 for appropriate context.

### Color Schemes

Modify colors to match your chart theme and visual preferences. Use transparency settings for subtle level indication. Consider different colors for each multiplier level to enhance visual clarity.

## Disclaimer

This indicator is provided for educational and informational purposes only. It should not be considered financial advice. Users should conduct independent research and consider consulting with a financial advisor before making trading decisions. Past performance does not guarantee future results.

---

Created by Xeij | Volatility-Based Level Analysis Tools
