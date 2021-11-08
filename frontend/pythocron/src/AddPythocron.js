import React, { useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";

import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import LoadingButton from '@mui/lab/LoadingButton';
import CircularProgress from '@mui/material/CircularProgress';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

import CronSection from "./CronSection"
import LogsSection from './LogsSection';
import CodeSection from './CodeSection';
import TopAppBar from './TopAppBar';
import { getAttrFromLocationState } from './utils';


export default function AddPythocron(props) {
    const [code, setCode] = React.useState(`from datetime import datetime
print(datetime.now())
print("Hello pythocron!")
`)
    const [cronExpression, setCronExpression] = useState("* * * * *")
    const [loading, setLoading] = useState(false)
    const [pythocronId, setPythocronId] = useState(null)
    const [deleteSuccessSnackbarOpen, setDeleteSuccessSnackbarOpen] = useState(true)
    let navigate = useNavigate();
    let location = useLocation();

    const handleDeployClicked = () => {
        setLoading(true)
        const data = {
            script: code,
            schedule: cronExpression
        }
        fetch(`${process.env.REACT_APP_PYTHOCRON_BACKEND_URL}/pythocrons`, {
            body: JSON.stringify(data),
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            method: "POST"
        })
            .then(response => response.json())
            .then(data => {
                setLoading(false)
                setPythocronId(data.pythocron_id)
                navigate(`/${data.pythocron_id}`, { state: { deploySuccessSnackbarOpen: true } });

                console.log(data)
            });
    }

    return (
        <React.Fragment>
            <TopAppBar />

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
                            enableLogsAutoRefresh={false}
                        />
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                    <LoadingButton
                        loading={loading}
                        variant="contained"
                        color="secondary"
                        sx={{ width: 1, fontSize: { xs: 50, sm: 100, md: 150, lg: 200 } }}
                        onClick={handleDeployClicked}
                        loadingIndicator={<CircularProgress color="inherit" size={200} />}
                    >
                        Deploy
                    </LoadingButton>

                </Grid>
            </Grid>
            <Snackbar
                open={getAttrFromLocationState(location.state, "deleteSuccessSnackbarOpen") && deleteSuccessSnackbarOpen}
            >
                <Alert onClose={() => setDeleteSuccessSnackbarOpen(false)} severity="success" sx={{ width: '100%' }}>
                    Your pythocron was deleted successfully!
                </Alert>
            </Snackbar>

        </React.Fragment>
    );
}