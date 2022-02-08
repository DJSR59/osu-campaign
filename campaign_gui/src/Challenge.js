import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import {Row, Col} from 'reactstrap';

export default class Challenge extends React.Component
{
  constructor(props)
  {
    super(props);
    this.challengeInfo = []
  }

  updateData(apiResponse)
  {
    this.challengeInfo = apiResponse;
  }

  getChallenges()
  {
    fetch('/challenges/' + this.props.id)
    .then ((jsonOutput) => { this.updateData(jsonOutput); })
    .catch((error) =>{ console.log(error); });
  }

  render()
  {
    this.getChallenges();

    return(
      <div>
        <Row>
          <Col>
            {this.challengeInfo[0]}
          </Col>
          <Col>
            {this.challengeInfo[1]}
          </Col>
          <Col>
            {this.challengeInfo[2]}
          </Col>
          <Col>
            {this.challengeInfo[3]}
          </Col>
        </Row>
      </div>
    );
  }
}
