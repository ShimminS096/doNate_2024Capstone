import ColoredButton from "../../components/ColoredButton";
import DonationStepsBar from "../../components/DonationStepsBar";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const DonationSecondStep = () => {
  const nav = useNavigate();
  const [personnel, setPersonnel] = useState("");
  const [amount, setAmount] = useState("");

  // perPerson 계산
  const perPerson = personnel && amount ? amount / personnel : 0;

  // Format perPerson to a maximum of 2 decimal places but without trailing zeros
  const formatPerPerson = (value) => {
    if (value % 1 === 0) {
      return value; // Integer values are returned as is
    }
    return value.toFixed(2).replace(/\.?0+$/, ""); // Remove trailing zeros
  };

  const onNextButtonClicked = () => {
    nav("/donation/third", { state: { fromSecondStep: true } });
  };

  const onBeforeButtonClicked = () => {
    nav("/donation", { state: { fromSecondStep: true } });
  };

  return (
    <div className="DonationSecondStep">
      <DonationStepsBar stepNow={2} />
      <input
        type="text"
        value={personnel}
        onChange={(e) => setPersonnel(e.target.value)}
        placeholder="인원 수"
      />
      <div>명에게</div>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="총 기부 금액"
      />
      <div>원을 나눠 기부합니다.</div>

      {personnel && amount && (
        <div>한 명당 {formatPerPerson(perPerson)}원씩 기부됩니다</div>
      )}

      <ColoredButton text={"이전"} onClick={onBeforeButtonClicked} />
      <ColoredButton
        text={"다음"}
        type={"Orange"}
        onClick={onNextButtonClicked}
      />
    </div>
  );
};

export default DonationSecondStep;
