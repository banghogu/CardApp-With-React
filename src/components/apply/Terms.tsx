import { MouseEvent, useState } from 'react';
import Agreement from '../shared/Agreement';
import { 약관목록 } from '@/constants/apply';
import FixedBottomButton from '../shared/FixedBottomButton';
import { ApplyValues } from '@/models/apply';

const Terms = ({ onNext }: { onNext: (terms: ApplyValues['terms']) => void }) => {
  const [termsAgreements, setTermsAgreements] = useState<Record<string, boolean>>(() => {
    return 약관목록.reduce(
      (prev, term) => ({
        ...prev,
        [term.id]: false,
      }),
      {}
    );
  });

  const handleAllAgreement = (_: MouseEvent<HTMLElement>, checked: boolean) => {
    const updatedAgreements: Record<string, boolean> = {};
    for (const key in termsAgreements) {
      updatedAgreements[key] = checked;
    }
    setTermsAgreements(updatedAgreements);
  };

  //모두 = every
  const 모든약관이_동의되었는가 = Object.values(termsAgreements).every((동의여부) => 동의여부);

  return (
    <div>
      <Agreement>
        <Agreement.Title checked={모든약관이_동의되었는가} onChange={handleAllAgreement}>
          약관에 모두 동의
        </Agreement.Title>
        {약관목록.map(({ id, title, link }) => (
          <Agreement.Description
            key={id}
            link={link}
            checked={termsAgreements[id]}
            onChange={(_, checked) => {
              setTermsAgreements((prevTerms) => ({
                ...prevTerms,
                [id]: checked,
              }));
            }}
          >
            {title}
          </Agreement.Description>
        ))}
      </Agreement>
      <FixedBottomButton
        label="약관동의"
        disabled={모든약관이_동의되었는가 === false}
        onClick={() => {
          onNext(Object.keys(termsAgreements));
        }}
      />
    </div>
  );
};

export default Terms;
