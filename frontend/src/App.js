import github_logo from './github-svgrepo-com.svg';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';
import './App.css';

import PublishIcon from '@material-ui/icons/Publish';
import CachedIcon from '@material-ui/icons/Cached';

import { Accordion, Card, Form, Col, Row } from "react-bootstrap";
import { withStyles } from '@material-ui/core/styles';

import RangeSlider from 'react-bootstrap-range-slider';
import React from 'react';

import Button from '@material-ui/core/Button';

import DetailedAccordion from './Accordion';
import ChipContainer from './ChipContainer';
import Chip from '@material-ui/core/Chip';

import TabPanel from './TabPanel';
import { Typography } from '@material-ui/core';

const SEC_COLOR = '#718dbd';
const SEC_COLOR_DARK = '#5572a5'


const StyledButton = withStyles({
    root: {
        background: SEC_COLOR,
        '&:hover': {
            backgroundColor: SEC_COLOR_DARK,
            color: 'white'
        },
        border: 0,
        color: 'white',
        height: 48,
        padding: '0 30px',
        margin: '1em'
    },
    label: {
        textTransform: 'capitalize',
    },
})(Button);


const chipContainer = React.createRef();

function App() {

    const [chipData, setChipData] = React.useState([]);
    const [statusText, setStatusText] = React.useState(" ");
      
    const handleDelete = (chipToDelete) => () => {
        setChipData((chips) => chips.filter((chip) => chip.key !== chipToDelete.key));
    };

    return (
        <div className="App">

            <header className="App-header">
                <h1 style={{margin: '1em 0 1em 0'}}>
                    Extract <code style={{color: "#718dbd"}}>keywords</code> from text documents!
                </h1>

                <textarea className="textarea"
                          rows="10"
                          margin="normal"
                          id="textInput"
                          label="Input text"
                          placeholder="Input text here"/>
                
                <DetailedAccordion />


                <StyledButton id='button_submit' 
                              startIcon={<PublishIcon />}
                              onClick={() => submit(setChipData, setStatusText)}>
                    SUBMIT
                </StyledButton>

                <TabPanel inner={[
                    { 
                        label: 'Chips',
                        component: <ChipContainer chipData={chipData} handleDelete={handleDelete}/>
                    },
                    { 
                        label: 'List',
                        component: <textarea className="textarea"
                                             rows='10'
                                             value={chipData.map(x => x.label).join('\n')}
                                             onChange={() => {}}
                                             placeholder="Results appear here" />
                    },
                    { 
                        label: 'CSV',
                        component: <textarea className="textarea"
                                             rows='10'
                                             value={chipData.map(x => x.label).join(', ')}
                                             onChange={() => {}}
                                             placeholder="Results appear here" />
                    }
                ]}/>
                
                <Typography id='statusText' variant="h6" style={{color: "#AAA"}}>
                    {statusText}
                </Typography>

                <a className="App-link"
                   target="_blank"
                   rel="noopener noreferrer"
                   href="https://github.com/suhren/keyword/">
                    <img src={github_logo}
                         style={{margin: "32px", width:'64px', height: '64px'}} />
                </a>

            </header>
        </div>
    );
}

function submit(setChipData, setStatusText) {
    let textInput = document.getElementById('textInput').value;
    let slider1 = parseInt(document.getElementById('slider1').value);
    let slider2 = parseInt(document.getElementById('slider2').value);
    let slider3 = parseInt(document.getElementById('slider3').value);
    let slider4 = parseInt(document.getElementById('slider4').value);
    let sliderMin = parseInt(document.getElementById('sliderMin').value);
    let sliderMax = parseInt(document.getElementById('sliderMax').value);

    if (textInput == '') {
        return;
    }

    let json = JSON.stringify({
        text: textInput,
        ngrams: [slider1, slider2, slider3, slider4],
        chars: [sliderMin, sliderMax]  
    });

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: json
    };

    fetch('https://keyword.bitgnd.com/generate', requestOptions)
        .then(async response => {
            const response_json = await response.json();
            // Check if status in range 200-299
            if (!response.ok) {
                return Promise.reject(response_json);
            }
            let result = response_json['data']['result'].flat();
            let chipData = result.map((x, i) => ({ key: i, label: x}));
            setChipData(chipData);

            let lengths = response_json['data']['result'].map(x => x.length);
            let msg = "Result: " + lengths.map((n, i) => `[${n}] ${i+1}-grams`).join(', ');
            setStatusText(msg);
        })
        .catch(errorJson => {
            console.error(errorJson);
            setStatusText(errorJson['error']['message']);
        });
}


export default App;
