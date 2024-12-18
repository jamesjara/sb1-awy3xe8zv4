import React from 'react';
import { formatCurrency } from '../../../utils/formatters';
import { Trade } from '../../../types/trade';

export const FeesCell: React.FC<{ value?: number }> = ({ value }) => (
  <td className="px-6 py-4 whitespace-nowrap">
    {value ? formatCurrency(value) : '-'}
  </td>
);

export const StopLossCell: React.FC<{ value?: number; currentPrice?: number }> = ({ value, currentPrice }) => (
  <td className={`px-6 py-4 whitespace-nowrap ${
    value && currentPrice && currentPrice < value ? 'text-red-600' : ''
  }`}>
    {value ? formatCurrency(value) : '-'}
  </td>
);

export const StrategyCell: React.FC<{ value: Trade['strategy'] }> = ({ value }) => (
  <td className={`px-6 py-4 whitespace-nowrap ${
    value === 'Swing'
      ? 'text-orange-500'
      : value === 'Trend'
      ? 'text-blue-500'
      : 'text-purple-500'
  }`}>
    {value}
  </td>
);

export const LiquidationValueCell: React.FC<{ value?: number; currentPrice?: number }> = ({ value, currentPrice }) => (
  <td className={`px-6 py-4 whitespace-nowrap ${
    value && currentPrice && currentPrice * 1.1 > value ? 'text-red-600' : ''
  }`}>
    {value ? formatCurrency(value) : '-'}
  </td>
);