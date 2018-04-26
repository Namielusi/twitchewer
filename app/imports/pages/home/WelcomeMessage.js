import React from 'react';

import {
  Container,
  Row,
  Col,
  Jumbotron,
} from 'reactstrap';

// import styles from './WelcomeMessage.sass';

const WelcomeMessage = () => (
  <Container className="h-100">
    <Row className="h-100 align-items-center">
      <Col>
        <Jumbotron>
          <h1 className="display-3">It&#39;s Twitchewer!</h1>
          <p className="lead">Lightweight unofficial client for Twitch made from scratch. It has no extra features that mostly useless and some of them just slow your performance of using official Twitch site.</p>
          {/* <hr className="my-2" />
          <p>123</p> */}
        </Jumbotron>
      </Col>
    </Row>
  </Container>
);

export default WelcomeMessage;
