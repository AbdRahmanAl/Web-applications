import { useState } from "react";
import { Button } from "react-bootstrap";
import "../App.css"; // Import global CSS
import Find from "./find";
import axios from "axios";

let bookPages: { title: string; left: string; right: string }[] = [];

export const setBookPages = (title: string, pages: Page[]) => {
  bookPages = [];
  for (let i = 0; i < pages.length; i++) {
    const page = bookPages.find((page) => page.left === pages[i].title);
    if (!page) {
      bookPages.push({
        title: title,
        left: pages[i].title,
        right: pages[i].contents.join("\n"),
      });
    }
  }
};

const addPage = (category: string, title: string, ingredients: string[]) => {
  const path = "http://localhost:8080/book/page/";
  const data = {
    category: category,
    title: title,
    ingredients: ingredients,
  };

  axios
    .put(path, data)
    .then((response) => {
      console.log("Response:", response.data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

const Book = (singleBook: Book) => {
  setBookPages(singleBook.category, singleBook.pages);

  const [currentPage, setCurrentPage] = useState(0);
  const [newTitle, setNewTitle] = useState<string>("");
  const [newIngredients, setNewIngredients] = useState<string[]>([""]);

  const nextPage = () => {
    if (currentPage < Object.keys(bookPages).length - 1) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  let { title, left, right } = bookPages[currentPage] || {
    title: "",
    left: "",
    right: "",
  };

  return (
    <>
      <div className="container">
        <div className="book-title text-center">{title}</div>
        <div className="book">
          <div className="book-page-left" id="left-page">
            <pre>{left}</pre>
          </div>
          <div className="book-page-right" id="right-page">
            <pre>{right}</pre>
          </div>
          <Button className="toggle-button toggle-left" onClick={prevPage}>
            &#60;
          </Button>
          <Button className="toggle-button toggle-right" onClick={nextPage}>
            &#62;
          </Button>
        </div>
      </div>
      <div>
        <div className="container text-center">
          <div className="row">
            <div className="col">
              <br />
              <Find />
            </div>
            <div className="col">
              <br />
              <p>Add a new Recipe, seperate the ingredients with a comma</p>
              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  addPage(singleBook.category, newTitle, newIngredients);
                  setTimeout(() => {
                    window.location.reload()
                  }, 1000);
                }}
              >
                <label>
                  Title:
                  <input
                    type="text"
                    onChange={(e) => {
                      setNewTitle(e.target.value);
                    }}
                  />
                </label>
                <label>
                  Ingredients:
                  <input
                    type="text"
                    onChange={(e) => {
                      // Split the input by commas and remove any extra spaces from each ingredient
                      const ingredients = e.target.value
                        .split(",")
                        .map((ingredient) => ingredient.trim());
                      setNewIngredients(ingredients);
                    }}
                  />
                </label>
                <button type="submit">Submit</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Book;
