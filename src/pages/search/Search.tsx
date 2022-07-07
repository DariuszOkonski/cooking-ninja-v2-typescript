import "./Search.css";
import { useLocation } from "react-router-dom";
import useFetch from "./../../hooks/useFetch";
import RecipeList from "../../components/RecipeList";

interface SearchProps {}

const Search: React.FC<SearchProps> = () => {
  const queryString = useLocation();
  const queryParams = new URLSearchParams(queryString.search);
  const query = queryParams.get("q");

  const url = `http://localhost:3000/recipes?q=${query}`;
  const [data, isPending, error] = useFetch(url);

  console.log({ data, isPending, error });

  if (error)
    return (
      <div>
        <h2 className="page-title">There is no element "{query}"</h2>
      </div>
    );

  return (
    <div>
      <h2 className="page-title">Recipes including "{query}"</h2>
      {isPending && <p className="loading">Loading...</p>}

      {data && <RecipeList recipes={data} />}
    </div>
  );
};

export default Search;
