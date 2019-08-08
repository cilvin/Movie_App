import React from 'react';
import axios from 'axios';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Navbar from 'react-bootstrap/Navbar';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './main-view.scss';

export class MainView extends React.Component {
    constructor() {
        //Call the superclass constructor
        // so React can initialize it 
        super();

        // Iitialize the state to an empty object so we can destructure it later
        this.state = {
            movie: null,
            selectedMovie: null,
            user: null,
            newUser: false
        };
    }
    //One of the "hooks" available in a react component 
    componentDidMount() {
        let accessToken = localStorage.getItem('token');
        if (accessToken !== null) {
            this.setState({
                user: localStorage.getItem('user')
            });
            this.getMovies(accessToken);
        }
       
    }

   
    //Takes users to movie-view
    onMovieClick(movie) {
        window.location.hash = '#' + movie._id;
        this.setState({
            selectedMovie: movie._id
        });
    }

    //Takes users back to main-view
    onBackClick(movie) {
        this.setState({
            selectedMovie: null
        });
    }
    
    onLoggedIn(authData) {
        console.log(authData);
        this.setState({
          user: authData.user.Username
        });
      
        localStorage.setItem('token', authData.token);
        localStorage.setItem('user', authData.user.Username);
        this.getMovies(authData.token);
      }

      getMovies(token) {
        axios.get('https://floating-ocean-36499.herokuapp.com/movies', {
          headers: { Authorization: `Bearer ${token}`}
        })
        .then(response => {
          // Assign the result to the state
          this.setState({
            movies: response.data
          });
        })
        .catch(function (error) {
          console.log(error);
        });
      }

    newUser() {
        this.setState({
            newUser: true
        });
    }

    onSignedIn(user) {
        this.setState({
            user: user,
            register:false
        });
    }

    alreadyRegistered() {
        this.setState({
            newUser:false
        })
    }



    //This overrides the render() method of the superclass
    //No need to call super() though, as it does nothing by default
    render() {
        // If the state isn't initialized, this will throw on runtime
        // before the data is initially loaded 
        const {movies, selectedMovie, user, newUser} = this.state;

        if (!user && newUser ===false) return <LoginView onClick={() => this.newUser()} onLoggedIn={user => this.onLoggedIn(user)} />
        
        if (newUser) return <RegistrationView onClick={() => this.alreadyRegistered()} onSignedIn={user => this.onSignedIn(user)} />
       
        //Before the movies have been loaded
        if(!movies) return <div className='mv'/>;

        return (
            <Router>
                <div className='mv'>
               
                    <Navbar   className='title' fluid='true' ><Navbar.Brand >Welcome to my Movie Reel App</Navbar.Brand></Navbar>
                
                    <Container className='main-view'>
                        <Row>
                            <Col><Route exact path='/' render={() => movies.map(m => <MovieCard key={m._id} moive={m}/>)}/></Col>
                            <Col xl={4} sm={6} md={4} xs={10}><Route path='/movies/:movieId' render={({match}) => <MovieView movie={movies.find(m => m._id === match.params.movieId)}/>}/></Col>
                        </Row>
                    </Container>
                    <Navbar fixed='bottom'  className='foot' fluid='true' ><Navbar.Brand ></Navbar.Brand></Navbar>
                
                </div>
            </Router>
        );
    }
}
