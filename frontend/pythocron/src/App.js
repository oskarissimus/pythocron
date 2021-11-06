import React from 'react';
import { createTheme, ThemeProvider, responsiveFontSizes } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/theme-github";
import TopAppBar from './TopAppBar';
import AddPythocron from './AddPythocron';


let theme = createTheme({
  palette: {
    background: {
      default: '#eee',
    },
  },
});
theme = responsiveFontSizes(theme);

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      code: `from datetime import datetime
print(datetime.now())
print("Hello pythocron!")
`,
      cronExpression: "* * * * *",
      loading: false,
      pythocronSent: false,
      pythocronUploadSuccess: false,
      pythocronId: null,
      enableLogsAutoRefresh: false
    }
  }

  handleDeployClicked = event => {
    this.setState({ loading: true, pythocronSent: true })
    const data = {
      script: this.state.code,
      schedule: this.state.cronExpression
    }
    fetch(`${process.env.REACT_APP_PYTHOCRON_BACKEND_URL}/pythocrons`, {
      body: JSON.stringify(data),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      method: "POST"
    })
      .then(response => response.json())
      .then(data => {
        this.setState({ loading: false, pythocronUploadSuccess: true, pythocronId: data.pythocron_id, enableLogsAutoRefresh: true })
        console.log(data)
      });
  }
  onCodeChange = code => {
    this.setState({ code })
  }
  handleCronExpressionUpdate = cronExpression => {
    this.setState({ cronExpression })
  }
  buttonColorSwitch = (pythocronSent, pythocronUploadSuccess) => {
    if (pythocronSent && pythocronUploadSuccess) return "success"
    else if (pythocronSent && !pythocronUploadSuccess) return "error"
    else return "secondary"

  }
  render() {


    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <TopAppBar />
        <AddPythocron />
      </ThemeProvider>
    );
  }
}
export default App;
