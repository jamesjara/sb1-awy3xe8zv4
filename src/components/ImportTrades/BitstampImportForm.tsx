import React, { useState } from 'react';
import { fetchBitstampOrders, convertBitstampOrderToTrade } from '../../services/bitstamp';
import { Trade } from '../../types/trade';

interface BitstampImportFormProps {
  onImport: (trades: Trade[]) => void;
  onCancel: () => void;
}

export const BitstampImportForm: React.FC<BitstampImportFormProps> = ({
  onImport,
  onCancel,
}) => {
  const [apiKey, setApiKey] = useState('');
  const [apiSecret, setApiSecret] = useState('');
  const [customerId, setCustomerId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const orders = await fetchBitstampOrders({
        apiKey,
        apiSecret,
        customerId
      });
      const trades = orders.map(convertBitstampOrderToTrade);
      onImport(trades);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to import trades');
      console.error('Error importing trades:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h2 className="text-xl font-bold mb-4">Import Trades from Bitstamp</h2>
      <div className="mb-4 bg-yellow-50 border border-yellow-200 text-yellow-800 px-4 py-3 rounded">
        <p className="font-medium">Development Mode Notice</p>
        <p className="text-sm">
          This is currently running in development mode with mock data. In production,
          you would need to configure your backend server to handle Bitstamp API authentication securely.
        </p>
      </div>
      {error && (
        <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="apiKey">
            API Key
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="apiKey"
            type="text"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            required
            placeholder="Enter your Bitstamp API key"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="apiSecret">
            API Secret
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="apiSecret"
            type="password"
            value={apiSecret}
            onChange={(e) => setApiSecret(e.target.value)}
            required
            placeholder="Enter your Bitstamp API secret"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="customerId">
            Customer ID
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="customerId"
            type="text"
            value={customerId}
            onChange={(e) => setCustomerId(e.target.value)}
            required
            placeholder="Enter your Bitstamp customer ID"
          />
        </div>
        <div className="flex items-center justify-end gap-4">
          <button
            type="button"
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            disabled={loading}
          >
            {loading ? 'Importing...' : 'Import Trades'}
          </button>
        </div>
      </form>
    </div>
  );
};