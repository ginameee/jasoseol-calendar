import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import sampleSchedule from '../../resources/data.json';
import serverConfig from '../../config/serverConfig.json';
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
        let schedules = sampleSchedule;
        
        axios.get(`${serverConfig.url}/schedules?year=${this.state.year}&month=${this.state.month + 1}`)
        .then(
            (res) => {
                schedules = schedules.concat(res.data);
                this.setState({ schedules, isLoading: false });
            }
        );
    };

    closeDialog = (dialogNm) => {
        this.setState(
            (current) => {
                let modeNm = `is${dialogNm}`;
                let newState = {};
                
                newState[modeNm] = !current[modeNm];
                
                return newState;
            }
        );
    };

    addSchedule = ({date, event}) => {
        axios.post(
            `${serverConfig.url}/schedules`,
            {
                date: `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`,
                event
            }
        )
        .then(
            this.getAllSchedules
        )
        .catch(
            (err) => { console.error(err); }
        );
    };

    openDialog = (dialogNm) => {
        this.setState(
            current => {
                let modeNm = `is${dialogNm}`;
                let newState = {};

                newState[modeNm] = true;
                
                return newState;
            }
        );
    };

    nextMonth = async () => {
        let tempDate = new Date(this.state.year, this.state.month, this.state.date);
        let nextMonth = new Date(tempDate.setMonth(tempDate.getMonth() + 1));

        await this.setState(
            {
                isLoading: false,
                year: nextMonth.getFullYear(),
                month: nextMonth.getMonth(),
                date: nextMonth.getDate() 
            }
        );
        this.getAllSchedules();
    };
    
    preMonth = async () => {
        let tempDate = new Date(this.state.year, this.state.month, this.state.date);
        let preMonth = new Date(tempDate.setMonth(tempDate.getMonth() - 1));

        await this.setState(
            {
                isLoading: false,
                year: preMonth.getFullYear(),
                month: preMonth.getMonth(),
                date: preMonth.getDate() 
            }
        );
        this.getAllSchedules();
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
                {
                    (this.state.isLoading) ? ( <h1>Data is loading... </h1> ) : <CalendarContent year={this.state.year} month={this.state.month} date={this.state.date} schedules={this.state.schedules}/>
                }
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