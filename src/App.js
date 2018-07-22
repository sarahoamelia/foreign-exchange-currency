import React, { Component } from 'react';
import './App.css';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import RemoveIcon from '@material-ui/icons/Remove';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

class App extends Component {
  rates = {};
  base = {};
  constructor(props) {
    super(props);
    this.state = {
      inputCalculate: 1,
      code: '',
      display: [],
      waiting: [],
      selectedValue: ''
    };

  }

  handleChange = event => {
    return this.setState({
      code: event.target.value
    })
  }

  changeCalculate = event => {
    this.setState({
      inputCalculate: event.target.value
    })
    this.calculate(event.target.value, 'display')

  }

  calculate = (number, data) => {
    let display = this.state.display;
    display.map(value => {
      let amount = value.current * number;
      value.amount = amount.toLocaleString();
    });
    return this.updateDisplay(display)
  }

  handleSelect = (event) => {
    return this.setState({
      selectedValue: event.target.value
    })
  }

  handleSubmit = () => {
    let code = this.state.selectedValue;
    let display = this.state.display;
    let waiting = this.state.waiting;
    if (display.length === 0) {
      this.checkIfExistInWaitingList(code, waiting, display)
      this.calculate(this.state.inputCalculate, 'display')
    }

    if (this.getIndex(code, display) === -1) {
      console.log('doesnt exist in display')
      if (this.getIndex(code, waiting) === -1) {
        console.log('doesnt exist in waitinglist')
        // display warning

      }
      else {
        console.log('exist in waitinglist: ', code);
        this.checkIfExistInWaitingList(code, waiting, display);
        this.calculate(this.state.inputCalculate, 'display');
        this.setState({ code: '' })
      }
    }
  }

  checkIfExistInWaitingList(code, waiting, display) {
    let index = this.getIndex(code, waiting);
    if (index > -1) {
      waiting[index].currencyDisplay = waiting[index].current.toLocaleString();
      display.push(waiting[index]);
      waiting.splice(index, 1);
      this.updateDisplay(display);
      this.updateWaiting(waiting);
    }
    else {
      return this.setState({
        selectedValue: "No more Currency"
      })

    }
  }
  
  checkIfExistInDisplayList(code, display, waiting) {
    let index = this.getIndex(code, display);
    waiting.push(display[index]);
    display.splice(index, 1);
    this.updateDisplay(display);
    this.updateWaiting(waiting);
  }

  removeItem(code) {
    let codeChosen = code;
    let display = this.state.display;
    let waiting = this.state.waiting;
    this.checkIfExistInDisplayList(codeChosen, display, waiting)
  }

  getIndex(value, arr) {
    if (arr.length > 0) {
      for (var i = 0; i < arr.length; i++) {
        if (arr[i].code === value) {
          return i;
        }

      }
      return -1;
    }
  }

  componentWillMount() {
    let display = [];
    let waiting = [];
    fetch('https://v3.exchangerate-api.com/bulk/b7689f339cc4d3a97c41c1fa/USD').then(results => {
      return results.json();
    }).then(data => {
      display = [
        {
          code: "IDR",
          currency: "Rupiah",
          current: data.rates.IDR,
          amount: data.rates.IDR.toLocaleString(),
          currencyDisplay: data.rates.IDR.toLocaleString()
        },
        {
          code: "SGD",
          currency: "Singapore Dollar",
          current: data.rates.SGD,
          amount: data.rates.SGD.toLocaleString(),
          currencyDisplay: data.rates.IDR.toLocaleString()
        },
        {
          code: "JPY",
          currency: "Yen",
          current: data.rates.JPY,
          amount: data.rates.JPY.toLocaleString(),
          currencyDisplay: data.rates.IDR.toLocaleString()
        },
        {
          code: "PHP",
          currency: "Philippine Peso",
          current: data.rates.PHP,
          amount: data.rates.PHP.toLocaleString(),
          currencyDisplay: data.rates.IDR.toLocaleString()
        },
        {
          code: "KRW",
          currency: "South Korean Won",
          current: data.rates.KRW,
          amount: data.rates.KRW.toLocaleString(),
          currencyDisplay: data.rates.IDR.toLocaleString()
        },
      ];

      waiting = [
        {
          code: "AUD",
          currency: "Australian Dollar",
          current: data.rates.AUD,
          amount: data.rates.AUD.toLocaleString()
        },
        {
          code: "BGN",
          currency: "Bulgarian Lev",
          current: data.rates.BGN,
          amount: data.rates.BGN.toLocaleString()
        },
        {
          code: "BRL",
          currency: "Brazilian Real",
          current: data.rates.BRL,
          amount: data.rates.BRL.toLocaleString()
        },
        {
          code: "CAD",
          currency: "Canadian Dollar",
          current: data.rates.CAD,
          amount: data.rates.CAD.toLocaleString()
        },
        {
          code: "CHF",
          currency: "Swiss Franc",
          current: data.rates.CHF,
          amount: data.rates.CHF.toLocaleString()
        },
        {
          code: "CNY",
          currency: "Yuan",
          current: data.rates.CNY,
          amount: data.rates.CNY.toLocaleString()
        },
        {
          code: "CZK",
          currency: "Czech Koruna",
          current: data.rates.CZK,
          amount: data.rates.CZK.toLocaleString()
        },
        {
          code: "DKK",
          currency: "Danish Krone",
          current: data.rates.DKK,
          amount: data.rates.DKK.toLocaleString()
        },
        {
          code: "GBP",
          currency: "Pound Sterling",
          current: data.rates.GBP,
          amount: data.rates.GBP.toLocaleString()
        },
        {
          code: "HKD",
          currency: "Hong Kong Dollar",
          current: data.rates.HKD,
          amount: data.rates.HKD.toLocaleString()
        },
      ];
      this.updateDisplay(display);
      this.updateWaiting(waiting);
    })

  }

  updateDisplay(display) {
    this.setState({ display: display })
  }

  updateWaiting(waiting) {
    this.setState({ waiting: waiting })
  }

  render() {
    return (

      <div className="App">
        <header className="App-header">
          <h5>
            USD - United State Dollar
          </h5>
          <Grid container spacing={16}>
            <Grid item xs={4}>
              <h5 className="Base-label">USD</h5>
            </Grid>
            <Grid item xs={4}>
              <TextField
                id="calculate"
                label="Calculate"
                type="number"
                value={this.state.inputCalculate}
                onChange={this.changeCalculate}
                margin="normal"
                className="Input-calculate"
              />
            </Grid>
            <Grid item xs={4}>
              <h5 className="Added-label">.00</h5>
            </Grid>
          </Grid>
        </header>


        <div className="App-list">
          {
            this.state.display.map((data) => {
              return <React.Fragment key={data.code}>
                <List component="nav" >
                  <ListItem>
                    <ListItemText primary={data.code + " - " + data.currency} secondary={"1 USD = " + data.code + " " + data.currencyDisplay} />
                    <ListItemText><h2 className="Currency-display">{data.amount}</h2></ListItemText>
                    <ListItemIcon onClick={() => this.removeItem(data.code)}>
                      <Button><RemoveIcon /></Button>
                    </ListItemIcon>
                  </ListItem>
                </List>
                <Divider />
              </React.Fragment>
            })
          }
          {/* <Notifier /> */}
          <div className="App-more-currencies">
            <FormControl className="Select-currencies">
              <InputLabel htmlFor="add-country">Add More Currencies</InputLabel>
              <Select
                value={this.state.selectedValue}
                onChange={this.handleSelect}
                autoWidth
              >
                {
                  this.state.waiting.map(data => {
                    return <MenuItem key={data.code} className="List-value" value={data.code}>{data.code}</MenuItem>
                  })
                }
              </Select>
              <Button className="Button-submit" variant="contained" onClick={this.handleSubmit} color="primary">
                Submit
          </Button>
            </FormControl>
          </div>
        </div>
      </div>
    );

  }
}

export default App;
