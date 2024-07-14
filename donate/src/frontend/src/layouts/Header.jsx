import "./Header.css";
import { useNavigate } from "react-router-dom";
import DoNateLogo from "../assets/DoNate_logo.png";
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
      <div className="header_shortcut">
        <TransparentButton
          className="header_login_button"
          text={"로그인"}
          onClick={onClickHeaderLoginButton}
        />
        <TransparentButton
          className="header_signup_button"
          text={"회원가입"}
          onClick={onClickHeaderSignupButton}
        />
        <TransparentButton
          className="header_mypage_button"
          text={"마이페이지"}
          onClick={onClickHeaderMypageButton}
        />
      </div>
      <div className="hearder_entire">
        <div className="header_left">
          <button className="header_DoNate_title" onClick={onClickHeaderTitle}>
            Do-Nate
          </button>
          <img className="header_DoNate_logo" src={DoNateLogo} />
        </div>

        <div className="header_right">
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
