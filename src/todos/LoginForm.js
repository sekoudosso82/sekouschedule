import React from 'react'
import { Link } from 'react-router-dom'

class LoginForm extends React.Component {

  state = {
    username: "",
    password: ""
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()

    fetch("https://sekoudossocalendar.herokuapp.com/api/v1/login", {
    // fetch("http://localhost:3000/api/v1/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(this.state)
    })
    .then(res => res.json())
    .then(response => {

      if (response.errors){
        alert(response.errors)
      } else {
        this.props.setUser(response)
      }
    })
    // this.setState({
    //     username: "",
    //     password: ""
    //   })

  }

  render(){
    return (
      
      
      <form className="formLogin" onSubmit={this.handleSubmit}>
              <div class="form-row loginMainDiv">
                  <div className="">
                    <h1 className='salut'> Hi {this.state.username}</h1>
                    <input className="form-control loginInput formInput" placeholder="username" name="username" 
                      value={this.state.username} 
                      onChange={this.handleChange} placeholder="username"/>
                    <br></br>
                    <br></br>
                    <br></br>
                    <input className="form-control loginInput formInput" placeholder="password" name="password" 
                      value={this.state.password} type="password"  
                      onChange={this.handleChange} placeholder="password"/>
                  </div>
              <br></br>

              </div>  
              <div className="loginSubmit">
                  <button className="loginButton" type="submit">Log In</button>
              </div>
              <Link to="/signup"><button className="signup">New User SIGN UP Please</button></Link>
          </form>
    
    )
  }
  
}

export default LoginForm
