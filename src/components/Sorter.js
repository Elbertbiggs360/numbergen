import React from 'react';
import PropTypes from 'prop-types';

const Sorter = ({onChange}) => (
    <div className="sorter">
        <span>Sort by:</span>
        <select onChange={onChange} id="sorter">
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
        </select>
    </div>
);

Sorter.propTypes = {
    onChange: PropTypes.func
}

export default Sorter;
