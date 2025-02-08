import { useEffect, useState } from "react";
import axios from "axios";

let foundRecipe: { category: string, index: number } | string = {category: "", index: 0};

const Find = () => {
  const [newDescription, setNewDescription] = useState<string>("");
  const [lookUp, setNewRecipe] = useState<string>("");

  async function updatePages() {
      try {
        if(newDescription !== "") {
          const path = 'http://localhost:8080/book/find/';
          const response = await axios.get<{ category: string; index: number; }>(path.concat(newDescription));
  
          // Destructure the response.data object
          const { category, index } = response.data;
          foundRecipe = { category, index };
          if(category == undefined) {
            setNewRecipe("Recipe does not exist");
          } else {
            setNewRecipe("Recipe exists in category: " + foundRecipe.category + ", page: " + (foundRecipe.index +1))
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
  }

  useEffect(() => {
    // TODO Make the URL variable
    updatePages();
  }, []);

  return (
    <><p>{lookUp}</p><form
      onSubmit={async (e) => {
        e.preventDefault();
        updatePages();
      } }
    >
      <input
        type="text"
        onChange={(e) => {
          setNewDescription(e.target.value);
        } }
      ></input>
    </form></>
  );
};

export default Find;
