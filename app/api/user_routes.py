from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import User, db
from ..forms import SignUpForm


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
    form = SignUpForm()

    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():
        user_to_update = User.query.get(current_user.id)
        user_to_update.image = form.data['image']
        db.session.commit()
        return user_to_update.to_dict_no_song()

    else:
        print(form.errors)
        return {"errors": form.errors}

