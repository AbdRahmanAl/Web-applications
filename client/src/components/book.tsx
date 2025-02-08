import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import "../App.css"; // Import global CSS
import axios from "axios";

interface Book {
  category: string;
  pages: Page[];
}

interface Page {
  title: string;
  contents: [string];
}

let bookPages: { title: string, left: string; right: string }[] = [];
let mainBooks: any[] = [];

export const setBook = (importedBooks: Book[]) => {
  for (let i = 0; i < importedBooks.length; i++) {
    mainBooks[i] = {
      book: importedBooks[i],
    };
  }
  for (let i = 0; i < mainBooks.length; i++) {
    setBookPages(mainBooks[i].book.category ,mainBooks[i].book.pages);
  }
};

export const setBookPages = (title: string, pages: Page[]) => {
  for (let i = 0; i < pages.length; i++) {
    const page = bookPages.find((page) => page.left === pages[i].title);
    if(!page) {
      bookPages.push({title:title,left: pages[i].title, right: JSON.stringify(pages[i].contents)});
    }
  }
  console.log(bookPages);
};

const Book = () => {
  const [thePageList, setPageList] = useState<Book[]>([]);

  async function updatePages() {
    setTimeout(async () => {
      try {
        const response = await axios.get<Book[]>("http://localhost:8080/book");
        const newPages: Book[] = response.data;
        // TODO Check that tasks is a list of Pages
        setPageList(newPages);
      } catch (error: any) {
        console.log(error);
      }
    }, 1000);
  }

  useEffect(() => {
    // TODO Make the URL variable
    updatePages();
  }, []);

  setBook(thePageList);

  const [currentPage, setCurrentPage] = useState(0);

  const nextPage = () => {
    if (currentPage < Object.keys(bookPages).length-1) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  let { title, left, right } = bookPages[currentPage] || { title: "", left: "", right: "" };

  return (
    <>
      <div className="container">
        <div className="book-title text-center">{title}</div>
        <div className="book">
          <div className="book-page-left" id="left-page">
            {left}
          </div>
          <div className="book-page-right" id="right-page">
            {right}
          </div>
          <Button className="toggle-button toggle-left" onClick={prevPage}>
            &#60;
          </Button>
          <Button className="toggle-button toggle-right" onClick={nextPage}>
            &#62;
          </Button>
        </div>
      </div>
    </>
  );
};

export default Book;
