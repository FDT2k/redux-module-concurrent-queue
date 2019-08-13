# Redux Module

  Convention to modularize redux without (too much) extra coding. Which would make these pretty well reusable and composable.
  These Contract && Constraints are based on the Redux way and would enforce no specific framework or lib.

## Contract

By following these rules, you'll be able to:

1. Keep the Redux base contract && constraints
2. Compose && Combine your Reducers
3. Compose &&  Combine your Modules
4. Reuse or Reconfigure any part of your module without pulling your hair. Even if the state shape changes for whatever reason (Higher Order Reducer, etc..)

## Constraints

  A Module...

1. MUST `export` a function called `reducer()`
2. MUST `export` its action creators as an object called `actionCreators` or `ActionCreators`
3. **WIP** MUST `export` its selectors as an Object called `selectors`    
4.  MUST `export default` an object which contains the Higher Order Functions that allow to recreate the module, for example :


```javascript
  export default {
    makeActionTypes, // pure function that accept a function in parameter to rename action (see: NamerFunction) and returns an Object (cf. PureActionType)
    makeActionCreators, // pure function that accept an Object  (see: PureActionType)
    makeReducer, // pure function that takes **at least**  one arg which is an Object (see:PureActionType)
    makeSelectors, // pure function that take **at least** one arg which is a function that return a partial state (see:BaseSelector)
    CONSTS // all the consts, not yet well defined
  }
  ```



## NamerFunction

    let namer = action => `app/namespace/${action}`


## makeActionTypes

    let makeActionTypes = namer=> {
	    // do whatever you need
	    returns PureActionTypes
    }


## PureActionTypes

An object like

```javascript
	 let actionTypes = {
		FETCH:'FETCH',
		ACTION_1:'ACTION_1'
	}
  ```

## BaseSelector

A function that accept a state and return a sub state

    let baseSelector = state => state.substate


## Example (es6)

I have to make a new reducer to handle a Job Queue

My module structure would be like this

/..project_folder.../ReduxModule/Job/actions.js
/..project_folder.../ReduxModule/Job/index.js
/..project_folder.../ReduxModule/Job/reducer.js
/..project_folder.../ReduxModule/Job/selectors.js

### actions.js
```javascript
export const makeActionCreators = (ActionTypes)=>{

  const set_job_status = (payload) =>{
    return {type: ActionTypes.SET_JOB_STATUS,payload}
  }

  const create_job = (payload)=>{
    return {type: ActionTypes.CREATE_JOB,payload}
  }

  return {set_job_status,create_job}
}

export const makeActionTypes = combineActionTypes(
  'CREATE_JOB',
  'SET_JOB_STATUS'
)

export default makeActionCreators(makeActionTypes())
  ```

**combineActionTypes**  returns a function that accept  a Namer (cf: [https://github.com/FDT2k/redux-action-types](https://github.com/FDT2k/redux-action-types))
And can be composed from in within other modules

Note that I `export default`the action creators here. I could have done this in the module file (index.js) but Since it requires nothing else I can very well export it here.

### reducer.js

```javascript

import {createReducer,updateObject} from '...utilslib...'
import {CONSTS} from './actions'
const makeReducer =  (actionType)=>{

  const default_job = {
    queue: 0,
    map:{},
    delimiter:';',
    status: CONSTS.status.EMPTY
  }

  const handlers = {

    create : (state,{payload})=>{
      let {_id} = payload
      return updateObject(state,{
          [_id]: updateObject(default_job,payload)
        }
      )
    },

    set_status : (state,{payload})=>{
      let {job_id,status} = payload;
      let job = state[job_id];
      job.status = status;
      return updateObject(state,{[job_id]:job});
    }

  }

  const reducer =  createReducer({},{
    [actionType.CREATE_JOB]: handlers.create,
    [actionType.SET_JOB_STATUS]: handlers.set_status
  });


  return reducer;
}

export default makeReducer;

  ```

**createReducer** comes from a Redux example. (cf: [https://redux-starter-kit.js.org/api/createreducer](https://redux-starter-kit.js.org/api/createreducer))   

But you can use your own way to create / combine your reducer.


### index.js

I skipped the selector part which isn't fully ready yet

```javascript

import makeReducer        from './reducer'
import  * as actions         from './actions'
import defaultActionCreators from './actions'
import makeSelectors         from './selectors'

let  { makeActionCreators, makeActionTypes,CONSTS}   = actions

export const ActionsCreators = defaultActionCreators
export const reducer = makeReducer(makeActionTypes())

export const job_status = CONSTS.status  //not yet ready
export const selectors = makeSelectors(state=>state) //not yet ready

export default {
  makeActionTypes,
  makeActionCreators,
  makeReducer,
  makeSelectors,
  job_status,
  CONSTS
}
  ```

The idea is to have a default module set somewhere else in your app by calling

    import * as Job from '...whatever.../Job';
    const {ActionCreators,reducer, selectors}  = Job;

If you want to adapt the module, you can import it with

    import JobModule from '...whatever.../Job';
    const {makeActionTypes,makeActionCreators, ...whatever} = JobModule

 With nodeJs it would be

	const {ActionCreators,reducer, selectors} = require( '...whatever.../Job');

Or

    const {makeActionTypes,makeActionCreators, ...whatever}  = require('...whatever.../Job').default
 
