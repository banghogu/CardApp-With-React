import { ApplyValues } from '@models/apply';
import { collection, addDoc, query, where, getDocs, updateDoc } from 'firebase/firestore';
import { store } from './firebase';
import { COLLECTIONS } from '@/constants';

export async function applyCard(applyValues: ApplyValues) {
  return addDoc(collection(store, COLLECTIONS.CARD_APPLY), applyValues);
}

export async function updateApplyCard({
  cardId,
  userId,
  applyValues,
}: {
  cardId: string;
  userId: string;
  applyValues: Partial<ApplyValues>;
}) {
  console.log(cardId, userId, applyValues);
  const snapshot = await getDocs(
    query(
      collection(store, COLLECTIONS.CARD_APPLY),
      where('userId', '==', userId),
      where('cardId', '==', cardId)
    )
  );

  const [applied] = snapshot.docs;

  updateDoc(applied.ref, applyValues);
}

export async function getAppliedCard({ userId, cardId }: { userId: string; cardId: string }) {
  const snapshot = await getDocs(
    query(
      collection(store, COLLECTIONS.CARD_APPLY),
      where('userId', '==', userId),
      where('cardId', '==', cardId)
    )
  );

  if (snapshot.docs.length === 0) {
    return null;
  }

  const [applied] = snapshot.docs;

  console.log(applied.data());

  return applied.data() as ApplyValues;
}
