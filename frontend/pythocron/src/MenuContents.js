import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import CodeIcon from '@mui/icons-material/Code';

export default function MenuContents(props) {
    const text = "Pythocrons list"
    const [pythocronsList, setPythocronsList] = useState([])
    useEffect(() => {

        fetch(`${process.env.REACT_APP_PYTHOCRON_BACKEND_URL}/pythocrons`, {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            method: "GET"
        })
            .then(response => response.json())
            .then(data => {
                setPythocronsList(data)
                console.log(data)
            });
    }, [])
    return (
        <Box
            sx={{ width: props.anchor === 'top' || props.anchor === 'bottom' ? 'auto' : 250 }}
            role="presentation"
            onClick={props.toggleDrawer(props.anchor, false)}
            onKeyDown={props.toggleDrawer(props.anchor, false)}
        >

            <List>
                <ListItem key={text}>
                    <ListItemIcon>
                        <CodeIcon />
                    </ListItemIcon>
                    <ListItemText primary={text} />
                </ListItem>
                <List>
                    {pythocronsList.map(pythocronId => (
                        <ListItem sx={{ pl: 4 }} button key={pythocronId}>
                            <ListItemIcon>
                                <CodeIcon />
                            </ListItemIcon>
                            <ListItemText primary={pythocronId} />
                        </ListItem>
                    ))}
                </List>
            </List>
        </Box>
    )
}
