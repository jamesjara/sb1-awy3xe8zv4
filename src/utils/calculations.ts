export const calculateDaysOpen = (createdDate: string, closedDate?: string): number => {
  const start = new Date(createdDate).getTime();
  const end = closedDate ? new Date(closedDate).getTime() : Date.now();
  return Math.max(0, Math.floor((end - start) / (1000 * 60 * 60 * 24)));
};

export const calculatePositionSize = (amount: number, boughtRate: number): number => {
  return amount * boughtRate;
};

export const calculateBoughtValue = (amount: number, boughtRate: number): number => {
  return amount * boughtRate;
};

export const calculateSellTargetValue = (amount: number, sellTarget?: number): number => {
  return amount * (sellTarget || 0);
};

export const calculateProfitLoss = (
  sellTargetValue: number,
  boughtValue: number
): number => {
  return sellTargetValue - boughtValue;
};

export const calculateProfitPercentage = (
  sellTargetValue: number,
  boughtValue: number
): number => {
  return ((sellTargetValue - boughtValue) / boughtValue) * 100;
};

export const calculateDistanceBase = (
  currentPrice: number,
  boughtRate: number
): number => {
  return ((currentPrice - boughtRate) / boughtRate) * 100;
};

export const calculateDistanceGoal = (
  sellTarget: number | undefined,
  boughtRate: number
): number => {
  if (!sellTarget) return 0;
  return ((sellTarget - boughtRate) / boughtRate) * 100;
};

export const calculateLiquidationValue = (
  boughtValue: number,
  fees: number = 0,
  stopLoss: number = 0
): number => {
  return boughtValue - fees - stopLoss;
};