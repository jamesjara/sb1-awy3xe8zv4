import React from 'react';
import { Trade } from '../../types/trade';
import { TradeTableHeader } from './TradeTableHeader';
import { TradeTableRow } from './TradeTableRow';
import { useSortableData } from './hooks/useSortableData';
import { tableStyles } from './styles/table';

interface TradeTableProps {
  trades: Trade[];
  onEditTrade: (trade: Trade) => void;
  onDeleteTrade: (tradeId: string) => void;
}

export const TradeTable: React.FC<TradeTableProps> = ({ 
  trades, 
  onEditTrade, 
  onDeleteTrade 
}) => {
  const { trades: sortedTrades, requestSort, sortConfig } = useSortableData(trades);

  return (
    <div className={tableStyles.wrapper}>
      <div className={tableStyles.container}>
        <div className={tableStyles.innerContainer}>
          <div className={tableStyles.tableWrapper}>
            <table className={tableStyles.table}>
              <TradeTableHeader onSort={requestSort} sortConfig={sortConfig} />
              <tbody className={tableStyles.tbody}>
                {sortedTrades.map((trade) => (
                  <TradeTableRow 
                    key={trade.id} 
                    trade={trade}
                    onEdit={onEditTrade}
                    onDelete={onDeleteTrade}
                  />
                ))}
                {sortedTrades.length === 0 && (
                  <tr>
                    <td
                      colSpan={24}
                      className="px-6 py-4 text-center text-gray-500"
                    >
                      No trades found. Add a new trade to get started.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};