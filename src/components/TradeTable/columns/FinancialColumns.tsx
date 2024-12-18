import React from 'react';
import { formatCurrency, formatPercentage } from '../../../utils/formatters';

export const AmountCell: React.FC<{ value: number }> = ({ value }) => (
  <td className="px-6 py-4 whitespace-nowrap">{value}</td>
);

export const PositionSizeCell: React.FC<{ value: number }> = ({ value }) => (
  <td className={`px-6 py-4 whitespace-nowrap ${value > 50000 ? 'text-yellow-600' : ''}`}>
    {formatCurrency(value)}
  </td>
);

export const BoughtRateCell: React.FC<{ value: number; currentPrice?: number }> = ({ value, currentPrice }) => (
  <td className={`px-6 py-4 whitespace-nowrap ${
    currentPrice && value < currentPrice ? 'text-green-600' : 'text-red-600'
  }`}>
    {formatCurrency(value)}
  </td>
);

export const SellTargetCell: React.FC<{ value?: number; boughtRate: number }> = ({ value, boughtRate }) => (
  <td className={`px-6 py-4 whitespace-nowrap ${
    value && value > boughtRate ? 'text-blue-600' : 'text-gray-500'
  }`}>
    {value ? formatCurrency(value) : '-'}
  </td>
);

export const BoughtValueCell: React.FC<{ value: number }> = ({ value }) => (
  <td className="px-6 py-4 whitespace-nowrap">
    {formatCurrency(value)}
  </td>
);

export const SellTargetValueCell: React.FC<{ value?: number; boughtValue: number }> = ({ value, boughtValue }) => (
  <td className={`px-6 py-4 whitespace-nowrap ${
    value && value > boughtValue ? 'text-green-600' : 'text-red-600'
  }`}>
    {value ? formatCurrency(value) : '-'}
  </td>
);