import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);

  const searchMovies = async () => {
    try {
      setError(null);
      const response = await axios.get(
        `https://www.omdbapi.com/?s=${searchTerm}&apikey=22135919`
      );
      if (response.data.Response === "True") {
        setMovies(response.data.Search);
      } else {
        setMovies([]);
        setError(response.data.Error);
      }
    } catch (err) {
      setError("An error occurred while fetching data.",err);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Movies Search App</h1>
      <div className="flex mb-4">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for a movie..."
          className="border rounded-l px-4 py-2 w-full"
        />
        <button
          onClick={searchMovies}
          className="bg-blue-500 text-white px-4 py-2 rounded-r"
        >
          Search
        </button>
      </div>
      {error && <p className="text-red-500">{error}</p>}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {movies.map((movie) => (
          <div key={movie.imdbID} className="border rounded overflow-hidden shadow">
            <img
              src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/150"}
              alt={movie.Title}
              className="w-full h-64 object-cover"
            />
            <div className="p-4">
              <h2 className="text-lg font-bold">{movie.Title}</h2>
              <p>{movie.Year}</p>
              <Link
                to={`/movie/${movie.imdbID}`}
                className="text-blue-500 hover:underline"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
