import logging
import typing as t

import connexion
from flask import Flask, request, jsonify, redirect
from flask_cors import CORS
from pydantic import BaseModel, ValidationError, validator, conlist

_logger = logging.getLogger('api')
_logger.setLevel(logging.DEBUG)

from api.model import process


HTTP_OK = 200
HTTP_BAD_REQUEST = 400
HTTP_INTERNAL_SERVER_ERROR = 500

CHARS_MIN = 0
CHARS_MAX = 100
NGRAM_MIN = 0
NGRAM_MAX = 100


#app = Flask(__name__)


class RequestJson(BaseModel):

    class Config:
        # Don't allow extra attributes in the json
        extra = 'forbid'
    
    text: str
    ngrams: t.Optional[
        conlist(item_type=int, min_items=4, max_items=4)
    ] = [NGRAM_MAX] * 4
    chars: t.Optional[
        conlist(item_type=int, min_items=2, max_items=2)
    ] = [CHARS_MIN, CHARS_MAX]

    @validator('ngrams')
    def validate_ngrams(cls, v):
        assert all([NGRAM_MIN <= x <= NGRAM_MAX for x in v]), \
               f'ngram counts must be in range {NGRAM_MIN} to {NGRAM_MAX}'
        return v

    @validator('chars')
    def validate_chars(cls, v):
        assert CHARS_MIN <= v[0] <= v[1] <= CHARS_MAX, \
               f'chars must follow {CHARS_MIN} <= min <= max <= {CHARS_MAX}'
        return v


def index():
    if request.method == "GET":
        return redirect(request.base_url + 'ui')


def health():
    if request.method == "GET":
        status = {"status": "ok"}
        _logger.debug(status)
        return jsonify(status)


def generate():

    # Parse and validate the request JSON
    try:
        json = request.get_json(force=True)
        req = RequestJson(**json)
    except ValidationError as e:
        return ({
            "error": {
                "code": HTTP_BAD_REQUEST,
                "message": str(e)
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
    
    except Exception as e:
        return ({
            "error": {
                "code": HTTP_INTERNAL_SERVER_ERROR,
                "message": f"Error running model: {str(e)}"
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

    # Create the application instance
    application = connexion.App(__name__, specification_dir='./')

    # Read the swagger.yml file to configure the endpoints
    application.add_api('api_spec.yml')

    CORS(application.app)

    return application
