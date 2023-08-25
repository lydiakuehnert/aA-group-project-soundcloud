from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import User, Comment, Song


songs = Blueprint('songs', __name__)