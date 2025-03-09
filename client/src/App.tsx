import "./App.css";
import Book from "./components/book";
import { Routes, Route, BrowserRouter } from "react-router-dom"; // Correct import for Router
import NavigationBar from "./components/navbar";
import AboutPage from "./components/about";
import { useEffect, useState } from "react";
import axios from "axios";
import NewBook from "./components/newbook";
import { LoginScreen } from "./LoginScreen";
import { RegisterScreen } from "./RegisterScreen";

axios.defaults.withCredentials = true;

function App() {
  const [thePageList, setPageList] = useState<Book[]>([]);

  async function updatePages() {
    try {
      const response = await axios.get<Book[]>("http://localhost:8080/book");
      const newPages: Book[] = response.data;
      setPageList(newPages);
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        console.log("Unauthorized: You need to log in.");
      } else {
        console.log(error);
      }
    }
  }

  useEffect(() => {
    updatePages();
  }, []);

  return (
    <BrowserRouter>
      <NavigationBar books={thePageList} />
      <Routes>
        {thePageList.map((book: Book) => (
          <Route
            path={`/${book.category}`}
            element={<Book category={book.category} pages={book.pages} />}
            key={book.category}
          />
        ))}
        <Route path="/home" element={<NewBook />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/register" element={<RegisterScreen />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
      <br />
      <footer
        id="footer"
        style={{ textAlign: "center", fontWeight: "bold", fontSize: "14px" }}
      >
        (c) Copyright 2025
      </footer>
    </BrowserRouter>
  );
}

export default App;
