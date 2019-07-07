# ven10-store
A simple online store created using django and vanilla JS at the front end. The back end API include:
>* **Product list api** - responds with list of all products.
>* **Product detail api** - responds with all properties of a product.
>* **Product create api** - creates a new product.

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