import { useState } from 'react';
import { ApplyValues } from '@/models/apply';
import Button from '../shared/Button';
import Spacing from '../shared/Spacing';
import FixedBottomButton from '../shared/FixedBottomButton';

type CardInfoValues = Pick<ApplyValues, 'isHipass' | 'isMaster' | 'isRf'>;

const CardInfo = ({ onNext }: { onNext: (cardInfoValues: CardInfoValues) => void }) => {
  const [cardInfoValues, setCardInfoValues] = useState<CardInfoValues>({
    isHipass: false,
    isMaster: false,
    isRf: false,
  });
  const { isHipass, isMaster, isRf } = cardInfoValues;

  return (
    <div>
      {/* 해외결제 할거니 */}
      <Button.Group title="해외결제">
        <Button
          name="isMaster"
          weak={isMaster === false}
          size="medium"
          onClick={() => {
            setCardInfoValues((prev) => ({
              ...prev,
              isMaster: true,
            }));
          }}
        >
          Master
        </Button>
        <Button
          name="isMaster"
          weak={isMaster === true}
          size="medium"
          onClick={() => {
            setCardInfoValues((prev) => ({
              ...prev,
              isMaster: false,
            }));
          }}
        >
          국내전용
        </Button>
      </Button.Group>

      <Spacing size={12} />

      {/* 교통기능 할거니 */}
      <Button.Group title="후불교통기능">
        <Button
          name="isRf"
          weak={isRf === true}
          size="medium"
          onClick={() => {
            setCardInfoValues((prev) => ({
              ...prev,
              isRf: false,
            }));
          }}
        >
          신청안함
        </Button>
        <Button
          name="isRf"
          weak={isRf === false}
          size="medium"
          onClick={() => {
            setCardInfoValues((prev) => ({
              ...prev,
              isRf: true,
            }));
          }}
        >
          신청
        </Button>
      </Button.Group>

      <Spacing size={12} />

      {/* 하이패스 할거니  */}
      <Button.Group title="후불하이패스카드">
        <Button
          name="isHipass"
          weak={isHipass === true}
          size="medium"
          onClick={() => {
            setCardInfoValues((prev) => ({
              ...prev,
              isHipass: false,
            }));
          }}
        >
          신청안함
        </Button>
        <Button
          name="isHipass"
          weak={isHipass === false}
          size="medium"
          onClick={() => {
            setCardInfoValues((prev) => ({
              ...prev,
              isHipass: true,
            }));
          }}
        >
          신청
        </Button>
      </Button.Group>

      <FixedBottomButton
        label="다음"
        onClick={() => {
          onNext(cardInfoValues);
        }}
      />
    </div>
  );
};

export default CardInfo;
