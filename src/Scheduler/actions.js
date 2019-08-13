import {combineActionTypes,actionExpand,actionGroup} from '@geekagency/redux-action-types'

import {
  makeActionCreators as makeJobActionCreators,
  CONSTS as jobCONSTS,
  makeActionTypes as makeJobActionTypes
} from '../Job/actions'

const {status : job_status} = jobCONSTS

import {
  makeActionCreators as makeQueueActionCreators,
  makeActionTypes as makeQueueActionTypes
} from '../Queue/actions'

export const CONSTS = {
    status:{
      INACTIVE: 0,
      ACTIVE: 1,
      PAUSED: 2
    }
  }

export const makeActionCreators =  (ActionTypes)=>{

  const jobActionCreators = makeJobActionCreators(ActionTypes.job);
  const {set_job_status,create_job} = jobActionCreators
  const queueActionCreators = makeQueueActionCreators(ActionTypes.queue);

  const set_current_job =(job_id)=>{
    return {type:ActionTypes.SET_CURRENT_JOB,payload:job_id}
  }

  const dispatch_current_job =(job_id)=>{
    return (dispatch)=>{
      dispatch(set_current_job(job_id));
      dispatch(set_job_status(job_id,job_status.ACTIVE))
    }
  }

  const set_scheduler_active = ()=>{
    return {type:ActionTypes.SCHEDULER_ACTIVE}
  }
  const set_scheduler_inactive = ()=>{
    return {type:ActionTypes.SCHEDULER_INACTIVE}
  }
  const set_concurrency =(c)=>{
    return {type:ActionTypes.SET_SCHEDULER_CONCURRENCY,payload:c}
  }

  return {set_current_job,dispatch_current_job,set_scheduler_active,set_scheduler_inactive,set_concurrency,jobActionCreators,queueActionCreators}

}


const schedulerStatusActionExpand = actionExpand(Object.keys(CONSTS.status))

export const makeActionTypes  = combineActionTypes(
  schedulerStatusActionExpand('SCHEDULER'),
  'SET_SCHEDULER_CONCURRENCY',
  'SET_MAX_QUEUE_RETRY',
  'SET_CURRENT_JOB',
  'CLEAR_CURRENT_JOB',
  actionGroup('job')(makeJobActionTypes),
  actionGroup('queue')(makeQueueActionTypes)
)

export default makeActionCreators(makeActionTypes())
