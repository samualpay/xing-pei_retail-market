import {createStore, applyMiddleware} from 'redux'
import {loading} from './reducers'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
export default createStore(
    loading,
    composeWithDevTools(applyMiddleware(thunk))
)