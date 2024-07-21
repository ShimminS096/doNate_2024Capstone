import BeneficiaryBox from "../components/BeneficiaryBox";
import DonationSteps from "../components/DonationStepsBar";
import MyPageMenuBox from "../components/MyPageMenuBox";
import TagBox from "../components/TagBox";
import DoNateLogo from "../assets/DoNateLogo.png";
import PaymentMethod from "../components/PaymentMethod";
import PaymentReceipt from "../components/PaymentReceipt";

const Home = () => {
  return (
    <div className="home">
      <DonationSteps />
      <TagBox tagName={"태그"} isSelected={1} />
      <TagBox tagName={"태그"} isSelected={0} />
      <BeneficiaryBox
        profileImage={DoNateLogo}
        name={"이름"}
        tags={["태그1", "태그2"]}
        id={3}
      />
      <MyPageMenuBox menuName={"회원정보"} myPageType={"/myprofile"} />
      <PaymentMethod
        methodIcon={DoNateLogo}
        methodName={"카드결제"}
        isPaymentMethodSelected={1}
      />
      <PaymentMethod
        methodIcon={DoNateLogo}
        methodName={"카드결제"}
        isPaymentMethodSelected={0}
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
