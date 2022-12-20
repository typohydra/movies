import React, { useState } from "react";
import { useStateValue } from "../state";
import MoviesListItem from "./MovieListItem";
import ReactPaginate from "react-paginate";

const MoviesList = ({ currentMovies }) => {
  console.log(currentMovies);
  return (
    <div className="movies-list">
      {currentMovies.map((movie) => (
        <MoviesListItem key={movie.id} movie={movie} />
      ))}
    </div>
  );
};

function PaginatedMoviesList({ itemsPerPage }) {
  const [state, dispatch] = useStateValue();
  const [itemOffset, setItemOffset] = useState(0);

  const items = state.movies;

  const endOffset = itemOffset + itemsPerPage;
  const currentMovies = items.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(items.length / itemsPerPage);

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
}

export default PaginatedMoviesList;
