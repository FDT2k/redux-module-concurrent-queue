import { createSelector }  from 'reselect'


import {job_status} from './actions'

export default (baseSelector) =>{

  const selectJobs =  createSelector(baseSelector,state => state)

  const currentOrNextJobID = createSelector(
      selectJobs,
      items => {
        iterate = Object.keys(items);
        return iterate.find(job_id=>{return items[job_id].status == job_status.ACTIVE || items[job_id].status == job_status.QUEUE})
      }
    )

  return {selectJobs,currentOrNextJobID}
}
