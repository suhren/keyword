from flask import Flask, render_template, jsonify, request

# https://flask-cors.readthedocs.io/en/latest/
# https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS/Errors/CORSMissingAllowOrigin
from flask_cors import CORS

import model


HTTP_OK = 200
HTTP_BAD_REQUEST = 400
HTTP_INTERNAL_SERVER_ERROR = 500

app = Flask(__name__)
CORS(app)


@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        text = request.form.get('textbox')
        
        if not text:
            return render_template('index.html',
                                   text="",
                                   result=[],
                                   message='Error: No text!')

        try:
            result, message = model.process(text)
        except model.ProcessError as error:
            return render_template('index.html',
                                   text="",
                                   result=[],
                                   message='Error:' + str(error))

        return render_template('index.html',
                               text=text,
                               result=result,
                               message=message)

    else:
        return render_template('index.html',
                               text="",
                               result=[],
                               message=None)

@app.route('/generate', methods=['POST'])
def generate():

    # https://stackoverflow.com/questions/10434599/get-the-data-received-in-a-flask-request
    json = request.get_json(force=True)

    return_json = {}

    if not json:
        return_json['message'] = 'Could not parse JSON'
        return (return_json, HTTP_BAD_REQUEST)

    # TODO: Validate JSON with schema?
    if 'text' not in json:
        return_json['message'] = 'Entry "text" is missing from JSON'
        return (return_json, HTTP_BAD_REQUEST)

    text = json['text']

    num_ngram = [100, 100, 100, 100]
    
    if 'ngram' in json:
        counts = json['ngram']
        if counts[0] is not None:
            num_ngram[0] = int(counts[0])
        if counts[1] is not None:
            num_ngram[1] = int(counts[1])
        if counts[2] is not None:
            num_ngram[2] = int(counts[2])
        if counts[3] is not None:
            num_ngram[3] = int(counts[3])

    min_char = 3
    max_char = 30
    
    if 'chars' in json:
        chars = json['chars']
        if chars[0] is not None:
            min_char = int(chars[0])
        if chars[1] is not None:
            max_char = int(chars[1])

    try:
        result, message = model.process(text=text,
                                        num_ngram=num_ngram,
                                        min_char=min_char,
                                        max_char=max_char)
    except model.ProcessError as error:
        return_json['message'] = str(error) 
        return (return_json, HTTP_INTERNAL_SERVER_ERROR)

    return_json['result'] = result
    return_json['message'] = message
    return (return_json, HTTP_OK)

if __name__ == '__main__':
    app.run(host='0.0.0.0',
            debug=True,
            ssl_context=('cert.pem', 'key.pem'))
