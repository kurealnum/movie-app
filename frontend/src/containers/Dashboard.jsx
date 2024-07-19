import { useState } from "react";
import getCookie from "../features/helpers";
import ErrorMessage from "../components/ErrorMessage";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [title, setTitle] = useState();
  const [isError, setIsError] = useState(false);
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();

  function saveMovieHandler(title) {
    const response = saveMovie(title);
    response.then((result) => {
      if (!result.ok) {
        setIsError(true);
      } else {
        setIsError(false);
      }
    });
  }

  function getMoviesHandler() {
    const response = getMovies();
    response.then((result) => {
      setMovies(result["movies"]);
    });
  }

  return (
    <>
      <input onChange={(e) => setTitle(e.target.value)}></input>
      <button onClick={() => saveMovieHandler(title)}>
        Save a movie title
      </button>
      <ErrorMessage
        message={"There was an error saving the movie!"}
        altMessage={""}
        isError={isError}
      />
      <button onClick={() => getMoviesHandler()}>View Saved Movies</button>
      <div className="movies">
        {movies.map((movie_info) => (
          <p key={movie_info["id"]}>{movie_info["title"]}</p>
        ))}
      </div>
      <button onClick={() => navigate("/logout")}>Log out</button>
    </>
  );
}

async function saveMovie(title) {
  const config = {
    headers: {
      "Content-Type": "application/json",
      "X-CSRFToken": getCookie("csrftoken"),
    },
    credentials: "include",
    method: "POST",
    body: JSON.stringify({ title }),
  };
  const response = await fetch("/api/movies/save-movie/", config);
  return response;
}

async function getMovies() {
  const config = {
    headers: {
      "Content-Type": "application/json",
      "X-CSRFToken": getCookie("csrftoken"),
    },
    credentials: "include",
    method: "GET",
  };
  const response = await fetch("/api/movies/get-movies/", config);
  return response.json();
}

export default Dashboard;
