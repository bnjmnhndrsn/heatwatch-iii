import requests
import json
import time

f = open('./app/data/cities.json')
data = json.loads(f.read())
f.close()

pattern = 'http://api.openweathermap.org/data/2.5/weather?lat={latitude}' + '&lon={longitude}'

for d in data:
    uri = pattern.format(**d)
    r = requests.get(uri)
    if r.status_code == 200:
        d['id'] = r.json()['id']
    print d['city'] + ': ' + str(r.status_code)
    
f = open('./output.json', 'w')
json.dump(data, f)
