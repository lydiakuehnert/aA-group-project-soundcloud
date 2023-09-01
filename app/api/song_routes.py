from flask import Blueprint, jsonify, render_template, request
from flask_login import login_required, current_user
from app.models import User, Comment, Song, db
from .AWS_helpers import upload_file_to_s3, get_unique_filename, remove_file_from_s3
from ..forms.song_form import SongForm
from ..forms.song_edit_form import SongEditForm

from .auth_routes import validation_errors_to_error_messages
from sqlalchemy import func

songs = Blueprint('songs', __name__)


@songs.route('')
def all_songs():
    # return all songs
    get_songs = Song.query.all()
    response = [song.to_dict() for song in get_songs]
    return response


@songs.route('/upload', methods=["POST"])
@login_required
def post_song():
    # print('hewwo')
    form = SongForm()

    form["csrf_token"].data = request.cookies['csrf_token']

    if form.validate_on_submit():

        image = form.data["image"]
        image.filename = get_unique_filename(image.filename)
        upload = upload_file_to_s3(image)
        print(upload)

        if "url" not in upload:
            print([upload])
            return {'errors': upload}

        audio = form.data["audio"]
        audio.filename = get_unique_filename(audio.filename)
        audioLoad = upload_file_to_s3(audio)
        print(audioLoad)

        if "url" not in audioLoad:
            print([audioLoad])
            return {'errors': audioLoad}

        new_song = Song(
            name=form.data['name'],
            user_id=current_user.to_dict()['id'],
            image=upload['url'],
            audio=audioLoad['url']
        )

        db.session.add(new_song)
        db.session.commit()
        return {'newSong': new_song.to_dict()}

    else:
        print(form.errors)
        return {"errors": form.errors}


@songs.route('/<int:id>', methods=['PUT'])
@login_required
def edit_song(id):
    form = SongEditForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    if form.validate_on_submit():
        song_to_update = Song.query.get(id)


        if len(form.data["image"]):
            image_deleted = remove_file_from_s3(song_to_update.image)
            image = form.data["image"]

        if len(form.data["audio"]):
            audio_deleted = remove_file_from_s3(song_to_update.audio)
            audio = form.data["audio"]


        if image_deleted and audio_deleted is True:
            image.filename = get_unique_filename(image.filename)
            upload = upload_file_to_s3(image)
            print(upload)
            if "url" not in upload:
                print([upload])
                return {'errors': upload}
            audio.filename = get_unique_filename(audio.filename)
            audioLoad = upload_file_to_s3(audio)
            print(audioLoad)
            if "url" not in audioLoad:
                print([audioLoad])
                return {'errors': audioLoad}
            song_to_update.image = upload['url']
            song_to_update.audio = audioLoad['url']
        else:
            return "<h1> Error Occurred in Updating Song<h1>"
        song_to_update.name = form.data['name']

        print("EDITED SONG IMAGE AND AUDIO", song_to_update.image, song_to_update.audio)
        db.session.commit()
        return song_to_update.to_dict()
    else:
        print(form.errors)
        return {"errors": form.errors}

@songs.route('/<int:id>', methods=['DELETE'])
def delete_song(id):
    get_song = Song.query.get(id)

    image_deleted = remove_file_from_s3(get_song.image)
    audio_deleted = remove_file_from_s3(get_song.audio)
    if image_deleted and audio_deleted is True:
        db.session.delete(get_song)
        db.session.commit()
        return {"Success": "successfully deleted"}
    else:
        return "<h1> Error Occurred in Deleting Song<h1>"


@songs.route('/<int:id>')
def get_one_song(id):
    # print('hewwoooo')
    one_song = Song.query.get(id)
    return one_song.to_dict()


@songs.route('/search')
def get_searched_songs():
    query = request.args.get('').lower()
    get_songs = Song.query.filter(func.lower(Song.name).like(f'%{query}%')).all()
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
