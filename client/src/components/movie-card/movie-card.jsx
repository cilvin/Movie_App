import React from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import './movie-card.scss'

export class MovieCard extends React.Component {
    render() {
    // This is given to the <MovieCard/> component by the outer world
    // which, in this case, is `MainView`, as `MainView` is what’s
    // connected to your database via the movies endpoint of your API
    const { movie, onClick } = this.props;

    return (
        <Card>
            <Card.Header className='CH'  as='center' onClick={() => onClick(movie)} className='movie-card'>{movie.Title}
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
            <Button type='button' as='button' className='cardbtn' variant='outline-dark' size='sm'   onClick={() => onClick(movie)} className='movie-button'>Click Here</Button>
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