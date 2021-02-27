import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';
import TagFacesIcon from '@material-ui/icons/TagFaces';

const useStyles = makeStyles((theme) => ({
  root: {
    id: 'chipContainer',
    width: '100%',
    background: '#5f6773',
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
  
    return (
        <Paper component="ul" className={classes.root}>
        {
            props.chipData.map((data) => {
                let icon;

                /*
                if (data.label === 'React') {
                icon = <TagFacesIcon />;
                }
                */

                return (
                    <li key={data.key}>
                        <Chip icon={icon}
                            label={data.label}
                            //onDelete={data.label === 'React' ? undefined : handleDelete(data)}
                            onDelete={props.handleDelete(data)}
                            className={classes.chip}/>
                    </li>
                );
            })
        }
        </Paper>
);
}