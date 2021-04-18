from flask_wtf import FlaskForm
from wtforms import Form, StringField, TextAreaField, SelectField, SubmitField, PasswordField
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