import {combineReducers} from 'redux'
import {createReducer,updateObject,updateItemInArray} from '@geekagency/redux-registry/LegacyUtils'
import makeReducerQueue from './queue_reducer'

const makeReducer =  (actionTypes,customHandlers={})=>{

  let reducer_queue = makeReducerQueue(actionTypes);


  const defaultHandlers = {
    add_job_in_queue: (state,action) => {
      let {job_id} = action.payload;
      let queue = reducer_queue(state[job_id],action)
      return updateObject(state,{[job_id]:queue})
    },

    handle_queue: (state,action)=>{
    //  console.log(state,action)
      let {payload} = action;
      var {job_id} = payload;
      let queue = reducer_queue(state[job_id],action);

      return updateObject(state,{[job_id]:queue})
    }
  }

  const handlers = updateObject(defaultHandlers,customHandlers)

  const reducer =  createReducer({},{
    [actionTypes.ADD_JOB_QUEUE]: handlers.add_job_in_queue,
    [actionTypes.SLICE_FROM_QUEUE]: handlers.handle_queue,
    [actionTypes.QUEUE_ERROR]: handlers.handle_queue,
    [actionTypes.QUEUE_ITEM_SET_STATUS]: handlers.handle_queue
  })

  return reducer
}

export default makeReducer
