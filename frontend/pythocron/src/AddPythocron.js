import React from 'react';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import LoadingButton from '@mui/lab/LoadingButton';
import CircularProgress from '@mui/material/CircularProgress';
import Collapse from '@mui/material/Collapse';

import CronSection from "./CronSection"
import LogsSection from './LogsSection';
import CodeSection from './CodeSection';

export default function AddPythocron(props) {
    const [code, setCode] = React.useState(`from datetime import datetime
print(datetime.now())
print("Hello pythocron!")
`)
    const [cronExpression, setCronExpression] = React.useState("* * * * *")
    const [loading, setLoading] = React.useState(false)
    const [pythocronSent, setPythocronSent] = React.useState(false)
    const [pythocronUploadSuccess, setPythocronUploadSuccess] = React.useState(false)
    const [pythocronId, setPythocronId] = React.useState(null)
    const [enableLogsAutoRefresh, setEnableLogsAutoRefresh] = React.useState(false)

    const handleDeployClicked = () => {
        setLoading(true)
        setPythocronSent(true)
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
                setPythocronUploadSuccess(true)
                setPythocronId(data.pythocron_id)
                setEnableLogsAutoRefresh(true)
                console.log(data)
            });
    }
    const onCodeChange = (code) => {
        setCode(code)
    }
    const handleCronExpressionUpdate = (cronExpression) => {
        setCronExpression(cronExpression)
    }
    const buttonColorSwitch = (pythocronSent, pythocronUploadSuccess) => {
        if (pythocronSent && pythocronUploadSuccess) return "success"
        else if (pythocronSent && !pythocronUploadSuccess) return "error"
        else return "secondary"

    }
    return (
        <Grid container spacing={{ xs: 1, sm: 2 }} p={{ xs: 1, sm: 2 }} >
            <Grid item xs={12} md={6} lg={4}>
                <Paper sx={{ p: 3 }}>
                    <CronSection
                        cronExpression={cronExpression}
                        onCronExpressionUpdate={handleCronExpressionUpdate} />
                </Paper>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
                <Paper sx={{ p: 3 }}>
                    <CodeSection
                        code={code}
                        onCodeChange={onCodeChange} />
                </Paper>
            </Grid>
            <Grid item xs={12} lg={4}>
                <Paper sx={{ p: 3 }}>
                    <LogsSection
                        pythocronSent={pythocronSent}
                        pythocronUploadSuccess={pythocronUploadSuccess}
                        pythocronId={pythocronId}
                        enableLogsAutoRefresh={enableLogsAutoRefresh}
                    />
                </Paper>
            </Grid>
            <Grid item xs={12}>
                <Collapse in={!pythocronUploadSuccess}>
                    <LoadingButton
                        loading={loading}
                        variant="contained"
                        color={buttonColorSwitch(pythocronSent, pythocronUploadSuccess)}
                        sx={{ width: 1, fontSize: { xs: 50, sm: 100, md: 150, lg: 200 } }}
                        onClick={handleDeployClicked}
                        loadingIndicator={<CircularProgress color="inherit" size={200} />}
                    >
                        Deploy
                    </LoadingButton>
                </Collapse>
            </Grid>
        </Grid>
    );
}