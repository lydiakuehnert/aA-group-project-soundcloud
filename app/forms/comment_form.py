from flask_wtf import FlaskForm
from wtforms import SubmitField, TextField
from wtforms.validators import DataRequired

class CommentForm(FlaskForm):
    comment = TextField('Comment', validators=[DataRequired()])
    submit = SubmitField('Post New Comment')