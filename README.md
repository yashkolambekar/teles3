# TeleS3

TeleS3 or Telegram S3 is a free, opensource and unlimited file sharing/hosting platform based on Telegram Bot API.

- File Upload Limit : 20MB
- Free : Yes
- Unlimited : Yes

## Built with

- **Frontend**

    The frontend of the TeleS3 is built with React in Typescript on top of the Vite template. Some important packages used are

    - react-router-dom
    - @reduxjs/toolkit
    - axios
  
    And Tailwind CSS is used for styling

- **Backend**

    The backend is built on Laravel 11. Only the api routes are used for working with the backend. There are only 4 routes that we interact with in the backend which are meant for status check, file upload, file existence check and file download.


## Deploy

The app can be deployed using Docker Compose. Follow the below steps accordingly.

1. Clone the github repositry in the desired directory
  
    ```shell
    git clone https://github.com/yashkolambekar/teles3 .
    ```

2. Create an `.env` in the root directory (which has the docker-compose.yaml file) and fill enter all the environment variables / arguments that are mentioned in `/docker-compose.yaml`

    The env file should look something like this

    ```env
    VITE_BACKEND_API=https://backend.example.com
    BOT_TOKEN=XXXXXXXXXXXXXXXXXXXXXXXXXX
    (and so on)
    ```

3. Edit the `/docker-compose.yaml` file as per the requirements (if needed)

4. Run the docker compose up command

    ```shell
    docker compose up --build -d
    ``` 

## Development Setup

Follow the below commands to start developing 

1. Clone the github repo in the desired folder

    ```shell
    git clone https://github.com/yashkolambekar/teles3 .
    ```

2. Frontend Setup

    1. cd into the frontend folder

        ```shell
        cd frontend
        ```

    2. Clone the .env.example file
   
        ```shell
        cp .env.example .env
        ```

    3. Fill in the values in the .env file
   
        VITE_BACKEND_API for development should be something like `http://localhost:8000` but it depends on your laravel config

    4. Install the dependencies

        ```shell
        npm i
        ```

    5. Run the development server

        ```shell
        npm run dev
        ```

        The frontend will be accessible on `http://localhost:5173`

        The following steps should be followed in a new terminal instance or the frontend server will be closed

3. Backend setup

    1. cd into the backend folder

        ```shell
        cd ../backend
        ```

    2. Copy the `.env.example` file

        ```shell
        cp .env.example .env
        ```

    3. Edit the values in `.env` file

        - `APP_ENV` should be changed from production to local
  
        - `DB_CONNECTION` should be changed as per the preference, we can choose between `sqlite`, `mysql`, `mariadb` and `postgres`. Please refer the laravel docs for DB env variables for specific databases

        - If the DB_CONNECTION is set to sqlite, please comment the DB_DATABASE env, it is not required
  
        - Enter the TeleS3 Envs at the end of the file

    4. Installing dependencies
   
        ```shell
        composer install
        ```

        If you get some error while doing this, install `php-xml` from apt and then retry the command

    5. Generate app key
   
        ```shell
        php artisan key:generate
        ```

    6. Run migrations
   
        ```shell
        php artisan migrate:fresh
        ```

        If some error is encountered while doing this, you may consider install `php-sqlite3` from apt and then retry the command

    7. Start the server

        ```shell
        php artisan serve
        ```

        The backend server will be up on `http://localhost:8000`
