import { useState, useEffect, use } from 'react'
import './App.css'
import Search from './components/Search'
import Spinner from './components/Spinner';

const API_BASE_URL = 'https://api.themoviedb.org/3';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`
  }
}


const App = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const [movieList, setMovieList] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const fetchMovies = async() => {
    setIsLoading(true);
    setErrorMessage(false);
    try{
      const endpoint = `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;
      const response = await fetch(endpoint, API_OPTIONS);

      if(!response.ok){
        throw new Error('Failed to fetch movies')
      }

      const data = await response.json();

      if(data.Response === 'False') {
        setErrorMessage(data.Error || 'Failed to fetch movies');
        setMovieList([]);
        return;
      }

      setMovieList(data.results || []);

    } catch(error) {
      console.log(`Error fetching movies: ${error}`)
    } finally {
      setIsLoading(true)
    }
  }

  useEffect(() => {
    fetchMovies();
  }, [])

  return (
    <main>
      <div className="pattern"></div>
      <div className="wrapper">
        <header>
          <img src="./hero-img.png" alt="Hero-Banner" />
          <h1>
            <span>
              Watch
            </span>
            <span className="text-gradient ml-2">
              anywhere.
            </span>
            <br />
            <span>
            Cancel
            </span>
            <span className="text-gradient ml-2">
              anytime.
            </span>
          </h1>
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
        </header>

        <section className='all-movies'>
          <h2 className='mt-[20px]'>All Movies</h2>
          {isLoading ? (
              <Spinner />
          ) : errorMessage ? (
            <p className='text-red-500'>
              {errorMessage}
            </p>
          ) : (
            <ul>
              {movieList.map((movie) => (
                <p key={movie.id} className='text-white'>
                  {movie.title}
                </p>
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  )
}

export default App