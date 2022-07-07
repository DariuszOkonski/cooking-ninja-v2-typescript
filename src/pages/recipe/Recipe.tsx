import { useParams } from "react-router-dom";
import "./Recipe.css";
import useFetch from "./../../hooks/useFetch";

interface RecipeProps {}

const Recipe: React.FC<RecipeProps> = () => {
  const { id } = useParams();
  const url = `http://localhost:3000/recipes/?id=${id}`;
  const [recipe, isPending, error] = useFetch(url);

  console.log({ recipe, isPending, error });

  return (
    <div className="recipe">
      {error && <p className="error">{error}</p>}
      {isPending && <p className="loading">Loading...</p>}
      {recipe?.length && (
        <>
          <h2 className="page-title">{recipe[0].title}</h2>
          <p>Takes {recipe[0].cookingTime} to cook.</p>
          <ul>
            {recipe[0].ingredients.map((ing) => (
              <li key={ing}>{ing}</li>
            ))}
          </ul>
          <p className="method">{recipe[0].method}</p>
        </>
      )}
    </div>
  );
};

export default Recipe;
