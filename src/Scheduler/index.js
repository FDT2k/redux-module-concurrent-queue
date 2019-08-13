import  makeReducer               from   './reducer'
import  * as actions              from   './actions'
import  defaultActionCreators     from   './actions'
import  makeSelectors             from   './selectors'

const {makeActionCreators, makeActionTypes, CONSTS } = actions;

export const ActionCreators   = defaultActionCreators
export const reducer          = makeReducer(makeActionTypes())
export const scheduler_status = CONSTS.status
export const selectors = makeSelectors(state=>state)


export default {
  makeActionTypes,
  makeActionCreators,
  makeReducer,
  makeSelectors,
  scheduler_status,
  CONSTS
}
