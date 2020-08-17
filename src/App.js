import React, {Component} from 'react';
import { BrowserRouter as Router, Switch, Route, } from 'react-router-dom'
import TodoList from './todos/TodoList'
import TodoListComplete from './todos/TodoListComplete'
import { connect } from 'react-redux';
import { fetchToDoLists } from './mainStore'
import NavBar from './NavBar'
import LoginForm from './todos/LoginForm'
import SignupForm from './todos/SignupForm'

import './App.css';

class App extends Component {
    state = { 
        currentUser:null ,  
    }

    componentDidMount(){
        const token = localStorage.token

        if(token){
            // fetch("http://localhost:3000/api/v1/auto_login", {
        // fetch("https://corona-backend1.herokuapp.com/api/v1/auto_login", {
        fetch("https://sekoudossocalendar.herokuapp.com/api/v1/auto_login", {

            headers: { "Authorization": token }
            })
            .then(res => res.json())
            .then(response => {
                if (response.errors){
                    alert(response.errors)
                } else {
                    this.setState({
                    currentUser: response}) 
                } 
            })
        }
        this.props.fetchAllTodo() 
    }
    setUser = (response) => {
        // console.log('response in app component', response.user.username)
        this.setState({
          currentUser: response.user
        }, () => {
          localStorage.token = response.token
          this.props.history.push("/tasks")
        })
    } 
    logout = () => {
        this.setState({ 
          currentUser: null
        }, () => { localStorage.removeItem('token')
                   this.props.history.push('/login')
      })
    }
    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value })
      }
    render(){
        // console.log('**************** app currentUser********',this.state.currentUser)
        // console.log('****************app activeToDOList********',this.props.todolist)
        return(
            <>
                <NavBar fixed="top" currentUser={this.state.currentUser}  logout={this.logout} handleChange={this.handleChange} />

                {this.state.currentUser ? 
                    <div>
                        <Switch>
                            <Route path="/todolist" render={() => <TodoList currentUser={this.state.currentUser}/>}/>
                            <Route path="/complete" render={() => <TodoListComplete currentUser={this.state.currentUser}/>}/>
                            <Route path="/" render={() => <TodoList currentUser={this.state.currentUser}/>}/>  
                        </Switch>
                    </div>
                    : 
                    <div>
                        <h1 className="warning"> Please Login or SignUp  </h1>
                        <Switch>
                            <Route path="/signup" render={() => <SignupForm  setUser={this.setUser}/>}/>
                            <Route path="/login" render={routerProps => <LoginForm {...routerProps} setUser={this.setUser}/>}/>
                        </Switch>
                    </div>
                }
            </>

        )
    }
};

function msp(state){
    return {
      connectTodolist: state.activeToDOList,
    //   currentUser: state.currentUser
      
    }
  }

const mdp = dispatch => {
    return {
        fetchAllTodo: () => dispatch(fetchToDoLists()), 
        loginUser: (data) =>  dispatch({type: "LOGIN_USER", payload:(data)}),
        logoutUser: (data) =>  dispatch({type: "LOGOUT_USER", payload:(data)}),

    }
  }

export default connect(msp, mdp)(App);