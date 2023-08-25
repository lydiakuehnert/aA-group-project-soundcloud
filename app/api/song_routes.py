from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import User, Comment, Song


songs = Blueprint('songs', __name__)


@songs.route('')
def all_songs():
    #return all songs
    get_songs = Song.query.all()
    response = [song.to_dict() for song in get_songs]
    return response