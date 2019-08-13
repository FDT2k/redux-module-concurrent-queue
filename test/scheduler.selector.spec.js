import  configureMockStore          from   'redux-mock-store'
import  thunk                       from   'redux-thunk'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)


import {ActionCreators,selectors,reducer,scheduler_status} from '../src/Scheduler'

const  {set_scheduler_active,set_scheduler_inactive} = ActionCreators


test ('getStatus',()=>{

  let store = mockStore({})
  let job_id = 'hello'
  let expected ={"hello": {"_id": "hello", "delimiter": ";", "map": {}, "queue": 0, "status": 0}}


  let state = {}

  let getState = ()=>state;


  state = reducer({},{type:'init'})


  expect(selectors.selectors.schedulerStatus(state)).toEqual(scheduler_status.INACTIVE)

  state = reducer(state,set_scheduler_active())

  expect(selectors.selectors.schedulerStatus(state)).toEqual(scheduler_status.ACTIVE)


})
