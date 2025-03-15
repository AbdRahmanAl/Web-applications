import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
/**
 * NewBook Component
 * Allows users to create a new book (recipe category).
 */
const NewBook = () => {
  // State to store the input value for the new book category
  const [newBook, setNewBook] = useState<string>("");
  const navigate = useNavigate();
  
  //Send a request to add a new book (category).
  const addBook = (category: string) => {
    const path = "http://localhost:8080/book/";
    const data = {
      category: category,
    };
  
    axios
      .post(path, data)
      .then((response) => {
        console.log("Response:", response.data);
      })
      .catch((error) => {
        // Handle unauthorized access
        if (error.response && error.response.status === 401) {
          console.log("Unauthorized: You need to log in.");
          navigate("/");
        } else {
          console.log(error);
        }
      });
  };

  return (
    <>
      <br />
      <form
        onSubmit={async (e) => {
          e.preventDefault();// Prevent page reload
          addBook(newBook);// Call function to add the book
          // Reload page after a short delay to reflect the new book addition
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        }}
      >
        <label>
          Create a new book <em></em>
          <input
            type="text"
            onChange={(e) => {
              setNewBook(e.target.value);// Update state with user input
            }}
          />
        </label>
      </form>
      <br />
    </>
  );
};

export default NewBook;// Export NewBook component for use in the application
