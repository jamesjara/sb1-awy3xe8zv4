import React from 'react';
import { formatCurrency, formatPercentage } from '../../../utils/formatters';

export const ProfitLossCell: React.FC<{ value: number }> = ({ value }) => (
  <td className={`px-6 py-4 whitespace-nowrap ${value > 0 ? 'text-green-600' : 'text-red-600'}`}>
    {formatCurrency(value)}
  </td>
);

export const ProfitPercentageCell: React.FC<{ value: number }> = ({ value }) => (
  <td className={`px-6 py-4 whitespace-nowrap ${value > 0 ? 'text-green-600' : 'text-red-600'}`}>
    {formatPercentage(value)}
  </td>
);

export const VolatilityCell: React.FC<{ value?: number }> = ({ value }) => (
  <td className={`px-6 py-4 whitespace-nowrap ${
    value ? (value < 5 ? 'text-green-600' : value > 20 ? 'text-red-600' : '') : ''
  }`}>
    {value ? formatPercentage(value) : '-'}
  </td>
);

export const DistanceBaseCell: React.FC<{ value?: number }> = ({ value }) => (
  <td className={`px-6 py-4 whitespace-nowrap ${
    value ? (value > 0 ? 'text-green-600' : 'text-red-600') : ''
  }`}>
    {value ? formatPercentage(value) : '-'}
  </td>
);

export const DistanceGoalCell: React.FC<{ value?: number }> = ({ value }) => (
  <td className={`px-6 py-4 whitespace-nowrap ${
    value ? (value > 10 ? 'text-blue-600' : value > 0 ? 'text-yellow-600' : '') : ''
  }`}>
    {value ? formatPercentage(value) : '-'}
  </td>
);