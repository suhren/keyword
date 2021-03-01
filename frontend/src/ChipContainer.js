import React from 'react';
import { Chip, Paper, Typography, makeStyles } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
  root: {
    id: 'chipContainer',
    width: '100%',
    background: 'none',
    boxShadow: 'none',
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    listStyle: 'none',
    padding: theme.spacing(0.5),
    margin: 0,
  },
  chip: {
    margin: theme.spacing(0.5),
  },
}));


export default function ChipsArray(props) {

    const classes = useStyles();

    // Props: chipData, handleDelete

    if (props.chipData.length == 0) {
        return (<Typography style={{color: '#AAA'}}> Results appear here </Typography>);
    }
    else {
        return (
            <Paper component="ul" className={classes.root}>
            {
                props.chipData.map((data) => {
                    let icon;

                    return (
                        <li key={data.key}>
                            <Chip icon={icon}
                                label={data.label}
                                onDelete={props.handleDelete(data)}
                                className={classes.chip}/>
                        </li>
                    );
                })
            }
            </Paper>);
    }
}