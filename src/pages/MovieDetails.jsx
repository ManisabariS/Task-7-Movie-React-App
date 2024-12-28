import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        setError(null);
        const response = await axios.get(
          `https://www.omdbapi.com/?i=${id}&apikey=22135919`
        );
        if (response.data.Response === "True") {
          setMovie(response.data);
        } else {
          setError(response.data.Error);
        }
      } catch (err) {
        setError("An error occurred while fetching movie details.",err);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (!movie) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{movie.Title}</h1>
      <div className="flex">
        <img
          src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/300"}
          alt={movie.Title}
          className="w-1/3 h-auto rounded"
        />
        <div className="ml-4">
          <p><strong>Year:</strong> {movie.Year}</p>
          <p><strong>Genre:</strong> {movie.Genre}</p>
          <p><strong>Plot:</strong> {movie.Plot}</p>
          <p><strong>Cast:</strong> {movie.Actors}</p>
          <p><strong>Ratings:</strong> {movie.imdbRating}</p>
        </div>
      </div>
    </div>
  );
}

export default MovieDetails;
