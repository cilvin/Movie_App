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
            profileData: null,
          
            
        };
    }
    
    componentDidMount() {
        let accessToken = localStorage.getItem('token');
        if (accessToken !== null) {
            this.setState({
                user: localStorage.getItem('user'),
                profileData: localStorage.getItem('user')

            });
            this.getMovies(accessToken);
           
        }
       
    }


    
    onLoggedIn(authData) {
        console.log(authData);
        this.setState({
          user: authData.user.Username,
          profileData: authData.user,
         
          
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
          localStorage.setItem('movies', JSON.stringify(this.state.movies));
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
        localStorage.removeItem('movies');

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
                
                <header className="header">
                    <p  className="logo">Welcome to my Movie Reel App</p>
                    <input className="menu-btn" type="checkbox" id="menu-btn" />
                    <label className="menu-icon" htmlFor="menu-btn"><span className="navicon"></span></label>
                    <ul className="menu">
                    <li><Link to={'/profile'}>
                            <Button id='profilebtn' variant='outline-dark'>
                                My profile
                            </Button>
                        </Link>
                     </li>
                     <li><Button id='logoutbtn' variant='outline-dark' onClick={() => this.logOut()}> LogOut</Button></li>
                    </ul>
                </header>
                    
                <div className='main-view'>
                
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
                            


                            <Route exact path='/profile' render={({match}) => <ProfileView onLoggedIn={this.state.onLoggedIn} movie={this.state.movies} thisUser={this.state.user} user={profileData} />}/>

                            

                            
                        </Row>
                    </Container>
                
                </div>
            </Router>
        );
    }
}
