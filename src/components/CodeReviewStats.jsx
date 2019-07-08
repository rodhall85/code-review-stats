import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchStats } from "../actions";

import "./codeReviewStats.css";

const CodeReviewStats = ({ fetchStats, stats }) => {
  useEffect(() => {
    (async () => {
      await fetchStats();
    })();
  }, [fetchStats]);

  const renderStats = () => {
    return stats.map((stat, idx) => (
      <div key={idx}>
        <img className="img img-small" src={stat.avatar} alt={stat.user} />
        <span className="username">{stat.user}</span>
        <span className="stat stat-rejected stat">{stat.rejected}</span>
        <span className="stat stat-commented stat">{stat.commented}</span>
        <span className="stat stat-approved stat">{stat.approved}</span>
        <span className="stat stat-total stat">
          {stat.rejected + stat.commented + stat.approved}
        </span>
      </div>
    ));
  };

  return <div>{renderStats()}</div>;
};

const mapStateToProps = state => {
  return {
    stats: Object.values(state.stats)
  };
};

export default connect(
  mapStateToProps,
  { fetchStats }
)(CodeReviewStats);
