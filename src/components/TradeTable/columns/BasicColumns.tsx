import React from 'react';
import { Trade } from '../../../types/trade';

export const CoinCell: React.FC<{ value: string }> = ({ value }) => (
  <td className={`px-6 py-4 whitespace-nowrap ${
    value === 'BTC' || value === 'ETH' ? 'font-bold text-orange-500' : ''
  }`}>
    {value}
  </td>
);

export const NameCell: React.FC<{ value: string }> = ({ value }) => (
  <td className="px-6 py-4 whitespace-nowrap">{value}</td>
);

export const StatusCell: React.FC<{ value: Trade['status'] }> = ({ value }) => (
  <td className={`px-6 py-4 whitespace-nowrap ${
    value === 'Open' ? 'text-green-600' : 'text-gray-500'
  }`}>
    {value}
  </td>
);

export const CategoryCell: React.FC<{ value: Trade['category'] }> = ({ value }) => (
  <td className={`px-6 py-4 whitespace-nowrap ${
    value === 'Long' ? 'text-blue-600' : 'text-red-600'
  }`}>
    {value}
  </td>
);

export const OrderTypeCell: React.FC<{ value: Trade['orderType'] }> = ({ value }) => (
  <td className={`px-6 py-4 whitespace-nowrap ${
    value === 'Limit' ? 'text-blue-600' : 'text-green-600'
  }`}>
    {value}
  </td>
);