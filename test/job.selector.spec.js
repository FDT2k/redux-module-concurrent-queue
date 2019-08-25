import  configureMockStore          from   'redux-mock-store'
import  thunk                       from   'redux-thunk'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)


import {reducer,ActionsCreators ,job_status,selectors} from '../src/Job'

import Module from '../src/Job'

const  {create_job,set_job_status} = ActionsCreators

test ('makeSelectors',()=>{
  expect(()=>{Module.makeSelectors(base=>base)}).not.toThrow();

  let selectors = Module.makeSelectors(state=>state);

  let job_id = 'hello'
  let state = reducer({},create_job({_id:job_id,map:{}}))

  state = reducer(state,set_job_status('hello',job_status.QUEUE))

  expect(selectors.currentOrNextJobID(state)).toBe('hello')


})

test ('reducer ',()=>{
  let state = reducer({},set_job_status('hello',job_status.QUEUE))

  console.log(state)

})

test ('select a job',()=>{

  let store = mockStore({})
  let job_id = 'hello'
  let expected ={"hello": {"_id": "hello", "delimiter": ";", "map": {}, "queue": 0, "status": 0}}


  let state = {}

  let getState = ()=>state;


  state = reducer({},create_job({_id:job_id,map:{}}))

  expect(selectors.selectJobs(state)).toEqual(expected)

})
