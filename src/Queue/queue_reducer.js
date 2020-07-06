import {createReducer,updateObject,updateItemInArray} from  '@geekagency/redux-registry/LegacyUtils'

import makeReducerQueueItem from './queue_item_reducer'

const makeReducer = (actionTypes,customHandlers={})=>{

  const reducerQueueItem = makeReducerQueueItem(actionTypes);

  const defaultHandlers = {
    add_job_in_queue: (state,action) => {
      let {payload} = action;
      let {job_id} = payload

      return [...state,reducerQueueItem(undefined,action)]
    },

    slice_from_queue: (state,{payload})=>{
      let {count} = payload;
      let update = state.slice(0,count)
      let rest = state.slice(count,state.length);
    //  console.log(count,state.length,update.length,rest.length)

    /*  console.log('updated', update.map(queue_item=>{
        return {...queue_item, status:1}
      }).length);*/
      return [...rest, ...update.map(queue_item=>{
        debugger;
        return {...queue_item, status:1}
      })]
      //return state.slice(count)
    },



    update_item: (state,action)=>{
      const {payload} = action;
      const{seq} = payload;
      return updateItemInArray(
        state,
        (item)=> item.seq==seq,
        (item)=> reducerQueueItem(item,action)
      )
    }

  }

  const handlers = updateObject(defaultHandlers,customHandlers)

  const reducer = createReducer([],{
    [actionTypes.ADD_JOB_QUEUE]: handlers.add_job_in_queue,
    [actionTypes.SLICE_FROM_QUEUE]: handlers.slice_from_queue,
    [actionTypes.QUEUE_ERROR]: handlers.update_item,
    [actionTypes.QUEUE_ITEM_SET_STATUS]: handlers.update_item

  })
  return reducer
}

export default makeReducer
