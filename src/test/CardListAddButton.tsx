import BaseButton from "@/components/shared/Button";
import { card_list } from "../mock/data";
import { collection, doc, writeBatch } from "firebase/firestore";
import { store } from "@/remote/firebase";
import { COLLECTIONS } from "@/constants";

const CardListAddButton = () => {
  const handleBtnClick = async () => {
    const batch = writeBatch(store);
    card_list.forEach((card) => {
      const docRef = doc(collection(store, COLLECTIONS.CARD));
      batch.set(docRef, card);
    });
    await batch.commit();
    alert("카드 리스트 추가완료");
  };

  return <BaseButton onClick={handleBtnClick}>카드 리스트 추가하기</BaseButton>;
};

export default CardListAddButton;
