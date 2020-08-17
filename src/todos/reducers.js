// import { CREATE_TODO, REMOVE_TODO, COMPLETE_TODO } from './actions';
// const initialState = {
//     dateToDo: new Date(),
//     title: '',
//     activeToDOList: [],
// }
// export const fetchToDoLists = () => dispatch => {
//     fetch('https://sekoudossocalendar.herokuapp.com/tasks')
//     .then(resp => resp.json())
//     .then(activeToDOList => {
//         dispatch({type: 'FETCH_TO_DO_LIST', payload: { activeToDOList }})
//     })
// } 
// export const todos = (prevState = initialState, action) => {

//     switch (action.type) {
//     case 'FETCH_TO_DO_LIST':
//         return {...prevState, activeToDOList: action.payload.activeToDOList}
    
//     case 'CREATE_TODO': 
//         return {...prevState, activeToDOList: [...prevState.activeToDOList, action.payload]};
    
//     case COMPLETE_TODO: {
//         return {...prevState, 
//             activeToDOList: prevState.activeToDOList.map(todoList=>{
//                 if (todoList.id===action.payload.id){
//                     return action.payload
//                 }else { return todoList }
//             })};
//     }
//     case REMOVE_TODO: {
//         return {...prevState, activeToDOList: [...prevState.activeToDOList.filter(todoList => todoList.id !== action.payload.id)]};
//     }
//     default:
//         return prevState;
//     }
// }