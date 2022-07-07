import "./Searchbar.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface SearchBarProps {}

const SearchBar: React.FC<SearchBarProps> = () => {
  const [term, setTerm] = useState<string>("");
  const navigation = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigation(`/search?q=${term}`);
    setTerm("");
  };

  return (
    <div className="searchbar">
      <form onSubmit={handleSubmit}>
        <label htmlFor="search">Search:</label>
        <input
          type="text"
          id="search"
          onChange={(e) => setTerm(e.target.value)}
          value={term}
          required
        />
      </form>
    </div>
  );
};

export default SearchBar;
