from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import User, Comment, Song


comments = Blueprint('comments', __name__)