import React from 'react';
import './Calendar.css';

import Content from './CalendarContent';

const today = new Date();

class Calendar extends React.Component {
    state = {
        year: today.getFullYear(),
        month: today.getMonth(),
        date: today.getDate()
    }

    render() {
        return (
            <div id="calendar">
                <hr></hr>
                <div id="header">
                    <button>이전 월</button>
                    <h2>{this.state.year}년 {this.state.month + 1}월</h2>
                    <button>다음 월</button>
                    <button id="btn_add">추가하기</button>
                </div>
                <Content year={this.state.year} month={this.state.month} date={this.state.date}/>
            </div>
        );
    }
}

export default Calendar;