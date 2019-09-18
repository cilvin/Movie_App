import React from 'react';
import Button from 'react-bootstrap/Button';
import './movie-view.scss';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';

function MovieView(props) {
  const { movies, movieId } = props;

  if (!movies || !movies.length) return null;

  const movie = movies.find(movie => movie._id == movieId);

  function submitLike(event) {
    event.preventDefault();
    let userEndpoint = 'https://floating-ocean-36499.herokuapp.com/users/';
    let usernameLocal = localStorage.getItem('user');
    let token = localStorage.getItem('token');
    let url = `${userEndpoint}${usernameLocal}/FavoriteMovies/${movie._id}`;
    axios
      .post(
        url,
        {
          Username: usernameLocal
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      )
      .then(response => {
        console.log(response);
        alert('Movie has been added to your Favorite List!');
        //update localStorage
      })
      .catch(error => {
        console.log(error);
        alert('Ooooops... Something went wrong!');
      });
  }

  return (
    <div className="movie-view">
      <div className="movie-title">
        <h3 className="label">Title</h3>
        <p className="value">{movie.Title}</p>
      </div>
      <div className="movie-description">
        <h3 className="label">Description</h3>
        <p className="value">{movie.Description}</p>
      </div>
      <img alt="" className="movie-poster" />

      <div className="movie-genre">
        <h3 className="label">Genre</h3>
        <Link to={`/genre/${movie.Genre.Name}`}>
          <p className="value">{movie.Genre.Name}</p>
        </Link>
      </div>
      <div className="movie-director">
        <h3 className="label">Director</h3>
        <Link to={`/director/${movie.Director.Name}`}>
          <p className="value">{movie.Director.Name}</p>
        </Link>
      </div>
      <Link to={'/'}>
        <Button className="back" variant="outline-dark">
          Back
        </Button>
      </Link>

      <Button
        className="like"
        variant="outline-dark"
        onClick={event => submitLike(event)}
      >
        Like
      </Button>
    </div>
  );
}

export default connect(({ movies }) => ({ movies }))(MovieView);

//Old code below

// componentDidMount() {
//  this.searchMovieDB();

//  }

// searchMovieDB() {
//   const  movie   = this.props;
//    let apiKey= 'e23e5607a1801b5693cf7ee99ff11da0';
//    let apiUrl= `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${movie.Title}&page=1&include_adult=false`;
//     axios.get(apiUrl).then(response => {
// response.status(200).json(response.data);
//     console.log(response.data);
//  this.setState({
//     testingUrl: response.data
//        })

// })
//   }

//const imgUrl= `https://image.tmdb.org/t/p/w500/dM2w364MScsjFf8pfMbaWUcWrR.jpg`;
