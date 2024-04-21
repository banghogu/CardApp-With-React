import React, { useState } from "react";
import ApplyIndex from "@components/apply/index";
import { useMutation, useQuery } from "react-query";
import { APPLY_STATUS, ApplyValues } from "@/models/apply";
import { applyCard, getAppliedCard, updateApplyCard } from "@/remote/apply";
import { useAlertContext } from "@/contexts/AlertContext";
import { useAppSelector } from "@/hooks";
import { RootState } from "@/store";
import { useNavigate, useParams } from "react-router-dom";
import FullPageLoader from "@/components/shared/FullPageLoader";

const Apply = () => {
  const { user } = useAppSelector((state: RootState) => state.userSlice);
  const { id } = useParams() as { id: string };
  const { open } = useAlertContext();
  const [readyToPoll, setReadyToPoll] = useState(false);
  const navigate = useNavigate();

  const { mutate, isLoading } = useMutation(
    (applyValues: ApplyValues) => applyCard(applyValues),
    {
      onSuccess: () => {
        //콜백 실행
        setReadyToPoll(true);
      },
      onError: () => {
        open({
          title: "카드를 신청하지 못했어요. 나중에 다시 시도해주세요.",
          onButtonClick: () => {
            //콜백실행
            window.history.back();
          },
        });
      },
    }
  );

  const { data: query1 } = useQuery(
    ["applyStatus", 1],
    async () => {
      const values = [
        APPLY_STATUS.REDAY,
        APPLY_STATUS.PROGRESS,
        APPLY_STATUS.COMPLETE,
        APPLY_STATUS.REJECT,
      ];
      const status = values[Math.floor(Math.random() * values.length)];
      if (status === APPLY_STATUS.REJECT) {
        throw new Error("카드발급 실패");
      }
      return status;
    },
    {
      enabled: readyToPoll,
      refetchInterval: 2_000,
      staleTime: 0,
      onSuccess: async (data) => {
        if (data === APPLY_STATUS.COMPLETE) {
          await updateApplyCard({
            cardId: id as string,
            userId: user?.uid as string,
            applyValues: {
              status: APPLY_STATUS.COMPLETE,
            },
          });
          navigate("/apply/done?success=true", {
            replace: true,
          });
        }
      },
      onError: async () => {
        //콜백 실행
        await updateApplyCard({
          cardId: id as string,
          userId: user?.uid as string,
          applyValues: {
            status: APPLY_STATUS.REJECT,
          },
        });
        navigate("/apply/done?success=false", {
          replace: true,
        });
      },
    }
  );

  const { data: query2 } = useQuery(
    ["applied", user?.uid, id],
    async () => {
      return await getAppliedCard({ userId: user?.uid as string, cardId: id });
    },
    {
      onSuccess: (data) => {
        if (data === null) {
          return;
        }
        if (data?.status === APPLY_STATUS.COMPLETE) {
          open({
            title: "이미 발급이 완료된 카드입니다",
            onButtonClick: () => {
              window.history.back();
            },
          });
          return;
        }
        setReadyToPoll(true);
      },
      onError: () => {},
      suspense: true,
    }
  );

  if (query2 != undefined && query2.status === APPLY_STATUS.COMPLETE) {
    return null;
  }

  if (isLoading || readyToPoll) {
    return <FullPageLoader message="카드를 신청중입니다" />;
  }

  return <ApplyIndex onSubmit={mutate} />;
};

export default Apply;
