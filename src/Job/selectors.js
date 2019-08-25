import { createSelector }  from 'reselect'


import {CONSTS as jCONSTS} from './actions'
let job_status =jCONSTS.status;

export default (baseSelector) =>{

  const selectJobs =  createSelector(baseSelector,state => state)

  const currentOrNextJobID = createSelector(
      selectJobs,
      items => {
        let iterate = Object.keys(items);
        return iterate.find(job_id=>{return items[job_id].status == job_status.ACTIVE || items[job_id].status == job_status.QUEUE})
      }
    )

  return {selectJobs,currentOrNextJobID}
}
