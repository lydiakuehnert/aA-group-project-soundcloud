from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from app.models import User, Comment, Song, db
# from sqlalchemy.orm import sessionmaker
# Session = sessionmaker(bind=engine)
# session = Session()

likes = Blueprint('likes', __name__)

@likes.route('')
@login_required
def user_liked_songs():
    curr_user = User.query.get(current_user.id)
    print('>>>>TYPE OF USER', (curr_user))
    # return curr_user.to_dict()
    # get_liked_songs = Song.query.filter(Song.id == user.)
    # var = curr_user.to_dict()
    response = [song.to_dict() for song in curr_user.user_likes]
    return response

@likes.route('/<int:songId>', methods=['POST'])
def create_like(songId):
    curr_user = User.query.get(current_user.id)
    db.session.execute(likes.insert().values(user_id=curr_user, song_id=songId))
    db.session.commit()
    return current_user

# @likes.route('/<int:songId>', methods=['DELETE'])
# @login_required
# def create_like(songId):
#     curr_user = User.query.get(current_user.id)
#     db.session.execute(likes.delete().where(likes.c.user_id == curr_user) & (likes.c.song_id == songId))
#     db.session.commit()
#     return current_user
