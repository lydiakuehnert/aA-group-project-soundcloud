from flask_wtf import FlaskForm
from wtforms import StringField, URLField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User

class ProfileImage(FlaskForm):
    image = StringField('image')
