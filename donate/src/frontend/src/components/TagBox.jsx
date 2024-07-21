import React from "react";
import "./TagBox.css";

const TagBox = ({ tagName, isSelected, onTagClick }) => {
  return (
    <div
      className={`tagbox ${isSelected ? "selected" : ""}`}
      onClick={onTagClick}
    >
      {tagName}
    </div>
  );
};

export default TagBox;
