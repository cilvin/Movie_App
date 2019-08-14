import React from 'react';
import axios from 'axios';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { DirectorView } from '../director-view/director-view';
import { ProfileView } from '../profile-view/profile-view';
import { GenreView } from '../genre-view/genre-view';
import { RegistrationView } from '../registration-view/registration-view';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './main-view.scss';

export class MainView extends React.Component {
    constructor() {
        //Call the superclass constructor
        // so React can initialize it 
        super();

        // Iitialize the state to an empty object so we can destructure it later
        this.state = {
            movies: [],
            user: null,
            profileData: null
            
        };
    }
    
    componentDidMount() {
        let authData = localStorage.getItem('token');
        let accessToken = localStorage.getItem('token');
        if (accessToken !== null) {
            this.setState({
                user: localStorage.getItem('user'),
                profileData: localStorage.getItem('user')

            });
            this.getMovies(accessToken);
            this.getMovies(authData.token);
        }
       
    }


    
    onLoggedIn(authData) {
        console.log(authData);
        this.setState({
          user: authData.user.Username,
          profileData: authData.user
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

  

    onSignedIn(user) {
        this.setState({
            user: user,
            
        });
    }

    logOut() {
        //Clears Storage
        localStorage.removeItem('token');
        localStorage.removeItem('user');

        //resets user state to render again
        this.setState({
            user: null
        })
    }

    



    //This overrides the render() method of the superclass
    //No need to call super() though, as it does nothing by default
    render() {
        // If the state isn't initialized, this will throw on runtime
        // before the data is initially loaded 
        const {movies,  user, profileData} = this.state;
       
        //Before the movies have been loaded
        //if(!movies) return <div className='main-view'/>;

        return (
            <Router>
                <div className='main-view'>
              
                    
                
               
                    <div   className='navbar'>Welcome to my Movie Reel App
                        <Link to={'/profile'}>
                            <Button variant='outline-dark'>
                                My profile
                            </Button>
                        </Link> 
                        <Button variant='outline-dark' onClick={() => this.logOut()}> LogOut</Button>
                    
                    </div>
                
                    <Container className='main-view'>
                        <Row>
                            <Route exact path='/' render={ () => {
                                if(!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)}/>;
                                return movies.map(movie => (
                                    <Col key={movie._id} xl={4} sm={6} md={4} xs={10}>
                                        <MovieCard key={movie._id} movie={movie} />
                                    </Col> 
                                ))}
                            }/>
                            <Route path='/movies/:movieId' render={ ({match}) => <MovieView movie={movies.find(movie => movie._id === match.params.movieId)}/>}/>
                            
                            <Route path='/register' render={() => <RegistrationView onSignedIn={user => this.onSignedIn(user)} />}/>

                            <Route exact path='/genre/:name' render={({match}) => {
                                if (!movies || !movies.length) return <div className='main-view'/>;
                                return <GenreView genre={movies.find(m => m.Genre.Name === match.params.name)}/>}
                            }/>

                            <Route exact path='/director/:name' render={({match}) => {
                                if (!movies || !movies.length) return <div className='main-view'/>;
                                return <DirectorView director={movies.find(m => m.Director.Name === match.params.name)}/>}
                            }/>
                            


                            <Route exact path='/profile' render={() => <ProfileView thisUser={user} user={profileData} />}/>

                            <Route exact path='/profile/:movieId' user={user}  render={ ({match}) => <ProfileView movie={movies.find(movie => movie._id === match.params.movieId)}/>}/>

                            
                        </Row>
                    </Container>
                
                </div>
            </Router>
        );
    }
}
