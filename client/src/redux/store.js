import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import getInitState, { initialState } from './state';
import { rootReducer } from './reducers/root.reducer';
import thunk from 'redux-thunk'

const store = createStore(
  rootReducer,
  getInitState(),
  composeWithDevTools(applyMiddleware(thunk))
)
store.subscribe(() => {
  window.localStorage.setItem('redux', JSON.stringify(store))
})
export default store
