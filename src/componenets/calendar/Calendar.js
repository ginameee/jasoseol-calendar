import React from 'react';
import './Calendar.css';

import CalendarContent from './CalendarContent';

const today = new Date();

class Calendar extends React.Component {
    state = {
        year: today.getFullYear(),
        month: today.getMonth(),
        date: today.getDate()
    }

    nextMonth = () => {
        let tempDate = new Date(this.state.year, this.state.month, this.state.date);
        let nextMonth = new Date(tempDate.setMonth(tempDate.getMonth() + 1));

        this.setState(
            {
                year: nextMonth.getFullYear(),
                month: nextMonth.getMonth(),
                date: nextMonth.getDate() 
            }
        );
    };
    
    preMonth = () => {
        let tempDate = new Date(this.state.year, this.state.month, this.state.date);
        let preMonth = new Date(tempDate.setMonth(tempDate.getMonth() - 1));

        this.setState(
            {
                year: preMonth.getFullYear(),
                month: preMonth.getMonth(),
                date: preMonth.getDate() 
            }
        );
    }

    render() {
        return (
            <div id="calendar">
                <hr></hr>
                <div id="header">
                    <button onClick={this.preMonth}>이전 월</button>
                    <h2>{this.state.year}년 {this.state.month + 1}월</h2>
                    <button onClick={this.nextMonth}>다음 월</button>
                    <button id="btn_add">추가하기</button>
                </div>
                <CalendarContent year={this.state.year} month={this.state.month} date={this.state.date}/>
            </div>
        );
    }
}

export default Calendar;