import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const NewBook = () => {
  const [newBook, setNewBook] = useState<string>("");
  const navigate = useNavigate();

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
          e.preventDefault();
          addBook(newBook);
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
              setNewBook(e.target.value);
            }}
          />
        </label>
      </form>
      <br />
    </>
  );
};

export default NewBook;
