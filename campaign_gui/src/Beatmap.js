import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import {Row, Col} from 'reactstrap';

export default class BeatmapInfo extends React.Component
{
  render()
  {
    return (
      <div>
          <Row className="d-flex align-items-center justify-content-center">
            <Col>
              {this.props.title}
            </Col>
            <Col>
              {this.props.artist}
            </Col>
            <Col>
              {this.props.mapper}
            </Col>
            <Col>
              {this.props.diffName}
            </Col>
            <Col>
              {this.props.starRating}
            </Col>
            <Col>
              {this.props.mapLink}
            </Col>
          </Row>
      </div>
    )
  }
}
