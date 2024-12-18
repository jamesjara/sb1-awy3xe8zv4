export type TradeStatus = 'Open' | 'Closed';
export type TradeCategory = 'Long' | 'Short';
export type OrderType = 'Market' | 'Limit';
export type TradingStrategy = 'Swing' | 'Trend' | 'Scalping';

export interface Trade {
  id: string;
  coin: string;
  name: string;
  status: TradeStatus;
  category: TradeCategory;
  orderType: OrderType;
  createdDate: string;
  closedDate?: string;
  amount: number;
  positionSize?: number;
  boughtRate: number;
  sellTarget?: number;
  boughtValue?: number;
  sellTargetValue?: number;
  accrualProfitLoss?: number;
  profitLoss?: number;
  profitPercentage?: number;
  volatility24h?: number;
  distanceBase?: number;
  distanceGoal?: number;
  fees?: number;
  stopLoss?: number;
  strategy: TradingStrategy;
  liquidationValue?: number;
  currentPrice?: number;
}