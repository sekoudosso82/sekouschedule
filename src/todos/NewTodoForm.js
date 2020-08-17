import React, { Component } from 'react';
import { connect } from 'react-redux';
import './NewTodoForm.css';

class NewTodoForm extends Component {
    state = {
        user_id : '',
        title: '',
        status: false,
        dateToDo: '',
    };
  
    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    };

    handleAddNewTask = (event) => {
        
            event.preventDefault()
        let data = {
            user_id :this.props.currentUser.id,
            title: this.state.title,
            status: this.state.status,
            dateToDo: this.state.dateToDo,
        } 
        console.log('** new task', data)
        // console.log("** new task current user ", this.props)
        fetch("https://sekoudossocalendar.herokuapp.com/api/v1/tasks", {
        // fetch("http://localhost:3000/api/v1/tasks", {
            method: "POST",
            headers: {"Content-Type": "application/json",
                      "Accept": "application/json"},    
            body: JSON.stringify(data)
        })
        .then(resp=>resp.json())
        .then(data => {
            if(data.errors){
                alert(data.errors)} 
            else {
                alert('Successfully added')}
                this.props.createNewTodo(data)
        }) 
        this.setState({
            user_id : '',
            title: '',
            status: false,
            dateToDo: '',
        });

    }

    render(){
        console.log("** new task current user ", this.props.currentUser.id)

        return (
            <div >
                <form className="new-todo-form" onSubmit={this.handleAddNewTask} >
                    <input
                        className="new-todo-input"
                        type="text"
                        name='title'
                        placeholder="new task here"
                        value={this.state.title}
                        onChange={this.handleChange} />
                    <input
                        className="new-todo-date-input"
                        type="date"
                        name='dateToDo'
                        placeholder="select date"
                        value={this.state.dateToDo}
                        onChange={this.handleChange}/>
                    <button className="new-todo-button" type='Submit' value="Submit" >
                        submit
                    </button>
                    
                </form>
            </div>
        );
    }
};



const mdp = dispatch => ({
    createNewTodo: (data) => dispatch({type: "CREATE_TODO", payload:(data)}),

});

export default connect(null, mdp)(NewTodoForm);

