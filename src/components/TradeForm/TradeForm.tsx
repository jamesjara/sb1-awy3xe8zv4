import React from 'react';
import { FormField } from './components/FormField';
import { useTradeForm } from './hooks/useTradeForm';
import { Trade } from '../../types/trade';

interface TradeFormProps {
  onSubmit: (trade: Trade) => void;
  initialData?: Trade;
  mode?: 'add' | 'edit';
  onCancel?: () => void;
}

export const TradeForm: React.FC<TradeFormProps> = ({ 
  onSubmit, 
  initialData, 
  mode = 'add',
  onCancel 
}) => {
  const { formData, handleChange, handleSubmit, validationError } = useTradeForm(onSubmit, initialData);

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      {validationError && (
        <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {validationError}
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <FormField
          label="Coin"
          name="coin"
          value={formData.coin}
          onChange={handleChange}
          required
        />
        <FormField
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <FormField
          label="Status"
          name="status"
          value={formData.status}
          onChange={handleChange}
          required
          options={[
            { value: 'Open', label: 'Open' },
            { value: 'Closed', label: 'Closed' },
          ]}
        />
        <FormField
          label="Category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
          options={[
            { value: 'Long', label: 'Long' },
            { value: 'Short', label: 'Short' },
          ]}
        />
        <FormField
          label="Order Type"
          name="orderType"
          value={formData.orderType}
          onChange={handleChange}
          required
          options={[
            { value: 'Market', label: 'Market' },
            { value: 'Limit', label: 'Limit' },
          ]}
        />
        <FormField
          label="Created Date"
          name="createdDate"
          type="datetime-local"
          value={formData.createdDate?.slice(0, 16)}
          onChange={handleChange}
          required
        />
        <FormField
          label={`Closed Date${formData.status === 'Closed' ? ' *' : ''}`}
          name="closedDate"
          type="datetime-local"
          value={formData.closedDate?.slice(0, 16)}
          onChange={handleChange}
          required={formData.status === 'Closed'}
        />
        <FormField
          label="Amount"
          name="amount"
          type="number"
          value={formData.amount}
          onChange={handleChange}
          required
        />
        <FormField
          label="Bought Rate"
          name="boughtRate"
          type="number"
          value={formData.boughtRate}
          onChange={handleChange}
          required
        />
        <FormField
          label="Sell Target"
          name="sellTarget"
          type="number"
          value={formData.sellTarget}
          onChange={handleChange}
        />
        <FormField
          label="Fees"
          name="fees"
          type="number"
          value={formData.fees}
          onChange={handleChange}
        />
        <FormField
          label="Stop Loss"
          name="stopLoss"
          type="number"
          value={formData.stopLoss}
          onChange={handleChange}
        />
        <FormField
          label="Strategy"
          name="strategy"
          value={formData.strategy}
          onChange={handleChange}
          required
          options={[
            { value: 'Swing', label: 'Swing' },
            { value: 'Trend', label: 'Trend' },
            { value: 'Scalping', label: 'Scalping' },
          ]}
        />
      </div>
      <div className="mt-6 flex justify-end gap-4">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          {mode === 'add' ? 'Add Trade' : 'Update Trade'}
        </button>
      </div>
    </form>
  );
};