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

    const createCronExpression = (text, description) => ({ text, description })

    const cronExpressionsList = [
        createCronExpression("* * * * *", "Every minute"),
        createCronExpression("*/2 * * * *", "Every 2 minutes"),
        createCronExpression("*/10 * * * *", "Every 10 minutes"),
        createCronExpression("0 * * * *", "Every hour at minute 0"),
        createCronExpression("17 * * * *", "Every hour at minute 17"),
        createCronExpression("0 0 * * *", "Every day at 00:00"),
        createCronExpression("37 21 * * *", "Every day at 21:37"),
        createCronExpression("37 21 * * 1", "Every monday at 21:37"),
        createCronExpression("37 21 2 * *", "Every second day of each month at 21:37"),
        createCronExpression("37 21 2 4 *", "Every second day of april at 21:37"),
    ];





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
                {cronExpressionsList.map(cronExpression => <CronExample
                    onCronExpressionExampleClicked={handleCronExpressionExampleClicked}
                    cronExpression={cronExpression.text}
                    cronExpressionDescription={cronExpression.description} />)}

            </Grid>


        </Stack>
    )
}
