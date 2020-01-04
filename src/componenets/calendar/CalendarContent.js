import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import './CalendarContent.css';

const calColCnt = 7;
let calRowCnt = 5;
const days = [ '일', '월', '화', '수', '목', '금', '토' ];
const propTypes = {
    year: PropTypes.number.isRequired,
    month: PropTypes.number.isRequired,
    date: PropTypes.number,
    schedules: PropTypes.array.isRequired
};
const defaultProps = {
    year: new Date().getFullYear(),
    month: new Date().getMonth(),
    date: 1,
    schedules: [],
};

class CalendarContent extends React.Component {
    state = {
        isLoading: true,
        schedules: []
    }

    addSchedule = () => {

    };

    clickDate = (dateObj) => {
        let dateStr = `${dateObj.getFullYear()}-${dateObj.getMonth() + 1}-${dateObj.getDate()}`;
        let scheduleArr = this.props.schedules.filter(
            (item) => {
                let ymdArr = item.date.split("-");
                let year = ymdArr[0] * 1;
                let month = ymdArr[1] * 1;
                let date = ymdArr[2] * 1;

                return (year === dateObj.getFullYear() && month === dateObj.getMonth() + 1 && date === dateObj.getDate());
            }
        );
        let scheduleStr = scheduleArr.map(
            (item) => {
                return item.event;
            }
        ).join("\n");

        alert(`${dateStr}\n${scheduleStr}`);
    };

    /**
     * 날짜에 맞는 스케쥴들을 가져온다.
     * @param {Date} dateObj 
     * @return {Array}
     */
    getSchedules = (dateObj) => {
        return this.props.schedules.filter(
            (item) => {
                let ymdArr = item.date.split("-");
                let year = ymdArr[0] * 1;
                let month = ymdArr[1] * 1;
                let date = ymdArr[2] * 1;

                return (year === dateObj.getFullYear() && month === dateObj.getMonth() + 1 && date === dateObj.getDate());
            }
        )
    };

    renderHeader = () => {
        let headerCells = [];

        days.forEach(
            (day, idx) => {
                headerCells.push(
                    <th key={idx}>{day}</th>
                );
            }
        )

        return (
            <tr id="c_header">
                {headerCells}
            </tr>
        );
    };

    renderContent = () => {
        const today = new Date();
        const dateObj = new Date(this.props.year, this.props.month, 1);
        const strDay = dateObj.getDay();
        const endDate = new Date(this.props.year, this.props.month + 1, 0).getDate();

        let calRows = [];
        let tempDateObj;

        calRowCnt = (strDay + endDate > 35) ? 6 : 5;

        for (let i = 0; i < calRowCnt; i++) {
            calRows.push(
                <tr id="c_content" key={i}>
                    {
                        Array(7).fill(0).map(
                            (item, idx) => {
                                let cellIdx = calColCnt * i + idx;
                                let cellDateObj;

                                if (cellIdx <= strDay) {
                                    tempDateObj = new Date(dateObj.getTime());
                                    tempDateObj.setDate(dateObj.getDate() - (strDay - cellIdx));
                                }
                                else {
                                    tempDateObj.setDate(tempDateObj.getDate() + 1);
                                }

                                cellDateObj = new Date(tempDateObj.getTime());

                                return (
                                    <td key={cellIdx} 
                                        className={(tempDateObj.getFullYear() === today.getFullYear() && tempDateObj.getMonth() === today.getMonth() && tempDateObj.getDate() === today.getDate()) ? "today" : ""}
                                    >
                                        <div className="date" onClick={() => (this.clickDate(cellDateObj))}>
                                            {cellDateObj.getDate()}
                                        </div>              
                                        <div className="schedule">
                                            {
                                                this.getSchedules(tempDateObj).map(
                                                    (item) => {
                                                        return (
                                                            <span>{item.event}<br/></span>
                                                        )       
                                                    }       
                                                )
                                            }
                                        </div>
                                    </td>
                                );
                            }
                        )
                    }
                </tr>
            );
        }

        return calRows;
    };
    

    render() {
        return (
            <div id="calendar_content">
                <table>
                    <tbody>
                        {this.renderHeader()}
                        {this.renderContent()}
                    </tbody>
                </table>
            </div>
        );
    }
}

CalendarContent.defaultProps = defaultProps;
CalendarContent.propTypes = propTypes;

export default CalendarContent;