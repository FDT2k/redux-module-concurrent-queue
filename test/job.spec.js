import  configureMockStore          from   'redux-mock-store'
import  thunk                       from   'redux-thunk'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)


import {reducer,ActionsCreators ,job_status} from '../src/Job'

const  {create_job,set_job_status} = ActionsCreators


test ('Create a job',()=>{

  let store = mockStore({})
  const expectedActions = [
    {
      type: 'CREATE_JOB',
      payload: { _id: 'hello', map: {} }
    }
  ]

  let job_id = 'hello'

  store.dispatch( create_job({_id:job_id,map:{}}))
  expect(store.getActions()).toEqual(expectedActions)
})

test ('Create a job with any properties',()=>{

  let store = mockStore({})
  const expectedActions = [
    {
      type: 'CREATE_JOB',
      payload: { _id: 'hello', map: {},hello:'world' }
    }
  ]

  let job_id = 'hello'

  store.dispatch( create_job({_id:job_id,map:{},hello:'world'}))
  expect(store.getActions()).toEqual(expectedActions)
})


test ('Changing job status',()=>{
  let store = mockStore({})
  let job_id = 'hello'
  let state = {}
  state = reducer(state, create_job({_id:job_id,map:{}}));
  expect(state[job_id]).toBeInstanceOf(Object)
  expect(state[job_id].status).toBe(job_status.EMPTY)
  state = reducer(state,set_job_status(job_id,job_status.DONE))
  expect(state[job_id].status).toBe(job_status.DONE)

})
