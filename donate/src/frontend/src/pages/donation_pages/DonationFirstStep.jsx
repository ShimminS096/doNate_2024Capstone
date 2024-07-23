import ColoredButton from "../../components/ColoredButton";
import DonationStepsBar from "../../components/DonationStepsBar";
import TagBox from "../../components/TagBox";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const DonationFirstStep = () => {
  const tags = ["Tag1", "Tag2", "Tag3"];
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
      <div className="propertyName">분류</div>
      {tags.map((tag) => (
        <TagBox
          key={tag}
          tagName={tag}
          isSelected={selectedTags.has(tag)}
          onTagClick={() => handleTagClick(tag)}
        />
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
