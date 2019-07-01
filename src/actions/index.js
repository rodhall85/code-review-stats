import { FETCH_STATS } from '../actions/types';
import { fetchCodeReviewStats } from '../apis/githubApi';

export const fetchStats = () => async dispatch => {
    const stats = await fetchCodeReviewStats();
    dispatch({ type: FETCH_STATS, payload: stats });
};