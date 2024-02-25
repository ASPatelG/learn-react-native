import { legacy_createStore as createStore, applyMiddleware} from 'redux'
import { thunk } from 'redux-thunk'

import {reducers} from './reducers';

export const dataStore = createStore(reducers, applyMiddleware(thunk));