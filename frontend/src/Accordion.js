import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionActions from '@material-ui/core/AccordionActions';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';

import Slider from './Slider'
import './Accordion.css';

/*
https://stackoverflow.com/questions/56045114/flexbox-layout-with-two-columns-on-desktop-and-one-column-on-mobile
*/

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    marginBottom: '16px'
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
  helper: {
    borderLeft: `2px solid ${theme.palette.divider}`,
    padding: theme.spacing(1, 2),
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
        <div className={clsx(classes.column, classes.helper)}>
            <Slider min={1} max={50} val={4} id='sliderMin' label='Min. chars'/>
            <Slider min={1} max={50} val={30} id='sliderMax' label='Max. chars'/>
        </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}