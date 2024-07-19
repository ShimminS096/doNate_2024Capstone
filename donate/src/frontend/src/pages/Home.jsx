import BeneficiaryBox from "../components/BeneficiaryBox";
import DonationSteps from "../components/DonationStepsBar";
import MyPageMenuBox from "../components/MyPageMenuBox";
import TagBox from "../components/TagBox";
import DoNateLogo from "../assets/DoNate_logo.png";

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
      Home
    </div>
  );
};

export default Home;
