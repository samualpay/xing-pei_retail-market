import {ADD_LOADING_STATUS,SUB_LOADING_STATUS} from './action-types'
export const addLoadingStatus = () => ({type:ADD_LOADING_STATUS})
export const subLoadingStatus = () => ({type:SUB_LOADING_STATUS})
// export const addComment = (comment)=> ({type: ADD_COMMENT,data: comment})
// export const deleteComment = (index) => ({type: DELETE_COMMENT,data: index})
// export const reciveComments = (comments)=>({type: RECIVE_COMMENTS,data:comments})
// export const getComments = () => {
//     return dispatch => {
//         setTimeout(()=>{
//             const comments = [
//                 {
//                     username: "Tom",
//                     content: "ReactJS好难啊!",
//                   },
//                   {
//                     username: "JACK",
//                     content: "ReactJS还不错!",
//                   }
//             ]
//             dispatch(reciveComments(comments))
//         },1000)
//     }
// }