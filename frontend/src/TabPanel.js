import React from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { AppBar, Tabs, Tab, Box } from '@material-ui/core';


function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div role="tabpanel"
             hidden={value !== index}
             id={`full-width-tabpanel-${index}`}
             aria-labelledby={`full-width-tab-${index}`}
             {...other}
        >
        {
            value === index && (
            <Box p={3}>
                {children}
            </Box>)
        }
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: '#1b212c',
        width: '100%',
    },
}));

export default function FullWidthTabs(props) {
    const classes = useStyles();
    const theme = useTheme();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChangeIndex = (index) => {
        setValue(index);
    };

    return (
        <div className={classes.root}>
            <AppBar position="static" style={{ background: '#373c45' }}>
                <Tabs
                value={value}
                onChange={handleChange}
                indicatorColor="primary"
                textColor="primary"
                variant="fullWidth"
                aria-label="full width tabs example"
                >
                    {props.inner.map((x, i) =>
                        <Tab key={i} label={x.label} {...a11yProps(i)} style={{ color: '#FFF' }}/>
                    )}
                </Tabs>
            </AppBar>
            <SwipeableViews
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                index={value}
                onChangeIndex={handleChangeIndex}
                >
                {
                    props.inner.map((x, i) => {{
                        return <TabPanel key={i} value={value} index={i} dir={theme.direction} children={x.component} />
                    }})
                }
            </SwipeableViews>
        </div>
    );
}
