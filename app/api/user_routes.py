from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import User, db
from ..forms.profile_image import ProfileImage


user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get(id)
    return user.to_dict()


@user_routes.route('/image', methods=["PUT"])
@login_required
def image():
    form = ProfileImage()
    form["csrf_token"].data = request.cookies['csrf_token']

    curr_user = User.query.get(current_user.id)
    curr_user.image = form.data['image']
    db.session.commit()
    return curr_user.image
