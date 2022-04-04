import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import {Row, Col} from 'reactstrap';

export default class Node extends React.Component
{
  constructor(props)
  {
    super(props);
  }

  render()
  {
    console.log(this.props.beatmapInfo);

    return (
      <div>
          <Row className="d-flex align-items-center justify-content-center">
            <Col>
              {this.props.beatmapInfo[0]}
            </Col>
            <Col>
              {this.props.beatmapInfo[1]}
            </Col>
            <Col>
              {this.props.beatmapInfo[2]}
            </Col>
            <Col>
              {this.props.beatmapInfo[3]}
            </Col>
            <Col>
              {this.props.beatmapInfo[4]}
            </Col>
            <Col>
              {this.props.beatmapInfo[5]}
            </Col>
          </Row>
      </div>
    );
  }
}
