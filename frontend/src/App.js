import logo from './logo.svg';
import github_logo from './github-svgrepo-com.svg';

import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';

function App() {
    return (
        <div className="App">
            <header className="App-header">
                {/*<img src={logo} className="App-logo" alt="logo" />*/}
                <p>
                    Generate <code>keywords</code> from large text documents!
                </p>
                <textarea style={{height: '300px'}}
                          placeholder="Enter text here..."
                          id="textInput">
                </textarea>
                
                <Button variant="primary" onClick={submit}
                        id='button_submit'>
                    Submit
                </Button>

                <textarea style={{height: '400px'}}
                          id="textOutput"
                          placeholder="Results appear here">
                </textarea>

                
                <Button variant="secondary"
                        id='button_csv'>
                    To CSV
                </Button>
                
                <a className="App-link"
                   target="_blank"
                   rel="noopener noreferrer"
                   href="https://github.com/suhren/keyword/">
                    <img src={github_logo}
                         style={{margin: "16px", width:'64px', height: '64px'}} />
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



export default App;
