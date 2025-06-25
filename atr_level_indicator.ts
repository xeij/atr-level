# Xeijs ATR Level Indicator for Thinkorswim
# Copyright (C) 2025 Shaya Arya
# Horizontal ATR-based Support and Resistance Levels

declare upper;

# Input Parameters
input atr_length = 14;
input reference_point = {default "Daily Open", "Previous Close", "Session High/Low", "Current Open"};
input ma_type = {default SMA, EMA, WMA, HullMA};
input ma_length = 20;

# ATR Multipliers for different levels
input atr_mult_1 = 0.5;
input atr_mult_2 = 1.0;
input atr_mult_3 = 1.5;
input atr_mult_4 = 2.0;

# Visual Settings
input show_ma = yes;
input show_levels = yes;
input show_labels = yes;
input show_clouds = no;

# Color Settings
input ma_color = Color.BLUE;
input upper_level_color = Color.RED;
input lower_level_color = Color.GREEN;
input cloud_color = Color.LIGHT_GRAY;

# Calculate ATR
def atr = reference ATR(length = atr_length);

# Get reference point for horizontal levels
def reference_level;
def daily_atr;

# Calculate reference point and daily ATR at session start
def new_session = GetDay() != GetDay()[1];
if new_session {
    daily_atr = atr[1];  # Use previous bar's ATR to avoid repainting
    switch (reference_point) {
    case "Daily Open":
        reference_level = open(period = AggregationPeriod.DAY);
    case "Previous Close":
        reference_level = close(period = AggregationPeriod.DAY)[1];
    case "Session High/Low":
        reference_level = (Highest(high, 20) + Lowest(low, 20)) / 2;
    case "Current Open":
        reference_level = open;
    default:
        reference_level = open(period = AggregationPeriod.DAY);
    }
} else {
    daily_atr = daily_atr[1];
    reference_level = reference_level[1];
}

# Calculate Horizontal ATR Levels from reference point
def upper_1 = reference_level + (daily_atr * atr_mult_1);
def upper_2 = reference_level + (daily_atr * atr_mult_2);
def upper_3 = reference_level + (daily_atr * atr_mult_3);
def upper_4 = reference_level + (daily_atr * atr_mult_4);

def lower_1 = reference_level - (daily_atr * atr_mult_1);
def lower_2 = reference_level - (daily_atr * atr_mult_2);
def lower_3 = reference_level - (daily_atr * atr_mult_3);
def lower_4 = reference_level - (daily_atr * atr_mult_4);

# Calculate Moving Average (for reference only)
def ma;
switch (ma_type) {
case SMA:
    ma = SimpleMovingAvg(close, ma_length);
case EMA:
    ma = ExpAverage(close, ma_length);
case WMA:
    ma = WildersAverage(close, ma_length);
case HullMA:
    ma = HullMovingAvg(close, ma_length);
}

# Plot Moving Average
plot MA = if show_ma then ma else Double.NaN;
MA.SetDefaultColor(ma_color);
MA.SetLineWeight(2);
MA.SetStyle(Curve.SOLID);

# Plot Horizontal ATR Resistance Levels
plot Resistance_1 = if show_levels then upper_1 else Double.NaN;
plot Resistance_2 = if show_levels then upper_2 else Double.NaN;
plot Resistance_3 = if show_levels then upper_3 else Double.NaN;
plot Resistance_4 = if show_levels then upper_4 else Double.NaN;

Resistance_1.SetDefaultColor(CreateColor(255, 150, 150));
Resistance_2.SetDefaultColor(CreateColor(255, 100, 100));
Resistance_3.SetDefaultColor(CreateColor(255, 50, 50));
Resistance_4.SetDefaultColor(upper_level_color);

Resistance_1.SetStyle(Curve.SOLID);
Resistance_2.SetStyle(Curve.SOLID);
Resistance_3.SetStyle(Curve.SOLID);
Resistance_4.SetStyle(Curve.SOLID);
Resistance_1.SetLineWeight(2);
Resistance_2.SetLineWeight(2);
Resistance_3.SetLineWeight(2);
Resistance_4.SetLineWeight(2);

# Plot Horizontal ATR Support Levels
plot Support_1 = if show_levels then lower_1 else Double.NaN;
plot Support_2 = if show_levels then lower_2 else Double.NaN;
plot Support_3 = if show_levels then lower_3 else Double.NaN;
plot Support_4 = if show_levels then lower_4 else Double.NaN;

Support_1.SetDefaultColor(CreateColor(150, 255, 150));
Support_2.SetDefaultColor(CreateColor(100, 255, 100));
Support_3.SetDefaultColor(CreateColor(50, 255, 50));
Support_4.SetDefaultColor(lower_level_color);

Support_1.SetStyle(Curve.SOLID);
Support_2.SetStyle(Curve.SOLID);
Support_3.SetStyle(Curve.SOLID);
Support_4.SetStyle(Curve.SOLID);
Support_1.SetLineWeight(2);
Support_2.SetLineWeight(2);
Support_3.SetLineWeight(2);
Support_4.SetLineWeight(2);

# Plot reference level
plot Reference_Level = if show_levels then reference_level else Double.NaN;
Reference_Level.SetDefaultColor(CreateColor(128, 128, 128));
Reference_Level.SetStyle(Curve.POINTS);
Reference_Level.SetLineWeight(1);

# Add clouds between levels (optional)
AddCloud(if show_clouds then Resistance_1 else Double.NaN, 
         if show_clouds then Resistance_2 else Double.NaN, 
         CreateColor(255, 200, 200), CreateColor(255, 200, 200));

AddCloud(if show_clouds then Resistance_2 else Double.NaN, 
         if show_clouds then Resistance_3 else Double.NaN, 
         CreateColor(255, 150, 150), CreateColor(255, 150, 150));

AddCloud(if show_clouds then Resistance_3 else Double.NaN, 
         if show_clouds then Resistance_4 else Double.NaN, 
         CreateColor(255, 100, 100), CreateColor(255, 100, 100));

AddCloud(if show_clouds then Support_1 else Double.NaN, 
         if show_clouds then Support_2 else Double.NaN, 
         CreateColor(200, 255, 200), CreateColor(200, 255, 200));

AddCloud(if show_clouds then Support_2 else Double.NaN, 
         if show_clouds then Support_3 else Double.NaN, 
         CreateColor(150, 255, 150), CreateColor(150, 255, 150));

AddCloud(if show_clouds then Support_3 else Double.NaN, 
         if show_clouds then Support_4 else Double.NaN, 
         CreateColor(100, 255, 100), CreateColor(100, 255, 100));

# Add level labels on the right
def last_bar = IsNaN(close[-1]) and !IsNaN(close);

AddLabel(show_labels, "ATR(" + atr_length + "): " + Round(daily_atr, 2), Color.WHITE);
AddLabel(show_labels, "ATR %: " + Round((daily_atr/close)*100, 2) + "%", Color.WHITE);
AddLabel(show_labels, "Reference: " + Round(reference_level, 2), Color.LIGHT_GRAY);

# Price level labels
AddLabel(show_labels, "R4(" + atr_mult_4 + "x): " + Round(upper_4, 2), upper_level_color);
AddLabel(show_labels, "R3(" + atr_mult_3 + "x): " + Round(upper_3, 2), CreateColor(255, 100, 100));
AddLabel(show_labels, "R2(" + atr_mult_2 + "x): " + Round(upper_2, 2), CreateColor(255, 150, 150));
AddLabel(show_labels, "R1(" + atr_mult_1 + "x): " + Round(upper_1, 2), CreateColor(255, 200, 200));

AddLabel(show_labels, "MA: " + Round(ma, 2), ma_color);

AddLabel(show_labels, "S1(" + atr_mult_1 + "x): " + Round(lower_1, 2), CreateColor(200, 255, 200));
AddLabel(show_labels, "S2(" + atr_mult_2 + "x): " + Round(lower_2, 2), CreateColor(150, 255, 150));
AddLabel(show_labels, "S3(" + atr_mult_3 + "x): " + Round(lower_3, 2), CreateColor(100, 255, 100));
AddLabel(show_labels, "S4(" + atr_mult_4 + "x): " + Round(lower_4, 2), lower_level_color);

# Volatility indicator
def avg_atr = SimpleMovingAvg(atr, 20);
def volatility_high = atr > avg_atr;
AddLabel(show_labels, if volatility_high then "High Volatility" else "Low Volatility", 
         if volatility_high then Color.RED else Color.GREEN);

# Alert conditions (these will show as study alerts)
Alert(close crosses above upper_1, "Price crossed above ATR Upper Level 1", Alert.BAR, Sound.Ring);
Alert(close crosses below lower_1, "Price crossed below ATR Lower Level 1", Alert.BAR, Sound.Ring);
Alert(close crosses above upper_2, "Price crossed above ATR Upper Level 2", Alert.BAR, Sound.Bell);
Alert(close crosses below lower_2, "Price crossed below ATR Lower Level 2", Alert.BAR, Sound.Bell);

# Background color based on price position relative to MA
AssignPriceColor(if close > ma then Color.LIGHT_GREEN else if close < ma then Color.LIGHT_RED else Color.GRAY); 