from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField, URLField
from wtforms.validators import DataRequired
from flask_wtf.file import FileField, FileAllowed, FileRequired
from ..api.AWS_helpers import ALLOWED_EXTENSIONS

"""
need to add enctype="multipart/form-data" to any form tag
on the template for this form for AWS to work
"""

class SongForm(FlaskForm):
    name = StringField('Comment', validators=[DataRequired()])
    image = URLField('Image URL', validators=[DataRequired()])
    # image = FileField('Image URL', validators=[FileRequired(), FileAllowed(list(ALLOWED_EXTENSIONS))])
    audio = URLField('Audio URL', validators=[DataRequired()])
    # audio = FileField('Audio URL', validators=[FileRequired(), FileAllowed(list(ALLOWED_EXTENSIONS))])
    submit = SubmitField('Create New Song')
