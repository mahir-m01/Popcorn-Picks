import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import '../CSS/Home.css';

const API_KEY = "fd1ec87ed24cc65fc4fb490fc7dcceb6";
const BASE_URL = "https://api.themoviedb.org/3";

function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchMovie() {
      setLoading(true);
      try {
        const res = await fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`);
        if (!res.ok) throw new Error('Failed to fetch movie details');
        const data = await res.json();
        setMovie(data);
      } catch (err) {
        setError('Could not load movie details.');
      } finally {
        setLoading(false);
      }
    }
    fetchMovie();
  }, [id]);

  if (loading) return <div className="home"><div className="loading">Loading...</div></div>;
  if (error) return <div className="home"><div className="error-message">{error}</div></div>;
  if (!movie) return null;

  // Backdrop style
  const backdropUrl = movie.backdrop_path ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}` : null;
  const backdropStyle = backdropUrl ? {
    background: `linear-gradient(rgba(35,26,43,0.96), rgba(35,26,43,0.98)), url(${backdropUrl}) center/cover no-repeat`,
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '3rem 1rem',
  } : {
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: 'linear-gradient(120deg, #231a2b 0%, #2d223a 60%, #3a1a2b 100%)',
    padding: '3rem 1rem',
  };

  return (
    <div className="home" style={backdropStyle}>
      <div className="movie-card" style={{
        maxWidth: 900,
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        gap: '2.5rem',
        padding: '2.5rem 2rem',
        background: 'rgba(40,22,54,0.97)',
        borderRadius: 24,
        boxShadow: '0 12px 40px 0 rgba(40,22,54,0.32)',
        alignItems: 'flex-start',
      }}>
        <div className="movie-poster" style={{minWidth: 150, maxWidth: 180, flex: '0 0 150px', display: 'flex', justifyContent: 'center'}}>
          <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} style={{width: '100%', maxWidth: 150, borderRadius: 16, boxShadow: '0 4px 24px 0 rgba(0,0,0,0.25)'}} />
        </div>
        <div className="movie-info" style={{textAlign: 'left', flex: 1, display: 'flex', flexDirection: 'column', gap: '0.7rem'}}>
          <h2 style={{marginBottom: 4, fontSize: '2.1rem', color: '#fff', fontWeight: 700, letterSpacing: '0.01em'}}>{movie.title}</h2>
          <p style={{margin: 0, color: '#b5a7f7', fontSize: '1.08rem'}}><b>Original Title:</b> {movie.original_title}</p>
          <div style={{display: 'flex', flexWrap: 'wrap', gap: '1.2rem 1.5rem', margin: '0.2rem 0'}}>
            <span style={{color: '#b5a7f7'}}><b>Release Date:</b> {movie.release_date}</span>
            <span style={{color: '#bbaed1'}}><b>Language:</b> {movie.original_language?.toUpperCase()}</span>
            <span style={{color: '#ffd700'}}><b>Popularity:</b> {movie.popularity}</span>
            <span style={{color: '#ffd700'}}><b>Rating:</b> {movie.vote_average} / 10 ({movie.vote_count} votes)</span>
            <span style={{color: '#ff5a8d'}}><b>Adult:</b> {movie.adult ? 'Yes' : 'No'}</span>
            <span style={{color: '#ff5a8d'}}><b>Video:</b> {movie.video ? 'Yes' : 'No'}</span>
          </div>
          <div style={{margin: '0.2rem 0', color: '#bbaed1'}}><b>Genres:</b> {movie.genres && movie.genres.map(g => <span key={g.id} style={{marginRight: 8}}>{g.name}</span>)}</div>
          <p style={{margin: '0.7rem 0', color: '#e0e0e0', fontSize: '1.08rem', lineHeight: 1.7}}><b>Overview:</b> {movie.overview}</p>
          {movie.homepage && <a href={movie.homepage} target="_blank" rel="noopener noreferrer" style={{color: '#ff5a8d', fontWeight: 600, marginTop: 8}}>Official Site</a>}
        </div>
      </div>
    </div>
  );
}

export default MovieDetails; 