import axios from 'axios';

const api = axios.create({
    baseURL: 'https://api.github.com',
    headers: {
        Authorization: 'Bearer 0d02ec0546bebe7c3d7987992a988fde3710d1c0'
    }
});

export const fetchStats = async () => {
    const response = await api.get("/repos/comparetheMarket/home.risk-journey/pulls?state=all");

    const reviewUrls = response.data
        .filter(pull => new Date(pull.created_at).getTime() > new Date().getTime() - 12096e5)
        .map(pull => `${pull.url}/reviews`);

    const promises = reviewUrls.map(url => api.get(url));
    const reviews = await Promise.all(promises);
    
    const thing = [];
    reviews.forEach(review => (review.data.forEach(({state, user, submitted_at}) => (
        thing.push({
            "date": submitted_at,
            "user": user.login,
            "avatar": user.avatar_url,
            "url": user.url,
            "state": state
        })
    ))));

    console.log('tt',thing);
    const proper = ["rodhall85", "nikazdanovich", "Tom9416", "mikepro"].map(user => {
        const filtered = thing.filter(t => t.user === user);
        
        const rejected = filtered.filter(ff => ff.state === "CHANGES_REQUESTED").length;
        const commented = filtered.filter(ff => ff.state === "COMMENTED").length;
        const approved = filtered.filter(ff => ff.state === "APPROVED").length;
        const avatar = filtered[0].avatar;
        const url = filtered[0].url;

        return {user, avatar, url, rejected, commented, approved };
    });

    console.log(proper);
} 