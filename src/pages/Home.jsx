import MovieCard from "../Components/MovieCard"
import { useState, useEffect } from "react";
import '../CSS/Home.css'
import { searchMovies , getPopularMovies } from "../services/api";
import Footer from "../Components/Footer.jsx";

function Home() {
    const [searchQuery, setSearchQuery] = useState("");
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const loadPopularMovies = async () => {
        try {
          const popularMovies = await getPopularMovies();
          setMovies(popularMovies);
        } catch (err) {
          console.log(err);
          setError("Failed to load movies...");
        } finally {
          setLoading(false);
        }
      };
  
      loadPopularMovies();
    }, []);

    // Dynamic search - triggers as you type
    useEffect(() => {
      const performSearch = async () => {
        if (!searchQuery.trim()) {
          // If search is empty, load popular movies
          try {
            setLoading(true);
            const popularMovies = await getPopularMovies();
            setMovies(popularMovies);
            setError(null);
          } catch (err) {
            console.log(err);
            setError("Failed to load movies...");
          } finally {
            setLoading(false);
          }
          return;
        }

        // Perform search
        try {
          setLoading(true);
          const searchResults = await searchMovies(searchQuery);
          setMovies(searchResults);
          setError(null);
        } catch (err) {
          console.log(err);
          setError("Failed to search movies...");
        } finally {
          setLoading(false);
        }
      };

      // Debounce: wait 500ms after user stops typing
      const timeoutId = setTimeout(() => {
        performSearch();
      }, 500);

      // Cleanup: cancel the previous timeout if user is still typing
      return () => clearTimeout(timeoutId);
    }, [searchQuery]);

    const handleSearch = async (e) => {
      e.preventDefault();
      // Search is now handled by useEffect, but keep form submission for accessibility
    };
  
    return (
      <div className="home">
        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            placeholder="Search for movies..."
            className="search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit" className="search-button">
            Search
          </button>
        </form>
  
          {error && <div className="error-message">{error}</div>}
  
        {loading ? (
          <div className="loading">Loading...</div>
        ) : (
          <div className="movies-grid">
            {movies.map((movie) => (
              <MovieCard movie={movie} key={movie.id} />
            ))}
          </div>
        )}
        <Footer />
      </div>
    );
  }
  
  export default Home;
