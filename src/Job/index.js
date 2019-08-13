import makeReducer        from './reducer'
import  * as actions         from './actions'
import defaultActionCreators from './actions'
import makeSelectors         from './selectors'

let  { makeActionCreators, makeActionTypes,CONSTS}   = actions

export const ActionsCreators = defaultActionCreators
export const reducer = makeReducer(makeActionTypes())
export const job_status = CONSTS.status
export const selectors = makeSelectors(state=>state)

export default {
  makeActionTypes,
  makeActionCreators,
  makeReducer,
  makeSelectors,
  job_status,
  CONSTS
}
