import React, { useState } from "react";
import BeneficiaryBox from "../components/BeneficiaryBox";
import DonationSteps from "../components/DonationStepsBar";
import MyPageMenuBox from "../components/MyPageMenuBox";
import TagBox from "../components/TagBox";
import PaymentMethod from "../components/PaymentMethod";
import DoNateLogo from "../assets/DoNateLogo.png";
import profileImage from "../assets/basicProfile.png";
import PaymentReceipt from "../components/PaymentReceipt";

const tags = ["Tag1", "Tag2", "Tag3"];

const Home = () => {
  // 상태 관리
  const [selectedTags, setSelectedTags] = useState(new Set());
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);

  const handleTagClick = (tagName) => {
    setSelectedTags((prevSelectedTags) => {
      const newSelectedTags = new Set(prevSelectedTags);
      if (newSelectedTags.has(tagName)) {
        newSelectedTags.delete(tagName);
      } else {
        newSelectedTags.add(tagName);
      }
      return newSelectedTags;
    });
  };

  const handlePaymentMethodClick = (methodName) => {
    setSelectedPaymentMethod(methodName);
  };

  return (
    <div className="home">
      <DonationSteps />
      {tags.map((tag) => (
        <TagBox
          key={tag}
          tagName={tag}
          isSelected={selectedTags.has(tag)} // boolean 값으로 전달
          onTagClick={() => handleTagClick(tag)} // onClick 핸들러 전달
        />
      ))}
      <BeneficiaryBox
        profileImage={profileImage}
        name={"이름"}
        tags={["태그1", "태그2"]}
        id={3}
      />
      <MyPageMenuBox menuName={"회원정보"} myPageType={"/myprofile"} />
      <PaymentMethod
        methodIcon={DoNateLogo}
        methodName={"카드결제"}
        isPaymentMethodSelected={selectedPaymentMethod === "카드결제"} // boolean 값으로 전달
        onClick={() => handlePaymentMethodClick("카드결제")} // onClick 핸들러 전달
      />
      <PaymentMethod
        methodIcon={DoNateLogo}
        methodName={"계좌이체"}
        isPaymentMethodSelected={selectedPaymentMethod === "계좌이체"} // boolean 값으로 전달
        onClick={() => handlePaymentMethodClick("계좌이체")} // onClick 핸들러 전달
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
