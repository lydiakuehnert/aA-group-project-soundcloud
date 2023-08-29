from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from app.models import User, Comment, Song, db, likes
# from sqlalchemy.orm import sessionmaker
# Session = sessionmaker(bind=engine)
# session = Session()

likes_bp = Blueprint('likes', __name__)

@likes_bp.route('')
@login_required
def user_liked_songs():
    curr_user = User.query.get(current_user.id)
    print('>>>>TYPE OF USER', (curr_user))
    # return curr_user.to_dict()
    # get_liked_songs = Song.query.filter(Song.id == user.)
    # var = curr_user.to_dict()
    response = [song.to_dict() for song in curr_user.user_likes]
    return response

@likes_bp.route('/<int:songId>', methods=['POST'])
@login_required
def create_like(songId):
    curr_user = User.query.get(current_user.id)
    db.session.execute(likes.insert().values(user_id=curr_user.id, song_id=songId))
    db.session.commit()
    return jsonify({"message": "Liked"}), 201
