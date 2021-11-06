import React from "react";
import { useParams } from "react-router-dom";
import NoMatch from "./NoMatch";
import TopAppBar from "./TopAppBar";
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import LoadingButton from '@mui/lab/LoadingButton';
import CircularProgress from '@mui/material/CircularProgress';

import CronSection from "./CronSection"
import LogsSection from './LogsSection';
import CodeSection from './CodeSection';





export default function EditPythocron(props) {
    const [code, setCode] = React.useState(`from datetime import datetime
print(datetime.now())
print("Hello pythocron!")
`)
    const [cronExpression, setCronExpression] = React.useState("* * * * *")
    const [loading, setLoading] = React.useState(false)

    let { pythocronId } = useParams();
    if (!pythocronId) {
        return <NoMatch />;
    }

    return (
        <React.Fragment>
            <TopAppBar pythocronId={pythocronId} />

            <Grid container spacing={{ xs: 1, sm: 2 }} p={{ xs: 1, sm: 2 }} >
                <Grid item xs={12} md={6} lg={4}>
                    <Paper sx={{ p: 3 }}>
                        <CronSection
                            cronExpression={cronExpression}
                            onCronExpressionUpdate={setCronExpression} />
                    </Paper>
                </Grid>
                <Grid item xs={12} md={6} lg={4}>
                    <Paper sx={{ p: 3 }}>
                        <CodeSection
                            code={code}
                            onCodeChange={setCode} />
                    </Paper>
                </Grid>
                <Grid item xs={12} lg={4}>
                    <Paper sx={{ p: 3 }}>
                        <LogsSection
                            pythocronId={pythocronId}
                            enableLogsAutoRefresh={true}
                        />
                    </Paper>
                </Grid>
                <Grid item xs={6}>
                    <LoadingButton
                        loading={loading}
                        variant="contained"
                        color="primary"
                        sx={{ width: 1, fontSize: { xs: 40, sm: 60, md: 80, lg: 100 } }}
                        loadingIndicator={<CircularProgress color="inherit" size={{ xs: 40, sm: 60, md: 80, lg: 100 }} />}
                    >
                        Update
                    </LoadingButton>
                </Grid>
                <Grid item xs={6}>

                    <LoadingButton
                        loading={loading}
                        variant="contained"
                        color="error"
                        sx={{ width: 1, fontSize: { xs: 40, sm: 60, md: 80, lg: 100 } }}
                        loadingIndicator={<CircularProgress color="inherit" size={{ xs: 40, sm: 60, md: 80, lg: 100 }} />}
                    >
                        Delete
                    </LoadingButton>

                </Grid>
            </Grid>
        </React.Fragment>
    );
}