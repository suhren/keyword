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

    if not json:
        return ('Could not parse JSON', HTTP_BAD_REQUEST)

    # TODO: Validate JSON with schema?
    if 'text' not in json:
        return ('Entry "text" is missing from JSON', HTTP_BAD_REQUEST)

    text = json['text']

    try:
        result, message = model.process(text)
    except model.ProcessError as error:
        return (str(error), HTTP_INTERNAL_SERVER_ERROR)

    json['result'] = result
    return (json, HTTP_OK)

if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True, port=5001, ssl_context='adhoc') #ssl_context=('cert.pem', 'key.pem'))