import axios from 'axios';
import _ from 'lodash';

const api = axios.create({
    baseURL: 'https://api.github.com',
    headers: {
        Authorization: `Bearer ${process.env.REACT_APP_GITHUB_API_KEY}`
    }
});

//TODO: Tidy this mess up
// Foreach repo...
// Fetch all PR's
// Select those opened within the last month
// Fetch reviews
// Add review data to array
// Select users
export const fetchCodeReviewStats = async () => {
    const response = await api.get(`/repos/${process.env.REACT_APP_REPO}/pulls?state=all`);

    const reviewUrls = response.data
        .filter(pull => new Date(pull.created_at).getTime() > new Date().getTime() - 12096e5)
        .map(pull => `${pull.url}/reviews`);

    const promises = reviewUrls.map(url => api.get(url));
    const reviews = await Promise.all(promises);
    
    const results = [];
    reviews.forEach(review => (review.data.forEach(({state, user, submitted_at}) => (
        results.push({
            "date": submitted_at,
            "user": user.login,
            "avatar": user.avatar_url,
            "url": user.url,
            "state": state
        })
    ))));

    const users = _.chain(results)
        .map('user')
        .uniq()
        .value();
    
    return users.map(user => {
        const filtered = results.filter(t => t.user === user);
        
        const rejected = filtered.filter(ff => ff.state === "CHANGES_REQUESTED").length;
        const commented = filtered.filter(ff => ff.state === "COMMENTED").length;
        const approved = filtered.filter(ff => ff.state === "APPROVED").length;
        const avatar = filtered[0].avatar;
        const url = filtered[0].url;

        return {user, avatar, url, rejected, commented, approved };
    });
} 