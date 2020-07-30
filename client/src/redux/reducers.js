import {ADD_COMMENT,DELETE_COMMENT,RECIVE_COMMENTS} from './action-types'
export function comments(state = [],action) {
    console.log('counter()', state, action)
    switch(action.type) {
        case ADD_COMMENT:
            return [action.data,...state]
        case DELETE_COMMENT:
            return state.filter((elem,index)=> (index !== action.data))
        case RECIVE_COMMENTS:
            return action.data
        default:
            return state
    }
}