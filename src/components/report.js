import React, { useState } from 'react';
import './report.css';
import closeIcon from '../assets/icon-close.webp';
import reportIcon from '../assets/report.png';

const ReportPopup = () => {

    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className={`popup-overlay ${isOpen? 'open' : ''}`}>
            <button className="report-btn" onClick={() => setIsOpen(!isOpen)}>
                <img src={reportIcon} alt="report icon"/>
            </button>
            {isOpen && (
                <div className="popup-container" >
                    <button className="close-btn" onClick={() => setIsOpen(false)}>
                        <img src={closeIcon} alt="close icon" />
                    </button>
                    <h1>Report this workout</h1>
                    <p>Is this workout suspicious?</p>
                </div>
            )}
        </div>
    );
};

export default ReportPopup;