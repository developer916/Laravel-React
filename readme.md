<p align="center"><img src="https://laravel.com/assets/img/components/logo-laravel.svg"></p>

## PosBird - Calendar Project based on laravel with react

Please follow the guide.

1. `git clone`
2. `update the .env file along with database connection`
3. `composer install && composer update`
4. `php artisan migrate`
5. `php artisan db:seed`
6. `npm install`

***
Stable Node v8.12.0(npm v6.4.1)
***

## Install Passport

Open a terminal window and install the passport using following command

 ```
 php artisan passport:install
 ```
## Update the Passport keys in .env file 
Copy the keys for personal and password grants in `.env` file

```
PERSONAL_CLIENT_ID=1
PERSONAL_CLIENT_SECRET=xxxxxxxxxxxxxxxxxxxxxxxxxxxxx
PASSWORD_CLIENT_ID=2
PASSWORD_CLIENT_SECRET=xxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```
## Set the App URL
Set the APP_URL in `.env` file (e.g)

```
APP_URL=http://localhost:8000
```

## Run PHP Dev Server
Either create a local dev url and map the link in webpack.mix.js file or open an other terminal window and copy paste the following command

```
php artisan serve
```

## Run Node Engine

Compile assets one time.
```
npm run dev
```
**OR**
or if you would like to compile assets on runtime then copy paste following command in terminal 

`npm run watch` or `npm run watch-poll`


for complete list of instruction follow the link below
[Laravel Mix](https://laravel.com/docs/5.7/mix#running-mix)