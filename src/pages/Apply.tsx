import Apply from "@/components/apply";
import { useState } from "react";

const ApplyPage = () => {
  const [step, setStep] = useState(0);
  const handleSubmit = () => {};
  return (
    <div>
      <Apply step={step} onSubmit={handleSubmit} />
    </div>
  );
};

export default ApplyPage;
