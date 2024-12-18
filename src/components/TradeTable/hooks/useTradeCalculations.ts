import { useMemo } from 'react';
import { Trade } from '../../../types/trade';
import * as calculations from '../../../utils/calculations';

export const useTradeCalculations = (trade: Trade) => {
  return useMemo(() => ({
    daysOpen: calculations.calculateDaysOpen(trade.createdDate, trade.closedDate),
    positionSize: calculations.calculatePositionSize(trade.amount, trade.boughtRate),
    boughtValue: calculations.calculateBoughtValue(trade.amount, trade.boughtRate),
    sellTargetValue: trade.sellTarget 
      ? calculations.calculateSellTargetValue(trade.amount, trade.sellTarget)
      : undefined,
    profitLoss: trade.sellTargetValue && trade.boughtValue
      ? calculations.calculateProfitLoss(trade.sellTargetValue, trade.boughtValue)
      : undefined,
    profitPercentage: trade.sellTargetValue && trade.boughtValue
      ? calculations.calculateProfitPercentage(trade.sellTargetValue, trade.boughtValue)
      : undefined,
    distanceBase: trade.currentPrice
      ? calculations.calculateDistanceBase(trade.currentPrice, trade.boughtRate)
      : undefined,
    distanceGoal: trade.sellTarget
      ? calculations.calculateDistanceGoal(trade.sellTarget, trade.boughtRate)
      : undefined,
    liquidationValue: calculations.calculateLiquidationValue(
      trade.boughtValue || 0,
      trade.fees,
      trade.stopLoss
    ),
  }), [trade]);
};