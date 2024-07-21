import "./PaymentMethod.css";
import React from "react";

const PaymentMethod = ({ methodIcon, methodName, isPaymentMethodSelected }) => {
  return (
    <div
      className={`PaymentMethod ${isPaymentMethodSelected ? "selected" : ""}`}
    >
      <img
        className={`methodIcon_${methodName}`}
        src={methodIcon}
        alt={methodName}
      />
      <div className="methodName">{methodName}</div>
    </div>
  );
};

export default PaymentMethod;
