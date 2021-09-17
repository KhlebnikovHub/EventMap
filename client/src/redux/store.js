
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import initialState from './state';
import rootReducer from './reducers/root.reducer';
import thunk from 'redux-thunk'

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(thunk))
)

export default store

