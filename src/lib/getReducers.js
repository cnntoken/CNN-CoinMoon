import createReducer from './createReducer';

const getReducers = (modal)=>{
    return createReducer(modal.state,{
        [`${modal.namespace}/save2Example`](state,action){
            return {
                ...state,
                ...action.payload,
            }
        }
    })
}
export default getReducers;