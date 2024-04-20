import BasicInfo from "@/components/apply/BasicInfo";
import CardInfo from "@/components/apply/CardInfo";
import Terms from "@/components/apply/Terms";
import { ApplyValues } from "@/models/apply";
import React, { useState } from "react";

const Apply = () => {
  const [step, setStep] = useState(2);

  const handleTermsChange = (terms: ApplyValues["terms"]) => {
    console.log(terms);
  };
  const handleBasicInfoChange = (
    infovalue: Pick<ApplyValues, "salary" | "creditScore" | "payDate">
  ) => {
    console.log(infovalue);
  };
  const handleCardInfoChange = (
    cardInfo: Pick<ApplyValues, "isHipass" | "isMaster" | "isRf">
  ) => {
    console.log(cardInfo);
  };

  return (
    <div>
      {step === 0 ? <Terms onNext={handleTermsChange} /> : null}
      {step === 1 ? <BasicInfo onNext={handleBasicInfoChange} /> : null}
      {step === 2 ? <CardInfo onNext={handleCardInfoChange} /> : null}
    </div>
  );
};

export default Apply;
