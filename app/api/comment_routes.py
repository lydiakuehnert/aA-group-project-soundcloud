from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import User, Comment, Song, db


comments = Blueprint('comments', __name__)


@comments.route('/<int:songId>')
def all_comments(songId):
    get_comments = Comment.query.filter(Comment.song_id == songId).all()
    response = [comment.to_dict() for comment in get_comments]
    return response


@comments.route('/<int:id>')
def delete_post(id):
    comment_to_delete = Comment.query.get(id)
    db.session.delete(comment_to_delete)
    db.session.commit()
    return {"Success": "successfully deleted"}