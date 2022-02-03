import { createStore, combineReducers, applyMiddleware  } from 'redux'
import thunk from 'redux-thunk'
import {datalistReducer, galleryReducer, todolistReducer} from './reducer'
export default createStore(combineReducers({
    datalist: datalistReducer,
    gallery: galleryReducer,
    todolist: todolistReducer
}), applyMiddleware(thunk));