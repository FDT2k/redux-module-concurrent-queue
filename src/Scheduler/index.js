import  makeReducer            from   './reducer'
import  {makeActionCreators, ActionTypes, scheduler_status as ss}        from   './actions'
import  makeSelectors        from   './selectors'

export const defaultActionCreators = ()=>makeActionCreators(ActionTypes())
export const reducer = makeReducer(ActionTypes())
export const scheduler_status = ss


export default {
  ActionTypes,
  makeActionCreators,
  makeReducer,
  makeSelectors,
  scheduler_status
}
