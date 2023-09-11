import {createStore} from 'redux';
import {reducers} from './reducers';

export const dataStore = createStore(reducers);