import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import allSpoonsReducer from './allSpoonsReducer'
import singleSpoonReducer from './singleSpoonReducer'

const reducer = combineReducers({
  user: user,
  spoons: allSpoonsReducer,
  singleSpoon: singleSpoonReducer
})
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './user'
export * from './allSpoonsReducer'
