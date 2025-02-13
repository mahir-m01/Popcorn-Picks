import { createContext, useState, useContext, useEffect } from "react";
import PropTypes from "prop-types";

const MovieContext = createContext();

export const useMovieContext = () => useContext(MovieContext);

export const MovieProvider = ({ children }) => {
    const [favorites, setFavorites] = useState(() => {
        // Retrieve from localStorage only once during initialization
        const storedFavs = localStorage.getItem("favorites");
        return storedFavs ? JSON.parse(storedFavs) : null;
    });

    useEffect(() => {
        localStorage.setItem("favorites", JSON.stringify(favorites));
    }, [favorites]);

    const addToFavorites = (movie) => {
        setFavorites(prev => {
            if (!prev.some(m => m.id === movie.id)) {
                return [...prev, movie];
            }
            return prev;
        });
    };

    const removeFromFavorites = (movieId) => {
        setFavorites(prev => prev.filter(movie => movie.id !== movieId));
    };

    const isFavorite = (movieId) => {
        return favorites.some(movie => movie.id === movieId);
    };

    const value = {
        favorites,
        addToFavorites,
        removeFromFavorites,
        isFavorite
    };

    return <MovieContext.Provider value={value}>{children}</MovieContext.Provider>;
};

MovieProvider.propTypes = {
    children: PropTypes.node.isRequired,
};