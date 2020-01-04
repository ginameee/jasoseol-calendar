import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-bootstrap-modal';
import DatePicker from "react-datepicker";
 
import "react-datepicker/dist/react-datepicker.css";
import 'react-bootstrap-modal/lib/css/rbm-complete.css';
import './AddDialog.css';

const defaultProps = {
    isOpend: false,
    onClose: createWarning("onClose"),
    onAdd: createWarning("onAdd"),
    year: new Date().getFullYear(),
    month: new Date().getMonth()
};

const propTypes = {
    isOpend: PropTypes.bool.isRequired,
    onCloes: PropTypes.func.isRequired,
    onAdd: PropTypes.func.isRequired,
    year: PropTypes.number,
    month: PropTypes.number
};

function createWarning(fnNm) {
    console.warn(`${fnNm} is not defined`);
}

class AddDialog extends React.Component {
    state = {
      date: new Date(this.props.year, this.props.month, 1),
      event: ""
    };

    saveAndClose = () => {
        this.props.onAdd(
          {
            date: this.state.date,
            event: this.state.event
          }
        );
        
        this.props.onClose();
        
        this.setState(
          {
            date: new Date(this.props.year, this.props.month, 1),
            event: ""
          }
        );
    }

    changeDate = date => {
      this.setState({ date });
    };

    changeEvent = e => {
      this.setState({ event: e.target.value });
    };

    render() {
        return (
          <div>
            <Modal
              show={this.props.isOpend}
              onHide={this.props.onClose}
              id="addDialog"
              aria-labelledby="ModalHeader"
            >
              <Modal.Header closeButton>
                <Modal.Title id='ModalHeader'>일정추가</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <p>
                    <label for="eventDate">날짜</label><br></br>
                    <DatePicker
                        selected={this.state.date}
                        onChange={this.changeDate}
                    />
                </p>
                <p>
                    <label for="eventContent">내용</label><br></br>
                    <textarea id="eventContent" rows="10" cols="30" value={this.state.event} onChange={this.changeEvent}/>
                </p>
              </Modal.Body>
              <Modal.Footer>
                <Modal.Dismiss className='btn btn-default'>취소</Modal.Dismiss>
                <button className='btn btn-primary' onClick={this.saveAndClose}>저장</button>
              </Modal.Footer>
            </Modal>
          </div>
        );
      }
}

AddDialog.defaultProps = defaultProps;
AddDialog.propTypes = propTypes;

export default AddDialog;
