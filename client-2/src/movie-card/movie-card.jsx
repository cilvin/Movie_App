import React from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import './movie-card.scss';
import { Link } from 'react-router-dom';

export class MovieCard extends React.Component {
    render() {
    // This is given to the <MovieCard/> component by the outer world
    // which, in this case, is `MainView`, as `MainView` is what’s
    // connected to your database via the movies endpoint of your API
    const { movie, onClick } = this.props;

    return (
        <Card>
            <Card.Header >{movie.Title}
            </Card.Header>
            <br>
            </br>
            <br>
            </br>
            <br>
            </br>
            <br>
            </br>
            <br>
            </br>
            <Link to={`/movies/${movie._id}`}>
                <Button type='button' as='button'  variant='outline-dark' size='sm'   className='movie-button'>Click Here</Button>
            </Link>
            
        </Card>
        );
    }
}

MovieCard.propTypes = {
    movie: PropTypes.shape({
        Title: PropTypes.string
    }).isRequired,
    onClick: PropTypes.func.isRequired
};