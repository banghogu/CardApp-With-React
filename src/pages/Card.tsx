/** @jsxImportSource @emotion/react */
import FixedBottomButton from "@/components/shared/FixedBottomButton";
import Flex from "@/components/shared/Flex";
import ListRow from "@/components/shared/ListRow";
import Text from "@/components/shared/Text";
import Top from "@/components/shared/Top";
import { COLLECTIONS } from "@/constants";
import { useAlertContext } from "@/contexts/AlertContext";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { Card } from "@/models/card";
import { store } from "@/remote/firebase";
import { RootState } from "@/store";
import { clearStep } from "@/store/applyStep.slice";
import { css } from "@emotion/react";
import { doc, getDoc } from "firebase/firestore";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";

const Card = () => {
  const { id = "" } = useParams() as { id: string };
  const navigate = useNavigate();
  const { user } = useAppSelector((state: RootState) => state.userSlice);
  const { open } = useAlertContext();

  const getCard = async (id: string) => {
    const snapshot = await getDoc(doc(store, COLLECTIONS.CARD, id));
    return {
      id,
      ...(snapshot.data() as Card),
    };
  };

  const { data } = useQuery(
    ["card", id],
    async () => {
      const cardData = await getCard(id);
      return cardData;
    },
    {
      enabled: !!id,
    }
  );

  if (!data) {
    return null; // 로딩 상태 처리
  }

  const { name, corpName, tags, benefit } = data;

  const subTitle = data.promotion
    ? removeHtmlTags(data.promotion?.title)
    : tags.join(", ");

  const moveToApply = () => {
    if (user == null) {
      open({
        title: "로그인이 필요한 기능입니다.",
        onButtonClick: () => {
          navigate(`/signin`);
        },
      });

      return;
    }

    navigate(`/apply/${id}`);
  };

  return (
    <>
      <Top title={`${corpName} ${name}`} subTitle={subTitle} />

      <ul>
        {benefit.map((text, index) => {
          return (
            <motion.li
              initial={{
                opacity: 0,
                translateX: -90,
              }}
              animate={{
                opacity: 1,
                translateX: 0,
              }}
              transition={{
                duration: 0.8,
                ease: "easeInOut",
                delay: index * 0.1,
              }}
              key={index}
            >
              <ListRow
                as="div"
                key={index}
                left={<IconCheck />}
                contents={
                  <ListRow.Texts title={`혜택 ${index + 1}`} subTitle={text} />
                }
              />
            </motion.li>
          );
        })}
      </ul>

      {data.promotion === undefined ? null : (
        <Flex direction="column" css={termsContainerStyles}>
          <Text bold={true}>유의사항</Text>
          <Text typography="t7">
            {data.promotion?.terms ? removeHtmlTags(data.promotion.terms) : ""}
          </Text>
        </Flex>
      )}

      <FixedBottomButton label="신청하기" onClick={moveToApply} />
    </>
  );
};

function IconCheck() {
  return (
    <svg
      fill="none"
      height="20"
      viewBox="0 0 48 48"
      width="20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect fill="white" fill-opacity="0.01" height="48" width="48" />
      <path
        d="M24 44C29.5228 44 34.5228 41.7614 38.1421 38.1421C41.7614 34.5228 44 29.5228 44 24C44 18.4772 41.7614 13.4772 38.1421 9.85786C34.5228 6.23858 29.5228 4 24 4C18.4772 4 13.4772 6.23858 9.85786 9.85786C6.23858 13.4772 4 18.4772 4 24C4 29.5228 6.23858 34.5228 9.85786 38.1421C13.4772 41.7614 18.4772 44 24 44Z"
        fill="#2F88FF"
        stroke="black"
        stroke-linejoin="round"
        stroke-width="4"
      />
      <path
        d="M16 24L22 30L34 18"
        stroke="white"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="4"
      />
    </svg>
  );
}

function removeHtmlTags(text: string) {
  return text.replace(/<\/?[^>]+(>|$)/g, "");
}

const termsContainerStyles = css`
  margin-top: 80px;
  padding: 0 24px 80px 24px;
`;

export default Card;
