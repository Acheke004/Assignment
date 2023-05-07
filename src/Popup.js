import React, { useState } from 'react';
import OTPPopup from './OTPPopup ';

const Popup = () => {
  const [showPopup, setShowPopup] = useState(false);

  const handleClick = () => {
    setShowPopup(!showPopup);
  };

  return (
    <div>
      {!showPopup && <button onClick={handleClick}>Open Popup</button>}
      {showPopup && (
        <div className="popup">
            <OTPPopup></OTPPopup>
          <button onClick={handleClick}>Close Popup</button>
        </div>
      )}
    </div>
  );
};

export default Popup;
