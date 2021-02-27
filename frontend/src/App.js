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
                              onClick={() => submit(setChipData)}>
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

                <h3 id='statusText' style={{marginTop: '1em', fontSize: '0.65em', color: '#AAAAAA'}}>
                    Status text
                </h3>

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

function submit(setChipData) {
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
            let result = data['result'].flat();
            let chipData = result.map((x, i) => ({ key: i, label: x}));
            setChipData(chipData);
        })
        .catch(error => {
            //this.setState({ errorMessage: error.toString() });
            console.error('There was an error!', error);
        });
}


export default App;
