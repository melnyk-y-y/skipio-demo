import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { Grid, Row, Col } from 'react-bootstrap';
import './style.scss';

class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  /**
   * when initial state username is not null, submit the form to load repos
   */
  constructor(props) {
    super(props);
    this.state = {
      accessToken: ''
    };
    this.onTokenSubmit = this.onTokenSubmit.bind(this);
    this.onTokenChange = this.onTokenChange.bind(this);
  }

  onTokenSubmit(event) {
    window.localStorage.accessToken = this.state.accessToken;
    event.preventDefault();
    this.props.history.push('/message_center');
  }

  onTokenChange(event) {
    this.setState({ accessToken: event.target.value });
  }

  render() {
    return (
      <article>
        <Helmet>
          <title>Home Page</title>
          <meta name="description" content="Skipio Demo application homepage" />
        </Helmet>
        <div className="home-page">
          <section className="login-form-container">
            <h2>Please enter access token to enter the website</h2>
            <Grid>
              <form onSubmit={this.onTokenSubmit}>
                <Row className="show-grid">
                  <Col xs={12} md={8} lg={9}>
                    <input
                      id="accessToken"
                      type="text"
                      placeholder="enter token"
                      value={this.state.accessToken}
                      onChange={this.onTokenChange}
                    />
                  </Col>
                  <Col xs={12} md={4} lg={3}>
                    <button type="submit" className="login-form-submit primary-button">submit</button>
                  </Col>
                </Row>
              </form>
            </Grid>
          </section>
        </div>
      </article>
    );
  }
}

HomePage.propTypes = {
  history: PropTypes.object
};

export default HomePage;
