import React from 'react';
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
const code = `from datetime import datetime
print(datetime.now())
`;

const theme = createTheme({
  palette: {
    background: {
      default: '#eee',
    },
  }
});


class App extends React.Component {
  state = { code };
  onChange = newValue => {
    console.log("change", newValue);
  }
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
              <Typography variant="h2" sx={{ textAlign: "center" }} >
                Code
              </Typography>

              <AceEditor
                mode="python"
                theme="github"
                onChange={this.onChange}
                name="UNIQUE_ID_OF_DIV"
                editorProps={{ $blockScrolling: true }}
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
            <Button variant="contained" color="secondary" sx={{ width: 1, fontSize: 200 }}>
              Deploy
            </Button>
          </Grid>

        </Grid>


      </ThemeProvider>
    );
  }
}
export default App;
