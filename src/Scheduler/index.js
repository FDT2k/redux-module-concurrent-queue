import  makeReducer            from   './reducer'
import  { getActionCreators, ActionTypes, scheduler_status as ss}        from   './actions'

export const ActionsCreators = getActionCreators()
export const reducer = makeReducer(ActionTypes())
export const scheduler_status = ss
