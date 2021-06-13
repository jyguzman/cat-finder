from flask import Flask, jsonify
from CatAPI import CatAPI
import requests
import json

app = Flask(__name__)
api = CatAPI()

@app.route("/cats")
def get_cats():
    return api.get_cats()

@app.route("/cats/<breed>")
def get_cat(breed):
    return api.get_cat(breed)
