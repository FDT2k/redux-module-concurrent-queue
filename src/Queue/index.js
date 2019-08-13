import  makeReducer               from   './reducer'
import  * as actions              from   './actions'
import  defaultActionCreators     from   './actions'
import  makeSelectors             from   './selectors'

const  {makeActionCreators, makeActionTypes, CONSTS } = actions;

export const ActionCreators     = defaultActionCreators
export const reducer            = makeReducer(makeActionTypes())
export const queue_item_status  = CONSTS.status


export default {
  makeActionTypes,
  makeActionCreators,
  makeReducer,
  makeSelectors,
  queue_item_status,
  CONSTS
}
