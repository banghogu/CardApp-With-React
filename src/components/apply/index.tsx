import { useEffect, useState } from 'react';
import Terms from './Terms';
import BasicInfo from './BasicInfo';
import CardInfo from './CardInfo';
import { APPLY_STATUS, ApplyValues } from '@/models/apply';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { RootState } from '@/store';
import { useParams } from 'react-router-dom';
import { clearStep, setStep1, setStep2 } from '@/store/applyStep.slice';
import ProgressBar from '../shared/ProgressBar';

const LAST_STEP = 3;

// eslint-disable-next-line no-unused-vars
const ApplyIndex = ({ onSubmit }: { onSubmit: (applyValues: ApplyValues) => void }) => {
  const dispatch = useAppDispatch();
  const { stepInfo } = useAppSelector((state: RootState) => state.applyStepSlice);
  const { user } = useAppSelector((state: RootState) => state.userSlice);
  const { id } = useParams() as { id: string };
  const [applyValues, setApplyValues] = useState<Partial<ApplyValues>>(() => {
    if (Object.keys(stepInfo).length === 0) {
      return {
        userId: user?.uid,
        cardId: id,
        step: 0 as number,
      };
    }
    return {
      ...stepInfo,
    };
  });

  const handleTermsChange = (terms: ApplyValues['terms']) => {
    setApplyValues((prev) => ({
      ...prev,
      terms: terms,
      step: (prev.step as number) + 1,
    }));
    dispatch(
      setStep1({
        terms: terms,
        step: 1,
      })
    );
  };
  const handleBasicInfoChange = (
    infovalue: Pick<ApplyValues, 'salary' | 'creditScore' | 'payDate'>
  ) => {
    setApplyValues((prev) => ({
      ...prev,
      ...infovalue,
      step: (prev.step as number) + 1,
    }));
    dispatch(
      setStep2({
        infovalue: infovalue,
        step: 2,
      })
    );
  };
  const handleCardInfoChange = (cardInfo: Pick<ApplyValues, 'isHipass' | 'isMaster' | 'isRf'>) => {
    setApplyValues((prev) => ({
      ...prev,
      ...cardInfo,
      step: (prev.step as number) + 1,
    }));
  };

  useEffect(() => {
    if (applyValues.step === 3) {
      onSubmit({
        ...applyValues,
        appliedAt: new Date(),
        status: APPLY_STATUS.REDAY,
        userId: user?.uid,
        cardId: id,
        step: 3 as number,
      } as ApplyValues);
      dispatch(clearStep());
    }
  }, [applyValues, onSubmit, dispatch]);

  return (
    <div>
      <ProgressBar progress={(applyValues.step as number) / LAST_STEP} />
      {applyValues.step === 0 ? <Terms onNext={handleTermsChange} /> : null}
      {applyValues.step === 1 ? <BasicInfo onNext={handleBasicInfoChange} /> : null}
      {applyValues.step === 2 ? <CardInfo onNext={handleCardInfoChange} /> : null}
    </div>
  );
};

export default ApplyIndex;
