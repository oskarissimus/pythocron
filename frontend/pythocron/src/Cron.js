import React from "react";
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import CronExample from "./CronExample"
import { styled } from '@mui/material/styles';
import cronstrue from 'cronstrue';



export default function Cron(props) {

    const handleCronExpressionUpdate = event => {
        props.onCronExpressionUpdate(event.target.value)
    }
    const handleCronExpressionExampleClicked = cronExpression => {
        props.onCronExpressionUpdate(cronExpression)
    }

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
                value={props.cronExpression}
                onChange={handleCronExpressionUpdate}
                helperText={cronstrue.toString(props.cronExpression, { verbose: true, use24HourTimeFormat: true })}
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
                <CronExample onCronExpressionExampleClicked={handleCronExpressionExampleClicked} cronExpression="* * * * *" cronExpressionDescription="Every minute" />
                <CronExample onCronExpressionExampleClicked={handleCronExpressionExampleClicked} cronExpression="*/2 * * * *" cronExpressionDescription="Every 2 minutes" />
                <CronExample onCronExpressionExampleClicked={handleCronExpressionExampleClicked} cronExpression="*/10 * * * *" cronExpressionDescription="Every 10 minutes" />
                <CronExample onCronExpressionExampleClicked={handleCronExpressionExampleClicked} cronExpression="0 * * * *" cronExpressionDescription="Every hour at minute 0" />
                <CronExample onCronExpressionExampleClicked={handleCronExpressionExampleClicked} cronExpression="17 * * * *" cronExpressionDescription="Every hour at minute 17" />
                <CronExample onCronExpressionExampleClicked={handleCronExpressionExampleClicked} cronExpression="0 0 * * *" cronExpressionDescription="Every day at 00:00" />
                <CronExample onCronExpressionExampleClicked={handleCronExpressionExampleClicked} cronExpression="37 21 * * *" cronExpressionDescription="Every day at 21:37" />
                <CronExample onCronExpressionExampleClicked={handleCronExpressionExampleClicked} cronExpression="37 21 * * 1" cronExpressionDescription="Every monday at 21:37" />
                <CronExample onCronExpressionExampleClicked={handleCronExpressionExampleClicked} cronExpression="37 21 2 * *" cronExpressionDescription="Every second day of each month at 21:37" />
                <CronExample onCronExpressionExampleClicked={handleCronExpressionExampleClicked} cronExpression="37 21 2 4 *" cronExpressionDescription="Every second day of april at 21:37" />

            </Grid>


        </Stack>
    )
}
