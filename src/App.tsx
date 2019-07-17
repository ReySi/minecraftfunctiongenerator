import React, { Component } from 'react';
import Header from './components/Header';
import Inputform from './components/Inputform';
import Output from './components/Output';
import {Container, Col, Row} from 'reactstrap'
import './App.css'

interface AppState {
  buyOrSell: string;
  itemName: string;
  itemMinecraftName : string;
  itemNumber: string;
  amount: string;
  taler: string;
  groschen: string;
  newInputData: boolean;
}

class App extends Component<object, object> {

  state: AppState;
  constructor(props: object) {
      super(props);
      this.updateData = this.updateData.bind(this);
      this.returnToForm = this.returnToForm.bind(this);
      this.state = {
        buyOrSell: '',
        itemName: '',
        itemMinecraftName: '',
        itemNumber: '',
        amount: '',
        taler: '',
        groschen: '',
        newInputData: false
      };
  }

  updateData(buyOrSell: string, itemName: string, itemMinecraftName: string, itemNumber: string, amount: string, taler: string, groschen: string) {
    this.setState({ buyOrSell: buyOrSell, itemName: itemName, itemMinecraftName: itemMinecraftName, itemNumber: itemNumber, amount: amount, taler: taler, groschen: groschen});
    console.log('itemname: ' + itemName)
  }

  returnToForm() {
    this.setState({newInputData: false});
  }

  componentDidUpdate(prevProps: object, prevState: AppState) {
    if (prevState.newInputData === false) {
      this.setState({newInputData: true});
    }
  }


  render() {
    return (
      <div className="App">
        <Container fluid>
          <Row>
            <Header/>
          </Row>
          <div className="spacing"/>
          <Container fluid>
          {this.state.newInputData === false ?
            < Col sm="12" md={{ size: 6, offset: 3 }}>
              <Inputform updateData={this.updateData}></Inputform>
            </Col>
          :
          < Col md={{ size: 8, offset: 2 }}>
            <Output
              buyOrSell={this.state.buyOrSell}
              itemName={this.state.itemName}
              itemMinecraftName={this.state.itemMinecraftName}
              itemNumber={this.state.itemNumber}
              amount={this.state.amount}
              taler={this.state.taler}
              groschen={this.state.groschen}
              returnToForm={this.returnToForm}></Output>
          </Col>
          }
          </Container>
        </Container>
      </div>
    );
  }
}

export default App;