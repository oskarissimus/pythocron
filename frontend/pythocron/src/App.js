import React from 'react';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-python';
import "prismjs/themes/prism.css"; //Example style, you can use another
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Cron from 'react-cron-generator'
import 'react-cron-generator/dist/cron-builder.css'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Typography } from '@mui/material';

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

  render() {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Grid container spacing={4} p={4} >
          <Grid item xs={4}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h2" sx={{ textAlign: "center" }} >
                Cron
              </Typography>


              <Cron
                onChange={(e) => { this.setState({ value: e }); }}
                value={this.state.value}
                showResultText={true}
                showResultCron={true}
              />
            </Paper>

          </Grid>
          <Grid item xs={4}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h2" sx={{ textAlign: "center" }} >
                Code
              </Typography>

              <Editor
                value={this.state.code}
                onValueChange={code => this.setState({ code })}
                highlight={code => highlight(code, languages.python)}
                padding={10}
                style={{
                  fontFamily: '"Fira code", "Fira Mono", monospace',
                  fontSize: 12,
                }}
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
