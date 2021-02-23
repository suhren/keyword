import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import Input from '@material-ui/core/Input';
import VolumeUp from '@material-ui/icons/VolumeUp';

const useStyles = makeStyles({
  root: {
    width: '80%',
    marginLeft: 'auto',
    marginRight: 'auto',
    verticalAlign: 'top',
    display: 'inline-block',
  },
  label: {
      fontSize: '0.6em',
  },
  input: {
    width: 42,
    color: 'white',
    borderBottom: '2px solid #AAA !important'
  },
});

export default function InputSlider(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(props.val);

  const handleSliderChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleInputChange = (event) => {
    setValue(event.target.value === '' ? '' : Number(event.target.value));
  };

  const handleBlur = () => {
    if (value < props.min) {
      setValue(props.min);
    } else if (value > props.max) {
      setValue(props.max);
    }
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={2} alignItems="center">
        <Grid item className={classes.label}>
          {props.label}
        </Grid>
        <Grid item xs>
          <Slider
            className={classes.slider}
            value={typeof value === 'number' ? value : 0}
            onChange={handleSliderChange}
            aria-labelledby="input-slider"
            min={props.min}
            max={props.max}
          />
        </Grid>
        <Grid item>
          <Input
            className={classes.input}
            value={value}
            margin="dense"
            onChange={handleInputChange}
            onBlur={handleBlur}
            id={props.id}
            inputProps={{
              step: 1,
              min: props.min,
              max: props.max,
              type: 'number',
              'aria-labelledby': 'input-slider',
            }}
          />
        </Grid>
      </Grid>
    </div>
  );
}