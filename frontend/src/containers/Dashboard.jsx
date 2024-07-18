import { useState } from "react";
import getCookie from "../features/helpers";

function Dashboard() {
  const [title, setTitle] = useState();

  function saveMovieHandler(title) {
    console.log("hi");
    const response = saveMovie(title);
    response.then((result) => {
      if (result.ok) {
        console.log("Saved the movie!");
      } else {
        console.log("There was an error saving the movie!");
      }
    });
  }

  return (
    <>
      <input onChange={(e) => setTitle(e.target.value)}></input>
      <button onClick={() => saveMovieHandler(title)}></button>
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

export default Dashboard;
