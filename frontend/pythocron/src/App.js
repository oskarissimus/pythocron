import React from 'react';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
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
      cronExpression: "* * * * *"
    }
  }
  handleDeployClicked = event => {
    console.log(this.state.code)
    console.log(this.state.code)
  }
  onCodeChange = code => {
    // console.log("change", code);
    this.setState({ code })
  }
  handleCronExpressionUpdate = cronExpression => {
    this.setState({ cronExpression })
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
              <LogsTextField
                fullWidth
                multiline
                rows={4}
                defaultValue="Deploy to get logs"
                sx={{ fontFamily: "monospace" }}
              />
            </Paper>
          </Grid>


          <Grid item xs={12}>
            <Button
              variant="contained"
              color="secondary"
              sx={{ width: 1, fontSize: 200 }}
              onClick={this.handleDeployClicked}
            >
              Deploy
            </Button>
          </Grid>

        </Grid>


      </ThemeProvider>
    );
  }
}
export default App;
