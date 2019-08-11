import  configureMockStore          from   'redux-mock-store'
import  thunk                       from   'redux-thunk'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)




import {reducer,defaultActionCreators ,scheduler_status} from '../src/Scheduler'

const ActionsCreators = defaultActionCreators();

const  {set_scheduler_active,set_scheduler_inactive,set_current_job,dispatch_current_job,set_job_status} = ActionsCreators


test ('schedulerTest',()=>{

  let store = mockStore({})
  store.dispatch(set_scheduler_active());

  let state = reducer({},{type:'unknown'});
  expect(state.status).toBe(scheduler_status.INACTIVE)

  state = reducer({},set_scheduler_active())
  expect(state.status).toBe(scheduler_status.ACTIVE)

  state = reducer ({},set_current_job('asbdasb'))


})



test ('current_job',()=>{

  let expectedActions=[
        { type: 'SET_CURRENT_JOB', payload: 'hello' },
        { type: 'SET_JOB_STATUS', payload: { job_id: 'hello', status: 2 } }
      ]
;
  let store = mockStore({})

  store.dispatch(dispatch_current_job('hello'));
  expect(store.getActions()).toEqual(expectedActions)

  let state = reducer({},set_current_job('hello'))

})
