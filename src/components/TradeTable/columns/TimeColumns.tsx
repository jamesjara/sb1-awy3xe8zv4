import React from 'react';
import { formatDateTime } from '../../../utils/formatters';
import { calculateDaysOpen } from '../../../utils/calculations';

export const CreatedDateCell: React.FC<{ value: string }> = ({ value }) => (
  <td className="px-6 py-4 whitespace-nowrap">
    {formatDateTime(value)}
  </td>
);

export const ClosedDateCell: React.FC<{ value?: string }> = ({ value }) => (
  <td className="px-6 py-4 whitespace-nowrap">
    {value ? formatDateTime(value) : '-'}
  </td>
);

interface DaysOpenCellProps {
  value: number;
}

export const DaysOpenCell: React.FC<DaysOpenCellProps> = ({ value }) => {
  const className = `px-6 py-4 whitespace-nowrap ${
    value > 90 ? 'text-red-600' : value > 30 ? 'text-yellow-600' : ''
  }`;
  
  return (
    <td className={className}>
      {value.toString()}
    </td>
  );
};