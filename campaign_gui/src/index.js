import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import BeatmapInfo from './Beatmap.js';
import {Container, Row, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';

class Application extends React.Component
{
  constructor(props)
  {
    super(props);
    this.state = {
      BeatmapInfo: ["title", "artist", "mapper", "diff name", 0.0, "map link"],
    };
  }

  updateData(apiResponse)
  {
    this.setState({BeatmapInfo: apiResponse});
  }

  getData()
  {
    fetch('/beatmapinfo')
    .then((response) => { return (response.json()); })
    .then ((jsonOutput) =>{ this.updateData(jsonOutput); })
    .catch((error) =>
    {
      console.log(error);
    })
  }

  componentDidMount()
  {
    this.getData();
  }

  displayBeatmaps()
  {
    let beatmaps = [];

    for (let i = 0; i < this.state.BeatmapInfo.length; i++)
    {
      beatmaps.push(
        <BeatmapInfo
          id = {this.state.BeatmapInfo[i][0]}
          title = {this.state.BeatmapInfo[i][1]}
          artist= {this.state.BeatmapInfo[i][2]}
          mapper = {this.state.BeatmapInfo[i][3]}
          diffName = {this.state.BeatmapInfo[i][4]}
          starRating = {this.state.BeatmapInfo[i][5]}
          mapLink = {this.state.BeatmapInfo[i][6]}
        />
      )
    }

    return beatmaps;
  }

  render()
  {
    let beatmaps = this.displayBeatmaps();

    return (
      <div>
        <Container>
          <Row>
            <h1>
              Osu! Campaign
            </h1>
            <h3>
              A collection of songs that will make you on your way to become an osu! champion!
            </h3>
          </Row>
          {beatmaps}
        </Container>
      </div>
    )
  }
}

// ========================================

ReactDOM.render(
  <Application />,
  document.getElementById('root')
);
