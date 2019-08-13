import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import './director-view.scss';
import { Link } from 'react-router-dom';


export class DirectorView extends React.Component {
    constructor() {
        super();

        this.state = {};
    }
     render() {
         const { director } = this.props;

         if (!director) return null;

         return (
             <div className='director-view'>
                <h1 className='director'>{director.Director.Name}</h1>
                <h2>Biography</h2>
                <div className='bio'>{director.Director.Bio}</div>
                <h2>Born</h2>
                <div className='birth'>{director.Director.Birth}</div>
                <h2>Died</h2>
                <h5 className='death'>{director.Director.Death}</h5>
                <Link to={'/'}>
                    <Button variant='outline-dark' >Back</Button>
                </Link>
                
             </div>
         );
     }
     
}

DirectorView.propTypes = {
    Director: PropTypes.shape({
        Name: PropTypes.string,
        Bio: PropTypes.string,
        Death: PropTypes.string
    }).isRequired,
    
};
