import React from 'react';
import Button from 'react-bootstrap/Button';
import './genre-view.scss';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
//import moviesList from '../movies-list/movies-list';

function GenreView(props) {
  const { movies, genreName } = props;

  if (!movies || !movies.length) return null;

  const genre = movies.find(movie => movie.Genre.Name === genreName);

  return (
    <div className="genre-view">
      <h1 className="genre">{genre.Genre.Name}</h1>
      <hr></hr>
      <div className="description">{genre.Genre.Description}</div>
      <br></br>
      <Link to={'/'}>
        <Button className="gbtn" variant="outline-dark">Back</Button>
      </Link>
    </div>
  );
}

export default connect(({ movies }) => ({ movies }))(GenreView);
