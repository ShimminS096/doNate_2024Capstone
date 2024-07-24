import React from "react";
import "./TagBox.css";

const TagBox = ({ tagName, isSelected, onTagClick }) => {
  return (
    <div
      className={`tagBox ${isSelected ? "selected" : ""}`}
      onClick={onTagClick}
    >
      {tagName}
    </div>
  );
};

export default TagBox;
