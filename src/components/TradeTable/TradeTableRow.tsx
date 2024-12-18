import React, { useState } from 'react';
import { Trade } from '../../types/trade';
import * as BasicColumns from './columns/BasicColumns';
import * as TimeColumns from './columns/TimeColumns';
import * as FinancialColumns from './columns/FinancialColumns';
import * as MetricsColumns from './columns/MetricsColumns';
import * as RiskColumns from './columns/RiskColumns';
import { useTradeCalculations } from './hooks/useTradeCalculations';
import { Pencil, Trash2 } from 'lucide-react';
import { ConfirmDialog } from '../common/ConfirmDialog';

interface TradeTableRowProps {
  trade: Trade;
  onEdit: (trade: Trade) => void;
  onDelete: (tradeId: string) => void;
}

export const TradeTableRow: React.FC<TradeTableRowProps> = ({ trade, onEdit, onDelete }) => {
  const calculations = useTradeCalculations(trade);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleDelete = () => {
    setShowDeleteConfirm(true);
  };

  const handleConfirmDelete = () => {
    onDelete(trade.id);
    setShowDeleteConfirm(false);
  };

  return (
    <>
      <tr className="hover:bg-gray-50">
        <BasicColumns.CoinCell value={trade.coin} />
        <BasicColumns.NameCell value={trade.name} />
        <BasicColumns.StatusCell value={trade.status} />
        <BasicColumns.CategoryCell value={trade.category} />
        <BasicColumns.OrderTypeCell value={trade.orderType} />
        <TimeColumns.CreatedDateCell value={trade.createdDate} />
        <TimeColumns.ClosedDateCell value={trade.closedDate} />
        <TimeColumns.DaysOpenCell value={calculations.daysOpen} />
        <FinancialColumns.AmountCell value={trade.amount} />
        <FinancialColumns.PositionSizeCell value={calculations.positionSize} />
        <FinancialColumns.BoughtRateCell value={trade.boughtRate} currentPrice={trade.currentPrice} />
        <FinancialColumns.SellTargetCell value={trade.sellTarget} boughtRate={trade.boughtRate} />
        <FinancialColumns.BoughtValueCell value={calculations.boughtValue} />
        <FinancialColumns.SellTargetValueCell value={calculations.sellTargetValue} boughtValue={calculations.boughtValue} />
        <MetricsColumns.ProfitLossCell value={calculations.profitLoss || 0} />
        <MetricsColumns.ProfitLossCell value={trade.profitLoss || 0} />
        <MetricsColumns.ProfitPercentageCell value={calculations.profitPercentage || 0} />
        <MetricsColumns.VolatilityCell value={trade.volatility24h} />
        <MetricsColumns.DistanceBaseCell value={calculations.distanceBase} />
        <MetricsColumns.DistanceGoalCell value={calculations.distanceGoal} />
        <RiskColumns.FeesCell value={trade.fees} />
        <RiskColumns.StopLossCell value={trade.stopLoss} currentPrice={trade.currentPrice} />
        <RiskColumns.StrategyCell value={trade.strategy} />
        <RiskColumns.LiquidationValueCell value={calculations.liquidationValue} currentPrice={trade.currentPrice} />
        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
          <button
            onClick={() => onEdit(trade)}
            className="text-indigo-600 hover:text-indigo-900"
          >
            <Pencil className="h-4 w-4" />
          </button>
          <button
            onClick={handleDelete}
            className="text-red-600 hover:text-red-900"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </td>
      </tr>

      <ConfirmDialog
        isOpen={showDeleteConfirm}
        title="Delete Trade"
        message={`Are you sure you want to delete the trade "${trade.name}"? This action cannot be undone.`}
        onConfirm={handleConfirmDelete}
        onCancel={() => setShowDeleteConfirm(false)}
      />
    </>
  );
};