import React from "react";
import Typography from '@mui/material/Typography';
import Button from "@mui/material/Button";
import Grid from '@mui/material/Grid';

export default function CronExample(props) {
    return (
        <React.Fragment>

            <Grid item xs={2} textAlign="right">
                <Button size="small" onClick={event => props.onCronExpressionExampleClicked(props.cronExpression)}>
                    {props.cronExpression}
                </Button>
            </Grid>

            <Grid item xs={10} >

                <Typography variant="body2">
                    {props.cronExpressionDescription}
                </Typography>
            </Grid>

        </React.Fragment>
    )
}
