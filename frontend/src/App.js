import github_logo from './github-svgrepo-com.svg';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';
import './App.css';

import { Accordion, Card, Form, Col, Row, Button } from "react-bootstrap";

import RangeSlider from 'react-bootstrap-range-slider';
import React from 'react';


function SliderWithInputFormControl(props) {
    const [ value, setValue ] = React.useState(props.val);
    return (
        <Form>
            <Form.Group as={Row} style={{margin: '0px'}}>
                <Col xs="4">
                <Form.Label>
                    <div>{props.label}</div>
                </Form.Label>
                </Col>
                <Col xs="6">
                    <RangeSlider
                        variant='secondary'
                        inputProps={{id: props.id}}
                        min={props.min}
                        max={props.max}
                        value={value}
                        onChange={e => setValue(e.target.value)}
                    />
                </Col>
                <Col xs="2">
                    <Form.Control
                        style={{border: 'none', color: 'white', backgroundColor: '#282c34'}}
                        value={value}
                        onChange={e => setValue(e.target.value)}/>
                </Col>
            </Form.Group>
        </Form>
    );
}


function App() {
    return (
        <div className="App">

            <header className="App-header">
                <h1>
                    Extract <code style={{color: "#718dbd"}}>keywords</code> from text documents!
                </h1>

                <textarea className="textarea"
                          rows="10"
                          margin="normal"
                          id="textInput"
                          label="Input text"
                          placeholder="Input text here"/>
                
                <Accordion defaultActiveKey='none'>

                    <Card style={{backgroundColor:'#444', border: 'none'}}>
                        <Card.Header>
                            <Accordion.Toggle as={Button} variant="link" eventKey="0" style={{color:'#FFFFFF'}}>
                                Options
                            </Accordion.Toggle>
                        </Card.Header>

                        <Accordion.Collapse eventKey="0">
                            <Card.Body>
                                <SliderWithInputFormControl min={0} max={100} val={35} id='slider1' label='1-grams'/>
                                <SliderWithInputFormControl min={0} max={100} val={15} id='slider2' label='2-grams'/>
                                <SliderWithInputFormControl min={0} max={100} val={0} id='slider3' label='3-grams'/>
                                <SliderWithInputFormControl min={0} max={100} val={0} id='slider4' label='4-grams'/>
                                <SliderWithInputFormControl min={1} max={50} val={4} id='sliderMin' label='Min. chars'/>
                                <SliderWithInputFormControl min={1} max={50} val={30} id='sliderMax' label='Max. chars'/>
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                </Accordion>
            
                <Button variant="primary"
                        onClick={submit}
                        style={{margin: '16px'}}
                        id='button_submit'>
                    Submit
                </Button>

                <h3 id='statusText' style={{fontSize: '0.65em', color: '#AAAAAA'}}>
                    Status text
                </h3>

                <textarea className="textarea"
                          id="textOutput"
                          rows="10"
                          placeholder="Results appear here">
                </textarea>

                
                <Button onClick={to_csv}
                        id='button_csv'>
                    To CSV
                </Button>
                
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
    let slider1 = parseInt(document.getElementById('slider1').value);
    let slider2 = parseInt(document.getElementById('slider2').value);
    let slider3 = parseInt(document.getElementById('slider3').value);
    let slider4 = parseInt(document.getElementById('slider4').value);
    let sliderMin = parseInt(document.getElementById('sliderMin').value);
    let sliderMax = parseInt(document.getElementById('sliderMax').value);
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
