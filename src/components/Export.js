import React from 'react';
import PropTypes from 'prop-types';


const Export = ({ onClick,fileSaved }) => (
    <div className="export">
        <button onClick={onClick} className="export-btn">Export as CSV</button>
        {
        fileSaved && <span>File Saved Successfully!</span>
        }
    </div>
);

Export.propTypes = {
  fileSaved: PropTypes.bool,
  onClick: PropTypes.func,
};

export default Export;