import React from 'react';
import PropTypes from 'prop-types';


const Numberlist = ({ numberlist }) => (
    <div className="numbers">
        <ul className="numberlist">
        {
            numberlist && numberlist.map(number => (
            <li className="listNumber" key={number}>{number}</li>
            ))
        }
        </ul>
    </div>
);

Numberlist.propTypes = {
  numberlist: PropTypes.array
};

export default Numberlist;