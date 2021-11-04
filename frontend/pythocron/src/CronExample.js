import React from "react";
import Typography from '@mui/material/Typography';
import Button from "@mui/material/Button";
import Grid from '@mui/material/Grid';

class CronExample extends React.Component {
    render() {
        return (
            <React.Fragment>

                <Grid item xs={2} textAlign="right">
                    <Button size="small">
                        {this.props.cronExpression}
                    </Button>
                </Grid>

                <Grid item xs={10} >

                    <Typography variant="body2">
                        {this.props.cronExpressionDescription}
                    </Typography>
                </Grid>

            </React.Fragment>



        )
    }
}
export default CronExample