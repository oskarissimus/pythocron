import React from "react";
import Typography from '@mui/material/Typography';
import Button from "@mui/material/Button";
import Grid from '@mui/material/Grid';

export default function CronExample(props) {
    return (
        <React.Fragment>

            <Grid item xs={4} sm={3} lg={4} xl={3} textAlign="right">
                <Button size="small" onClick={event => props.onCronExpressionExampleClicked(props.cronExpression)}>
                    {props.cronExpression}
                </Button>
            </Grid>

            <Grid item xs={8} sm={9} lg={8} xl={9}>

                <Typography variant="body2">
                    {props.cronExpressionDescription}
                </Typography>
            </Grid>

        </React.Fragment>
    )
}
