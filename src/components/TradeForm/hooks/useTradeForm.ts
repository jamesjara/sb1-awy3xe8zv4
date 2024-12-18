import { useState, useEffect } from 'react';
import { Trade, TradeStatus, TradeCategory, OrderType, TradingStrategy } from '../../../types/trade';

const generateId = () => Math.random().toString(36).substr(2, 9);

const initialFormData = {
  status: 'Open' as TradeStatus,
  category: 'Long' as TradeCategory,
  orderType: 'Market' as OrderType,
  strategy: 'Swing' as TradingStrategy,
  createdDate: new Date().toISOString(),
  coin: '',
  name: '',
  amount: 0,
  boughtRate: 0,
};

export const useTradeForm = (onSubmit: (trade: Trade) => void, initialTrade?: Trade) => {
  const [formData, setFormData] = useState(initialTrade || initialFormData);
  const [validationError, setValidationError] = useState<string | null>(null);

  useEffect(() => {
    if (initialTrade) {
      setFormData(initialTrade);
    }
  }, [initialTrade]);

  const handleChange = (name: keyof Trade, value: any) => {
    setFormData((prev) => {
      const newData = { ...prev, [name]: value };
      
      // Clear closed date if status changes to Open
      if (name === 'status' && value === 'Open') {
        delete newData.closedDate;
      }
      
      return newData;
    });
    setValidationError(null);
  };

  const validateForm = (): boolean => {
    if (formData.status === 'Closed' && !formData.closedDate) {
      setValidationError('Closed Date is required when status is Closed');
      return false;
    }

    if (formData.closedDate && formData.createdDate && 
        new Date(formData.closedDate) < new Date(formData.createdDate)) {
      setValidationError('Closed Date cannot be earlier than Created Date');
      return false;
    }

    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);

    if (!validateForm()) {
      return;
    }
    
    const tradeData: Trade = {
      id: formData.id || generateId(),
      coin: formData.coin,
      name: formData.name,
      status: formData.status,
      category: formData.category,
      orderType: formData.orderType,
      strategy: formData.strategy,
      createdDate: formData.createdDate,
      amount: Number(formData.amount),
      boughtRate: Number(formData.boughtRate),
      ...(formData.closedDate && { closedDate: formData.closedDate }),
      ...(formData.sellTarget && { sellTarget: Number(formData.sellTarget) }),
      ...(formData.fees && { fees: Number(formData.fees) }),
      ...(formData.stopLoss && { stopLoss: Number(formData.stopLoss) })
    };

    onSubmit(tradeData);
  };

  return { formData, handleChange, handleSubmit, validationError };
};