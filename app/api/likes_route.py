from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from app.models import User, Comment, Song
# from sqlalchemy.orm import sessionmaker
# Session = sessionmaker(bind=engine)
# session = Session()

likes = Blueprint('likes', __name__)

@likes.route('')
@login_required
def user_liked_songs():
    curr_user = User.query.get(current_user.to_dict()['id'])
    # return curr_user.to_dict()
    # get_liked_songs = Song.query.filter(Song.id == user.)
    response = [song.to_dict() for song in curr_user.likesList]
    return response

    # get_liked_songs = Song.query.join(Song.song_likes).filter(Song.song_id == current_user.to_dict()['id'])
    # if current_user.is_authenticated:
    #     print('CURRENT USER!!!', current_user.to_dict()["id"])
    #     return current_user.to_dict()
