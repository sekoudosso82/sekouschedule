import React, {Component} from 'react';
import './TodoListItem.css';
import { connect } from 'react-redux';

class TodoListItem extends Component {
    handleDelete = () => {
        // console.log('************this.props.id **********', this.props.id)
        let id  = this.props.id;              
        fetch(`https://sekoudossocalendar.herokuapp.com/api/v1/tasks/${id}`, {
        // fetch(`http://localhost:3000/api/v1/tasks/${id}`, {

            method: "DELETE"
        })
        .then(resp => resp.json())
        .then(data => { 
            console.log('delete data id', data.id)
            this.props.deleteTodo(data)})
    }

    markAsCompleted = (event) => {
        event.preventDefault()
        let id  = this.props.id;              
        fetch(`https://sekoudossocalendar.herokuapp.com/api/v1/tasks/${id}`, {
        // fetch(`http://localhost:3000/api/v1/tasks/${id}`, {

            method: 'PATCH',
            headers: {"Content-Type": "application/json",
                      "Accept": "application/json"},    
            body: JSON.stringify({status: true}
            )
        })
        .then(resp=>resp.json())
        .then(data =>  {this.props.completedTask(data)})
        this.setState({ targetItem: {} }) 
    } 
    
    handleChange = (event) => {
        this.setState({
              [event.target.name]: event.target.value
        })
      }
    render(){
        // console.log('************this.props.title**********', this.props.title)
        // console.log('************this.props.date**********', this.props.dateToDo)
        // console.log('************this.props.id **********', this.props.id)
        return(
            <div className="todo-item-container">
                <h3>{this.props.title}</h3>
                <h3>{this.props.dateToDo}</h3>
                <div className="buttons-container">
                    <button className="completed-button" onClick= {this.markAsCompleted} >
                        Mark As Completed</button>
                    <button className="remove-button" onClick={this.handleDelete}>
                        Remove</button>
                </div>
            </div>
        )
    }
};
const mdp = dispatch => ({
    deleteTodo: (data) => dispatch({type: "REMOVE_TODO", payload:(data)}),
    completedTask: (data) => dispatch({type: "COMPLETE_TODO", payload:(data)}),
});

export default connect(null, mdp)(TodoListItem);
