import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import "../App.css"; // Import global CSS
import Find from "./find";
import axios from "axios";

axios.defaults.withCredentials = true;

// Array to store book pages
let bookPages: { title: string; left: string; right: string }[] = [];

//Update the bookPages array with formatted content from fetched pages.
export const setBookPages = (title: string, pages: Page[]) => {
  bookPages = [];
  for (let i = 0; i < pages.length; i++) {
    let contents = String(pages[i].contents)
      .replace(/[{}"]/g, "") // Remove curly braces and quotes
      .split(",") // Split by commas
      .map((item) => item.trim()) // Trim each item to remove extra spaces
      .join("\n");

    bookPages.push({
      title: title,
      left: pages[i].title,
      right: contents,
    });
  }
};

//Adds a new page (recipe) to the selected book category.
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

//Fetch all pages from a specific book category.
async function updatePages(category: string) {
  try {
    const response = await axios.get<Page[]>("http://localhost:8080/book/pages/" + category);
    const newPages: Page[] = response.data;
    return newPages;
  } catch (error: any) {
    if (error.response && error.response.status === 401) {
      console.log("Unauthorized: You need to log in.");
    } else {
      console.log(error);
    }
  }
}

//Fetch and updates book pages for a given category.
async function updateAndSetPages(category: string) {
  const pages = await updatePages(category);  // Await the promise

  if (pages !== undefined) {  // Check if pages is not undefined
    setBookPages(category, pages);
  }
}

//Book component responsible for displaying and managing a specific book.
const Book = (singleBook: Book) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [newTitle, setNewTitle] = useState<string>("");
  const [newIngredients, setNewIngredients] = useState<string[]>([""]);
  const [isLoading, setIsLoading] = useState(true);  // State to track loading

  useEffect(() => {
    const fetchPages = async () => {
      await updateAndSetPages(singleBook.category);
      setIsLoading(false);  // Set loading state to false when the pages are fetched
    };

    fetchPages();
  });
  
  //Moves to the next page in the book.
  const nextPage = () => {
    if (currentPage < bookPages.length - 1) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };
  
  //Moves to the previous page in the book.
  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  // Handle the case when the pages are still loading
  if (isLoading) {
    return <div>Loading...</div>;  // You can show a loading spinner or a message
  }

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
              <p>Add a new Recipe, separate the ingredients with a comma</p>
              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  addPage(singleBook.category, newTitle, newIngredients);
                  setTimeout(() => {
                    window.location.reload();
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

export default Book;// Export Book component for use in the application
