import React, { useState, useEffect } from "react";
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';

export default function LogsSection(props) {
    const [logs, setLogs] = useState("Deploy to get logs");

    // invoke setInterval only when props.enableLogsAutoRefresh is true
    useEffect(() => {
        if (props.enableLogsAutoRefresh) {

            const interval = setInterval(() => {
                fetch(`${process.env.REACT_APP_PYTHOCRON_BACKEND_URL}/pythocrons/${props.pythocronId}/logs`, {
                    method: "GET"
                })

                    .then(response => {
                        if (response.status === 200) return response.json()
                        else if (response.status === 404) return "Wait for first code execution to see logs"
                    })
                    .then(data => {
                        setLogs(data)
                        console.log(data)
                    });
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [props.enableLogsAutoRefresh, props.pythocronId]);


    const LogsTextField = styled(TextField)({
        '& .MuiInputBase-root.Mui-disabled textarea': {
            fontFamily: "monospace",
            color: "black",
            WebkitTextFillColor: "black"
        },
    });
    return (
        <React.Fragment>

            <Typography variant="h2" sx={{ mb: 3, textAlign: "center" }} >
                Logs
            </Typography>
            {props.pythocronSent && props.pythocronUploadSuccess &&
                <Typography variant="body2">

                    get logs in raw format from:&nbsp;
                    <Link target="_blank" href={`${process.env.REACT_APP_PYTHOCRON_BACKEND_URL}/pythocrons/${props.pythocronId}/logs`}>
                        {process.env.REACT_APP_PYTHOCRON_BACKEND_URL}/pythocrons/{props.pythocronId}/logs
                    </Link>


                </Typography>}
            <LogsTextField
                fullWidth
                multiline
                disabled
                rows={20}
                value={logs}
            />


        </React.Fragment>
    )
}