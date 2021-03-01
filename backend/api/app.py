"""
This is the API module.
"""

import typing as t

import connexion
from flask import request, jsonify, redirect
from flask_cors import CORS
from pydantic import BaseModel, ValidationError, validator, conlist

from api.model import process


HTTP_OK = 200
HTTP_BAD_REQUEST = 400
HTTP_INTERNAL_SERVER_ERROR = 500

CHARS_MIN = 0
CHARS_MAX = 100
NGRAM_MIN = 0
NGRAM_MAX = 100


class RequestJson(BaseModel):
    """ Data- and validation class for the incoming request. """

    class Config:
        """ Class to disallow extra attributes in the json """
        extra = 'forbid'

    text: str
    ngrams: t.Optional[
        conlist(item_type=int, min_items=4, max_items=4)
    ] = [NGRAM_MAX] * 4
    chars: t.Optional[
        conlist(item_type=int, min_items=2, max_items=2)
    ] = [CHARS_MIN, CHARS_MAX]

    @validator('ngrams')
    def validate_ngrams(cls, ngrams):
        """ Validate the ngram counts. """
        assert all(NGRAM_MIN <= count <= NGRAM_MAX for count in ngrams), \
            f'ngram counts must be in range {NGRAM_MIN} to {NGRAM_MAX}'
        return ngrams

    @validator('chars')
    def validate_chars(cls, chars):
        """ Validate the char counts. """
        assert CHARS_MIN <= chars[0] <= chars[1] <= CHARS_MAX, \
            f'chars must follow {CHARS_MIN} <= min <= max <= {CHARS_MAX}'
        return chars


def index():
    """ API index endpoint """
    if request.method == "GET":
        return redirect(request.base_url + 'ui')


def health():
    """ API health status endpoint """
    if request.method == "GET":
        return jsonify({"status": "ok"})


def generate():
    """ API keyword generation endpoint """

    # Parse and validate the request JSON
    try:
        json = request.get_json(force=True)
        req = RequestJson(**json)
    except ValidationError as error:
        return ({
            "error": {
                "code": HTTP_BAD_REQUEST,
                "message": str(error)
            }
        }, HTTP_BAD_REQUEST)

    # Extract keywords
    try:
        result = process(text=req.text,
                         num_1_grams=req.ngrams[0],
                         num_2_grams=req.ngrams[1],
                         num_3_grams=req.ngrams[2],
                         num_4_grams=req.ngrams[3],
                         min_chars=req.chars[0],
                         max_chars=req.chars[1])

    except Exception as error:
        return ({
            "error": {
                "code": HTTP_INTERNAL_SERVER_ERROR,
                "message": f"Error running model: {str(error)}"
            }
        }, HTTP_INTERNAL_SERVER_ERROR)

    # Return results
    return ({
        "data": {
            "result": result,
            "message": "Success!"
        }
    }, HTTP_OK)


def create_app():
    """ Generate the connexion/flask app """
    application = connexion.App(__name__, specification_dir='./')
    application.add_api('api_spec.yml')
    CORS(application.app)
    return application
