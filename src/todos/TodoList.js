import React,{Component} from 'react';
import { connect } from 'react-redux';
import { fetchToDoLists } from '../mainStore'
import NewTodoForm from './NewTodoForm';
import TodoListItem from './TodoListItem';
import './TodoList.css';

class TodoList extends Component{

    componentDidMount(){
        this.props.fetchTodos()
      } 

    render(){
        console.log("**************** todolist activeToDOList ********",this.props.activeToDOList)

        return(
            <div className="list-wrapper">

                <NewTodoForm currentUser={this.props.currentUser} />
                {this.props.activeToDOList
                .filter(todoList  => todoList.user_id === this.props.currentUser.id )
                .filter(todoList  => todoList.status === false )
                .map(todo => <TodoListItem {...todo} />)}

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
  
export default connect(msp, mdp)(TodoList);