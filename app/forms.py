from flask_wtf import FlaskForm
from wtforms import Form, StringField, TextAreaField, SelectField, SubmitField, PasswordField,DecimalField, SelectField
from wtforms.validators import DataRequired, Email, InputRequired, Length
from flask_wtf.file import FileField, FileRequired, FileAllowed


class RegisterForm(FlaskForm):
    username = StringField('Username', validators=[InputRequired()])
    password = PasswordField('Password', validators=[InputRequired()]) 
    fullname = StringField('Firstname', validators=[InputRequired()]) 
    email = StringField('E-mail', validators=[DataRequired(), Email('Enter a valid email')])
    location = StringField('Located at', validators=[DataRequired()])
    biography = TextAreaField('Biography', validators=[
        InputRequired(),
        Length(min=15, max=200, message="Can enter from 15 to 200 characters.")
    ])
    photo = FileField('Photo', validators=[FileAllowed(['jpg','png','jpeg'], 'Images only!')])
    submit = SubmitField('Register')

class AddCar(FlaskForm):
    make = StringField('Make', validators=[InputRequired()])
    model = StringField('Model', validators=[InputRequired()]) 
    colour = StringField('Colour', validators=[InputRequired()])
    year = StringField('Year', validators=[DataRequired()])
    transmission = SelectField('Transmission', choices = [('Automatic','Automatic'),('Standard','Standard')],validators=[DataRequired()])
    car_type = SelectField('Car Type',choices = [('SUV','SUV'),('Truck','Truck'),('Sedan','Sedan'),('Van','Van'),('Coupe','Coupe'),('Wagon','Wagon'),('Convertable','Convertable'),('Hybrid/Electric','Hybrid/Electric'),('Sports Car','Sports Car'),('Diesel','Diesel'),('Crossover','Crossover'),('Luxury Car','Luxury Car')] ,validators=[InputRequired()])
    description = TextAreaField('Description', validators=[InputRequired(), Length(min=15, max=200, message="Can enter from 15 to 200 characters.")])
    price = DecimalField('Price', validators=[InputRequired()])
    photo = FileField('Photo', validators=[FileAllowed(['jpg','png','jpeg'], 'Images only!')])
    submit = SubmitField('Add Car')

class SearchForm(FlaskForm):
    search_make=StringField('Make')
    search_model=StringField('Model')

    
class LoginForm(FlaskForm):
    username = StringField('Username', validators=[InputRequired()])
    password = PasswordField('Password', validators=[InputRequired()])
