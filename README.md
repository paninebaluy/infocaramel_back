# [News Explorer Backend](https://api.infocara.ml/)
## EN
[на русском](#бэкенд-news-explorer)

_version 1.1.0 &ndash; uploaded .env to remote server, added article deletion_

News Explorer is a two-page website intended for searching the news database via NewsAPI and saving select articles to user's "favorited" page. This web site, including both frontend and backend parts, is the [Yandex.Praktikum](https://praktikum.yandex.ru/profile/web-developer/) diploma project.

This repository holds News Explorer backend on Express.js and a database on MongoDB via Mongoose. 
JWT tokens are stored in http request cookies.
Server-side validation is handled with celebrate library, requests and errors are logged with winston.
Server is protected with helmet and express-rate-limit. Both http and https requests are allowed.

## Availability

- Backend API: https://api.infocara.ml/, http://api.infocara.ml/
- Public backend server IP address: http://84.201.131.118/

### How to start using it locally:

    Clone this repository

$> git clone https://github.com/paninebaluy/infocaramel_back

    Install dependencies

$> npm install

    Install [MongoDB community edition](https://docs.mongodb.com/manual/administration/install-community/) and run it:

$> mongod

_(Win)_
or

$> mongo

or

$> sudo systemctl start mongod

_(Linux and macOS)_

    Run script that starts the local server

$> npm run start

or

$> npm run dev

    Backend server will start locally using port 3000 by default: http://localhost:3000
    Note: npm run dev will run the server with hot reload.

It's recommended to test request scenarios using [Postman](https://www.postman.com/).

#### Backend part of the project includes routing with Express.js + Node.js, and is connected to inforacaml database on MongoDB via Mongoose
##### Here's what you can do:

+ Create new user (sign up): **POST** https://api.infocara.ml/signup *(request body must contain fields: email, password (>= 8 symbols), name (str, 2-30 symbols, no whitespaces))*
+ Log in: **POST** https://api.infocara.ml/signin *(request body must contain fields: email, password (>= 8 symbols))*

(the following actions are available only for authorized users)
+ Get a JSON with data of a current logged in user: **GET** https://api.infocara.ml/users/me
+ Add a news article: **POST** https://api.infocara.ml/articles *(request body must contain fields: keyword (str, min 2 symbols), title (str, 2-250 symbols), text (2-100000 symbols, accounting for longreads), date (any valid date format, date must be in the past), source (str, 2-250 symbols), link (url), image (url), owner (Mongoose Object ID, not returned by API))*
+ Get a JSON with all articles: **GET** https://api.infocara.ml/articles
+ Delete an article, if current user is the owner: **DELETE** https://api.infocara.ml/articles/articleId (only Mongoose Object ID format is valid)

### Technology used
+ Node.js
+ Express.js
+ MongoDB
+ Mongoose

[To top/Наверх](#news-explorer-backend)

# [Бэкенд News Explorer](https://api.infocara.ml/)
## RU

_version 1.1.0 &ndash; файл .env загружен на удаленный сервер, добавлено удаление статей_

News Explorer &mdash; это двустраничный сайт, позволяющий искать по базе данных новостей при помощи NewsAPI и сохранять статьи на страницу с избранным пользователя. Фронтенд и бэкенд этого сайта &mdash; это дипломный проект курса по веб-разработке [Яндекс.Практикума](https://praktikum.yandex.ru/profile/web-developer/).

В этом репозитории хранится бэкенд сайта News Explorer на Express.js, связанный с базой данных MongoDB при помощи Mongoose.
JWT-токены хранятся в cookies http-запросов. Серверная валидация происходит до передачи данных контроллеру при помощи библиотеки celebrate, запросы и ошибки пишутся в логи при помощи winston.
Сервер защищен при помощи helmet и express-rate-limit. Разрешены запросы как по http, так и по https. 

## Доступность

- Бэкенд и API доступны на поддомене: https://api.infocara.ml/, http://api.infocara.ml
- Публичный IP-адрес бэкенд-сервера: http://84.201.131.118/

### Как запустить его локально

    Клонировать репозиторий

$> git clone https://github.com/paninebaluy/infocaramel_back

    Установить зависимости

$> npm install

    Установить [MongoDB community edition](https://docs.mongodb.com/manual/administration/install-community/) и запустить

$> mongod

_(Win)_
или

$> mongo

или

$> sudo systemctl start mongod

_(Linux и macOS)_

    Вызвать скрипт запуска сервера

$> npm run start

или

$> npm run dev

    Сервер будел запущен локально, используя порт 3000 по умолчанию: http://localhost:3000
    NB: npm run dev запускает сервер с опцией hot reload.

Для проверки запросов рекомендую использовать [Postman](https://www.postman.com/).
   
#### В бэкенд-части проекта реализованы роутинг на Express.js + Node.js, а также подключение к базе данных infocaraml на MongoDB через Mongoose
##### Вот что здесь можно делать:

+ Создать нового пользователя (зарегистрироваться): **POST** https://api.infocara.ml/signup *(тело запроса должно содержать такие поля: email, password (>= 8 символов), name (str, 2-30 символов, без пробелов))*
+ Авторизовать пользователя: **POST** https://api.infocara.ml/signin *(тело запроса должно содержать такие поля: email, password (>= 8 символов))* 

(следующие действия доступны только для авторизованных пользователей)
+ Получить JSON с данными текущего авторизованного пользователя: **GET** https://api.infocara.ml/users/me
+ Добавить новостную статью: **POST** https://api.infocara.ml/articles *(тело запроса должно содержать такие поля: keyword (str, min 2 символов), title (str, 2-250 символов), text (2-100000 символов, учитывается возможность очень больших статей), date (любой валидный формат даты, которая должна быть в прошлом), source (str, 2-250 символов), link (url), image (url), owner (Mongoose Object ID, API его не возвращает))*
+ Получить JSON со всеми статьями: **GET** https://api.infocara.ml/articles
+ Удалить статью, если её добавил авторизованный пользователь: **DELETE** https://api.infocara.ml/articles/articleId (only Mongoose Object ID format is valid)

### Использованные технологии
+ Node.js
+ Express.js
+ MongoDB
+ Mongoose

[To top/Наверх](#news-explorer-backend)
