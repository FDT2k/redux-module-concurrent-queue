import {combineReducers} from 'redux'

import {createReducer,updateObject} from '@geekagency/redux-registry/LegacyUtils'

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
      return updateObject(default_job,payload)

    },

    set_status : (state,{payload})=>{
      let {status} = payload;
      return updateObject(state,{status});
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
