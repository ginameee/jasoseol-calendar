import React from 'react';
import './Calendar.css';

class Calendar extends React.Component {
    render() {
        return (
            <div id="calendar">
            <div id="header">
                <button>이전 월</button>
                <h2>2019년 4월</h2>
                <button>다음 월</button>
             </div>
            <div className="content">
                Body
            </div>
            </div>
        );
    }
}

export default Calendar;