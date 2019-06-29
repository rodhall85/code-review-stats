import React, { useEffect } from 'react';

import { fetchStats } from '../apis/githubApi';

const CodeReviewStats = () => {
    useEffect(() => {
        (async () => {
            const stats = await fetchStats();
    
            console.log(stats);
        })();
    }, []);

    return (
        <div>
            Some Stats
        </div>
    );
};

export default CodeReviewStats;