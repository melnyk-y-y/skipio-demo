import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { Grid, Row, Col, Button } from 'react-bootstrap';
import { fetch as fetchPolyfill } from 'whatwg-fetch';
import ContactItem from '../../components/ContactItem/ContactItem';
import InputForm from '../../components/InputForm';
import './style.scss';

export default class MessageCenter extends React.Component {
  // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      contacts: [],
      isDemoMode: true,
      localApiUrl: 'http://localhost:3110/contacts',
      skipioApi: 'https://stage.skipio.com//api/v2/contacts?page=1&per=200'
    };
    this.updateContactsList = this.updateContactsList.bind(this);
    this.renderContactsList = this.renderContactsList.bind(this);
    this.onContactSelect = this.onContactSelect.bind(this);
    this.onLogout = this.onLogout.bind(this);
    this.onUpdateDraftMessage = this.onUpdateDraftMessage.bind(this);
  }

  componentDidMount() {
    const apiUrl = this.state.isDemoMode ? this.state.skipioApi : this.state.localApiUrl;
    fetchPolyfill(apiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'VND.SKIPIO.TOKEN': window.localStorage.accessToken
      }
    }).then((res) => res.json()).then((result) => {
      this.updateContactsList(result);
    });
  }

  onContactSelect(contact) {
    this.setState({
      selectedContact: contact
    });
  }

  onUpdateDraftMessage(contact, newDraftValue) {
    const result = this.state.contacts.map((el) => {
      if (el.id !== contact.id) {
        return el;
      }
      el.draftMessage = newDraftValue;
      return el;
    });
    this.setState({
      contacts: result
    });
  }

  onImageError(e) {
    e.target.onerror = null;
    e.target.src = 'missing.png';
  }

  onLogout(event) {
    delete window.localStorage.accessToken;
    event.preventDefault();
    this.props.history.push('/');
  }

  updateContactsList(contactsList) {
    this.setState({
      contacts: [...this.state.contacts, ...contactsList.data]
    });
  }

  renderContactsList(contactsList) {
    return contactsList.map((contact, i) => (
      <ContactItem
        key={i}
        contactData={contact}
        onContactSelect={this.onContactSelect}
        selectedContact={this.state.selectedContact}
      />
    ));
  }

  render() {
    const { selectedContact = {} } = this.state;
    return (
      <div className="message-center-page">
        <Helmet>
          <title>List of contacts</title>
          <meta
            name="description"
            content="Contacts list page of Skipio Demo application"
          />
        </Helmet>
        <section>
          <Grid>
            <Row className="show-grid">
              <Col xs={12} md={4} lg={3}>
                <div className="list-of-contacts-header">Contacts</div>
                <div className="list-of-contacts">
                  {this.state.contacts.length ?
                    <div>
                      {this.renderContactsList(this.state.contacts)}
                    </div> :
                    <div>---------</div>
                  }
                </div>
              </Col>
              <Col xs={12} md={8} lg={9}>
                <div className="list-of-contacts-header">
                  <span>Messages</span>
                  <Button className="logout-bttn" onClick={this.onLogout}>logout</Button>
                </div>
                <div className="send-message-panel">
                  <div>
                    <Row>
                      <Col xs={2}>
                        <img src={selectedContact.avatar_url /* eslint-disable-line camelcase */} alt="" onError={this.onImageError} className="contact-icon" />
                      </Col>
                      <Col xs={10}>
                        <div className="full-name">
                          {selectedContact.full_name /* eslint-disable-line camelcase */}
                        </div>
                        <div>
                          {selectedContact.phone_mobile_international /* eslint-disable-line camelcase */ }
                        </div>
                        <div>
                          {selectedContact.email}
                        </div>
                      </Col>
                    </Row>
                  </div>
                  <InputForm className="" contact={this.state.selectedContact} onUpdateDraftMessage={this.onUpdateDraftMessage} />
                </div>
              </Col>
            </Row>
          </Grid>
        </section>
      </div>
    );
  }
}

MessageCenter.propTypes = {
  history: PropTypes.object
};
