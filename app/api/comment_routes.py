from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import User, Comment, Song, db
from ..forms import CommentForm
from datetime import datetime


comments = Blueprint('comments', __name__)


@comments.route('/<int:songId>')
def all_comments(songId):
    get_comments = Comment.query.filter(Comment.song_id == songId).all()
    response = [comment.to_dict() for comment in get_comments]
    return response


@comments.route('/<int:songId>/new', methods=['POST'])
@login_required
def create_new_comment(songId):
    form = CommentForm()

    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():

        new_comment = Comment(
            comment=form.data['comment'],
            song_id = songId,
            user_id=current_user.to_dict()["id"],
            createdAt=datetime.utcnow()
        ) 

        db.session.add(new_comment)
        db.session.commit()
        return new_comment.to_dict()

    else:
        print(form.errors)
        return {"errors": form.errors}


@comments.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_comment(id):
    comment_to_delete = Comment.query.get(id)
    db.session.delete(comment_to_delete)
    db.session.commit()
    return {"Success": "successfully deleted"}