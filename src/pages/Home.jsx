import MovieCard from "../MovieComponents/MovieCard"
import { useState, useEffect } from "react";
import '../CSS/Home.css'
import { searchMovies , getPopularMovies } from "../services/api";
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
  
    const handleSearch = async (e) => {
      e.preventDefault();
      if (!searchQuery.trim()) return
      if (loading) return
  
      setLoading(true)
      try {
          const searchResults = await searchMovies(searchQuery)
          setMovies(searchResults)
          setError(null)
      } catch (err) {
          console.log(err)
          setError("Failed to search movies...")
      } finally {
          setLoading(false)
      }
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
       <div
  style={{
    textAlign: 'center',
    padding: '1.5rem 0',
    marginTop: '4rem',
    backdropFilter: 'blur(8px)',
    color: '#333',
    fontWeight: '500',
    fontSize: '1rem',
    borderTop: '1px solid rgba(0,0,0,0.05)',
  }}
>
  <h1 style={{ marginBottom: '0.5rem', color: '#b5a7f7'}}>Designed & Developed by Vetri</h1>
  <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', fontSize: '1.4rem' }}>
    <a
      href="https://www.linkedin.com/in/vetriselvan-r-a238b7263"
      target="_blank"
      rel="noopener noreferrer"
      style={{ color: '#0077b5', textDecoration: 'none' }}
    >
      LinkedIn
    </a>
    <a
      href="https://www.instagram.com/im.vetri"
      target="_blank"
      rel="noopener noreferrer"
      style={{ color: '#E1306C', textDecoration: 'none' }}
    >
      Instagram
    </a>
  </div>
</div>
      </div>
    );
  }
  
  export default Home; 