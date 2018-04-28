/* eslint-disable */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';

import {
  Container,
  Row,
  Col,
  Pagination,
  PaginationItem,
  PaginationLink,
  Card,
  CardImg,
  CardHeader,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardText,
  ListGroup,
  ListGroupItem,
  Badge,
} from 'reactstrap';
import Link from 'react-router-dom/Link';

import { videos as videosAction } from 'Actions';

import UserLayout from '../../imports/pages/user/UserLayout';
// import VideoList from '../../imports/pages/user/_components/VideoList';

class VideoListPage extends Component {
  static propTypes = {
    user: PropTypes.shape({}),
    channels: PropTypes.array,
  }

  static defaultProps = {
    user: {},
    channels: {},
  }

  static async fetchData(location, store) {

  }

  componentWillMount() {
    const {
      channels,
      computedMatch,
      fetchVideos,
    } = this.props;
    const channel = _.find(channels, { name: computedMatch.params.name });

    if (channel) {
      fetchVideos(channel.id);
    }
  }

  render() {
    const {
      user,
      channels,
      computedMatch,
      fetchVideos,
    } = this.props;

    const name = computedMatch.params.name;
    const channel = _.find(channels, { name: computedMatch.params.name });

    if (!channel) {
      return <div />;
    }

    return (
      <UserLayout channel={channel}>
        Live page
      </UserLayout>
    );

    // return (
    //   <Container className="h-100 p-0" fluid={true}>
    //     <Row className="h-100 m-0 no-gutters">
    //       <Col className="mh-100" style={{ overflow: 'auto' }}>
    //         <Pagination className="justify-content-center mt-3">
    //           <PaginationItem disabled>
    //             <PaginationLink previous href="#" />
    //           </PaginationItem>
    //           <PaginationItem active>
    //             <PaginationLink href="1">1</PaginationLink>
    //           </PaginationItem>
    //           <PaginationItem>
    //             <PaginationLink href="#">2</PaginationLink>
    //           </PaginationItem>
    //           <PaginationItem>
    //             <PaginationLink href="#">3</PaginationLink>
    //           </PaginationItem>
    //           <PaginationItem>
    //             <PaginationLink next href="#" />
    //           </PaginationItem>
    //         </Pagination>
    //         <VideoList channel={channel} videos={channel.videos} />
    //       </Col>
    //       <Col className="mh-100 border border-top-0 border-right-0 border-bottom-0" xs="2" style={{ overflow: 'auto' }}>
    //         <Card className="rounded-0 border-0">
    //           <CardBody>
    //             <CardTitle>{channel.displayName}</CardTitle>
    //             <CardSubtitle>
    //               <small className="text-muted">{channel.streaming ? channel.streamInfo.game : 'Offline'}</small>
    //             </CardSubtitle>
    //           </CardBody>
    //           <CardImg className="rounded-0" src={channel.logo} />
    //           <ListGroup flush={true}>
    //             <Link className="list-group-item rounded-0" to={`${channel.name}/live`}>Live</Link>
    //             <Link className="list-group-item rounded-0" to={`${channel.name}/videos`}>Videos</Link>
    //             <Link className="list-group-item rounded-0" to={`${channel.name}/clips`}>Clips</Link>
    //             <Link className="list-group-item rounded-0" to={`${channel.name}/followers`}>Followers</Link>
    //             <Link className="list-group-item rounded-0" to={`${channel.name}/followed`}>Followed</Link>
    //           </ListGroup>
    //         </Card>
    //       </Col>
    //     </Row>
    //   </Container>
    // );
  }
}

const mapStateToProps = ({ root: state }) => ({
  user: state.user,
  channels: state.channels,
});

const mapDispatchToProps = dispatch => ({
  fetchVideos: channelId => dispatch(videosAction.request(channelId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(VideoListPage);
