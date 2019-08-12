import React from 'react';
//import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import './profile-view.scss';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
//import { FORM } from 'dns';


export class ProfileView extends React.Component {
    constructor() {
        super();

        this.state = {
            username: null,
            password: null,
            email: null,
            birthday: null
        };
    }

    //delete user
    deleteUser(event) {
        event.preventDefault();
        axios.delete(`https://floating-ocean-36499.herokuapp.com/users/${localStorage.getItem('user')}`, {
            headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
        })
        .then(response => {
            alert('Your account has been delted!');
            //clears your storage
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            //opens login view
            window.open('/','_self');
        })
        .catch(event => {
            alert('failed to delete user');
        });
    };

    handleChange(event) {
        this.setState( {[event.target.name]: event.target.value} )
    }
    
    handleSubmit(event) {
        event.preventDefault();
        console.log(this.state.username);
        axios.put(`https://floating-ocean-36499.herokuapp.com/users/${this.props.user.Username}`, {
          Username: this.state.username,
          Password: this.state.password,
          Email: this.state.email,
          Birthday: this.state.birthday
        }, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}`}
        })
        .then(response => {
          console.log(response);
          alert('Your data has been updated!');
          //update localStorage
          localStorage.setItem('user', this.state.username);
        })
        .catch(event => {
          console.log('error updating the userdata');
          alert('Ooooops... Something went wrong!');
        });
      };


    toggleForm() {
        let form = document.getElementsByClassName('changeDataForm')[0];
        let toggleButton = document.getElementsById('toggleButton');
        
        form.classList.toggle('show-form');
        if(form.classList.contains('show-form')) {
            toggleButton.innerHTML = 'CHANGE DATA &uarr;';
        } else {
            toggleButton.innerHTML = 'CHANGE DATA &uarr;';
        }
    }

    


     render() {
         const { user } = this.props;

         if (!user) return null;

         return (
             <div className='profile-view'>
                <h1 className='director'>User Profile</h1>
                <div className='username'>
                    <div className='label'>Name</div>
                    <div className='value'>{user.Username}</div>
                </div>
                <div className='password'>
                    <div className='label'>Password</div>
                    <div className='value'>********</div>
                </div>
                <div className='birthday'>
                    <div className='label'>Birthday</div>
                    <div className='value'>{user.Birthday}</div>
                </div>
                <div className='email'>
                    <div className='label'>Email</div>
                    <div className='value'>{user.Email}</div>
                </div>
                <div className='favoritemovies'>
                    <div className='label'>Favorite Movies</div>
                    <div className='value'>{user.FavoriteMovies}</div>
                </div>
                <Link to={'/'}>
                    <Button className='view-btn' variant='outline-dark' type='button'>
                        Back
                    </Button>
                </Link>
                <Button className='view-btn' variant='outline-dark' type='button' onClick={(event) => this.deleteUser(event)}>
                        Delete
                </Button>
                <Button id='toggleButton' className='vuew-btn' variant='outline-dark' type='button' onClick={() => this.toggleForm()}>
                    Change Data
                </Button>

                <Form className='changeDataForm'>
                    <h2>Change Data</h2>
                    <Form.Group controlId='formBasicUsername'>
                        <Form.Label>Your Username</Form.Label>
                        <Form.Control type='text' name='username'onChange={event => this.handleChange(event)} placeholder='Enter Username'/>
                        <Form.Text className='text-muted'>
                            Type username here.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group controlId='formBasicPassword'>
                        <Form.Label>Your Password</Form.Label>
                        <Form.Control type='text' name='password'onChange={event => this.handleChange(event)} placeholder='Password'/>
                    </Form.Group>

                    <Form.Group controlId='formBasicEmail'>
                        <Form.Label>Your Email</Form.Label>
                        <Form.Control type='text' name='Email'onChange={event => this.handleChange(event)} placeholder='example@email.com'/>
                    </Form.Group>

                    <Form.Group controlId='formBasicBirthday'>
                        <Form.Label>Your Birthday</Form.Label>
                        <Form.Control type='text' name='birthday'onChange={event => this.handleChange(event)} placeholder='Birthday'/>
                    </Form.Group>

                    <Button variant='outline-dark' type='button' onClick={event => this.handleSubmit(event)}>
                        Change
                    </Button>

                </Form>

             </div>
         );
     }
     
}

//ProfileView.propTypes = {
 //   Director: PropTypes.shape({
//        Name: PropTypes.string,
 //       Bio: PropTypes.string,
 //       Death: PropTypes.string
//    }).isRequired,
   // onClick: PropTypes.func.isRequired
//}; 
