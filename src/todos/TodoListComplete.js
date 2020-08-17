import React,{Component} from 'react';
import { connect } from 'react-redux';
import { fetchToDoLists } from '../mainStore'
import  CompleteTodoListItem from './CompleteTodoListItem';
import './TodoList.css';

class TodoListComplete extends Component{
    
    componentDidMount(){
        this.props.fetchTodos()
      } 
    render(){
        console.log('**************** todolist complete currentUser********',this.props.currentUser)

        return(
            <div className="list-wrapper">
                
                {this.props.activeToDOList
                .filter(todoList  => todoList.user_id === this.props.currentUser.id )
                .filter(todoList  => todoList.status === true )
                .map(todo => <CompleteTodoListItem {...todo} />)}
            </div>
        )
    }
};

const msp = state => ({
    activeToDOList: state.activeToDOList,
});

const mdp = dispatch => {
    return {
        fetchTodos: () => dispatch(fetchToDoLists()),
    }
}
  
export default connect(msp, mdp)(TodoListComplete);