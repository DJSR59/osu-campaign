import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import BeatmapInfo from './Beatmap.js';
import {Container, Row, Col, Modal, ModalHeader, ModalBody, ModalFooter, Button, FormGroup, Form, Label, Input} from 'reactstrap';

class Application extends React.Component
{
  constructor(props)
  {
    super(props);
    this.state = {
      BeatmapInfo: ["title", "artist", "mapper", "diff name", 0.0, "map link"],
      isAddMenuOpen: false,
    };

    this.onAddBeatmapChange = this.onAddBeatmapChange.bind(this);

    this.newBeatmap = new Map();
    this.newBeatmap.set("Title", "");
    this.newBeatmap.set("Artist", "");
    this.newBeatmap.set("Mapper", "");
    this.newBeatmap.set("Difficulty Name", "");
    this.newBeatmap.set("Star Rating", "");
    this.newBeatmap.set("Map Link", "");
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

  onAddBeatmapChange(event)
  {
    this.newBeatmap.set(event.target.id, event.target.value);
  }

  displayAddBeatmapMenu()
  {
    let fields = ["Title", "Artist", "Mapper", "Difficulty Name", "Star Rating", "Map Link"];
    let formGroups = [];

    for (let i = 0; i < fields.length; i++)
    {
      formGroups.push(
        <FormGroup row>
          <Label
            for={fields[i]}
            sm={4}
          >
            {fields[i]}
          </Label>
          <Col sm={8}>
            <Input
              id={fields[i]}
              name={fields[i]}
              placeholder={fields[i]}
              type="text"
              onChange={this.onAddBeatmapChange}
            />
          </Col>
        </FormGroup>
      );
    }

    return(
      <Modal
        isOpen={this.state.isAddMenuOpen}
      >
        <ModalHeader>
          Add a Beatmap
        </ModalHeader>
        <ModalBody>
        <Form onSubmit={function noRefCheck(){}}>
          {formGroups}
        </Form>
        </ModalBody>
        <ModalFooter>
          <Button onClick={() => this.toggleAddBeatmapMenu()}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    );
  }

  toggleAddBeatmapMenu()
  {
    if (this.state.isAddMenuOpen === false)
      this.setState({isAddMenuOpen: true});
    else
      this.setState({isAddMenuOpen: false});
  }

  render()
  {
    let beatmaps = this.displayBeatmaps();
    let addMenu = this.displayAddBeatmapMenu();

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
          <button
            onClick={() => this.toggleAddBeatmapMenu()}
          >
            Add Beatmap
          </button>
          {addMenu}
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
