import React from 'react';
import PropTypes from 'prop-types';

const Stats = ({total, min, max}) => (
    <div className="stats">
        <span>Stats</span>
        <div className="total">
        <span>Total numbers generated: </span> {total}
        </div>
        <div className="min">
        <span>Min number: </span> {min}
        </div>
        <div className="max">
        <span>Max number: </span> {max}
        </div>
    </div>
);

Stats.propTypes = {
    total: PropTypes.number,
    min: PropTypes.number,
    max: PropTypes.number
}

export default Stats;
