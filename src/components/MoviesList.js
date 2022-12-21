import React, { useState } from "react";
import { useStateValue } from "../state";
import MoviesListItem from "./MovieListItem";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";

export const MoviesList = ({ currentMovies }) => {
  if (!currentMovies.length) {
    return <div className="movies-list">Nothing To Show</div>;
  }

  return (
    <div className="movies-list">
      {currentMovies.map((movie) => (
        <Link className="movies-list__link" to={`/movies/${movie.id}`} key={movie.id}>
          <MoviesListItem movie={movie} />
        </Link>
      ))}
    </div>
  );
};

const PaginatedMoviesList = ({ itemsPerPage }) => {
  const [state] = useStateValue();
  const [itemOffset, setItemOffset] = useState(0);

  const items = state.filteredMovies;

  let endOffset = itemOffset + itemsPerPage;
  let currentMovies = items.slice(itemOffset, endOffset);
  let pageCount = Math.ceil(items.length / itemsPerPage);

  if (!currentMovies.length) {
    endOffset = itemsPerPage;
    currentMovies = items.slice(0, endOffset);
    pageCount = Math.ceil(items.length / itemsPerPage);
  }

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    setItemOffset(newOffset);
  };

  return (
    <>
      <MoviesList currentMovies={currentMovies} />
      <ReactPaginate
        breakLabel="..."
        nextLabel="next"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        pageCount={pageCount}
        previousLabel="previous"
        renderOnZeroPageCount={null}
        containerClassName="pagination"
        activeClassName="pagination__li--active"
        pageClassName="pagination__li"
      />
    </>
  );
};

export default PaginatedMoviesList;
