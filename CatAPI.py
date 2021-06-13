import requests 
import os
import json

CAT_API_KEY = os.getenv("CAT_API_KEY")

class CatAPI:

	def get_cats(self):
		url = ('https://api.thecatapi.com/v1/breeds')
		header = {'x-api-key' : CAT_API_KEY}
		response = requests.get(url, headers=header)
		return {"breeds" : response.json()}

	def get_cat(self, breed):
		url = ('https://api.thecatapi.com/v1/breeds/search?q=' + breed)
		header = {'x-api-key' : CAT_API_KEY}
		response = requests.get(url, headers=header)
		return {"name" : response.json()}