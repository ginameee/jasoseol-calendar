import React from 'react';
import './CalendarContent.css';

class CalendarContent extends React.Component {
    state = {
        calWidth: 7,
    }

    renderHeader() {
        const days = [ '일', '월', '화', '수', '목', '금', '토' ];
        let headerCells = [];

        for (let i = 0; i < this.state.calWidth; i++) {
            headerCells.push(
                <th>{days[i % this.state.calWidth % days.length]}</th>
            );
        }

        return headerCells;
    }

    renderContent() {
        let dateCells = [];

        for (let j = 0; j < this.state.calWidth; j++) {
            dateCells.push(
                <td>
                    <div>
                        {j}
                    </div>
                    <div></div>
                </td>
            );
        }

        return dateCells;
    }

    render() {
        return (
            <div id="calendar_content">
                <table>
                    <tr id="c_header">
                        {this.renderHeader()}
                    </tr>
                    <tr id="c_content">
                        {this.renderContent()}
                    </tr>
                </table>
            </div>
        );
    }
}


export default CalendarContent;