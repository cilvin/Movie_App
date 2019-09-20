import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import './director-view.scss';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

function DirectorView(props) {
  const { movies, directorName } = props;

  if (!movies || !movies.length) return null;

  const director = movies.find(movie => movie.Director.Name === directorName)
    .Director;

  return (
    <div className="director-view">
      <h1 className="director">{director.Name}</h1>
      <hr></hr>
      <h2 id="info" >Biography</h2>
        <div className="bio">{director.Bio}</div>
      <h2 id="info">Born</h2>
        <div className="birth">{director.Birth}</div>
      <h2 id="info">Died</h2>
        <div className="death">{director.Death}</div>
      <Link to={'/'}>
        <Button className="backbuttn" variant="outline-dark">Back</Button>
      </Link>
    </div>
  );
}

export default connect(({ movies }) => ({ movies }))(DirectorView);

DirectorView.propTypes = {
  Director: PropTypes.shape({
    Name: PropTypes.string,
    Bio: PropTypes.string,
    Death: PropTypes.string
  }).isRequired
};
