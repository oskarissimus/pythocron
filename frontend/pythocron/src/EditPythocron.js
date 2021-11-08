import React, { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";

import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

import NoMatch from "./NoMatch";
import TopAppBar from "./TopAppBar";
import CronSection from "./CronSection"
import LogsSection from './LogsSection';
import CodeSection from './CodeSection';
import { getAttrFromLocationState } from './utils';



export default function EditPythocron(props) {
    const [code, setCode] = useState(`from datetime import datetime
print(datetime.now())
print("Hello pythocron!")
`)
    const [cronExpression, setCronExpression] = useState("* * * * *")
    const [deploySuccessSnackbarOpen, setDeploySuccessSnackbarOpen] = useState(true)
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    let { pythocronId } = useParams();
    let navigate = useNavigate();
    let location = useLocation();





    // call fetchPythocronData after component mounts
    useEffect(() => {
        function fetchPythocronData() {
            fetch(`${process.env.REACT_APP_PYTHOCRON_BACKEND_URL}/pythocrons/${pythocronId}`, {
                headers: {
                    Accept: "application/json"
                },
                method: "GET"
            })
                .then(response => response.json())
                .then(data => {
                    setCode(data.script)
                    setCronExpression(data.schedule)
                })
        };
        fetchPythocronData();
    });


    if (!pythocronId) {
        return <NoMatch />;
    }

    const handleConfirmDeleteClicked = () => {
        setShowDeleteConfirmation(false);

        fetch(`${process.env.REACT_APP_PYTHOCRON_BACKEND_URL}/pythocrons/${pythocronId}`, {
            headers: {
                Accept: "application/json"
            },
            method: "DELETE"
        })
            .then(response => response.json())
            .then(data => {
                navigate(`/`, { state: { deleteSuccessSnackbarOpen: true } })
            });
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
                    <Button
                        variant="contained"
                        color="primary"
                        sx={{ width: 1, fontSize: { xs: 40, sm: 60, md: 80, lg: 100 } }}>
                        Update
                    </Button>





                    <Dialog
                        open={showDeleteConfirmation}
                        onClose={() => setShowDeleteConfirmation(false)}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description">
                        <DialogTitle id="alert-dialog-title">
                            Confirm delete
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                Are you sure You want to delete Pythocron: {pythocronId} ?
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => setShowDeleteConfirmation(false)} autoFocus >Cancel</Button>
                            <Button onClick={handleConfirmDeleteClicked} >Confirm</Button>
                        </DialogActions>
                    </Dialog>







                </Grid>
                <Grid item xs={6}>

                    <Button
                        variant="contained"
                        color="error"
                        sx={{ width: 1, fontSize: { xs: 40, sm: 60, md: 80, lg: 100 } }}
                        onClick={() => setShowDeleteConfirmation(true)}>
                        Delete
                    </Button>

                </Grid>
            </Grid>
            <Snackbar
                open={getAttrFromLocationState(location.state, "deploySuccessSnackbarOpen") && deploySuccessSnackbarOpen}
                onClose={() => setDeploySuccessSnackbarOpen(false)}
                autoHideDuration={10000}>
                <Alert
                    onClose={() => setDeploySuccessSnackbarOpen(false)}
                    severity="success"
                    sx={{ width: '100%' }}>
                    Your pythocron was deployed successfully!
                </Alert>
            </Snackbar>
        </React.Fragment>
    );
}