import {combineActionTypes} from '@geekagency/redux-action-types'


export const CONSTS= {
  status :{
    EMPTY:0,
    QUEUE:1,
    ACTIVE:2,
    DONE:4,
    ERROR:8
  }
}

export const makeActionCreators = (ActionTypes)=>{

  const set_job_status = (job_id,status) =>{
    return {type: ActionTypes.SET_JOB_STATUS,payload:{job_id,status}}
  }

  const create_job = (payload)=>{
    return {type: ActionTypes.CREATE_JOB,payload}
  }

  return {set_job_status,create_job}
}

export const makeActionTypes = combineActionTypes(
  'CREATE_JOB',
  'SET_JOB_STATUS'
)

export default makeActionCreators(makeActionTypes())
