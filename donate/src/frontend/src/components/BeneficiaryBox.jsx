import "./BeneficiaryBox.css";
import React from "react";

const BeneficiaryBox = ({ profileImage, name, tags }) => {
  return (
    <div className="BeneficiaryBox">
      <img className={`profileImage_${name}`} src={profileImage} alt={name} />
      <div className="name">{name}</div>
      <div className="tagList">
        {tags.map((tag, index) => (
          <div key={index} className="tagItem">
            {tag}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BeneficiaryBox;
