import React from 'react';
import PropTypes from 'prop-types';
import sampleSchedule from '../../resources/data.json';
import './Calendar.css';

import CalendarContent from './CalendarContent';
import AddDialog from './AddDialog';

const today = new Date();
const defaultProps = {};
const propTypes = {};

class Calendar extends React.Component {
    state = {
        year: today.getFullYear(),
        month: today.getMonth(),
        date: today.getDate(),
        schedules: [],
        isLoading: true,
        addMode: false
    }

    getAllSchedules = () => {
        const schedules = sampleSchedule;
        this.setState({ schedules, isLoading: false });
    };

    closeDialog = (dialogNm) => {
        this.setState(
            (current) => {
                let modeNm = `is${dialogNm}`;
                let newState = {};
                
                console.log('cur: ', current);
                newState[modeNm] = !current[modeNm];
                console.log('new: ', newState); 
                return newState;
            }
        );
    }

    addSchedule = ({date, event}) => {
        this.setState(
            (current) => {
                let schedules = current.schedules.concat(
                    [
                        {
                            date: `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`,
                            event
                        }
                    ]
                );

                console.log(schedules);
                return { schedules };
            }  
        );
    };

    openDialog = (dialogNm) => {
        this.setState(
            (current) => {
                let modeNm = `is${dialogNm}`;
                let newState = {};

                newState[modeNm] = true;
                
                return newState;
            }
        );
    };

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
    
    componentDidMount() {
        this.getAllSchedules();
    }

    render() {
        return (
            <div id="calendar">
                <hr></hr>
                <div id="header">
                    <button onClick={this.preMonth}>이전 월</button>
                    <h2>{this.state.year}년 {this.state.month + 1}월</h2>
                    <button onClick={this.nextMonth}>다음 월</button>
                    <button id="btn_add" onClick={() => { this.openDialog("Add") }}>추가하기</button>
                </div>
                <CalendarContent year={this.state.year} month={this.state.month} date={this.state.date} schedules={this.state.schedules}/>
                <AddDialog 
                    isOpend={this.state.isAdd} 
                    onClose={() => { this.closeDialog("Add") }} 
                    onAdd={this.addSchedule}
                    year = {this.state.year}
                    month = {this.state.month}
                />
            </div>
        );
    }
}

Calendar.defaultProps = defaultProps;
Calendar.propTypes = propTypes;

export default Calendar;