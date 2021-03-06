import './App.css';
import TabPanel from './TabPanel';
import ChipContainer from './ChipContainer';
import github_logo from './github-svgrepo-com.svg';

import React from 'react';
import PublishIcon from '@material-ui/icons/Publish';
import ClearIcon from '@material-ui/icons/Clear';
import { Button, Typography, Divider, withStyles } from '@material-ui/core';

import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';

import Slider from './Slider'

const API_BASE = 'https://keyword.bitgnd.com/'
const API_ENDPOINT = API_BASE + 'generate'

const SEC_COLOR = '#718dbd';
const SEC_COLOR_DARK = '#5572a5'
const BAR_COLOR = '#373c45'
const AREA_COLOR = '#1b212c'


const MainButton = withStyles({
    root: {
        background: SEC_COLOR,
        '&:hover': {
            backgroundColor: SEC_COLOR_DARK,
        },
        color: 'white',
        height: 48,
        padding: '0 30px',
        margin: '2em 2em 2em 2em'
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
                <h1 style={{margin: '1em 0 0.5em 0', fontSize: '1.2em'}}>

                    Extract <code style={{color: "#718dbd"}}>keywords</code> from text documents!
                </h1>

                <div>
                <Accordion style={{backgroundColor: AREA_COLOR}}>
                    <AccordionSummary
                        style={{backgroundColor: BAR_COLOR}}
                    >
                        <Typography style={{marginLeft: 'auto',
                                            marginRight: 'auto',
                                            color: '#DDD'}}>
                            ABOUT
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                    <Typography style={{fontSize: '0.6em',
                                        color: '#AAA',
                                        textAlign:'left'}}>
                        This app can extract common keywords or phrases from texts.
                        You can do this by copying some source of text, like e.g.
                        an article on Wikipedia, and pasting it into the text area.
                        The algorithm is robust enough so that you can literally go
                        to an article, select all text with CTRL+A, copy it with
                        CTRL+C, and finally paste it here with CTRL+V, and it should
                        work. Pressing the submit button will send the text to the API
                        back end where the keywords are extracted. These are then
                        sent back to this interface and presented below. The
                        algorithm is specifically tuned for english language, as
                        it has some knowledge about certain english parts-of-speech,
                        such as Nouns, Adjectives, and Verbs. It will however also
                        work with other languages, albeit a bit worse.
                        <br/><br/>
                        You can view the results as 'chips' where you can also
                        remove results that are not of good quality by pressing
                        the 'X' in each chip. After you are happy with the words,
                        you can also view them as either a list or as
                        comma-separated values (CSV) by navigating in the tab panel.
                        <br/><br/>
                        You can also control how the algorithm searches for keywords
                        by changing the options below: The options 1-gram, through
                        4-gram refers to the general concept of
                        <a href="https://en.wikipedia.org/wiki/N-gram">n-grams</a> in
                        linguistics. This is just a fancy term for
                        'a sequence of n words'. For example, a 1-gram (unigram)
                        would be a single word like 'Cat' or 'Apple'. A 2-gram
                        (bigram) is sequence of two words, like 'New York' or
                        'Apple pie'. This same logic applies for 3- and 4-grams. By
                        looking at the most statistically frequent n-grams, these
                        are in practice used to find 'collocations', or common
                        sequences of words in the text.
                        <br/><br/>
                        The results can also be be controlled by specifcying the
                        minimum and maximum allowed number of characters per result
                        (spaces not included).
                    </Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion style={{backgroundColor: AREA_COLOR, color: '#DDD'}}>
                    <AccordionSummary
                        style={{backgroundColor: BAR_COLOR}}
                        >

                        <Typography style={{marginLeft: 'auto',
                                            marginRight: 'auto',
                                            color: '#DDD'}}>
                            OPTIONS
                        </Typography>
                    </AccordionSummary>
                    <Divider />
                    <AccordionDetails id='flexContainer'>
                    <div style={{flexBasis: '50%'}}>
                        <Slider min={0} max={100} val={35} id='slider1' label='1-grams'/>
                        <Slider min={0} max={100} val={15} id='slider2' label='2-grams'/>
                        <Slider min={0} max={100} val={0} id='slider3' label='3-grams'/>
                        <Slider min={0} max={100} val={0} id='slider4' label='4-grams'/>
                    </div>
                    <div style={{flexBasis: '50%'}}>
                        <Slider min={1} max={50} val={4} id='sliderMin' label='Min. chars'/>
                        <Slider min={1} max={50} val={30} id='sliderMax' label='Max. chars'/>
                    </div>
                    </AccordionDetails>
                </Accordion>
                </div>

                <textarea className="textarea"
                          rows="10"
                          margin="0"
                          id="textInput"
                          label="Input text"
                          placeholder="Input text here"/>

                <div style={{display: 'inline-block'}}>

                    <MainButton
                        startIcon={<PublishIcon />}
                        onClick={() => submit(setChipData, setStatusText)}
                    >
                        SUBMIT
                    </MainButton>

                    <MainButton
                        startIcon={<ClearIcon />}
                        onClick={() =>  {
                            document.getElementById('textInput').value = '';
                            setChipData([]);
                            setStatusText('');
                        }}
                    >
                        CLEAR
                    </MainButton>
                </div>


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
