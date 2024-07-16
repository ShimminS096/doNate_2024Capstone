import "./BeneficiaryBox.css";
import React from "react";
import TransparentButton from "../components/TransparentButton";

const BeneficiaryBox = ({ profileImage, name, tags, id }) => {
  const onClickBeneficiaryDetailPageLink = (id) => {
    window.open(`/beneficiarydetailpage/${id}`, "_blank");
  };

  return (
    <div className="BeneficiaryBox">
      <img className={`profileImage_${name}`} src={profileImage} alt={name} />
      <div className="beneficiaryBoxText">
        <div className="name">{name}</div>
        <div className="tagList">
          {tags.map((tag, index) => (
            <div key={index} className="tagItem">
              #{tag}
            </div>
          ))}
        </div>
      </div>
      <TransparentButton
        className="detailPageLink"
        text={`> 상세 페이지`}
        onClick={() => onClickBeneficiaryDetailPageLink(id)}
      />
    </div>
  );
};

export default BeneficiaryBox;
