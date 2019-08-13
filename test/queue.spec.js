import  configureMockStore          from   'redux-mock-store'
import  thunk                       from   'redux-thunk'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

import {reducer,  ActionCreators, queue_item_status} from '../src/Queue'

const  {add_job_queue,slice_from_queue,queue_error,queue_item_set_status,queue_handling_error} = ActionCreators



test ('[ACTIONS] Add a queue should throw error if no job_id',()=>{

  let store = mockStore({})
  const expectedActions = [
    {
      type: 'CREATE_JOB',
      payload: { _id: 'hello', map: {} }
    }
  ]

  let job_id = 'hello'

  const t = ()=>{
     add_job_queue({})
  }

  expect(t).toThrow(Error)
})

test ('[REDUCER] Queue Reducer Test Add items',()=>{

  let store = mockStore({})
  let job_id = 'hello'
  let state = reducer({},add_job_queue({data:"abcdef",job_id,seq:0}));
  expect(state[job_id]).toBeInstanceOf(Array);

  state = reducer(state,add_job_queue({data:"abcdef",job_id,seq:1}));
  expect(state[job_id]).toHaveLength(2)

})

test ('[REDUCER] Queue Reducer Test update partial (slice_from_queue)',()=>{

  let store = mockStore({})
  let job_id = 'hello'
  let expected = [ { job_id: 'hello',
        data: 'abcdef',
        error_count: 0,
        seq: 0,
        status: 0 },
      { job_id: 'hello',
        data: 'abcdef',
        error_count: 0,
        seq: 1,
        status: 0 } ];

  let state = reducer({},add_job_queue({data:"abcdef",job_id,seq:0}));
  expect(state[job_id]).toBeInstanceOf(Array);
  expect(state[job_id]).toHaveLength(1)

  state = reducer(state,add_job_queue({data:"abcdef",job_id,seq:1}));
  expect(state[job_id]).toEqual(expected)
  expect(state[job_id]).toHaveLength(2)


  expected = [
      { job_id: 'hello',
        data: 'abcdef',
        error_count: 0,
        seq: 1,
        status: 0 },
        { job_id: 'hello',
              data: 'abcdef',
              error_count: 0,
              seq: 0,
              status: queue_item_status.QUEUE_ITEM_STATUS_PROCESSING } ];

  state = reducer(state,slice_from_queue(job_id,1))
  expect(state[job_id]).toHaveLength(2)
  expect(state[job_id]).toEqual(expected)

  expected = [

        { job_id: 'hello',
              data: 'abcdef',
              error_count: 0,
              seq: 0,
              status: queue_item_status.QUEUE_ITEM_STATUS_PROCESSING },
              { job_id: 'hello',
                data: 'abcdef',
                error_count: 0,
                seq: 1,
                status: queue_item_status.QUEUE_ITEM_STATUS_PROCESSING } ];

  state = reducer(state,slice_from_queue(job_id,1))
  expect(state[job_id]).toHaveLength(2)
  expect(state[job_id]).toEqual(expected)



  state = {}

  for(var i = 0; i < 99; i++){
    state = reducer(state,add_job_queue({data:"abcdef",job_id,seq:i}))
  }
  expect(state[job_id]).toHaveLength(99)

  state = reducer(state,slice_from_queue(job_id,50))
  expect(state[job_id]).toHaveLength(99)

  state = reducer(state,slice_from_queue(job_id,50))
  expect(state[job_id]).toHaveLength(99)
})


test ("[REDUCER] error handling", () =>{
  let store = mockStore({})
  let job_id = 'hello'

  let queue_item = args=> (Object.assign({},{data:"abcdef",job_id},args))

  let expected = [ { job_id: 'hello',
        data: 'abcdef',
        error_count: 0,
        seq: 0,
        status: 0 },
      { job_id: 'hello',
        data: 'abcdef',
        error_count: 0,
        seq: 1,
        status: 0 } ];

  let state = reducer({},add_job_queue(queue_item({seq:0})));
  expect(state[job_id]).toBeInstanceOf(Array);
  expect(state[job_id]).toHaveLength(1)


  state = reducer(state,add_job_queue(queue_item({seq:1})));
  expect(state[job_id]).toEqual(expected)
  expect(state[job_id]).toHaveLength(2)

  expected = [ { job_id: 'hello',
        data: 'abcdef',
        error_count: 1,
        seq: 0,
        status: 0 },
      { job_id: 'hello',
        data: 'abcdef',
        error_count: 0,
        seq: 1,
        status: 0 } ];

  state = reducer(state,queue_error(job_id,0))
  expect(state[job_id]).toEqual(expected)


  expected = [ { job_id: 'hello',
        data: 'abcdef',
        error_count: 1,
        seq: 0,
        status: 2 },
      { job_id: 'hello',
        data: 'abcdef',
        error_count: 0,
        seq: 1,
        status: 0 } ];

  state = reducer(state,queue_item_set_status(job_id,0,queue_item_status.QUEUE_ITEM_STATUS_ERROR))
  expect(state[job_id]).toEqual(expected)


  state = {};

  let item1 = queue_item({seq:0})
  let item2 = queue_item({seq:1})

  expected = [item1,item2]

  state = reducer({},add_job_queue(item1));
  state = reducer({},add_job_queue(item2));

  store.dispatch(queue_handling_error(item1));

  expect(store.getActions()).toHaveLength(2);
  let actions = [
    queue_error(item1.job_id,item1.seq),
    queue_item_set_status(item1.job_id,item1.seq, queue_item_status.QUEUE_ITEM_STATUS_ERROR)
  ]
  expect(store.getActions()).toEqual(actions);

})
