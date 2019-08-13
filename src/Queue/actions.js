import {combineActionTypes} from '@geekagency/redux-action-types'

export const CONSTS={
  status :{
    QUEUE_ITEM_STATUS_IDLE:0,
    QUEUE_ITEM_STATUS_PROCESSING:1,
    QUEUE_ITEM_STATUS_ERROR:2,
    QUEUE_ITEM_STATUS_DONE:4,
  }
}

export const makeActionCreators = (ActionTypes)=>{

  const add_job_queue = (payload,meta={})=>{
    if(!payload.job_id){
      throw new Error('need at least a job id')
    }
    return {type:ActionTypes.ADD_JOB_QUEUE,payload,meta}
  }

  const slice_from_queue = (job_id,count)=>{
    return {type:ActionTypes.SLICE_FROM_QUEUE,payload:{job_id,count}}
  }

  const queue_error = (job_id,seq,error='')=>{
    return {type:ActionTypes.QUEUE_ERROR,payload:{job_id,seq,error}}
  }
  const queue_item_set_status = (job_id,seq,status=0)=>{
    return {type:ActionTypes.QUEUE_ITEM_SET_STATUS,payload:{job_id,seq,status}}
  }

  const queue_handling_error = queue =>{
    return dispatch => {
      dispatch(queue_error(queue.job_id,queue.seq))
      dispatch(queue_item_set_status(queue.job_id,queue.seq, CONSTS.status.QUEUE_ITEM_STATUS_ERROR))

    }
  }

  return {add_job_queue,slice_from_queue,queue_error,queue_handling_error,queue_handling_error,queue_item_set_status}

}

export const makeActionTypes = combineActionTypes('ADD_JOB_QUEUE','SLICE_FROM_QUEUE','QUEUE_ERROR','QUEUE_ITEM_SET_STATUS')

export default makeActionCreators(makeActionTypes())
