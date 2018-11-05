import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { Grid, Row, Col, Button } from 'react-bootstrap';
import { fetch as fetchPolyfill } from 'whatwg-fetch';
import ContactItem from '../../components/ContactItem/ContactItem';
import './style.scss';

export default class MessageCenter extends React.Component {
  // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      contacts: []
    };
    this.updateContactsList = this.updateContactsList.bind(this);
    this.renderContactsList = this.renderContactsList.bind(this);
    this.onContactSelect = this.onContactSelect.bind(this);
    this.onLogout = this.onLogout.bind(this);
  }

  componentDidMount() {
    fetchPolyfill('http://localhost:3110/contacts').then((res) => res.json()).then((result) => {
      this.updateContactsList(result);
    });
  }

  onContactSelect(contact) {
    this.setState({
      selectedContact: contact
    });
  }

  onLogout(event) {
    delete window.localStorage.accessToken;
    event.preventDefault();
    this.props.history.push('/');
  }

  updateContactsList(contactsList) {
    this.setState({
      contacts: [...this.state.contacts, ...contactsList.data, ...contactsList.data]
    });
  }

  renderContactsList(contactsList) {
    return contactsList.map((contact, i) => (
      <ContactItem key={i} contactData={contact} onContactSelect={this.onContactSelect} selectedContact={this.state.selectedContact} />
    ));
  }

  render() {
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
                  Sent message panel {JSON.stringify(this.state.selectedContact || null)}
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
