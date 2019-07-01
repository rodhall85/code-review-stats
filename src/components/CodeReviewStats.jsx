import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchStats } from '../actions';

import './codeReviewStats.css';

const CodeReviewStats = ({ fetchStats, stats }) => {
    useEffect(() => {
        (async () => {
            await fetchStats();
        })();
    }, [fetchStats]);

    const renderStats = () => {
        return stats.map((stat, idx) =>
            <div key={idx} className="record">
                <img className="ui avatar image" src={stat.avatar} alt={stat.user} />
                <span className="username">{stat.user}</span>
                <span className="stat rejected">{stat.rejected}</span>
                <span className="stat commented">{stat.commented}</span>
                <span className="stat approved">{stat.approved}</span>
                <span className="stat total">{stat.rejected + stat.commented + stat.approved}</span>
            </div>
        );
    };

    return (
        <div>
            {renderStats()}
        </div>
    );
};

const mapStateToProps = state => {
    return { 
        stats: Object.values(state.stats),
    };
}

export default connect(
    mapStateToProps, { fetchStats }
)(CodeReviewStats);