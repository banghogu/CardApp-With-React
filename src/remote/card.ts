import { collection, getDocs, QuerySnapshot, query, limit, startAfter } from 'firebase/firestore';
import { store } from './firebase';
import { Card } from '@models/card';
import { COLLECTIONS } from '@/constants';

export async function getCards(pageParam?: QuerySnapshot<Card>) {
  const cardQuery =
    pageParam == null
      ? query(collection(store, COLLECTIONS.CARD), limit(10))
      : query(collection(store, COLLECTIONS.CARD), startAfter(pageParam), limit(10));

  const cardSnapshot = await getDocs(cardQuery);

  const lastVisible = cardSnapshot.docs[cardSnapshot.docs.length - 1];

  // const items = cardSnapshot.docs.map((doc) => ({
  //   id: doc.id,
  //   ...(doc.data() as Card),
  // }));
  const items = cardSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Card),
  }));

  return { items, lastVisible };
}
