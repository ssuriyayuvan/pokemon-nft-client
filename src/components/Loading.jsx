import React from 'react';
// import './loading.scss'

function Loading({ text }) {
    return (
        <>
            <div className="loading-container">
                <div className="load load1"></div>
                <div style={{ height: "20px", width: "20px" }}></div>
                <div className="load load2"></div>
                <div style={{ height: "20px", width: "20px" }}></div>
                <div className="load load3"></div>
            </div>
            <div className="loading-container loading-text">{text}</div>
        </>
    );
}

export default Loading;