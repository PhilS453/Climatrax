#this converts a .csv file to a .json file

import csv
import json

def csv_to_json(csv_filepath,json_filepath):
    data = [] 
    with open(csv_filepath,'r') as csvfile:
        csv_reader = csv.DictReader(csvfile)
        for row in csv_reader:
            data.append(row)

    with open(json_filepath,'w') as jsonfile:
        json.dump(data,jsonfile,indent=4)
if __name__ == "__main__":
    csv_to_json("/Users/phil/Climatrax/simplemaps_worldcities_basicv1/worldcities.csv","/Users/phil/Climatrax/simplemaps_worldcities_basicv1/CityDB.json")
