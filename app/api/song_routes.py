from flask import Blueprint, jsonify, render_template, request
from flask_login import login_required, current_user
from app.models import User, Comment, Song, db
from .AWS_helpers import upload_file_to_s3, get_unique_filename, remove_file_from_s3
from ..forms.song_form import SongForm

songs = Blueprint('songs', __name__)


@songs.route('')
def all_songs():
    #return all songs
    get_songs = Song.query.all()
    response = [song.to_dict() for song in get_songs]
    return response

@songs.route('/upload', methods=["POST"])
@login_required
def post_song():
    print('hewwo')
    form = SongForm()

    form["csrf_token"].data = request.cookies['csrf_token']

    if form.validate_on_submit():

        new_song = Song(
            name=form.data['name'],
            user_id = current_user.to_dict()['id'],
            image=form.data['image'],
            audio=form.data['audio']
        )

        db.session.add(new_song)
        db.session.commit()
        return new_song.to_dict()

    else:
        print(form.errors)
        return {"errors": form.errors}


@songs.route('/<int:id>')
def get_one_song(id):
    one_song = Song.query.get(id)
    return one_song.to_dict()

@songs.route('/search')
def get_searched_songs():
    query = request.args.get('')
    get_songs = Song.query.filter(Song.name.like(f'%{query}%')).all()
    response = [song.to_dict() for song in get_songs]
    return response

# @songs.route("/new", methods=["GET","POST"])
# def create_new_song():
#     form=SongForm

#     # code for grabbing user

#     if form.validate_on_submit():
#         image = form.data["image"]
#         image.filename = get_unique_filename(image.filename)
#         upload = upload_file_to_s3(image)
#         print(upload)

#         if "url" not in upload:
#             return render_template("<template_file_name.html>", form=form, errors=[upload])

#     new_song = Song(
#         name = form.data['name'],
#         image = upload['url'],
#         audio = form.data['audio']
#     )
