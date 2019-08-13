import {combineReducers}  from  'redux'
import {createReducer,updateObject}  from  '@geekagency/redux-registry/Utils'

import {CONSTS}  from  './actions'
import makeJobReducer from  '../Job/reducer'
import makeQueueReducer from  '../Queue/reducer'

const {status : scheduler_status} = CONSTS

export default (actionType,customHandlers={})=>{


  const defaultHandlers = {
    active : state => scheduler_status.ACTIVE,
    inactive : state => scheduler_status.INACTIVE,
    pause : state => scheduler_status.PAUSED,
    set_concurrency: (state,{payload})=>payload,
    set_current_job: (state,{payload})=>payload,
    clear_current_job: (state)=>null,
  }

  const handlers = updateObject(defaultHandlers,customHandlers)



  const stateReducer = createReducer(0,{
    [actionType.SCHEDULER_ACTIVE]: handlers.active,
    [actionType.SCHEDULER_INACTIVE]: handlers.inactive,
    [actionType.SCHEDULER_PAUSE]: handlers.pause,
  })

  const concurrencyReducer = createReducer(5,{
    [actionType.SET_SCHEDULER_CONCURRENCY]: handlers.set_concurrency
  })

  const maxRetryReducer = createReducer(3,{
    [actionType.SET_MAX_QUEUE_RETRY]: handlers.set_concurrency
  })

  const currentJobReducer = createReducer(null,{
    [actionType.SET_CURRENT_JOB]: handlers.set_current_job,
    [actionType.CLEAR_CURRENT_JOB]: handlers.clear_current_job
  })


  const jobReducer = makeJobReducer(actionType.job);
  const queueReducer = makeQueueReducer(actionType.queue)

  const reducer = combineReducers(
    {
      status: stateReducer,
      concurrency: concurrencyReducer,
      currentJob: currentJobReducer,
      maxRetry: maxRetryReducer,
      queue:queueReducer,
      jobs: jobReducer
    }
  )

  return reducer
}
