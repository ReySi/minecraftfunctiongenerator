import React, { Component } from 'react';
import Header from './components/Header';
import Inputform from './components/Inputform';
import Output from './components/Output';
import {Container, Col, Row} from 'reactstrap'
import './App.css'

interface AppState {
  buyorsell: string;
  itemname: string;
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
        buyorsell: '',
        itemname: '',
        amount: '',
        taler: '',
        groschen: '',
        newInputData: false
      };
  }

  updateData(buyorsell: string, itemname: string, amount: string, taler: string, groschen: string) {
    this.setState({ buyorsell: buyorsell, itemname: itemname, amount: amount, taler: taler, groschen: groschen});
  }

  returnToForm() {
    this.setState({newInputData: false});
    console.log('works')
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
              buyorsell={this.state.buyorsell}
              itemname={this.state.itemname}
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