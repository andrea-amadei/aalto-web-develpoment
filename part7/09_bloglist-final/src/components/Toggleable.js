import { useState } from 'react';
import PropTypes from 'prop-types';
import React from 'react';

// eslint-disable-next-line no-unused-vars
const Toggleable = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? 'none' : '' };
  const showWhenVisible = { display: visible ? '' : 'none' };

  const toggleVisibility = () => {
    setVisible(!visible);
  }

  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility}>{props.buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <br />
        <button onClick={toggleVisibility}>Cancel</button>
      </div>
    </div>
  )
});


Toggleable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}

Toggleable.displayName = 'Toggleable';

export default Toggleable;
