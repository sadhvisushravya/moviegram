import React, { useEffect, useState } from "react";
import axios from "axios";
import "./MovieList.css";
import Fire from "../../assets/fire.png";
import MovieCard from "../MovieList/MovieCard";
import FilterGrop from "./FilterGrop";

const MovieList = () => {
  const [movies, setmovies] = useState([]);
  const [minRating, setminRating] = useState(0);
  const [filterMovies, setfilterMovies] = useState([]);
  const [sort, setsort] = useState({
    by: "default",
    order: "asc",
  });
  useEffect(() => {
    axios
      .get(
        "https://api.themoviedb.org/3/movie/popular?api_key=0f090f9a7e4780d24464bccfa3016fc9"
      )
      .then((res) => {
        setmovies(res.data.results);
        setfilterMovies(res.data.results);
      });
  }, []);

  useEffect(() => {
    if (sort.by != "default") {
      const sortedMovies = _.orderBy(filterMovies, [sort.by], [sort.order]);
      setfilterMovies(sortedMovies);
    }
  }, [sort]);

  const handleFilter = (rate) => {
    if (rate === minRating) {
      setminRating(0);
      setfilterMovies(movies);
    } else {
      setminRating(rate);
      const filtered = movies.filter((movie) => movie.vote_average >= rate);
      setfilterMovies(filtered);
    }
  };

  const handleSort = (e) => {
    const { name, value } = e.target;
    setsort((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <section className="movie_list">
      <header className="align_center movie_list_header">
        <h2 className="align_center movie_list_heading">
          Popular <img src={Fire} alt="fire emoji" className="navbar_emoji" />
        </h2>

        <div className="align_center movie_list_fs">
          <FilterGrop minRating={minRating} onRatingClick={handleFilter} />

          <select
            name="by"
            id=""
            onChange={handleSort}
            value={sort.by}
            className="movie_sorting"
          >
            <option value="default">Sortby</option>
            <option value="release_date">Date</option>
            <option value="vote_average">Rating</option>
          </select>
          <select
            name="order"
            id=""
            onChange={handleSort}
            value={sort.order}
            className="movie_sorting"
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
      </header>

      <div className="movie_cards">
        {filterMovies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </section>
  );
};

export default MovieList;
