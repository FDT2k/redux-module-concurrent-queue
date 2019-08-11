import  configureMockStore          from   'redux-mock-store'
import  thunk                       from   'redux-thunk'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)


import {reducer,ActionsCreators ,job_status,selectors} from '../src/Job'

const  {create_job,set_job_status} = ActionsCreators


test ('select a job',()=>{

  let store = mockStore({})
  let job_id = 'hello'
  let expected ={"hello": {"_id": "hello", "delimiter": ";", "map": {}, "queue": 0, "status": 0}}


  let state = {}

  let getState = ()=>state;


  state = reducer({},create_job({_id:job_id,map:{}}))

  expect(selectors.selectJobs(state)).toEqual(expected)

})
