import { createSelector }     from  'reselect'
import { CONSTS as _sCONSTs }   from  './actions'
import  createJobSelectors    from  '../Job/selectors'
import  createQueueSelectors  from  '../Queue/selectors'
import { CONSTS as _qCONSTs }  from  '../Queue/actions'

const scheduler_status = _sCONSTs.status
const queue_item_status = _qCONSTs.status
export default (baseSelector) =>{

  const queueSelectors = createQueueSelectors(createSelector(baseSelector,state=>state.queue))
  const jobSelectors =  createJobSelectors(createSelector(baseSelector,state=>state.jobs))

  const selectCurrentJob = createSelector(
    baseSelector,
    state => state.currentJob
  )
  const schedulerStatus = createSelector(
    baseSelector,
    state => state.status
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

  let {selectJobs} = jobSelectors

  const selectActiveJob = createSelector(
    [selectCurrentJob,selectJobs],
    (job_id, jobs)=>{
      return jobs[job_id]
    }
  )

  let {selectQueue} = queueSelectors.selectors


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
            schedulerStatus,
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
