from flask import Flask, jsonify, request
from CatAPI import CatAPI
import requests
import json
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import or_
import sqlite3

app = Flask(__name__)
api = CatAPI()

def create_connection(db_file):
    conn = None
    try:
        conn = sqlite3.connect(db_file)
        print("Connected successfuly")
    except:
        print("Error")
    return conn

def create_table():
    conn = create_connection("cats.db")
    cur = conn.cursor()
    cur.execute("DROP TABLE cats")
    cur.execute("CREATE TABLE cats (name TEXT, affection_level TEXT, child_friendly TEXT, grooming TEXT, energy_level TEXT, dog_friendly TEXT, shedding_level TEXT, stranger_friendly TEXT, vocalisation TEXT)")
    conn.commit()
    conn.close()

def insert_values():
    conn = create_connection("cats.db")
    cur = conn.cursor()
    
    breeds = api.get_cats()['breeds']
    for breed in breeds:
        query = "INSERT INTO cats VALUES ('{}','{}','{}','{}','{}','{}','{}','{}','{}')".format(breed['name'], breed['affection_level'],
            breed['child_friendly'],breed['grooming'],breed['energy_level'],breed['dog_friendly'],breed['shedding_level'],breed['stranger_friendly'],breed['vocalisation'])
        cur.execute(query)
        conn.commit()
    conn.close()

def select_cat(breed):
    conn = create_connection("cats.db")
    cur = conn.cursor()
    print(cur.execute("SELECT * FROM cats WHERE name='{}'".format(breed)).fetchall())
    conn.close()

def filter_cats(filters):
    conn = create_connection("cats.db")
    cur = conn.cursor()
    query="SELECT name FROM cats "
    if len(filters) == 0: 
        print(query)
        filtered_cats = cur.execute(query).fetchall()
        conn.close()
        return filtered_cats
    else:
        query += "WHERE "
        for filter in filters:
            levels = filters[filter]
            if len(levels) > 0:
                query += "({}='{}'".format(filter, levels[0])
                for i in range(len(levels[1:])):
                    query += " OR {}='{}'".format(filter, levels[i+1])
                query += ") AND "
        print(query[:-4])
        filtered_cats = cur.execute(query[:-4]).fetchall()
        conn.close()
        return filtered_cats


@app.route("/cats", methods=['GET'])
def get_cats():
    return api.get_cats()

@app.route("/cats/<breed>",  methods=['GET'])
def get_cat(breed):
    return api.get_cat(breed)

@app.route("/filter", methods=['GET'])
def get_filtered_cats():
    args = request.args
    filters = {}
    for filter in args:
        filters['{}'.format(filter[:-2])] = args.getlist(filter)
    cats = filter_cats(filters)
    return {"filtered_cats": cats}

@app.route("/images")
def get_images_of_breed():
    return api.get_breed_images(request.args['id'])

@app.route("/category")
def get_images_by_category():
    return api.get_category_images(request.args['category'])

@app.route("/gifs")
def get_gifs_by_category():
    return api.get_category_gifs(request.args['category'])

if __name__ == "__main__":
    app.run()