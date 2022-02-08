import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import BeatmapInfo from './Beatmap.js';
import {Container, Row, Col, Modal, ModalHeader, ModalBody, FormGroup, Form, Label, Input} from 'reactstrap';

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
    this.onAddBeatmapSubmit = this.onAddBeatmapSubmit.bind(this);

    this.newBeatmap = new Map();
    this.resetNewBeatmapMap();
  }

  resetNewBeatmapMap()
  {
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
    .then ((jsonOutput) => { this.updateData(jsonOutput); })
    .catch((error) =>{ console.log(error); });
  }

  componentDidMount()
  {
    this.getData();
  }

  onAddBeatmapChange(event)
  {
    this.newBeatmap.set(event.target.id, event.target.value);
  }

  onAddBeatmapSubmit(event)
  {
    fetch("/beatmapinfo", {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=UTF-8" },
      body: JSON.stringify({
        title: this.newBeatmap.get("Title"),
        artist: this.newBeatmap.get("Artist"),
        mapper: this.newBeatmap.get("Mapper"),
        diffName: this.newBeatmap.get("Difficulty Name"),
        starRating: this.newBeatmap.get("Star Rating"),
        mapLink: this.newBeatmap.get("Map Link"),
      })
    })
    .then(response => response.json())
    .then(() => console.log("Beatmap has been added"))
    .then(() => {
  	  return (
  	    fetch("/beatmapinfo")
  	    .then((response) => {return (response.json())})
  	    .then ((jsonOutput) => { this.updateData(jsonOutput); })
      );
    });

    this.toggleAddBeatmapMenu();
    event.preventDefault();
    this.resetNewBeatmapMap();
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
          updateData = {(apiResponse) => this.updateData(apiResponse)}
        />
      )
    }

    return beatmaps;
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
        <Form onSubmit={this.onAddBeatmapSubmit}>
          {formGroups}
          <FormGroup>
            <button
              type="submit"
              children="Add Beatmap"
            />
            <button
              type="button"
              onClick={() => this.toggleAddBeatmapMenu()}
              children="Cancel"
            />
          </FormGroup>
        </Form>
        </ModalBody>
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
