import React, {Component} from 'react';
import './TodoListItem.css';

class CompleteTodoListItem extends Component {
    
    render(){
        return(
            <div className="complete-todo-item-container">
                <h3> THIS TASK HAS BEEN COMPLETED</h3>
                <h3>TITLE: {this.props.title}</h3>
                <h3>COMPLETE DATE: {this.props.dateToDo}</h3>
                
            </div>
        )
    }
};


export default CompleteTodoListItem;

