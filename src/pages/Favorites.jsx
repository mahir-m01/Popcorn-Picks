import "../CSS/Favorites.css";
import MovieCard from "../MovieComponents/MovieCard.jsx";
import { useMovieContext } from "../context/MovieContext"; 
function Favorites() {
  const { favorites } = useMovieContext();

  if (favorites.length > 0) {
    return (
      <div className="favorites">
        <h2>Your Favorites</h2>
        <div className="movies-grid">
          {favorites.map((movie) => (
            <MovieCard movie={movie} key={movie.id} />
          ))}
        </div>
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

  return (
    <div className="favorites-empty">
      <h2>No Favorite Movies Yet</h2>
      <p>Start adding movies to your favorites and they will appear here!</p>
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

export default Favorites;