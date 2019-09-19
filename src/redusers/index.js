import { SELECT_GROUP, SELECT_PHASE } from '../constants';

export function reducer(state, action) {
    switch (action.type) {
        case SELECT_GROUP:
            return {...state, selectedGroup : action.selectedGroup};
        case SELECT_PHASE:
            return {...state, selectedPhase : action.selectedPhase};
        default:
            return state;
    }
}

export const initialState = {
    selectedGroup: null,
    selectedPhase: null
};
