import React from 'react';
// import PropTypes from 'prop-types';
import { pure } from 'recompose';
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  CardText,
} from 'reactstrap';

const Loading = () => (
  <Container className="h-100" fluid={true}>
    <Row className="align-items-center h-100">
      <Col className="mx-auto" xs="3">
        <Card>
          <CardBody>
            <CardTitle>Loading...</CardTitle>
            <CardText>
              Please, be pation while all data is loading and formatting.
              Will do this heavy stuff only on first time page loading.
            </CardText>
          </CardBody>
        </Card>
      </Col>
    </Row>
  </Container>
);

export default pure(Loading);
