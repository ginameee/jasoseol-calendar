import React from 'react';
import './CalendarContent.css';

class CalendarContent extends React.Component {
    state = {
        calColCnt: 7,
        calRowCnt: 5,
        calLength: 35
    }

    /**
     * 날짜에 맞는 스케쥴정보를 가져온다.
     * @param {Date} dateObj 
     */
    getSchedule(dateObj) {
        return ( <span>gg</span> );
    }

    renderHeader() {
        const days = [ '일', '월', '화', '수', '목', '금', '토' ];
        let headerCells = [];

        days.forEach(
            (day) => {
                headerCells.push(
                    <th>{day}</th>
                );
            }
        )

        return (
            <tr id="c_header">
                {headerCells}
            </tr>
        );
    }

    renderContent() {
        let calRows = [];
        let dateObj = new Date(this.props.year, this.props.month, 1);
        let tempDateObj; 
        let strDay = new Date(this.props.year, this.props.month, 1).getDay();

        for (let i = 0; i < this.state.calRowCnt; i++) {
            calRows.push(
                <tr id="c_content">
                    {
                        Array(7).fill(0).map(
                            (item, idx) => {
                                let cellIdx = this.state.calColCnt * i + idx;
                                let date;

                                if (!tempDateObj || cellIdx < strDay) {
                                    tempDateObj = new Date(dateObj.getTime());
                                    tempDateObj.setDate(dateObj.getDate() - (strDay - cellIdx));
                                }
                                else {
                                    tempDateObj.setDate(tempDateObj.getDate() + 1);
                                }
                                
                                date = tempDateObj.getDate();

                                return (
                                    <td className={
                                        (tempDateObj.getMonth() === new Date().getMonth() && tempDateObj.getDate() === new Date().getDate()) ? "today" : ""
                                        }>
                                        <div className="date">
                                            {date}
                                        </div>              
                                        <div className="schedule">
                                            {this.getSchedule(tempDateObj)}
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
    }

    render() {
        return (
            <div id="calendar_content">
                <table>
                    {this.renderHeader()}
                    {this.renderContent()}
                </table>
            </div>
        );
    }
}


export default CalendarContent;