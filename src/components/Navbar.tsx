import { Link } from "react-router-dom";

import "./Navbar.css";
import SearchBar from "./Searchbar";

interface NavbarProps {}

const Navbar: React.FC<NavbarProps> = () => {
  return (
    <div className="navbar">
      <nav>
        <Link to="/" className="brand">
          <h1>Cooking ninja</h1>
        </Link>

        <SearchBar />

        <Link to="/create">Create Recipe</Link>
      </nav>
    </div>
  );
};

export default Navbar;
