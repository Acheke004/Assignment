import React, { useState, useRef } from 'react';

const OTPPopup = () => {
  const [otp, setOTP] = useState(['', '', '', '', '', '']);
  const inputs = useRef([]);

  const handleChange = (e, index) => {
    const newOTP = [...otp];
    const value = e.target.value;
    if (!isNaN(value) && value !== ' ') {
      newOTP[index] = value;
      setOTP(newOTP);
      if (value !== '') {
        if (index === inputs.current.length - 1) {
          inputs.current[index].blur();
        } else {
          inputs.current[index + 1].focus();
        }
      } else {
        inputs.current[index - 1].focus();
      }
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData('text');
    const newOTP = [...otp];
    pasteData.split('').forEach((char, index) => {
      if (!isNaN(char) && char !== ' ' && index < 6) {
        newOTP[index] = char;
      }
    });
    setOTP(newOTP);
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && index > 0) {
      inputs.current[index - 1].focus();
    } else if (e.key === 'ArrowLeft' && index > 0) {
      inputs.current[index - 1].focus();
    } else if (e.key === 'ArrowRight' && index < inputs.current.length - 1) {
      inputs.current[index + 1].focus();
    }
  };

  return (
    <div className="otp-popup">
      <div className="otp-popup__overlay"></div>
      <div className="otp-popup__content">
        <h2>Phone Verification</h2>
        <p>Enter the 6 digit OTP sent to your phone number</p>
        <div className="otp-popup__otp-inputs">
          {otp.map((digit, index) => (
            <input
              key={index}
              type="text"
              value={digit}
              maxLength="1"
              ref={(input) => (inputs.current[index] = input)}
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              onPaste={(e) => handlePaste(e)}
            />
          ))}
        </div>
        <button className="otp-popup__verify-btn">Verify</button>
      </div>
    </div>
  );
};

export default OTPPopup;
