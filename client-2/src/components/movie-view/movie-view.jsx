import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import './movie-view.scss';
import { Link } from 'react-router-dom';
import axios from 'axios';


export class MovieView extends React.Component {
    constructor() {
        super();
        
        this.state = {
            testingUrl: []
        };
    }

    componentDidMount() {
        this.searchMovieDB();

        }
       
        
        

    searchMovieDB() {
        const movie = this.props;
        let apiKey= 'e23e5607a1801b5693cf7ee99ff11da0';
        let apiUrl= `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${movie.Title}&page=1&include_adult=false`;
         axios.get({apiUrl}).then(response => {
             response.status(200).json(response.data);
             console.log(response.data);
             this.setState({
                 testingUrl: response.data
             })
             
             })
           
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
         

         
         //const imgUrl= `https://image.tmdb.org/t/p/w500/dM2w364MScsjFf8pfMbaWUcWrR.jpg`;
        

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
                <img alt='' className='movie-poster'  />
                <p>{this.state.testingUrl}</p>
            

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

//MovieView.propTypes = {
  //  movie: PropTypes.shape({
 //       Title: PropTypes.string,
 //   }).isRequired,
   
//};
