import React from 'react';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import LoadingButton from '@mui/lab/LoadingButton';
import CircularProgress from '@mui/material/CircularProgress';
import Collapse from '@mui/material/Collapse';
import Link from '@mui/material/Link';
import AceEditor from "react-ace";
import { styled } from '@mui/material/styles';

import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/theme-github";
import Cron from "./Cron"


const theme = createTheme({
  palette: {
    background: {
      default: '#eee',
    },
  }
});


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      code: `from datetime import datetime
print(datetime.now())
print("cumbucket")
`,
      cronExpression: "* * * * *",
      loading: false,
      pythocronSent: false,
      pythocronUploadSuccess: false,
      fetchedLogs: "Deploy to get logs",
      pythocronId: null
    }
  }
  fetchLogs = () => {
    fetch(`http://localhost:8000/pythocrons/${this.state.pythocronId}/logs`, {
      // fetch(`http://localhost:8000/pythocrons/tu4v/logs`, {
      method: "GET"
    })
      .then(response => {
        if (response.status === 200) return response.json()
        else if (response.status === 404) return "Wait for first code execution to see logs"
      })
      .then(data => {
        this.setState({ fetchedLogs: data })
        console.log(data)
      });
  }
  handleDeployClicked = event => {
    this.setState({ loading: true, pythocronSent: true })
    const data = {
      script: this.state.code,
      schedule: this.state.cronExpression
    }
    fetch("http://localhost:8000/pythocrons", {
      body: JSON.stringify(data),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      method: "POST"
    })
      .then(response => response.json())
      .then(data => {
        this.setState({ loading: false, pythocronUploadSuccess: true, pythocronId: data.pythocron_id })
        this.fetchLogs()
        setInterval(this.fetchLogs, 10000)
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
    const LogsTextField = styled(TextField)({
      '& .MuiInputBase-input': {
        fontFamily: "monospace",
      },
    });

    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Grid container spacing={4} p={4} >
          <Grid item xs={4}>
            <Paper sx={{ p: 3 }}>

              <Cron cronExpression={this.state.cronExpression} onCronExpressionUpdate={this.handleCronExpressionUpdate} />

            </Paper>

          </Grid>
          <Grid item xs={4}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h2" sx={{ mb: 3, textAlign: "center" }} >
                Code
              </Typography>

              <AceEditor
                mode="python"
                theme="github"
                onChange={this.onCodeChange}
                name="UNIQUE_ID_OF_DIV"
                editorProps={{ $blockScrolling: true }}
                value={this.state.code}
                fontSize={16}
              />

            </Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h2" sx={{ mb: 3, textAlign: "center" }} >
                Logs
              </Typography>
              {this.state.pythocronSent && this.state.pythocronUploadSuccess &&
                <Typography variant="body2">

                  get logs in raw format from:&nbsp;
                  <Link target="_blank" href={`http://localhost:8000/pythocrons/${this.state.pythocronId}/logs`}>
                    http://localhost:8000/pythocrons/{this.state.pythocronId}/logs
                  </Link>


                </Typography>}
              <LogsTextField
                fullWidth
                multiline
                disabled
                rows={20}
                value={this.state.fetchedLogs}
              />
            </Paper>
          </Grid>

          <Grid item xs={12}>
            <Collapse in={!this.state.pythocronUploadSuccess}>
              <LoadingButton
                loading={this.state.loading}
                variant="contained"
                color={this.buttonColorSwitch(this.state.pythocronSent, this.state.pythocronUploadSuccess)}
                sx={{ width: 1, fontSize: 200 }}
                onClick={this.handleDeployClicked}
                loadingIndicator={<CircularProgress color="inherit" size={200} />}
              >
                Deploy
              </LoadingButton>
            </Collapse>
          </Grid>

          <React.Fragment>

            <Grid item xs={6}>
              <Collapse in={this.state.pythocronSent && this.state.pythocronUploadSuccess}>

                <LoadingButton
                  loading={this.state.loading}
                  variant="contained"
                  color="primary"
                  sx={{ width: 1, fontSize: 100 }}
                  loadingIndicator={<CircularProgress color="inherit" size={200} />}
                >
                  Update
                </LoadingButton>
              </Collapse>
            </Grid>
            <Grid item xs={6}>
              <Collapse in={this.state.pythocronSent && this.state.pythocronUploadSuccess}>

                <LoadingButton
                  loading={this.state.loading}
                  variant="contained"
                  color="error"
                  sx={{ width: 1, fontSize: 100 }}
                  loadingIndicator={<CircularProgress color="inherit" size={200} />}
                >
                  Delete
                </LoadingButton>
              </Collapse>

            </Grid>


          </React.Fragment>


        </Grid>


      </ThemeProvider>
    );
  }
}
export default App;