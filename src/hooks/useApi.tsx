import { useCallback } from 'react';

// Typescript custom enum for search types (optional)
export enum SearchType {
  all = "",
  movie = "movie",
  series = "series",
  episode = "episode",
}
// Interface for search result items
export interface SearchResult {
  Title: string;
  Year: string;
  Poster: string;
  imdbID: string;
  Type: string;
}
// Interface for search error response
export interface SearchError {
  Response: string;
  Error: string;
}
// Interface for detailed movie information
export interface DetailsResult {
  Genre: string;
  Title: string;
  Year: string;
  Poster: string;
  Plot: string;
  imdbRating: string;
  Director: string;
  Actors: string;
  Website: string;
  Awards: string;
}

// Custom hook to interact with the OMDb API
export const useApi = () => {
  const url = "https://www.omdbapi.com/";
  const apiKey = "eea37d0c"; // Replace with your actual API key
  // You can get a free API key from http://www.omdbapi.com/apikey.aspx

  // Function to search for movies, series, or episodes by title and type
  const searchData = useCallback(async (
    title: string,
    type: SearchType
  ): Promise<{ Search: SearchResult[] } | SearchError> => {
    const result = await fetch(
      `${url}?s=${encodeURI(title)}&type=${type}&apikey=${apiKey}`
    );

      return result.json();
  }, [apiKey, url]);

  // Function to get detailed information about a specific movie, series, or episode by IMDb ID
  const getDetails = useCallback(async (id: string): Promise<DetailsResult> => {
    const result = await fetch(`${url}?i=${id}&plot=full&apikey=${apiKey}`);
    return result.json();
  }, [apiKey, url]);

// Return the functions to be used in components
  return {
  searchData,
  getDetails,
};
};