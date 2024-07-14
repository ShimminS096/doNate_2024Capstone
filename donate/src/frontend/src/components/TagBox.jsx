import "./TagBox.css";

const TagBox = ({ tagName, isSelected }) => {
  return (
    <div className={`tagbox ${isSelected ? "selected" : ""}`}>{tagName}</div>
  );
};

export default TagBox;
