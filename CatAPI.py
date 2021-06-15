import requests 
import os
import json

CAT_API_KEY = os.getenv("CAT_API_KEY")

def modify_data(cat, attribute): 
	if isinstance(cat[attribute], int) and cat[attribute] >= 4: cat[attribute] = "high"
	if isinstance(cat[attribute], int) and cat[attribute] == 3: cat[attribute] = "moderate"
	if isinstance(cat[attribute], int) and cat[attribute] <= 2: cat[attribute] = "low"

class CatAPI:

	def get_cats(self):
		url = ('https://api.thecatapi.com/v1/breeds')
		header = {'x-api-key' : CAT_API_KEY}
		response = requests.get(url, headers=header)
		breeds = response.json()
		#for cat in breeds:
		#	modify_data(cat, "grooming")
		#	modify_data(cat, "shedding_level")
		#	modify_data(cat, "energy_level")
		#	modify_data(cat, "vocalisation")
		#	modify_data(cat, "dog_friendly")
		#	modify_data(cat, "child_friendly")
		#	modify_data(cat, "affection_level")
		#	modify_data(cat, "stranger_friendly")
		return {"breeds" : breeds}

	def get_cat(self, breed):
		url = ('https://api.thecatapi.com/v1/breeds/search?q=' + breed)
		header = {'x-api-key' : CAT_API_KEY}
		response = requests.get(url, headers=header)
		return {"name" : response.json()}