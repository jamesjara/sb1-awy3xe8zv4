import { Trade } from '../types/trade';

interface BitstampOrder {
  id: string;
  datetime: string;
  type: 0 | 1; // 0: buy, 1: sell
  price: string;
  amount: string;
  currency_pair: string;
}

interface BitstampCredentials {
  apiKey: string;
  apiSecret: string;
  customerId: string;
}

const BITSTAMP_API_URL = 'https://www.bitstamp.net/api/v2';

const generateNonce = () => Math.floor(Date.now() * 1000).toString();

const generateSignature = (nonce: string, customerId: string, apiKey: string, apiSecret: string) => {
  // In a real implementation, this would be done server-side
  // HMAC-SHA256 signature generation needs to happen on the server
  return 'signature';
};

export const fetchBitstampOrders = async (credentials: BitstampCredentials): Promise<BitstampOrder[]> => {
  const { apiKey, apiSecret, customerId } = credentials;
  const nonce = generateNonce();
  const signature = generateSignature(nonce, customerId, apiKey, apiSecret);

  try {
    // In development, return mock data
    if (process.env.NODE_ENV === 'development') {
      console.log('Development mode: Using mock Bitstamp data');
      return [
        {
          id: '12345',
          datetime: new Date().toISOString(),
          type: 0,
          price: '45000.00',
          amount: '1.5',
          currency_pair: 'btc/usd'
        },
        {
          id: '12346',
          datetime: new Date().toISOString(),
          type: 1,
          price: '46000.00',
          amount: '0.5',
          currency_pair: 'eth/usd'
        }
      ];
    }

    // In production, make the actual API call
    const response = await fetch(`${BITSTAMP_API_URL}/user_transactions/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Auth': apiKey,
        'X-Auth-Signature': signature,
        'X-Auth-Nonce': nonce,
      },
      body: JSON.stringify({
        key: apiKey,
        signature,
        nonce,
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.reason || 'Failed to fetch orders from Bitstamp');
    }

    const data = await response.json();
    return data.filter((transaction: any) => 
      transaction.type === 0 || transaction.type === 1
    ).map((transaction: any) => ({
      id: transaction.id,
      datetime: transaction.datetime,
      type: transaction.type,
      price: transaction.price,
      amount: transaction.amount,
      currency_pair: transaction.currency_pair
    }));

  } catch (error) {
    console.error('Error fetching Bitstamp orders:', error);
    throw new Error(
      error instanceof Error 
        ? error.message 
        : 'Failed to fetch orders from Bitstamp. Please check your credentials and try again.'
    );
  }
};

export const convertBitstampOrderToTrade = (order: BitstampOrder): Trade => {
  const [baseCurrency] = order.currency_pair.split('/');
  
  return {
    id: order.id,
    coin: baseCurrency.toUpperCase(),
    name: `Bitstamp ${order.type === 0 ? 'Buy' : 'Sell'} ${order.id}`,
    status: 'Open',
    category: order.type === 0 ? 'Long' : 'Short',
    orderType: 'Market',
    createdDate: order.datetime,
    amount: parseFloat(order.amount),
    boughtRate: parseFloat(order.price),
    strategy: 'Swing',
  };
};