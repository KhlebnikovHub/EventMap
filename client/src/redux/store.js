import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { reducer } from './reducers/root.reducer';
import { initialState } from './state'
import { composeWithDevTools } from 'redux-devtools-extension'
import { rootReducer } from './reducers/root.reducer';


// Store
const store = createStore(rootReducer, initialState, composeWithDevTools(applyMiddleware(thunk)))

export default store;
