#!/bin/bash

echo "Running Release Tasks"

echo "Running Migrations"
php craft migrate/all --interactive=0 --no-backup

echo "Applying Project Config"
php craft project-config/apply --interactive=0

