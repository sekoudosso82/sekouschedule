import React from 'react'
import '../App.css';

class SignupForm extends React.Component {

  state = {
    username: "",
    password: "",
    passwordConfirmation: "",
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()

    if (this.state.password === this.state.passwordConfirmation){
      fetch("https://sekoudossocalendar.herokuapp.com/api/v1/users", {
    // fetch("http://localhost:3000/api/v1/users", {

        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({username: this.state.username, 
                              password: this.state.password,
                             })
      })
      .then(res => res.json())
      .then(response => {
        
        if(response.errors){ alert(response.errors)} 
        else {
          console.log('new signup data id', response.user.id) 
          this.props.setUser(response)
        }   
      })   
    } 
    else {
        alert("Passwords don't match! check for case_sensitive Password should be atlease 3 characters")
    }
      
    this.setState({
        username: "",
        password: "",
        passwordConfirmation: "",
        
    })
      
    }
    
    render(){
      return (
        
        <form className="formLogin" onSubmit={this.handleSubmit}>
          <div class="form-row loginMainDiv">
            <div>       
              <h1 className='salut'> Hi {this.state.username}</h1>
              <input className="form-control sellItemDivInput" placeholder="username" name="username" 
                    value={this.state.username} 
                    onChange={this.handleChange}/>
              
              <input className="form-control sellItemDivInput" placeholder="password" name="password" 
                    value={this.state.password} type="password"  
                    onChange={this.handleChange}/>
             
              <input className="form-control sellItemDivInput" placeholder="passwordConfirmation" name="passwordConfirmation" 
                    value={this.state.passwordConfirmation} type="password"  
                    onChange={this.handleChange}/>

              <input className="form-control sellItemDivInput" placeholder="email" name="email" 
                    value={this.state.email} type="email"  
                    onChange={this.handleChange}/>
            
              <input className="form-control sellItemDivInput" placeholder="phone" name="phone" 
                    value={this.state.phone} type="phone"  
                    onChange={this.handleChange}/>
              
              <button className="form-control sellItemDivInput" type="submit">Sign Up</button>
            </div>
          </div> 
        </form>
    )
  }
  
  
}

export default SignupForm  

