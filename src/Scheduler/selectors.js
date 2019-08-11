import { createSelector } from 'reselect'
import { scheduler_status } from  './actions'
import { createSelectors as createJobSelectors } from '../Job/selectors'
import { createSelectors as createQueueSelectors } from '../Queue/selectors'

import { queue_item_status } from '../Queue/actions'

export default (baseSelector) =>{

  const queueSelectors = createQueueSelectors(createSelector(baseSelector,state=>state.queue))
  let {selectQueue} = queueSelectors.selectors
//  const baseJobSelector = state=>{console.log('basejob',state); return state.jobs}
  const jobSelectors = {selectJobs}=  createJobSelectors(createSelector(baseSelector,state => state.jobs))

  const selectCurrentJob = createSelector(
    baseSelector,
    state => state.currentJob
  )

  const schedulerActive = createSelector(
    baseSelector,
    state => state.status ==scheduler_status.ACTIVE
  )

  const schedulerConcurrency = createSelector(
    baseSelector,
    state => state.concurrency
  )
  const maxRetry = createSelector(
    baseSelector,
    state => state.maxRetry
  )
  const selectActiveJob = createSelector(
    [selectCurrentJob,selectJobs],
    (job_id, jobs)=>{
      return jobs[job_id]
    }
  )

  const selectCurrentJobQueue = createSelector(
    [selectQueue,selectCurrentJob],
    (queue,currentJobId)=>{
      if(selectCurrentJob!= null){
        return queue[currentJobId]
      }else{
        return [];
      }
    }
  )

  const selectNextAvailableQueueItems = createSelector(
    [selectCurrentJobQueue,maxRetry],
    (state,max_retry) => {
      return state.filter(item=> {
        //console.log(item.status == queue_item_status.QUEUE_ITEM_STATUS_IDLE, item.status == queue_item_status.QUEUE_ITEM_STATUS_ERROR ,item.error_count < max_retry,(item.status == queue_item_status.QUEUE_ITEM_STATUS_ERROR && (item.error_count < max_retry)))
        return (item.status == queue_item_status.QUEUE_ITEM_STATUS_IDLE ||  (item.status == queue_item_status.QUEUE_ITEM_STATUS_ERROR && (item.error_count < max_retry)) )
      })
    }
  )

  const nextItems = createSelector(
    [schedulerConcurrency,selectNextAvailableQueueItems],
    (concurrency, queue)=>{
      return queue.slice(0,concurrency);
    }
  )

  return {selectors:{
            selectCurrentJobQueue,
            selectCurrentJob,
            schedulerActive,
            selectActiveJob,
            schedulerConcurrency,
            selectCurrentJob,
            nextItems,
            ...jobSelectors,
            ...queueSelectors.selectors
          },
          creators:{
            ...queueSelectors.creators
          }
          }
}
