import React from 'react';
import PropTypes from 'prop-types';

const Actions = ({generateNumber, onChange, quantity, error, message}) => (
    <div className="actions">
        <input type="number" id="quantity" onChange={onChange} value={quantity} placeholder="Quantity of numbers to generate" />
        {
        error && <span className="error">{message}</span>
        }
        <button onClick={generateNumber}>Generate</button>
    </div>
);

Actions.propTypes = {
    onChange: PropTypes.func,
    onClick: PropTypes.func,
    quantiy: PropTypes.number,
    error: PropTypes.bool,
    generateNumber: PropTypes.func,
    message: PropTypes.string
}

export default Actions;
