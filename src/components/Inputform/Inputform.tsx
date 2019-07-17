import './Inputform.css'
import React, { Component, FormEvent } from 'react';
import { Button, Form, FormGroup, Label, Input, Row, Col } from 'reactstrap';
import Select from 'react-select';
import { ValueType } from 'react-select/src/types';
import itemMinecraftNameOptions from '../Inputform/itemMinecraftNameOptions';

type OptionType = { value: string; label: string };

interface InputformProps {
    updateData: (buyOrSell: string, itemName: string, itemMinecraftName: string, itemNumber: string, amount: string, taler: string, groschen: string) => void;
}

interface InputformState {
    buyOrSell: string;
    itemName: string,
    itemMinecraftName: string,
    itemNumber: string,
    amount: string;
    taler: string;
    groschen: string;
}

const buyOrSellOptions = [
    { value: 'buy', label: 'Kaufen' },
    { value: 'sell', label: 'Verkaufen' }
];

class Inputform extends Component<InputformProps, InputformState> {
    state: InputformState;

    constructor(props: InputformProps) {
        super(props);
        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.onitemMinecraftNameChange = this.onitemMinecraftNameChange.bind(this);
        this.onBuyOrSellChange = this.onBuyOrSellChange.bind(this);
        this.state = {
          buyOrSell: '',
          itemName: '',
          itemMinecraftName: '',
          itemNumber: '',
          amount: '',
          taler: '',
          groschen: ''
        };
    }

    onFormSubmit(event: FormEvent) {
        event.preventDefault();
        this.props.updateData(this.state.buyOrSell,
            this.state.itemName,
            this.state.itemMinecraftName,
            this.state.itemNumber,
            this.state.amount,
            this.state.taler,
            this.state.groschen);
    }

    onitemMinecraftNameChange(selectedOption: ValueType<OptionType>) {
        const itemMinecraftName = (selectedOption as OptionType).label
        const itemNumber = (selectedOption as OptionType).value
        this.setState({itemMinecraftName: itemMinecraftName, itemNumber: itemNumber})
    }

    onBuyOrSellChange(selectedOption: ValueType<OptionType>) {
        const buyOrSell = (selectedOption as OptionType).value
        this.setState({buyOrSell: buyOrSell})
    }

    render() { 
        return (
            <Form onSubmit={this.onFormSubmit}>
                <FormGroup id="select-buyorsell">
                    <Label for="buy-or-sell">Hier kann der Spieler:</Label>
                    <Select
                        id="buyorsell"
                        options={buyOrSellOptions}
                        onChange={(selectedOption: ValueType<OptionType>) => {this.onBuyOrSellChange(selectedOption)}}
                        required>
                    </Select>
                </FormGroup>
                <FormGroup id="select-itemMinecraftName">
                    <Label for="item-minecraft-name">Minecraft Item:</Label>
                    <Select
                        id="item-minecraft-name"
                        isSearchable
                        options={itemMinecraftNameOptions}
                        onChange={(selectedOption: ValueType<OptionType>) => {this.onitemMinecraftNameChange(selectedOption)}}
                        required>
                    </Select>
                </FormGroup>
                <FormGroup>
                    <Label for="itemName">Eigener Itemname:</Label>
                    <Input name="itemName" id="itemName" placeholder="Eigener Item Name" onChange={e => this.setState({itemName : e.target.value })} required/>
                </FormGroup>
                <FormGroup>
                    <Label for="mengeninput">Menge:</Label>
                    <Input type="number" name="menge" id="mengeninput" min="0" max="127" placeholder="Menge der Items" onChange={e => this.setState({ amount: e.target.value })} required/>
                </FormGroup>
                <Row form="true">
                    <Col md="6">
                        <FormGroup>
                            <Label for="talerinput">Taler:</Label>
                            <Input type="number" name="taler" id="talerinput" min="0" placeholder="Anzahl an Talern" onChange={e => this.setState({ taler: e.target.value })} required/>
                        </FormGroup>
                    </Col>
                    <Col md="6">
                        <FormGroup>
                            <Label for="groscheninput">Groschen:</Label>
                            <Input type="number" name="groschen" id="groscheninput" min="0" placeholder="Anzahl an Groschen" onChange={e => this.setState({ groschen: e.target.value })} required/>
                        </FormGroup>
                    </Col>
                </Row>
                <Button>Submit</Button>
            </Form>
        );
    }
}

export default Inputform;
