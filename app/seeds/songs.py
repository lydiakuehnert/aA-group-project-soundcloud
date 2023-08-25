from app.models import db, Song, environment, SCHEMA
from sqlalchemy.sql import text
from random import choice, sample, randint

# Adds a demo user, you can add other users here if you want
def seed_songs(all_users):
    song1 = Song(
        name='Song1',
        user_id=1,
        image='https://pngimg.com/d/number1_PNG14888.png',
        audio='dummydata.mp4',
        song_likes=sample(all_users, randint(0, len(all_users)))
        )
    song2 = Song(
        name='Song2',
        user_id=2,
        image='https://media.istockphoto.com/id/968526968/photo/number-2-3d-clean-red-isolated-on-white.jpg?s=170667a&w=0&k=20&c=K7KpYAEeBWH-ZApToHHHZT6Ju7orQZE38mzMgqtLdPo=',
        audio='dummydata.mp4',
        song_likes=sample(all_users, randint(0, len(all_users)))
        )
    song3 = Song(
        name='Song3',
        user_id=3,
        image='https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/NYCS-bull-trans-3.svg/2048px-NYCS-bull-trans-3.svg.png',
        audio='dummydata.mp4',
        song_likes=sample(all_users, randint(0, len(all_users)))
        )

    db.session.add(song1)
    db.session.add(song2)
    db.session.add(song3)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_songs():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM songs"))

    db.session.commit()
