from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField, URLField
from wtforms.validators import DataRequired
from flask_wtf.file import FileField, FileAllowed, FileRequired
from ..api.AWS_helpers import AUDIO_ALLOWED_EXTENSIONS, IMAGE_ALLOWED_EXTENSIONS

"""
need to add enctype="multipart/form-data" to any form tag
on the template for this form for AWS to work
"""

class SongEditForm(FlaskForm):
    name = StringField('Name', validators=[DataRequired()])
    image = FileField('Image URL', validators=[FileAllowed(list(IMAGE_ALLOWED_EXTENSIONS))])
    audio = FileField('Audio URL', validators=[FileAllowed(list(AUDIO_ALLOWED_EXTENSIONS))])
    submit = SubmitField('Edit Song')