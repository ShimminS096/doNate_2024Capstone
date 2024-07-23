import React, { useState } from "react";

import DonationStepsBar from "../components/DonationStepsBar";
import MyPageMenuBox from "../components/MyPageMenuBox";
import PaymentMethod from "../components/PaymentMethod";

import PaymentReceipt from "../components/PaymentReceipt";

const Home = () => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);

  const handlePaymentMethodClick = (methodName) => {
    setSelectedPaymentMethod(methodName);
  };

  return (
    <div className="home">
      <PaymentMethod
        methodName={"카드결제"}
        isPaymentMethodSelected={selectedPaymentMethod === "카드결제"} // boolean 값으로 전달
        onClick={() => handlePaymentMethodClick("카드결제")} // onClick 핸들러 전달
      />
      <PaymentMethod
        methodName={"무통장입금"}
        isPaymentMethodSelected={selectedPaymentMethod === "무통장입금"} // boolean 값으로 전달
        onClick={() => handlePaymentMethodClick("무통장입금")} // onClick 핸들러 전달
      />
      <PaymentReceipt
        numberOfBeneficiaries={"3"}
        donationAmountPerPerson={"10000"}
      />
      Home
    </div>
  );
};

export default Home;
