import React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import MenuContents from './MenuContents';
import { Link } from "react-router-dom";
import { styled } from '@mui/material/styles';
const StyledLink = styled(Link)`
    text-decoration: none;
    color: inherit;

    &:focus, &:hover, &:visited, &:link, &:active {
        text-decoration: none;
        color: inherit;
    }
`;

export default function TopAppBar(props) {
    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };


    const anchor = 'left'
    return (
        <React.Fragment key={anchor}>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static" style={{ background: '#535353' }}>
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2 }}
                            onClick={toggleDrawer(anchor, true)}
                        >
                            <MenuIcon />
                        </IconButton>

                        <Typography component="h1" sx={{ fontSize: { xs: 15, sm: 20 }, fontFamily: "monospace", flexGrow: 1 }}>
                            {!props.pythocronId &&
                                <StyledLink style={{ textDecoration: 'none' }} to="/">
                                    Python + Cron = Pythocron
                                </StyledLink>
                            }
                            {props.pythocronId &&
                                <React.Fragment>
                                    <StyledLink to="/">Pythocron:</StyledLink> {props.pythocronId}
                                </React.Fragment>
                            }
                        </Typography>

                        <Button color="inherit">Login</Button>
                    </Toolbar>
                </AppBar>
            </Box>
            <Drawer
                anchor={anchor}
                open={state[anchor]}
                onClose={toggleDrawer(anchor, false)}
            >
                <MenuContents anchor={anchor} toggleDrawer={toggleDrawer} />
            </Drawer>
        </React.Fragment>
    );
}
