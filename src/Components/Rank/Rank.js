import React from "react";

const Rank = ({ nameOfUser, entries }) => {
  return (
    <div className="tc white mt5">
      <div className="f3">
        {`${nameOfUser}, your current entry count is...`}
      </div>
      <div className="f1">{entries}</div>
    </div>
  );
};

export default Rank;
