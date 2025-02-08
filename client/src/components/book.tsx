import { useState } from "react";
import { Button } from "react-bootstrap";
import "../App.css"; // Import global CSS


let bookPages: { title: string, left: string; right: string }[] = [];

/*
export const setBook = (importedBooks: Book[]) => {
  for (let i = 0; i < importedBooks.length; i++) {
    mainBooks[i] = {
      book: importedBooks[i],
    };
  }
  for (let i = 0; i < mainBooks.length; i++) {
    setBookPages(mainBooks[i].book.category ,mainBooks[i].book.pages);
  }
}; */

export const setBookPages = (title: string, pages: Page[]) => {
  bookPages = [];
  for (let i = 0; i < pages.length; i++) {
    const page = bookPages.find((page) => page.left === pages[i].title);
    if(!page) {
      bookPages.push({title:title,left: pages[i].title, right: JSON.stringify(pages[i].contents)});
    }
  }
};

const Book = ( singleBook : Book) => {

  setBookPages(singleBook.category, singleBook.pages);

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
