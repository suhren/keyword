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
import Chip from '@material-ui/core/Chip';

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


function App() {
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

                {/* <Chip label="Barbados" onDelete={() => {}} /> */}

                <StyledButton startIcon={<PublishIcon />} onClick={submit} id='button_submit'>
                    SUBMIT
                </StyledButton>

                <h3 id='statusText' style={{fontSize: '0.65em', color: '#AAAAAA'}}>
                    Status text
                </h3>

                <textarea className="textarea"
                          id="textOutput"
                          rows="10"
                          placeholder="Results appear here">
                </textarea>

                
                <StyledButton startIcon={<CachedIcon />} onClick={to_csv} id='button_csv'>
                    TO CSV
                </StyledButton>
                
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

function submit() {
    let textInput = document.getElementById('textInput').value;
    let slider1 = document.getElementById('slider1').value;
    let slider2 = document.getElementById('slider2').value;
    let slider3 = document.getElementById('slider3').value;
    let slider4 = document.getElementById('slider4').value;
    let sliderMin = document.getElementById('sliderMin').value;
    let sliderMax = document.getElementById('sliderMax').value;
    let statusText = document.getElementById('statusText');

    if (textInput == '') {
        return;
    }

    let json = JSON.stringify({
        text: textInput,
        ngram: [slider1, slider2, slider3, slider4],
        chars: [sliderMin, sliderMax]  
    });

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: json
    };

    fetch('https://keyword.bitgnd.com:5000/generate', requestOptions)
        .then(async response => {
            const data = await response.json();
            
            statusText.innerHTML = data['message'];

            // check for error response
            if (!response.ok) {
                // get error message from body or default to response status
                const error = (data && data.message) || response.status;
                return Promise.reject(error);
            }
            let outputTextarea = document.getElementById('textOutput');
            outputTextarea.value = data['result'].flat().join('\n');

            //this.setState({ postId: data.id })
        })
        .catch(error => {
            //this.setState({ errorMessage: error.toString() });
            console.error('There was an error!', error);
        });
}

function to_csv() {
    var resArea = document.getElementById("textOutput");
    let text = resArea.value;
    let tokens = text.split('\n');
    resArea.value = tokens.join(', ');
}

export default App;
