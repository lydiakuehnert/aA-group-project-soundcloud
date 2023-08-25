from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField, URLField
from wtforms.validators import DataRequired

class SongForm(FlaskForm):
    name = StringField('Comment', validators=[DataRequired()])
    image = URLField('Image URL', validators=[DataRequired()])
    audio = URLField('Audio URL', validators=[DataRequired()])
    submit = SubmitField('Create New Song')