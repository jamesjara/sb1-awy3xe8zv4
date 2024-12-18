import { 
  collection,
  addDoc,
  getDocs,
  query,
  where,
  deleteDoc,
  doc,
  updateDoc
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Trade } from '../types/trade';

const TRADES_COLLECTION = 'trades';

export const addTrade = async (userId: string, trade: Trade): Promise<string> => {
  const docRef = await addDoc(collection(db, TRADES_COLLECTION), {
    ...trade,
    userId,
    createdAt: new Date().toISOString()
  });
  return docRef.id;
};

export const getUserTrades = async (userId: string): Promise<Trade[]> => {
  const q = query(
    collection(db, TRADES_COLLECTION),
    where('userId', '==', userId)
  );
  
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({
    ...doc.data(),
    id: doc.id
  })) as Trade[];
};

export const updateTrade = async (tradeId: string, updates: Partial<Trade>): Promise<void> => {
  const tradeRef = doc(db, TRADES_COLLECTION, tradeId);
  await updateDoc(tradeRef, updates);
};

export const deleteTrade = async (tradeId: string): Promise<void> => {
  const tradeRef = doc(db, TRADES_COLLECTION, tradeId);
  await deleteDoc(tradeRef);
};