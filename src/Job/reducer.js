import {combineReducers} from 'redux'

import {createReducer,updateObject} from '@geekagency/redux-registry/Utils'

import {CONSTS} from './actions'

import makeJobReducer from './reducer_job'

const makeReducer =  (actionType,customHandlers={})=>{

  const reducerJob = makeJobReducer(actionType);

  const defaultHandlers = {

    create : (state,action)=>{
      let {_id} = action.payload
      return updateObject(state,{
          [_id]: reducerJob(undefined,action)
        }
      )
    },

    set_status : (state,action)=>{
      let {job_id} = action.payload;
      return updateObject(state,{
        [job_id]: reducerJob(state[job_id],action)
      });
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
