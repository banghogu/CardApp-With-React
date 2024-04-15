import BaseButton from "@/components/shared/Button";
import { adBanners } from "../mock/data";
import { collection, doc, writeBatch } from "firebase/firestore";
import { store } from "@/remote/firebase";
import { COLLECTIONS } from "@/constants";

const AddBanner = () => {
  const handleBtnClick = async () => {
    const batch = writeBatch(store);
    adBanners.forEach((banner) => {
      const docRef = doc(collection(store, COLLECTIONS.ADBANNER));
      batch.set(docRef, banner);
    });
    await batch.commit();
    alert("카드 리스트 추가완료");
  };

  return <BaseButton onClick={handleBtnClick}>배너 리스트 추가하기</BaseButton>;
};

export default AddBanner;
