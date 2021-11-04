import React from "react";
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import CronExample from "./CronExample"
import { styled } from '@mui/material/styles';


class Cron extends React.Component {
    constructor(props) {
        super(props)
        this.state = { cronExpression: "* * * * *" }
    }
    handleCronExpressionUpdate = event => {
        this.setState({ cronExpression: event.target.value })
    }
    handleCronExpressionExamleClicked = event => {
        this.setState({ cronExpression: event.target.text })
    }
    render() {

        const CronExpressionInput = styled(TextField)({
            '& .MuiInputBase-input': {
                fontSize: 40,
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
                    <CronExample cronExpression="* * * * *" cronExpressionDescription="Every minute" />
                    <CronExample cronExpression="*/2 * * * *" cronExpressionDescription="Every 2 minutes" />
                    <CronExample cronExpression="*/10 * * * *" cronExpressionDescription="Every 10 minutes" />
                    <CronExample cronExpression="0 * * * *" cronExpressionDescription="Every hour at minute 0" />
                    <CronExample cronExpression="17 * * * *" cronExpressionDescription="Every hour at minute 17" />
                    <CronExample cronExpression="0 0 * * *" cronExpressionDescription="Every day at 00:00" />

                </Grid>


            </Stack>
        )
    }
}
export default Cron