import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { signOut } from '../../services/auth';
import { addTrade, getUserTrades, deleteTrade, updateTrade } from '../../services/trades';
import { Trade } from '../../types/trade';
import { TradeTable } from '../TradeTable/TradeTable';
import { TradeForm } from '../TradeForm/TradeForm';
import { BitstampImportForm } from '../ImportTrades/BitstampImportForm';
import { useAuth } from '../../contexts/AuthContext';

export const Dashboard: React.FC = () => {
  const [trades, setTrades] = useState<Trade[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [showImportForm, setShowImportForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingTrade, setEditingTrade] = useState<Trade | null>(null);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    const loadTrades = async () => {
      if (!user) return;
      try {
        const userTrades = await getUserTrades(user.uid);
        setTrades(userTrades);
      } catch (err) {
        setError('Failed to load trades');
        console.error('Error loading trades:', err);
      } finally {
        setLoading(false);
      }
    };

    loadTrades();
  }, [user]);

  const handleAddTrade = async (trade: Trade) => {
    if (!user) return;
    try {
      const tradeId = await addTrade(user.uid, trade);
      setTrades(prev => [...prev, { ...trade, id: tradeId }]);
      setShowForm(false);
    } catch (err) {
      setError('Failed to add trade');
      console.error('Error adding trade:', err);
    }
  };

  const handleUpdateTrade = async (trade: Trade) => {
    try {
      await updateTrade(trade.id, trade);
      setTrades(prev => prev.map(t => t.id === trade.id ? trade : t));
      setEditingTrade(null);
    } catch (err) {
      setError('Failed to update trade');
      console.error('Error updating trade:', err);
    }
  };

  const handleEditTrade = (trade: Trade) => {
    setEditingTrade(trade);
    setShowForm(true);
    setShowImportForm(false);
  };

  const handleImportTrades = async (importedTrades: Trade[]) => {
    if (!user) return;
    try {
      const newTrades = await Promise.all(
        importedTrades.map(trade => addTrade(user.uid, trade))
      );
      setTrades(prev => [
        ...prev,
        ...importedTrades.map((trade, index) => ({
          ...trade,
          id: newTrades[index]
        }))
      ]);
      setShowImportForm(false);
    } catch (err) {
      setError('Failed to import trades');
      console.error('Error importing trades:', err);
    }
  };

  const handleDeleteTrade = async (tradeId: string) => {
    try {
      await deleteTrade(tradeId);
      setTrades(prev => prev.filter(trade => trade.id !== tradeId));
    } catch (err) {
      setError('Failed to delete trade');
      console.error('Error deleting trade:', err);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingTrade(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-xl text-gray-600">Loading trades...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="py-10">
        <header>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center">
              <h1 className="text-3xl font-bold leading-tight text-gray-900">
                Crypto Portfolio Tracker
              </h1>
              <div className="flex gap-4">
                <button
                  onClick={() => {
                    setShowForm(false);
                    setShowImportForm(!showImportForm);
                    setEditingTrade(null);
                  }}
                  className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                >
                  {showImportForm ? 'Cancel Import' : 'Import from Bitstamp'}
                </button>
                <button
                  onClick={() => {
                    setShowImportForm(false);
                    setShowForm(!showForm);
                    setEditingTrade(null);
                  }}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
                >
                  {showForm && !editingTrade ? 'Cancel' : 'Add Trade'}
                </button>
                <button
                  onClick={handleSignOut}
                  className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                >
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        </header>
        <main>
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div className="px-4 py-8 sm:px-0">
              {error && (
                <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                  {error}
                </div>
              )}
              {showImportForm && (
                <BitstampImportForm
                  onImport={handleImportTrades}
                  onCancel={() => setShowImportForm(false)}
                />
              )}
              {showForm && (
                <TradeForm
                  onSubmit={editingTrade ? handleUpdateTrade : handleAddTrade}
                  initialData={editingTrade || undefined}
                  mode={editingTrade ? 'edit' : 'add'}
                  onCancel={handleCancelForm}
                />
              )}
              <TradeTable 
                trades={trades}
                onDeleteTrade={handleDeleteTrade}
                onEditTrade={handleEditTrade}
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};