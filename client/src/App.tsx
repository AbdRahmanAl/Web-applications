import "./App.css";
import Book from "./components/book";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Correct import for Router
import NavigationBar from "./components/navbar";
import AboutPage from "./components/about";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [thePageList, setPageList] = useState<Book[]>([]);

  async function updatePages() {
      try {
        const response = await axios.get<Book[]>("http://localhost:8080/book");
        const newPages: Book[] = response.data;
        // TODO Check that tasks is a list of Pages
        setPageList(newPages);
      } catch (error: any) {
        console.log(error);
      }
  }

  useEffect(() => {
    // TODO Make the URL variable
    updatePages();
  }, []);

  return (
    <Router>
      <NavigationBar books={thePageList} />
      <Routes>
        {thePageList.map((book: Book) => (
          <Route
            path={`/${book.category}`}
            element={<Book category={book.category} pages={book.pages} />}
            key={book.category}
          />
        ))}
        <Route path="/about" element={<AboutPage />} />
      </Routes>
      <br />
      <footer
        id="footer"
        style={{ textAlign: "center", fontWeight: "bold", fontSize: "14px" }}
      >
        (c) Copyright 2025
      </footer>
    </Router>
  );
}

export default App;
