import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import './movie-view.scss';
import { Link } from 'react-router-dom';


export class MovieView extends React.Component {
    constructor() {
        super();

        this.state = {};
    }
     render() {
         const { movie, onClick } = this.props;

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
                <img alt='' className='movie-poster' src={movie.ImageURL} />

                <div className='movie-genre'>
                    <Link to={`/genre/${movie.Genre.Name}`}>
                        <h3 className='label'>Genre</h3>
                        <Button variant='outlin-dark'><p className='value'>{movie.Genre.Name}</p></Button>
                    </Link>
                </div>
                <div className='movie-director'>
                    <Link to={`/directors/${movie.Director.Name}`}>
                        <h3 className='label'>Director</h3>
                        <Button variant='outline-dark'><p className='value'>{movie.Director.Name}</p></Button>
                    </Link>
                </div>
                <Button variant='outline-dark' onClick={() => onClick()}>Back</Button>
             </div>
         );
     }
     
}

MovieView.propTypes = {
    movie: PropTypes.shape({
        Title: PropTypes.string,
    }).isRequired,
    onClick: PropTypes.func.isRequired
};
