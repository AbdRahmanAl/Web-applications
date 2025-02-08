import "./App.css";
import Book from "./components/book";

function App() {
  return (
    <>
      <div>
        <Book />
      </div>
      <br />
      <footer
        id="footer"
        style={{ textAlign: "center", fontWeight: "bold", fontSize: "14px" }}
      >
        (c) Copyright 2025
      </footer>
    </>
  );
}

export default App;
