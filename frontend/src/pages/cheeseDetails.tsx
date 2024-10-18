import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import '../stylesheets/cheeseDetails.css'; 

interface Cheese {
  id: number;
  name: string;
  pricePerKilo: number;
  colour: string;
  picture: string | undefined;
}

const CheeseDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [cheese, setCheese] = useState<Cheese | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [weight, setWeight] = useState<number | ''>(''); 
  const [totalCost, setTotalCost] = useState<number | null>(null); 

  // Define preset weights
  const presetWeights = [0.5, 1, 1.5, 2]; 

  useEffect(() => {
    const fetchCheese = () => {
      axios
        .get(`/api/cheeses/${id}`)
        .then((response) => {
          setCheese(response.data);
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

    fetchCheese();
  }, [id]);

  const calculateCost = (selectedWeight: number) => {
    if (selectedWeight > 0 && cheese) {
      axios
        .get(`/api/cheeses/${cheese.id}/cost/${selectedWeight}`)
        .then((response) => {
          setTotalCost(response.data.totalCost);
          setWeight(selectedWeight); // Update weight to the selected preset
        })
        .catch((err) => {
          if (axios.isAxiosError(err) && err.response) {
            setError(`Error: ${err.response.status} - ${err.response.data}`);
          } else if (err instanceof Error) {
            setError(err.message);
          } else {
            setError("An unknown error occurred");
          }
        });
    } else {
      setError("Please enter a valid weight greater than 0.");
    }
  };

  const handlePresetClick = (preset: number) => {
    calculateCost(preset); // Call calculateCost with the preset weight
  };

  const handleManualCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    if (typeof weight === 'number' && weight > 0) {
      calculateCost(weight); // Calculate cost with manually entered weight
    } else {
      setError("Please enter a valid weight greater than 0.");
    }
  };

  if (loading) {
    return <p>Loading cheese details...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!cheese) {
    return <p>Cheese not found</p>;
  }

  return (
    <div className="cheese-page-container">
      <Link to="/" className="back-link">Back to Cheese List</Link>
      <div className="cheese-detail">
        <img
          src={cheese.picture || "/images/camembert.jpg"}
          alt={`${cheese.name}`}
          className="cheese-detail-image"
          style={{
            maxWidth: "300px",
            maxHeight: "300px",
            width: "100%",
            height: "auto"
          }}
        />
        <div className="cheese-info"> 
        <h2>{cheese.name}</h2>
        <p>Price: ${cheese.pricePerKilo}/kg</p>
        <p>Colour: {cheese.colour}</p>

        {/* Input for weight */}
        <form onSubmit={handleManualCalculate}>
          <label htmlFor="weight">Enter weight (kg): </label>
          <input
            type="number"
            id="weight"
            value={weight}
            onChange={(e) => setWeight(Number(e.target.value))}
            min="0"
            step="0.1"
            required
          />
          <button type="submit">Calculate Cost</button>
        </form>

        {/* Buttons for preset weights */}
        <div className="preset-buttons">
          {presetWeights.map((preset) => (
            <button
              key={preset}
              type="button"
              onClick={() => handlePresetClick(preset)} 
              style={{
                margin: "0 5px",
                padding: "10px",
                backgroundColor: "#61dafb",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                color: "white",
              }}
            >
              {preset} kg
            </button>
          ))}
        </div>
        <div className="total-cost">
        {/* Display total cost if calculated */}
        {totalCost !== null && (
          <p>Total Cost: ${totalCost.toFixed(2)}</p>
        )}
        </div>
        </div>
      </div>
    </div>
  );
};

export default CheeseDetails;
