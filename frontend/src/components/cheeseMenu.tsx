import React, { useEffect, useState } from "react"; 
import axios from "axios";
import { Link } from "react-router-dom";
import '../stylesheets/cheeseMenu.css';

interface Cheese {
  id: number;
  name: string;
  pricePerKilo: number;
  colour: string;
  picture: string | undefined;
}

const CheeseMenu: React.FC = () => {
  const [cheeses, setCheeses] = useState<Cheese[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [sortOption, setSortOption] = useState<string>("priceAsc"); // default sorting option

  useEffect(() => {
    const fetchCheeses = () => {
      axios
        .get("/api/cheeses")
        .then((response) => {
          setCheeses(response.data);
        })
        .catch((err) => {
          if (axios.isAxiosError(err) && err.response) {
            setError(`Error: ${err.response.status} - ${err.response.data}`);
          } else if (err instanceof Error) {
            setError(err.message);
          } else {
            setError("An unknown error occurred");
          }
        })
        .finally(() => {
          setLoading(false);
        });
    };

    fetchCheeses();
  }, []);

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOption(event.target.value);
  };

  // Sort cheeses based on the selected option
  const sortedCheeses = [...cheeses].sort((a, b) => {
    switch (sortOption) {
      case "priceAsc":
        return a.pricePerKilo - b.pricePerKilo; // Ascending price
      case "priceDesc":
        return b.pricePerKilo - a.pricePerKilo; // Descending price
      case "nameAsc":
        return a.name.localeCompare(b.name); // Alphabetical order
      case "nameDesc":
        return b.name.localeCompare(a.name); // Reverse alphabetical order
      default:
        return 0;
    }
  });

  if (loading) {
    return <p>Loading cheeses...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h2>Cheese Menu</h2>
      <div className="sort-dropdown">
        <label htmlFor="sortOption">Sort by:</label>
        <select id="sortOption" value={sortOption} onChange={handleSortChange}>
          <option value="priceAsc">Price: Low to High</option>
          <option value="priceDesc">Price: High to Low</option>
          <option value="nameAsc">Name: A to Z</option>
          <option value="nameDesc">Name: Z to A</option>
        </select>
      </div>
      <div className="cheese-menu-container">
        <ul className="cheese-menu">
          {sortedCheeses.map((cheese) => (
            <li key={cheese.id} className="cheese-item">
              <Link to={`/cheese/${cheese.id}`}>
                <img
                  src={cheese.picture || '/images/camembert.jpg'}
                  alt={`${cheese.name}`}
                  className="cheese-image"
                />
                <div className="cheese-details">
                  <div className="cheese-name">{cheese.name}</div>
                  <div className="cheese-price">${cheese.pricePerKilo}/kg</div>
                  <div className="cheese-colour">Colour: {cheese.colour}</div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CheeseMenu;
