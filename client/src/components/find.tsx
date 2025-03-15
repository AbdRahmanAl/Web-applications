import { useState } from "react";
import axios from "axios";

// Variable to store the found recipe details or a message if not found
let foundRecipe: { category: string, index: number } | string = {category: "", index: 0};

const Find = () => {
  // State to store the search input from the user
  const [newDescription, setNewDescription] = useState<string>("");
  // State to store the search result message
  const [lookUp, setNewRecipe] = useState<string>("");
  
  /**
   * Searches for a recipe by sending a request to the backend.
   * Updates the foundRecipe variable and displays a message based on the result.
   */
  async function findRecipe() {
      try {
        if(newDescription !== "") {
          const path = 'http://localhost:8080/book/find/';
          const response = await axios.get<{ category: string; index: number; }>(path.concat(newDescription));
  
          // Destructure the response.data object
          const { category, index } = response.data;
          foundRecipe = { category, index };
          // Check if the recipe exists and update the result message
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

  return (
    <>
    <p>Search for a recipe</p>
    <p>{lookUp}</p><form
      onSubmit={async (e) => {
        e.preventDefault();
        findRecipe();
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

export default Find;// Export the Find component for use in other parts of the app
