import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import { fetch as fetchPolyfill } from 'whatwg-fetch';
import './style.scss';

class InputForm extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      MAX_SIZE: 320,
      isDemoMode: true,
      localApiUrl: 'http://localhost:3110/messages',
      skipioApi: 'https://stage.skipio.com//api/v2/messages'
    };
    this.onDraftChange = this.onDraftChange.bind(this);
    this.onSendSms = this.onSendSms.bind(this);
    this.updateDraftMessage = this.updateDraftMessage.bind(this);
  }
  onDraftChange(event) {
    if ((event.target.value || '').length <= this.state.MAX_SIZE) {
      this.updateDraftMessage(event.target.value);
    }
  }

  onSendSms() {
    const apiUrl = this.state.isDemoMode ? this.state.skipioApi : this.state.localApiUrl;
    const postData = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        recipients: [
          `contact-${this.props.contact.id}`
        ],
        message: {
          body: (this.props.contact || {}).draftMessage
        }
      })
    };
    this.updateDraftMessage('');
    fetchPolyfill(`${apiUrl}?token=${window.localStorage.accessToken}`, postData)
      .then((res) => res.json())
      .then((result) => {
        console.warn(result);
      });
  }
  updateDraftMessage(message) {
    this.props.onUpdateDraftMessage(this.props.contact, message);
  }

  render() {
    const { draftMessage = '' } = (this.props.contact || {});
    return this.props.contact ? (
      <div className="input-form">
        <textarea
          className="input-form-textarea"
          placeholder="Type a text message"
          type="text"
          value={draftMessage}
          onChange={this.onDraftChange}
        />
        <span>{draftMessage.length} / {this.state.MAX_SIZE}</span>
        <Button className="send-sms-bttn" onClick={this.onSendSms}>SEND</Button>
      </div>
    ) : null;
  }
}

InputForm.propTypes = {
  contact: PropTypes.object,
  onUpdateDraftMessage: PropTypes.func
};

export default InputForm;
