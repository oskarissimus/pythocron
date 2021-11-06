import Typography from '@mui/material/Typography';
import React from 'react';
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/theme-github";
export default function CodeSection(props) {
    return (
        <React.Fragment>

            <Typography variant="h2" sx={{ mb: 3, textAlign: { xs: "left", sm: "center" } }} >
                Code
            </Typography>

            <AceEditor
                mode="python"
                theme="github"
                onChange={props.onCodeChange}
                name="UNIQUE_ID_OF_DIV"
                editorProps={{ $blockScrolling: true }}
                value={props.code}
                fontSize={16}
                width="100%"
            />
        </React.Fragment>
    )
}