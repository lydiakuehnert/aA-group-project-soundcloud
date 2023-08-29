from app.models import db, Song, environment, SCHEMA
from sqlalchemy.sql import text
from random import choice, sample, randint

# Adds a demo user, you can add other users here if you want
def seed_songs(all_users):
    song1 = Song(
        name='Song1',
        user_id=1,
        image='https://soundcloudaudiofiles.s3.us-west-1.amazonaws.com/SoundCloud+images/1.jpg',
        audio='https://soundcloudaudiofiles.s3.us-west-1.amazonaws.com/Audio/Chopin.mp3',
        song_likes=sample(all_users, randint(0, len(all_users)))
        )
    song2 = Song(
        name='Song2',
        user_id=2,
        image='https://soundcloudaudiofiles.s3.us-west-1.amazonaws.com/SoundCloud+images/2.jpg',
        audio='https://soundcloudaudiofiles.s3.us-west-1.amazonaws.com/Soundcloud+Audio/1.mp3',
        song_likes=sample(all_users, randint(0, len(all_users)))
        )
    song3 = Song(
        name='Song3',
        user_id=3,
        image='https://soundcloudaudiofiles.s3.us-west-1.amazonaws.com/SoundCloud+images/3.jpg',
        audio='https://soundcloudaudiofiles.s3.us-west-1.amazonaws.com/Soundcloud+Audio/2.mp3',
        song_likes=sample(all_users, randint(0, len(all_users)))
        )
    song4 = Song(
        name='Song4',
        user_id=1,
        image='https://soundcloudaudiofiles.s3.us-west-1.amazonaws.com/SoundCloud+images/4.jpg',
        audio='https://soundcloudaudiofiles.s3.us-west-1.amazonaws.com/Soundcloud+Audio/4.mp3',
        song_likes=sample(all_users, randint(0, len(all_users)))
        )

    song5 = Song(
        name='Song5',
        user_id=2,
        image='https://soundcloudaudiofiles.s3.us-west-1.amazonaws.com/SoundCloud+images/5.jpg',
        audio='https://soundcloudaudiofiles.s3.us-west-1.amazonaws.com/Soundcloud+Audio/5.mp3',
        song_likes=sample(all_users, randint(0, len(all_users)))
        )

    song6 = Song(
        name='Song6',
        user_id=3,
        image='https://soundcloudaudiofiles.s3.us-west-1.amazonaws.com/SoundCloud+images/6.jpg',
        audio='https://soundcloudaudiofiles.s3.us-west-1.amazonaws.com/Soundcloud+Audio/6.mp3',
        song_likes=sample(all_users, randint(0, len(all_users)))
        )

    song7 = Song(
        name='Song7',
        user_id=1,
        image='https://soundcloudaudiofiles.s3.us-west-1.amazonaws.com/SoundCloud+images/7.jpg',
        audio='https://soundcloudaudiofiles.s3.us-west-1.amazonaws.com/Soundcloud+Audio/7.mp3',
        song_likes=sample(all_users, randint(0, len(all_users)))
        )

    song8 = Song(
        name='Song8',
        user_id=2,
        image='https://soundcloudaudiofiles.s3.us-west-1.amazonaws.com/SoundCloud+images/8.jpg',
        audio='https://soundcloudaudiofiles.s3.us-west-1.amazonaws.com/Soundcloud+Audio/8.mp3',
        song_likes=sample(all_users, randint(0, len(all_users)))
        )

    song9 = Song(
        name='Song9',
        user_id=3,
        image='https://soundcloudaudiofiles.s3.us-west-1.amazonaws.com/SoundCloud+images/9.jpg',
        audio='https://soundcloudaudiofiles.s3.us-west-1.amazonaws.com/Soundcloud+Audio/9.mp3',
        song_likes=sample(all_users, randint(0, len(all_users)))
        )

    song10 = Song(
        name='Song10',
        user_id=1,
        image='https://soundcloudaudiofiles.s3.us-west-1.amazonaws.com/SoundCloud+images/10.jpg',
        audio='https://soundcloudaudiofiles.s3.us-west-1.amazonaws.com/Soundcloud+Audio/10.mp3',
        song_likes=sample(all_users, randint(0, len(all_users)))
        )

    song11 = Song(
        name='Song11',
        user_id=2,
        image='https://soundcloudaudiofiles.s3.us-west-1.amazonaws.com/SoundCloud+images/11.jpg',
        audio='https://soundcloudaudiofiles.s3.us-west-1.amazonaws.com/Soundcloud+Audio/11.mp3',
        song_likes=sample(all_users, randint(0, len(all_users)))
        )

    song12 = Song(
        name='Song12',
        user_id=3,
        image='https://soundcloudaudiofiles.s3.us-west-1.amazonaws.com/SoundCloud+images/12.jpg',
        audio='https://soundcloudaudiofiles.s3.us-west-1.amazonaws.com/Soundcloud+Audio/12.mp3',
        song_likes=sample(all_users, randint(0, len(all_users)))
        )

    song13 = Song(
        name='Song13',
        user_id=1,
        image='https://soundcloudaudiofiles.s3.us-west-1.amazonaws.com/SoundCloud+images/13.jpg',
        audio='https://soundcloudaudiofiles.s3.us-west-1.amazonaws.com/Soundcloud+Audio/13.mp3',
        song_likes=sample(all_users, randint(0, len(all_users)))
        )

    song14 = Song(
        name='Song14',
        user_id=2,
        image='https://soundcloudaudiofiles.s3.us-west-1.amazonaws.com/SoundCloud+images/14.jpg',
        audio='https://soundcloudaudiofiles.s3.us-west-1.amazonaws.com/Soundcloud+Audio/14.mp3',
        song_likes=sample(all_users, randint(0, len(all_users)))
        )

    song15 = Song(
        name='Song15',
        user_id=3,
        image='https://soundcloudaudiofiles.s3.us-west-1.amazonaws.com/SoundCloud+images/15.jpg',
        audio='https://soundcloudaudiofiles.s3.us-west-1.amazonaws.com/Soundcloud+Audio/15.mp3',
        song_likes=sample(all_users, randint(0, len(all_users)))
        )

    song16 = Song(
        name='Song16',
        user_id=1,
        image='https://soundcloudaudiofiles.s3.us-west-1.amazonaws.com/SoundCloud+images/16.jpg',
        audio='https://soundcloudaudiofiles.s3.us-west-1.amazonaws.com/Soundcloud+Audio/16.mp3',
        song_likes=sample(all_users, randint(0, len(all_users)))
        )

    song17 = Song(
        name='Song17',
        user_id=2,
        image='https://soundcloudaudiofiles.s3.us-west-1.amazonaws.com/SoundCloud+images/17.jpg',
        audio='https://soundcloudaudiofiles.s3.us-west-1.amazonaws.com/Soundcloud+Audio/17.mp3',
        song_likes=sample(all_users, randint(0, len(all_users)))
        )

    song18 = Song(
        name='Song18',
        user_id=3,
        image='https://soundcloudaudiofiles.s3.us-west-1.amazonaws.com/SoundCloud+images/18.jpg',
        audio='https://soundcloudaudiofiles.s3.us-west-1.amazonaws.com/Soundcloud+Audio/18.mp3',
        song_likes=sample(all_users, randint(0, len(all_users)))
        )

    song19 = Song(
        name='Song19',
        user_id=1,
        image='https://soundcloudaudiofiles.s3.us-west-1.amazonaws.com/SoundCloud+images/19.jpg',
        audio='https://soundcloudaudiofiles.s3.us-west-1.amazonaws.com/Soundcloud+Audio/19.mp3',
        song_likes=sample(all_users, randint(0, len(all_users)))
        )

    song20 = Song(
        name='Song20',
        user_id=2,
        image='https://soundcloudaudiofiles.s3.us-west-1.amazonaws.com/SoundCloud+images/20.jpg',
        audio='https://soundcloudaudiofiles.s3.us-west-1.amazonaws.com/Soundcloud+Audio/20.mp3',
        song_likes=sample(all_users, randint(0, len(all_users)))
        )

    all_songs = [song1, song2, song3, song4, song5, song6, song7, song8, song9, song10, song11, song12, song13, song14, song15, song16, song17, song18, song19, song20]
    add_songs = [db.session.add(song) for song in all_songs]
    db.session.commit()
    return all_songs


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_songs():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.songs RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM songs"))

    db.session.commit()
