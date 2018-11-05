import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-bootstrap';
import './style.scss';

class ContactItem extends React.Component { // eslint-disable-line react/prefer-stateless-function
  onImageError(e) {
    e.target.onerror = null;
    e.target.src = 'missing.png';
  }

  render() {
    const {
      contactData = {},
      selectedContact = {}
    } = this.props;
    const {
      avatar_url, /* eslint-disable-line camelcase */
      phone_mobile_international, /* eslint-disable-line camelcase */
      full_name /* eslint-disable-line camelcase */
    } = contactData;
    const isSelected = contactData === selectedContact;
    return (
      <div className={`contact-item ${isSelected ? 'contact-selected' : ''}`}>
        <Row onClick={() => this.props.onContactSelect(this.props.contactData)}>
          <Col xs={2}>
            <img src={avatar_url /* eslint-disable-line camelcase */} alt="" onError={this.onImageError} className="contact-icon" />
          </Col>
          <Col xs={10}>
            <div className="full-name">
              {full_name /* eslint-disable-line camelcase */}
            </div>
            <div>
              {phone_mobile_international /* eslint-disable-line camelcase */ }
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

ContactItem.propTypes = {
  contactData: PropTypes.object,
  selectedContact: PropTypes.object,
  onContactSelect: PropTypes.func
};

export default ContactItem;
