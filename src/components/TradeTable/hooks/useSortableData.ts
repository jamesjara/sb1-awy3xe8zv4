import { useState, useMemo } from 'react';
import { Trade } from '../../../types/trade';

type SortConfig = {
  key: keyof Trade;
  direction: 'ascending' | 'descending';
} | null;

export const useSortableData = (trades: Trade[]) => {
  const [sortConfig, setSortConfig] = useState<SortConfig>(null);

  const sortedTrades = useMemo(() => {
    if (!sortConfig) return trades;

    return [...trades].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });
  }, [trades, sortConfig]);

  const requestSort = (key: keyof Trade) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === 'ascending'
    ) {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  return { trades: sortedTrades, requestSort, sortConfig };
};