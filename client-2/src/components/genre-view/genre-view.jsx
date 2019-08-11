import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import './genre-view.scss';
import { Link } from 'react-router-dom';


export class GenreView extends React.Component {
    constructor() {
        super();

        this.state = {};
    }
     render() {
         const { genre } = this.props;

         if (!genre) return null;

         return (
             <div className='genre-view'>
                <h1 className='genre'>{genre.Name}</h1>
                <div className='description'>{genre.Description}</div>
                <Link to={'/'}>
                    <Button variant='outline-dark'>Back</Button>
                </Link>
                
             </div>
         );
     }
     
}

GenreView.propTypes = {
    genre: PropTypes.shape({
        Name: PropTypes.string,
        Description: PropTypes.string
    }).isRequired,
    onClick: PropTypes.func.isRequired
};
