import ColoredButton from "../../components/ColoredButton";
import "./Signup.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Signup = () => {
  const nav = useNavigate();
  const onClickSingupButton = () => {
    nav("/login");
  };

  const [name, setName] = useState("");
  function onNameChange(event) {
    setName(event.target.value);
    console.log(name);
  }

  return (
    <div className="Signup">
      <div className="title">회원가입</div>
      <input placeholder="이름" onChange={onNameChange} />
      <input placeholder="이메일" />
      <input placeholder="닉네임" />
      <input placeholder="아이디" />
      <input placeholder="비밀번호" />
      <ColoredButton
        text="회원가입"
        type="Orange"
        onClick={onClickSingupButton}
      />
    </div>
  );
};

export default Signup;
