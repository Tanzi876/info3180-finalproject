from flask import Flask
from .config import Config
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager
from flask_fontawesome import FontAwesome
from flask_wtf.csrf import CSRFProtect

app = Flask(__name__)
db = SQLAlchemy(app)
csrf = CSRFProtect(app)
fa = FontAwesome(app)

#flask login manager
# login_manager = LoginManager()
# login_manager.init_app(app)
# login_manager.login_view = 'login'

app.config.from_object(Config)
from app import views,models