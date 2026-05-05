# How to setup the enviroment


**This Project uses UV**<br>
Make sure to install uv <br> https://docs.astral.sh/uv/getting-started/installation/

## Running in development
_(Make sure your working directory is the ./backend folder, the folder of this README)_

To run the enviroment in development do the following<br>

1. Install all dependencies with:
    ```bash
    uv sync
    ```
2. Go into the django folder:
    ```bash
    cd dashboardairbnb
    ```

3. Make the migrations with:
    ```bash
    uv run manage.py migrate
    ```
4. Import the data from the csv files with
    ```bash
    uv run manage.py import_data
    ```

5. Run django in development at the port 8000 mode with uv: 
    ```bash
    uv run manage.py runserver 8000
    ```
6. Access the server endpoints at http://localhost:8000/docs
