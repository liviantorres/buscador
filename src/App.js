import "./App.css";
import { useState } from "react";
import { IoIosSearch } from "react-icons/io";
import axios from "axios";
import "./styles/App.scss";

function App() {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);

  const SearchBook = async () => {
    try {
      const response = await axios.get(
        `https://hn.algolia.com/api/v1/search?query=${query}`
      );
      const results = response.data.hits ? response.data.hits : [];
      console.log(response.data.hits);
      setBooks(results);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="app">
      <h1>DevReads</h1>
   
      <div className="inputbutton">
  <input
    placeholder="O que você quer ler hoje?"
    value={query}
    onChange={(e) => setQuery(e.target.value)}
    type="text"
  />
  <button onClick={SearchBook}>
    <IoIosSearch size={24} />
  </button>
</div>

    
      {books.length > 0 && (
        <div className="card-container">
          {books.map((item) => (
            <div className="card" key={item.objectID}>
              <h2>{item.title || "Sem título 😅"}</h2>
              <p>
                <strong>Autor:</strong> {item.author || "Desconhecido"}
              </p>
              {item.url && (
                <a href={item.url} target="_blank" rel="noopener noreferrer">
                  Ler artigo →
                </a>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
