import itertools
import json

import requests
from bs4 import BeautifulSoup

url = 'https://www.dicio.com.br/palavras-com-cinco-letras/'

response = requests.get(url=url)

if response.status_code != 200:
    exit(0)

soup = BeautifulSoup(response.text, "html.parser")

paragraphs = []

for tag in soup.find_all(['p', 'h1', 'style']):
    p = tag.find_next('p')
    if p:
        paragraphs.append(str(p))

paragraphs = paragraphs[5:-3]

words = []
for p in paragraphs:
    words.append(p.split('<br/>'))

words = list(itertools.chain(*words))

words = [word.replace("<p>", "").strip() for word in words]
words = [word for word in words if word != "</p>"]

wordle = [{'key': word, 'value': True} for word in words]

with open('./words.json', 'w', encoding='utf-8') as json_file:
    json.dump(wordle, json_file, ensure_ascii=False, indent=4)

