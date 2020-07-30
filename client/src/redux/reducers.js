// import {ADD_COMMENT,DELETE_COMMENT,RECIVE_COMMENTS} from './action-types'
import {ADD_LOADING_STATUS,SUB_LOADING_STATUS} from './action-types'
// export function comments(state = [],action) {
//     console.log('counter()', state, action)
//     switch(action.type) {
//         case ADD_COMMENT:
//             return [action.data,...state]
//         case DELETE_COMMENT:
//             return state.filter((elem,index)=> (index !== action.data))
//         case RECIVE_COMMENTS:
//             return action.data
//         default:
//             return state
//     }
// }
export function loading(state=0, action) {
    switch(action.type){
        case ADD_LOADING_STATUS:
            return state +1
        case SUB_LOADING_STATUS:
            return (state>0)?state-1:0
        default:
            return state
    }
}