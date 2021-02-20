from flask import Flask, render_template, jsonify, request

import model

app = Flask(__name__)
app.jinja_env.trim_blocks = True
app.jinja_env.lstrip_blocks = True

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
    json = request.get_json()

    # TODO: Validate JSON with schema?
    if 'text' not in json:
        return ('Entry "text" is missing from JSON', 400)

    text = json['text']

    try:
        result, message = model.process(text)
    except model.ProcessError as error:
        return (str(error), 500)

    json['result'] = result
    return json

if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)