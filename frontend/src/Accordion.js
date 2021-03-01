import React from 'react';
import {
    Accordion, AccordionDetails, AccordionSummary, Typography, Divider,
    makeStyles
} from '@material-ui/core';

import Slider from './Slider'
import './Accordion.css';


const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    accordion: {
        backgroundColor: '#1b212c',
        color: '#DDD',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
    },
    icon: {
        verticalAlign: 'bottom',
        height: 20,
        width: 20,
    },
    column: {
        flexBasis: '50%',
        justifyContent: 'center'
    },
    link: {
        color: theme.palette.primary.main,
        textDecoration: 'none',
        '&:hover': {
            textDecoration: 'underline',
        },
    },
}));

export default function DetailedAccordion() {
  const classes = useStyles();

  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div className={classes.root}>
      <Accordion className={classes.accordion} expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary
          aria-controls="panel1c-content"
          id="panel1c-header"
          style={{backgroundColor: '#373c45'}}
        >
        <Typography className={classes.heading}>OPTIONS</Typography>
        </AccordionSummary>
        <Divider />
        <AccordionDetails id='flexContainer' className={classes.details}>
        <div className={classes.column}>
            <Slider min={0} max={100} val={35} id='slider1' label='1-grams'/>
            <Slider min={0} max={100} val={15} id='slider2' label='2-grams'/>
            <Slider min={0} max={100} val={0} id='slider3' label='3-grams'/>
            <Slider min={0} max={100} val={0} id='slider4' label='4-grams'/>
        </div>
        <div className={classes.column}>
            <Slider min={1} max={50} val={4} id='sliderMin' label='Min. chars'/>
            <Slider min={1} max={50} val={30} id='sliderMax' label='Max. chars'/>
        </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}