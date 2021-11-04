import React from "react";
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import CronExample from "./CronExample"
import { styled } from '@mui/material/styles';
import cronstrue from 'cronstrue';

class Cron extends React.Component {
    constructor(props) {
        super(props)
        this.state = { cronExpression: "* * * * *" }
    }
    handleCronExpressionUpdate = event => {
        this.setState({ cronExpression: event.target.value })
    }
    handleCronExpressionExampleClicked = cronExpression => {
        this.setState({ cronExpression })
        // console.log("CIPSKO")
    }
    render() {

        const CronExpressionInput = styled(TextField)({
            '& .MuiInputBase-input': {
                fontSize: 40,
                fontFamily: "monospace",
                textAlign: "center"
            },
            '& .MuiFormHelperText-root': {
                fontSize: 20,
                fontFamily: "monospace",
                textAlign: "center"
            }
        });


        return (
            <Stack spacing={3}>
                <Typography variant="h2" sx={{ textAlign: "center" }} >
                    Cron
                </Typography>

                <CronExpressionInput
                    label="Cron expression"
                    variant="outlined"
                    sx={{ width: 1, fontFamily: "monospace", fontSize: 200 }}
                    value={this.state.cronExpression}
                    onChange={this.handleCronExpressionUpdate}
                    helperText={cronstrue.toString(this.state.cronExpression, { verbose: true, use24HourTimeFormat: true })}
                />
                <Typography variant="h5" component="h3">
                    Examples:
                </Typography>
                <Grid
                    container
                    direction="row"
                    justifyContent="flex-start"
                    alignItems="center"
                    columnSpacing={1}
                >
                    <CronExample onCronExpressionExampleClicked={this.handleCronExpressionExampleClicked} cronExpression="* * * * *" cronExpressionDescription="Every minute" />
                    <CronExample onCronExpressionExampleClicked={this.handleCronExpressionExampleClicked} cronExpression="*/2 * * * *" cronExpressionDescription="Every 2 minutes" />
                    <CronExample onCronExpressionExampleClicked={this.handleCronExpressionExampleClicked} cronExpression="*/10 * * * *" cronExpressionDescription="Every 10 minutes" />
                    <CronExample onCronExpressionExampleClicked={this.handleCronExpressionExampleClicked} cronExpression="0 * * * *" cronExpressionDescription="Every hour at minute 0" />
                    <CronExample onCronExpressionExampleClicked={this.handleCronExpressionExampleClicked} cronExpression="17 * * * *" cronExpressionDescription="Every hour at minute 17" />
                    <CronExample onCronExpressionExampleClicked={this.handleCronExpressionExampleClicked} cronExpression="0 0 * * *" cronExpressionDescription="Every day at 00:00" />
                    <CronExample onCronExpressionExampleClicked={this.handleCronExpressionExampleClicked} cronExpression="37 21 * * *" cronExpressionDescription="Every day at 21:37" />
                    <CronExample onCronExpressionExampleClicked={this.handleCronExpressionExampleClicked} cronExpression="37 21 * * 1" cronExpressionDescription="Every monday at 21:37" />
                    <CronExample onCronExpressionExampleClicked={this.handleCronExpressionExampleClicked} cronExpression="37 21 2 * *" cronExpressionDescription="Every second day of each month at 21:37" />
                    <CronExample onCronExpressionExampleClicked={this.handleCronExpressionExampleClicked} cronExpression="37 21 2 4 *" cronExpressionDescription="Every second day of april at 21:37" />

                </Grid>


            </Stack>
        )
    }
}
export default Cron