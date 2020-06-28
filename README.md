# [News Explorer Backend](https://api.infocara.ml/)
## EN
[на русском](#ru)

_version 1.1.0 &ndash; uploaded .env to remote server, added article deletion_

News Explorer is a two-page website intended for searching the news database via NewsAPI and saving select articles to user's "favorited" page. This web site, including both frontend and backend parts, is the [Yandex.Praktikum](https://praktikum.yandex.ru/profile/web-developer/) diploma project.
This repository holds News Explorer back end on Express.js and a database on MongoDB via Mongoose. 
JWT tokens are stored in http request cookies.
Server-side validation is handled with celebrate library, requests and errors are logged with winston.
Requests are protected with helmet and express-rate-limit. Both http and https requests are allowed.

## Availability

- Back end API: https://api.infocara.ml/, http://api.infocara.ml/
- Public back end server IP address: http://84.201.131.118/

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

    Backend server will start locally using port 3000 as default: http://localhost:3000/
    Note: $> npm run dev will run the same server with hot reload available.

It's recommended to test request scenarios using [Postman](https://www.postman.com/).

#### Back end part of the project includes routing with Express.js + Node.js, and is connected to inforacaml database on MongoDB via Mongoose
##### Here's what you can do:

+ Create new user (sign up): **POST** https://api.infocara.ml/signup *(request body must contain fields: email, password (>= 8 symbols), name (str, 2-30 symbols, no whitespaces))*
+ Log in: **POST** https://api.infocara.ml/signin *(request body must contain fields: email, password (>= 8 symbols))*
  |the following actions are available only for authorized users
+ Get a JSON with data of a current logged in user: **GET** https://api.infocara.ml/users/me
+ Add a news article: **POST** https://api.mestamno.ga/articles *(request body must contain fields: keyword (str, min 2 symbols), title (str, 2-250 symbols), text (2-100000 symbols, accounting for longreads), date (any valid date format, date must be in the past), source (str, 20250 symbols), link (url), image (url), owner (Mongoose Object ID, not returned by API))*
+ Get a JSON with all articles: **GET** https://api.mestamno.ga/articles
+ Delete articles, if current useris the owner: **DELETE** https://api.mestamno.ga/articles/articleId (only Mongoose Object ID format is valid)

### Technology used
+ Node.js
+ Express.js
+ MongoDB
+ Mongoose

[To top/Наверх](#News Express Backend)

# [Бэкенд News Explorer](https://api.infocara.ml/)
## RU

_version 1.1.0 &ndash; файл .env загружен на удаленный сервер, добавлено удаление статей_

News Explorer &mdash; это двустраничный сайт, позволяющий искать по базе данных новостей при помощт NewsAPI и сохранять статьи на страницу с избранным пользователя.  is a two-page website intended for searching the news database via NewsAPI and saving select articles to user's "favorited" page. Thids web site, including both frontend and backend parts, is the [Yandex.Praktikum](https://praktikum.yandex.ru/profile/web-developer/) diploma project.
This repository holds News Explorer back end on Express.js and a database on MongoDB via Mongoose. 
JWT tokens are stored in http request cookies.
Server-side validation is handled with celebrate library, requests and errors are logged with winston.
Requests are protected with helmet and express-rate-limit. Both http and https requests are allowed.

## Доступность

- Фронтенд с сайтом находится по адресу: https://mestamno.ga/
- Бэкенд и API доступны: https://api.mestamno.ga/
- Публичный IP-адрес бэкенд-сервера: http://84.201.133.185/

### Как запустить его локально

    Клонировать репозиторий

$> git clone https://github.com/paninebaluy/mesto-back-end

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

    Сайт будет доступен по адресу https://api.mestamno.ga/ (порт 3000 используется по умолчанию).

Для проверки запросов рекомендую использовать [Postman](https://www.postman.com/).
   
#### В бэкенд-части проекта реализованы роутинг на Express.js + Node.js, а также подключение к базе данных mestodb database на MongoDB через Mongoose
##### Вот что здесь можно делать:

+ Зарегистрировать нового пользователя: **POST** https://api.mestamno.ga/signup *(запрос должен содержать поля: name (str, 2-30 символов), about (str, 2-30 символов), avatar (url), email, password (>= 8 символов))*
+ Залогиниться: **POST** https://api.mestamno.ga/signin *(запрос должен содержать поля: email, password (>= 8 символов))*
  | следующие действия доступны только для авторизованных пользователей
+ Получить JSON со всеми пользователями из базы данных: **GET** https://api.mestamno.ga/users
+ Получить JSON со всеми карточками: **GET** https://api.mestamno.ga/cards
+ Получить JSON с данными конкретного пользователя: **GET** https://api.mestamno.ga/users/id
+ Создать карточку: **POST** https://api.mestamno.ga/cards *(запрос должен содержать поля: name (str, 2-30 символов), link (url))*
+ Удалить карточку, если её создал текущий пользователь: **DELETE** https://api.mestamno.ga/cards/id
+ Обновить профиль текущего пользователя: **PATCH** https://api.mestamno.ga/users/me *(запрос должен содержать одно или несколько ищ полей: name (str, 2-30 символов), about (str, 2-30 символов), avatar (url))*
+ Обновить аватар текущего пользователя: **PATCH** https://api.mestamno.ga/users/me/avatar *(запрос должен содержать поле: avatar (url))*
+ Лайкнуть карточку (добавляет лайк от пользователя только один раз): **PUT** https://api.mestamno.ga/cards/:cardId/likes
+ Удалить свой лайк с карточки: **DELETE** https://api.mestamno.ga/cards/:cardId/likes

### Использованные технологии
+ Node.js
+ Express.js
+ MongoDB
+ Mongoose
+ HTML 5
+ CSS
+ Vanilla JS

[To top/Наверх](#Mesto)
