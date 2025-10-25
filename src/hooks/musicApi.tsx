
// Artist interface defines what each artist object looks like
export interface ArtistResult {
  idArtist: string
  strArtist: string
  strGenre: string
  strBiographyEN: string
  strArtistThumb: string
  intFormedYear: string
}

// Error interface (in case API returns no results)
export interface SearchError {
  error: string
}

export const musicApi = () => {
  // Base API URL (no API key needed!)
  const url = 'https://www.theaudiodb.com/api/v1/json/2/'

  // 🔍 Search artists by name
  const searchData = async (artist: string): Promise<ArtistResult[] | SearchError> => {
    try {
      const res = await fetch(`${url}search.php?s=${encodeURI(artist)}`)
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`)
      }

      const data = await res.json()
      if (!data.artists) {
        return { error: 'No artists found.' }
      }

      return data.artists
    } catch (error) {
      console.error('Search failed:', error)
      return { error: 'Failed to fetch artist data.' }
    }
  }

  // 📄 Get full details of a specific artist by ID
  const getDetails = async (id: string): Promise<ArtistResult | SearchError> => {
    try {
      const res = await fetch(`${url}artist.php?i=${id}`)
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`)
      }

      const data = await res.json()
      if (!data.artists) {
        return { error: 'Artist not found.' }
      }

      return data.artists[0]
    } catch (error) {
      console.error('Get details failed:', error)
      return { error: 'Failed to fetch artist details.' }
    }
  }

  return { searchData, getDetails }
}

export default musicApi
