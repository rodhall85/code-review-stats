import { combineReducers } from 'redux';
import statsReducer from './statsReducer';

export default combineReducers({
    stats: statsReducer,
});