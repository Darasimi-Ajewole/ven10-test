# ven10
A demo of a django REST api being consumed by a front end application.
The REST api is built using django rest framework,and the front end application is built using jQuery and semantic-ui. 

The front end application is a single admin page to add products to an ecommerce store.
The REST api include:
>* **Product create api** - creates a new product.
>* **Product detail api** - responds with all properties of a product.

See it live [here](https://vast-plateau-57728.herokuapp.com)

# Getting Started
1. Clone the repository
    
    `$ git clone git@github.com:Darasimi-Ajewole/ven10-test.git`
2. Change present working directory to project directory
    
    `$ cd <project directory>`

# Requirements
1. Follow the instructions [here](https://pillow.readthedocs.io/en/stable/installation.html) to install Pillow dependencies 

2. Install python packages
    
    `$ pip install -r requirements.txt`

# Installing

1. Run django migrations
    
    `$ python3 manage.py migrate`

2. Start development server

    `$ python3 manage.py runserver`
3. Kindly wait a few seconds for development server to start successfully.
4. Connect to the internet.
5. Open your browser(chrome preferably) and navigate to `http://127.0.0.1:8000`

# Running Tests
 `$ python manage.py test`

# Built With
* Python 3.7