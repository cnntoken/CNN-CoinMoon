import createReducer from './createReducer';

const getReducers = (modal)=>{
    const reducerKeys = Object.keys(modal.reducers)
    const reducers = {}
    reducerKeys.forEach(item=>{
        reducers[`${modal.namespace}/${item}`] = (state,action)=>{
            return {
                ...state,
                ...action.payload,
            }
        }
    })
    return createReducer(modal.state,reducers)
}
export default getReducers;