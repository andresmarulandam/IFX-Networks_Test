import './SearchInput.css';
const SearchInput = ({ value, onChangeData }) => {
  return (
    <div>
      <input
        className="search__input"
        type="text"
        placeholder="Enter product name"
        value={value}
        onChange={onChangeData}
      />
    </div>
  );
};

export default SearchInput;
