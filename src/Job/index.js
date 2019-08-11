import  makeJobReducer            from   './reducer'
import  { getActionCreators, ActionTypes,job_status as js}        from   './actions'

export const ActionsCreators = getActionCreators()
export const reducer = makeJobReducer(ActionTypes())
export const job_status = js
