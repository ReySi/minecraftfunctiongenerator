import './Inputform.css'
import React, { Component, FormEvent } from 'react';
import { Button, Form, FormGroup, Label, Input, Row, Col } from 'reactstrap';

interface InputformProps {
    updateData: (buyorsell: string, itemname: string, amount: string, taler: string, groschen: string) => void;
}

interface InputformState {
    buyorsell: string;
    itemname: string;
    amount: string;
    taler: string;
    groschen: string;
}

class Inputform extends Component<InputformProps, InputformState> {
    state: InputformState;

    constructor(props: InputformProps) {
        super(props);
        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.state = {
          buyorsell: '',
          itemname: '',
          amount: '',
          taler: '',
          groschen: ''
        };
    }

    onFormSubmit(event: FormEvent) {
        event.preventDefault();
        this.props.updateData(this.state.buyorsell, this.state.itemname, this.state.amount, this.state.taler, this.state.groschen);
    }

    render() { 
        return (
            <Form onSubmit={this.onFormSubmit}>
                <FormGroup id="select">
                    <Label for="exampleSelect">Kaufen / Verkaufen</Label>
                    <Input type="select" name="select" id="select" onChange={e => this.setState({ buyorsell: e.target.value })}>
                        <option>Kaufen</option>
                        <option>Verkaufen</option>
                    </Input>
                </FormGroup>
                <FormGroup>
                    <Label for="itemname">Item-Name</Label>
                    <Input name="itemname" id="itemname" placeholder="Itemname" onChange={e => this.setState({ itemname: e.target.value })}/>
                </FormGroup>
                <FormGroup>
                    <Label for="mengeninput">Menge</Label>
                    <Input type="number" name="menge" id="mengeninput" placeholder="Menge der Items" onChange={e => this.setState({ amount: e.target.value })}/>
                </FormGroup>
                <Row form="true">
                    <Col md="6">
                        <FormGroup>
                            <Label for="talerinput">Taler</Label>
                            <Input type="number" name="taler" id="talerinput" placeholder="Anzahl an Talern" onChange={e => this.setState({ taler: e.target.value })}/>
                        </FormGroup>
                    </Col>
                    <Col md="6">
                        <FormGroup>
                            <Label for="groscheninput">Groschen</Label>
                            <Input type="number" name="groschen" id="groscheninput" placeholder="Anzahl an Groschen" onChange={e => this.setState({ groschen: e.target.value })}/>
                        </FormGroup>
                    </Col>
                </Row>
                <Button>Submit</Button>
            </Form>
        );
    }
}

export default Inputform;
