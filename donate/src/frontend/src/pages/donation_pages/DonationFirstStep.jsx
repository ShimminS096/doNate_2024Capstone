import ColoredButton from "../../components/ColoredButton";
import DonationStepsBar from "../../components/DonationStepsBar";
import TagBox from "../../components/TagBox";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./DonationFirstStep.css";

const DonationFirstStep = () => {
  const categories = {
    분류1: [
      "태그",
      "태그",
      "태그",
      "태그",
      "태그",
      "태그",
      "태그",
      "태그",
      "태그",
      "태그",
      "태그",
      "태그",
      "태그",
      "태그",
      "태그",
      "태그",
      "태그",
      "태그",
      "태그",
      "태그",
      "태그",
      "태그",
    ],
    분류2: [
      "태그",
      "태그",
      "태그",
      "태그",
      "태그",
      "태그",
      "태그",
      "태그",
      "태그",
      "태그",
      "태그",
      "태그",
      "태그",
      "태그",
      "태그",
      "태그",
      "태그",
      "태그",
      "태그",
      "태그",
      "태그",
      "태그",
    ],
    // Add more categories and tags as needed
  };
  const [selectedTags, setSelectedTags] = useState(new Set());

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

  const nav = useNavigate();

  const onNextButtonClicked = () => {
    nav("/donation/second", { state: { fromFirstStep: true } });
  };

  return (
    <div className="DonationFirstStep">
      <DonationStepsBar stepNow={1} />
      {Object.keys(categories).map((category) => (
        <div key={category} className="categorySection">
          <div className="categoryName">{category}</div>
          {categories[category].map((tag) => (
            <TagBox
              key={tag}
              tagName={tag}
              isSelected={selectedTags.has(tag)}
              onTagClick={() => handleTagClick(tag)}
            />
          ))}
        </div>
      ))}

      <ColoredButton
        text={"다음"}
        type={"Orange"}
        onClick={onNextButtonClicked}
      />
    </div>
  );
};

export default DonationFirstStep;
