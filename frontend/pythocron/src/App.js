import React, { useImperativeHandle } from 'react';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import AceEditor from "react-ace";
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
      `
    }
  }
  handleDeployClicked = event => {
    console.log(this.state.code)
  }
  onCodeChange = code => {
    // console.log("change", code);
    this.setState({ code })
  }
  handleDeployClicked
  render() {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Grid container spacing={4} p={4} >
          <Grid item xs={4}>
            <Paper sx={{ p: 3 }}>

              <Cron />

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
              />

            </Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h2" sx={{ textAlign: "center" }} >
                Logs
              </Typography>
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
