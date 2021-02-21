import github_logo from './github-svgrepo-com.svg';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import Button from 'react-bootstrap/Button';


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
                
                <Button variant="primary"
                        onClick={submit}
                        id='button_submit'>
                    Submit
                </Button>

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

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({ text: textInput })
    };

    console.log(requestOptions);

    //fetch('http://keyword.bitgnd.com:5000/generate', requestOptions)
    fetch('https://keyword.bitgnd.com:5000/generate', requestOptions)
        .then(async response => {
            const data = await response.json();
            
            console.log(data);

            // check for error response
            if (!response.ok) {
                // get error message from body or default to response status
                const error = (data && data.message) || response.status;
                return Promise.reject(error);
            }
            let outputTextarea = document.getElementById('textOutput');
            outputTextarea.value = data['result'].join('\n');

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
