import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import CodeIcon from '@mui/icons-material/Code';

export default function MenuContents(props) {
    const text = "Pythocrons list"
    const pythocronsList = ["xdAe", "2137", "jGt6"]
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
                    {pythocronsList.map(text => (
                        <ListItem sx={{ pl: 4 }} button key={text}>
                            <ListItemIcon>
                                <CodeIcon />
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItem>
                    ))}
                </List>
            </List>
        </Box>
    )
}
