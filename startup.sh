#!/bin/bash
python3 -m venv venv
source venv/scripts/activate
pip install -r easychef-api/requirements.txt
python3 easychef-api/manage.py migrate
cd easychef-react
npm install
cd ..