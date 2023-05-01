#!/bin/bash

gnome-terminal --tab --title="backend" --working-directory="/path/to/backend" -e "npm start"

gnome-terminal --tab --title="frontend" --working-directory="/path/to/frontend" -e "npm start"
