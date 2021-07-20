# Motherhood Reclaimed Website

A website for Motherhood Reclaimed built with Craft CMS

## Requirements

- [Craft CMS Requirements](https://craftcms.com/docs/3.x/requirements.html#minimum-system-specs)
    - MySQL 5.7.x
    - php 7.4.x
    - Composer 2.x
- NodeJS 14.x
- npm 7.x

## Setup

- Create an empty MySQL database
- Copy `.env.example` to `.env`
- `composer install`
- `npm install`
- `php craft install`
    - Fill out your database information
    - Choose the default options for everything else
    - Create a username and password. These credentials are for your machine only. They don't need to be unique
- `php craft migrate/all`
- `php craft project-config/apply`

- ## Running the project

- `php craft serve 0.0.0.0:8000`
- `npm run watch`
    - Run in a separate terminal
