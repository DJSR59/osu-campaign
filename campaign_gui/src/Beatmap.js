import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import {Row, Col, Modal, ModalBody, ModalHeader} from 'reactstrap';

export default class BeatmapInfo extends React.Component
{
  constructor(props)
  {
    super(props);
    this.state = {
      isDeleteMenuOpen: false,
    }
  }

  deleteBeatmap()
  {
    fetch("/beatmapinfo/" + this.props.id, { method: "DELETE" })
    .then(response => response.json())
    .then(() => console.log("Beatmap has been deleted"))
    .then(() => {
  	  return (
	      fetch('/beatmapinfo')
	      .then((response) => {return (response.json())})
	      .then ((jsonOutput) =>{ this.props.updateData(jsonOutput); })
      );
    });

    this.toggleDeleteBeatmapMenu();
  }

  displayDeleteBeatmapMenu()
  {
    return(
      <Modal
        isOpen={this.state.isDeleteMenuOpen}
      >
        <ModalHeader>
          Are you sure you want to delete this beatmap?
        </ModalHeader>
        <ModalBody>
          <button
            onClick={() => this.deleteBeatmap()}
            children="Delete"
          />
          <button
            onClick={() => this.toggleDeleteBeatmapMenu()}
            children="Cancel"
          />
        </ModalBody>
      </Modal>
    );
  }

  toggleDeleteBeatmapMenu()
  {
    if (this.state.isDeleteMenuOpen === false)
      this.setState({isDeleteMenuOpen: true});
    else
      this.setState({isDeleteMenuOpen: false});
  }

  render()
  {
    let deleteMenu = this.displayDeleteBeatmapMenu();

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
            <Col>
              <button
                className="button"
                onClick={() => this.toggleDeleteBeatmapMenu()}
                children="Delete"
              />
              {deleteMenu}
            </Col>
          </Row>
      </div>
    )
  }
}
