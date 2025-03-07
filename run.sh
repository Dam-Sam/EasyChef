#!/bin/bash
python3 easychef-api/manage.py runserver &
npm start --prefix easychef-react &