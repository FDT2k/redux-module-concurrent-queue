import {createReducer,updateObject,updateItemInArray} from '@geekagency/redux-registry/Utils'

import {queue_item_status} from './actions'

const makeReducer = (actionTypes,customHandlers={})=>{


  const defaultHandlers = {
    add_job_in_queue: (state,{payload}) => {
      if(typeof payload.seq === 'undefined'){
        throw new Error('payload should have a seq key')
      }
      return {
        job_id: payload.job_id,
        data: payload.data,
        error_count: 0,
        seq: payload.seq,
        status: queue_item_status.QUEUE_ITEM_STATUS_IDLE
      }
    },
    queue_error: (state,{payload})=>{
      return updateObject(state,{error_count:state.error_count+1})
    },
    queue_item_status: (state,{payload})=>{
      debugger;
      return updateObject(state,{status:payload.status})
    }
  }

  const handlers = updateObject(defaultHandlers,customHandlers)

  const reducer = createReducer({},{
    [actionTypes.ADD_JOB_QUEUE]: handlers.add_job_in_queue,
    [actionTypes.QUEUE_ERROR]: handlers.queue_error,
    [actionTypes.QUEUE_ITEM_SET_STATUS]: handlers.queue_item_status

  })

  return reducer;
}

export default makeReducer
