import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import './movie-view.scss';
import { Link } from 'react-router-dom';
import axios from 'axios';


export class MovieView extends React.Component {
    constructor() {
        super();

        this.state = {};
    }


  
    

    submitLike(event) {
        event.preventDefault();
        const { movie } = this.props;
        let userEndpoint = 'https://floating-ocean-36499.herokuapp.com/users/';
        let usernameLocal = localStorage.getItem('user');
        let token = localStorage.getItem('token');
        let url = `${userEndpoint}${usernameLocal}/FavoriteMovies/${movie._id}`;
        axios.post(url, {
          Username: usernameLocal
        }, {
          headers: { Authorization: `Bearer ${token}`}
        })
        .then(response => {
            
          console.log(response);
          alert('Movie has been added to your Favorite List!');
          //update localStorage
          localStorage.setItem('user', this.state.username);
        })
        .catch(error => {
          console.log(error);
          alert('Ooooops... Something went wrong!');
        });
      };

     render() {
         const { movie } = this.props;

         // Below I am trying to run a search using theMovieDB search variable to find the movie that was passed down in the movie props. 
         // After the movie is found with axios I want to pass on the posterPath from the previous axios search to the poster variable and 
         // use the poster variable to to render the img poster of the specified movie.

         //const apiKey = 'e23e5607a1801b5693cf7ee99ff11da0';

       // const theMovieDBSearch = movie =>
       // axios.get(
       // `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}=en-US&query=${movie.Title}&page=1&include_adult=false`
    
      //  );

      //  const poster = {
      //  loadSize: (size = 'w300', posterPath = '') => {
       //     return `http://image.tmdb.org/t/p/${size}${posterPath}`;
      //  },
      //  loadOriginalSize: (posterPath = '') => {
       //     return `http://image.tmdb.org/t/p/original${posterPath}`;
       //  }
       //    }; 
         
         const imgUrl= `https://image.tmdb.org/t/p/w500/dM2w364MScsjFf8pfMbaWUcWrR.jpg`;
        

         if (!movie) return null;

         return (
             <div className='movie-view'>
                <div className='movie-title'>
                    <h2 className='label'>Title</h2>
                    <p className='value'>{movie.Title}</p>
                </div>
                <div className='movie-description'>
                    <h3 className='label'>Description</h3>
                    <p className='value'>{movie.Description}</p>
                </div>
                <img alt='' className='movie-poster' src={ imgUrl } />

                <div className='movie-genre'>
                    <Link to={`/genre/${movie.Genre.Name}`}>
                        <h3 className='label'>Genre</h3>
                        <Button variant='outlin-dark'><p className='value'>{movie.Genre.Name}</p></Button>
                    </Link>
                </div>
                <div className='movie-director'>
                    <Link to={`/director/${movie.Director.Name}`}>
                        <h3 className='label'>Director</h3>
                    </Link>
                    <h4>{movie.Director.Name}</h4>
                </div>
                <Link to={'/'}>
                <Button variant='outline-dark' >Back</Button>
                </Link>
                
                <Button variant='outline-dark' onClick={event => this.submitLike(event)}>Like</Button>
             </div>
         );
     }
     
}

MovieView.propTypes = {
    movie: PropTypes.shape({
        Title: PropTypes.string,
    }).isRequired,
   
};
