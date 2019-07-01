import _ from 'lodash';

import { FETCH_STATS } from '../actions/types';

const INITIAL_STATE = [];

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCH_STATS:
            return { ...state, ..._.mapKeys(action.payload, 'user') };
        default:
            return state;
    }
};