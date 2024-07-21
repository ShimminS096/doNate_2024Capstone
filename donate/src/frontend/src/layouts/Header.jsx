import "./Header.css";
import { useNavigate } from "react-router-dom";
import DoNateLogo from "../assets/DoNateLogo.png";
import ColoredButton from "../components/ColoredButton";
import TransparentButton from "../components/TransparentButton";

const Header = () => {
  const nav = useNavigate();

  const onClickHeaderTitle = () => {
    nav("/");
  };
  const onClickHeaderDonationButton = () => {
    nav("/donation");
  };
  const onClickHeaderLoginButton = () => {
    nav("/login");
  };
  const onClickHeaderSignupButton = () => {
    nav("/signup");
  };
  const onClickHeaderMypageButton = () => {
    nav("/mypage");
  };

  return (
    <header className="Header">
      <div className="headerShortcut">
        <TransparentButton

          text={"로그인"}
          onClick={onClickHeaderLoginButton}
        />
        <TransparentButton

          text={"회원가입"}
          onClick={onClickHeaderSignupButton}
        />
        <TransparentButton

          text={"마이페이지"}
          onClick={onClickHeaderMypageButton}
        />
      </div>
      <div className="hearderEntire">
        <div className="headerLeft">
          <img
            src={DoNateLogo}
            onClick={onClickHeaderTitle}
            alt="DoNate Logo"
          />
        </div>

        <div className="headerRight">
          <ColoredButton
            text={"기부하기"}
            type={"ORANGE"}
            onClick={onClickHeaderDonationButton}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
