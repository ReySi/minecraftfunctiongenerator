import './Output.css'
import React, { Component } from 'react';
import {FormGroup, Label, Input, Button, Row, Container, Col} from 'reactstrap';
import { saveAs } from 'file-saver';

interface OutputProps {
  buyorsell: string;
  itemname: string;
  amount: string;
  taler: string;
  groschen: string;
  returnToForm: () => void;
}

interface OutputState {
    outputText: string;
}

class Output extends Component<OutputProps, OutputState> {

  state: OutputState;
  constructor(props: OutputProps) {
    super(props);
    this.calculateOutput = this.calculateOutput.bind(this);
    this.onReturn = this.onReturn.bind(this);
    this.onDownload = this.onDownload.bind(this);
    this.state = {outputText: ''};
}

  calculateOutput() {
      var result = this.props.buyorsell + ' ' +
        this.props.itemname + ' ' +
        this.props.amount + ' ' +
        this.props.taler + ' ' +
        this.props.groschen
      return result;
  }

  onReturn() {
    this.props.returnToForm()
  }

  onDownload() {
    console.log(this.state.outputText);
    var blob = new Blob([this.state.outputText], {type: "text/plain;charset=utf-8"});
    saveAs(blob, 'function.mcfncn');
  }

  render() {
    var outputtext = this.calculateOutput();
    return (
        <div>
            <Container fluid>
                <Row>
                    <FormGroup id="textform" className="fullwidth">
                        <Label for="outputtext">Output:</Label>
                        <Input type="textarea" name="text" id="outputtext" defaultValue={outputtext} rows="19" onChange={e => this.setState({ outputText: e.target.value })}></Input>
                    </FormGroup>
                </Row>
                <Row>
                    <Col>
                        <Button color="primary" onClick={this.onDownload}>Download</Button>
                    </Col>
                    <Col>
                        <Button onClick={this.onReturn} className="float-right">Return</Button>
                    </Col>
                </Row>
            </Container>
        </div>
    );
  }
}

export default Output;
