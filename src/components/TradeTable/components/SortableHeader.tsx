import React from 'react';
import { ArrowUpDown } from 'lucide-react';
import { Trade } from '../../../types/trade';
import { tableStyles } from '../styles/table';

interface SortableHeaderProps {
  label: string;
  sortKey: keyof Trade;
  onSort: (key: keyof Trade) => void;
  currentSort: {
    key: keyof Trade;
    direction: 'ascending' | 'descending';
  } | null;
}

export const SortableHeader: React.FC<SortableHeaderProps> = ({
  label,
  sortKey,
  onSort,
  currentSort,
}) => {
  const isCurrentSort = currentSort?.key === sortKey;

  return (
    <th
      className={`${tableStyles.headerCell} cursor-pointer group`}
      onClick={() => onSort(sortKey)}
    >
      <div className="flex items-center space-x-1">
        <span>{label}</span>
        <ArrowUpDown
          className={`h-4 w-4 transition-opacity ${
            isCurrentSort ? 'opacity-100' : 'opacity-0 group-hover:opacity-50'
          }`}
        />
      </div>
    </th>
  );
};