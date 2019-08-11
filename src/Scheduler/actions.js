import {combineActionTypes,actionExpand,actionGroup} from '@geekagency/redux-action-types'

import {
  createActionCreators as createJobActionCreators,
  job_status,
  ActionTypes as jobActionTypes
} from '../Job/actions'

import {
  createActionCreators as createQueueActionCreators,
  ActionTypes as queueActionTypes
} from '../Queue/actions'

export const scheduler_status ={
  INACTIVE: 0,
  ACTIVE: 1,
  PAUSED: 2
}

export const createActionCreators =  (ActionTypes)=>{

  const jobActionCreators = createJobActionCreators(ActionTypes.job);
  const {set_job_status,create_job} = jobActionCreators
  const queueActionCreators = createQueueActionCreators(ActionTypes.queue);

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

const schedulerActionExpand = actionExpand(Object.keys(scheduler_status))

/*pure actiontypes*/
export const ActionTypes  = combineActionTypes(
  schedulerActionExpand('SCHEDULER'),
  'SET_SCHEDULER_CONCURRENCY',
  'SET_MAX_QUEUE_RETRY',
  'SET_CURRENT_JOB',
  'CLEAR_CURRENT_JOB',
  actionGroup('job')(jobActionTypes),
  actionGroup('queue')(queueActionTypes)
)


export const getActionCreators = ()=>createActionCreators(ActionTypes())
