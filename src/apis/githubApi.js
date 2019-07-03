import axios from 'axios';
import _ from 'lodash';

const api = axios.create({
    baseURL: 'https://api.github.com',
    headers: {
        Authorization: `Bearer ${process.env.REACT_APP_GITHUB_API_KEY}`
    }
});

export const fetchCodeReviewStats = async () => {
    const repos = [
        // Populate these here for now
    ];
    
    const results = [];
    await new Promise((resolve) => {
        repos.forEach(async (repo, index) => {
            const response = await api.get(`/repos/${repo}/pulls?state=all`);
            const reviewUrls = response.data
                .filter(pull => new Date(pull.created_at).getTime() > new Date().getTime() - 12096e5)
                .map(pull => `${pull.url}/reviews`);
            
            const promises = reviewUrls.map(url => api.get(url));
            const reviews = await Promise.all(promises);
            
            reviews.forEach((review) => (review.data.forEach(({state, user, submitted_at}) => {
                results.push({
                    repo,
                    "date": submitted_at,
                    "user": user.login,
                    "avatar": user.avatar_url,
                    "url": user.url,
                    state
                });
            })));

            if (index === 0) resolve();
        });
    });
    
    console.log(results);
    const users = _.chain(results)
        .map('user')
        .uniq()
        .value();
    
    console.log(users);
    return users
        .map(user => {
            const filtered = results.filter(t => t.user === user);
            
            const rejected = filtered.filter(ff => ff.state === "CHANGES_REQUESTED").length;
            const commented = filtered.filter(ff => ff.state === "COMMENTED").length;
            const approved = filtered.filter(ff => ff.state === "APPROVED").length;
            const avatar = filtered[0].avatar;
            const url = filtered[0].url;
            
            return {user, avatar, url, rejected, commented, approved };
        })
        .sort((a, b) => b.approved - a.approved)
        .sort((a, b) => b.commented - a.commented)
        .sort((a, b) => b.rejected - a.rejected);
};
