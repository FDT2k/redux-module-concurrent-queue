import { createSelector } from 'reselect'


const createSelectors=(baseSelector) =>{

  const selectQueue= createSelector(
    baseSelector,
    state=>state
  )

  const makeSelectQueue = (job_id,status_filter)=>{
    return createSelector(
      selectQueue,
      state => {console.log(job_id);return state[job_id].filter(item=> item.status == status_filter)}
    )
  }

  return {selectors:{selectQueue},creators:{makeSelectQueue}}

}

export default createSelectors
