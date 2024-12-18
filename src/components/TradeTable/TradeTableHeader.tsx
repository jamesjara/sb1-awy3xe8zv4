import React from 'react';
import { Trade } from '../../types/trade';
import { SortableHeader } from './components/SortableHeader';

interface TradeTableHeaderProps {
  onSort: (key: keyof Trade) => void;
  sortConfig: {
    key: keyof Trade;
    direction: 'ascending' | 'descending';
  } | null;
}

export const TradeTableHeader: React.FC<TradeTableHeaderProps> = ({
  onSort,
  sortConfig,
}) => (
  <thead className="bg-gray-50">
    <tr>
      <SortableHeader label="Coin" sortKey="coin" onSort={onSort} currentSort={sortConfig} />
      <SortableHeader label="Name" sortKey="name" onSort={onSort} currentSort={sortConfig} />
      <SortableHeader label="Status" sortKey="status" onSort={onSort} currentSort={sortConfig} />
      <SortableHeader label="Category" sortKey="category" onSort={onSort} currentSort={sortConfig} />
      <SortableHeader label="Order Type" sortKey="orderType" onSort={onSort} currentSort={sortConfig} />
      <SortableHeader label="Created Date" sortKey="createdDate" onSort={onSort} currentSort={sortConfig} />
      <SortableHeader label="Closed Date" sortKey="closedDate" onSort={onSort} currentSort={sortConfig} />
      <SortableHeader label="Days Open" sortKey="createdDate" onSort={onSort} currentSort={sortConfig} />
      <SortableHeader label="Amount" sortKey="amount" onSort={onSort} currentSort={sortConfig} />
      <SortableHeader label="Position Size" sortKey="positionSize" onSort={onSort} currentSort={sortConfig} />
      <SortableHeader label="Bought Rate" sortKey="boughtRate" onSort={onSort} currentSort={sortConfig} />
      <SortableHeader label="Sell Target" sortKey="sellTarget" onSort={onSort} currentSort={sortConfig} />
      <SortableHeader label="Bought Value" sortKey="boughtValue" onSort={onSort} currentSort={sortConfig} />
      <SortableHeader label="Sell Target Value" sortKey="sellTargetValue" onSort={onSort} currentSort={sortConfig} />
      <SortableHeader label="Accrual P/L" sortKey="accrualProfitLoss" onSort={onSort} currentSort={sortConfig} />
      <SortableHeader label="P/L" sortKey="profitLoss" onSort={onSort} currentSort={sortConfig} />
      <SortableHeader label="P/L %" sortKey="profitPercentage" onSort={onSort} currentSort={sortConfig} />
      <SortableHeader label="Volatility (24h)" sortKey="volatility24h" onSort={onSort} currentSort={sortConfig} />
      <SortableHeader label="Distance Base" sortKey="distanceBase" onSort={onSort} currentSort={sortConfig} />
      <SortableHeader label="Distance Goal" sortKey="distanceGoal" onSort={onSort} currentSort={sortConfig} />
      <SortableHeader label="Fees" sortKey="fees" onSort={onSort} currentSort={sortConfig} />
      <SortableHeader label="Stop Loss" sortKey="stopLoss" onSort={onSort} currentSort={sortConfig} />
      <SortableHeader label="Strategy" sortKey="strategy" onSort={onSort} currentSort={sortConfig} />
      <SortableHeader label="Liquidation Value" sortKey="liquidationValue" onSort={onSort} currentSort={sortConfig} />
    </tr>
  </thead>
);