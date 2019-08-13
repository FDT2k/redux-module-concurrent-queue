import {combineReducers} from 'redux'

import {createReducer,updateObject} from '@geekagency/redux-registry/Utils'

import {CONSTS} from './actions'

const makeReducer =  (actionType,customHandlers={})=>{

  const default_job = {
    queue: 0,
    map:{},
    delimiter:';',
    status: CONSTS.status.EMPTY
  }

  const defaultHandlers = {

    create : (state,{payload})=>{
      let {_id} = payload
      return updateObject(state,{
          [_id]: updateObject(default_job,payload)
        }
      )
    },
    
    set_status : (state,{payload})=>{
      let {job_id,status} = payload;
      let job = state[job_id];
      job.status = status;
      return updateObject(state,{[job_id]:job});
    }

  }

  const handlers = updateObject(defaultHandlers,customHandlers)


  const reducer =  createReducer({},{
    [actionType.CREATE_JOB]: handlers.create,
    [actionType.SET_JOB_STATUS]: handlers.set_status
  })


  return reducer

}

export default makeReducer
