import './App.css';
import TabPanel from './TabPanel';
import DetailedAccordion from './Accordion';
import ChipContainer from './ChipContainer';
import github_logo from './github-svgrepo-com.svg';

import React from 'react';
import PublishIcon from '@material-ui/icons/Publish';
import ClearIcon from '@material-ui/icons/Clear';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import AssignmentIcon from '@material-ui/icons/Assignment';
import { Button, Typography, withStyles } from '@material-ui/core';


const API_BASE = 'https://keyword.bitgnd.com/'
const API_ENDPOINT = API_BASE + 'generate'
const SEC_COLOR = '#718dbd';
const SEC_COLOR_DARK = '#5572a5'


const MainButton = withStyles({
    root: {
        background: SEC_COLOR,
        '&:hover': {
            backgroundColor: SEC_COLOR_DARK,
        },
        color: 'white',
        height: 48,
        padding: '0 30px',
        margin: '1em'
    }
})(Button);

const EditButton = withStyles({
    root: {
        '&:hover': {
            backgroundColor: SEC_COLOR_DARK,
        },
        color: '#AAA',
        height: 32,
        padding: '0',
        margin: '0px 0em 0em auto',
        fontSize: '0.5rem',
    }
})(Button);


function App() {

    const [chipData, setChipData] = React.useState([]);
    const [statusText, setStatusText] = React.useState(" ");

    const handleDelete = (chipToDelete) => () => {
        setChipData((chips) => chips.filter((chip) => chip.key !== chipToDelete.key));
    };

    return (
        <div className="App">

            <header className="App-header">
                <h1 style={{margin: '1em 0 1em 0', fontSize: '1.2em'}}>
                    Extract <code style={{color: "#718dbd"}}>keywords</code> from text documents!
                </h1>

                <EditButton startIcon={<ClearIcon />}
                            onClick={() =>  document.getElementById('textInput').value = ''}>
                    CLEAR
                </EditButton>
                <textarea className="textarea"
                          rows="10"
                          margin="0"
                          id="textInput"
                          label="Input text"
                          placeholder="Input text here"/>


                <DetailedAccordion />

                <MainButton startIcon={<PublishIcon />}
                            onClick={() => submit(setChipData, setStatusText)}>
                    SUBMIT
                </MainButton>

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

                <Typography id='statusText' variant="h6" style={{color: "#AAA", margin: '0.5em'}}>
                    {statusText}
                </Typography>

                <a className="App-link"
                   href="https://github.com/suhren/keyword/">
                    <img src={github_logo}
                         style={{margin: "1em", width:'64px', height: '64px'}} />
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

    if (textInput.split(" ").length < 10) {
        setStatusText('Enter at least 10 words');
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

    fetch(API_ENDPOINT, requestOptions)
        .then(async response => {
            const response_json = await response.json();
            // Check if status in range 200-299
            if (!response.ok) {
                return Promise.reject(response_json);
            }
            let results = response_json['data']['result'];
            let lengths = results.map(x => x.length);
            let chipData = results.flat().map((x, i) => ({ key: i, label: x}));
            setChipData(chipData);

            let msg = "Result: " + lengths.map((n, i) => `[${n}] ${i+1}-grams`).join(', ');
            setStatusText(msg);
        })
        .catch(errorJson => {
            console.error(errorJson);
            setStatusText(errorJson['error']['message']);
        });
}


export default App;
