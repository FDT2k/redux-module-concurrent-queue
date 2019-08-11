import  makeReducer            from   './reducer'
import  { getActionCreators, ActionTypes, queue_item_status as qs}        from   './actions'

export const ActionsCreators = getActionCreators()
export const reducer = makeReducer(ActionTypes())
export const queue_item_status = qs
