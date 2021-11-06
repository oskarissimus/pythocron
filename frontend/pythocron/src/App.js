import React from 'react';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { createTheme, ThemeProvider, responsiveFontSizes } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import CircularProgress from '@mui/material/CircularProgress';
import Collapse from '@mui/material/Collapse';
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/theme-github";
import Cron from "./Cron"
import LogsSection from './LogsSection';
import TopAppBar from './TopAppBar';


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
        <Grid container spacing={{ xs: 1, sm: 2 }} p={{ xs: 1, sm: 2 }} >
          <Grid item xs={12} md={6} lg={4}>
            <Paper sx={{ p: 3 }}>

              <Cron cronExpression={this.state.cronExpression} onCronExpressionUpdate={this.handleCronExpressionUpdate} />

            </Paper>

          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h2" sx={{ mb: 3, textAlign: { xs: "left", sm: "center" } }} >
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
                width="100%"
              />


            </Paper>
          </Grid>
          <Grid item xs={12} lg={4}>
            <Paper sx={{ p: 3 }}>
              <LogsSection
                pythocronSent={this.state.pythocronSent}
                pythocronUploadSuccess={this.state.pythocronUploadSuccess}
                pythocronId={this.state.pythocronId}
                enableLogsAutoRefresh={this.state.enableLogsAutoRefresh}
              />
            </Paper>
          </Grid>

          <Grid item xs={12}>
            <Collapse in={!this.state.pythocronUploadSuccess}>
              <LoadingButton
                loading={this.state.loading}
                variant="contained"
                color={this.buttonColorSwitch(this.state.pythocronSent, this.state.pythocronUploadSuccess)}
                sx={{ width: 1, fontSize: { xs: 50, sm: 100, md: 150, lg: 200 } }}
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
                  sx={{ width: 1, fontSize: { xs: 40, sm: 60, md: 80, lg: 100 } }}
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
                  sx={{ width: 1, fontSize: { xs: 40, sm: 60, md: 80, lg: 100 } }}
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
