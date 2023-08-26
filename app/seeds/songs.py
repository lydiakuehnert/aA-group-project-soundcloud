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
    song4 = Song(
        name='Song4',
        user_id=1,
        image='https://icon2.cleanpng.com/20171220/bfe/number-4-png-5a3a51be177033.0271884715137714540962163.jpg',
        audio='dummydata.mp4',
        song_likes=sample(all_users, randint(0, len(all_users)))
        )

    song5 = Song(
        name='Song5',
        user_id=2,
        image='https://e7.pngegg.com/pngimages/916/551/png-clipart-number-drawing-number-5-text-logo.png',
        audio='dummydata.mp4',
        song_likes=sample(all_users, randint(0, len(all_users)))
        )

    song6 = Song(
        name='Song6',
        user_id=3,
        image='https://png.pngtree.com/png-clipart/20210123/ourmid/pngtree-black-number-6-png-image_2787060.jpg',
        audio='dummydata.mp4',
        song_likes=sample(all_users, randint(0, len(all_users)))
        )

    song7 = Song(
        name='Song7',
        user_id=1,
        image='https://png.pngtree.com/png-clipart/20210328/ourmid/pngtree-pattern-number-7-glowing-color-png-image_3128574.jpg',
        audio='dummydata.mp4',
        song_likes=sample(all_users, randint(0, len(all_users)))
        )

    song8 = Song(
        name='Song8',
        user_id=2,
        image='https://w7.pngwing.com/pngs/779/719/png-transparent-iphone-8-indore-police-child-minecraft-number-8-english-text-trademark-thumbnail.png',
        audio='dummydata.mp4',
        song_likes=sample(all_users, randint(0, len(all_users)))
        )

    song9 = Song(
        name='Song9',
        user_id=3,
        image='https://pngimg.com/uploads/number9/number9_PNG19129.png',
        audio='dummydata.mp4',
        song_likes=sample(all_users, randint(0, len(all_users)))
        )

    song10 = Song(
        name='Song10',
        user_id=1,
        image='https://w7.pngwing.com/pngs/622/298/png-transparent-simple-number-10-miscellaneous-text-trademark-thumbnail.png',
        audio='dummydata.mp4',
        song_likes=sample(all_users, randint(0, len(all_users)))
        )

    song11 = Song(
        name='Song11',
        user_id=2,
        image='https://png.pngtree.com/png-vector/20210208/ourmid/pngtree-3d-numbers-11-in-a-circle-on-transparent-background-png-image_2905099.jpg',
        audio='dummydata.mp4',
        song_likes=sample(all_users, randint(0, len(all_users)))
        )

    song12 = Song(
        name='Song12',
        user_id=3,
        image='https://www.pngfind.com/pngs/m/15-150614_number-12-clipart-blue-rounded-rectangle-with-number.png',
        audio='dummydata.mp4',
        song_likes=sample(all_users, randint(0, len(all_users)))
        )

    song13 = Song(
        name='Song13',
        user_id=1,
        image='https://w7.pngwing.com/pngs/965/612/png-transparent-youtube-13-miscellaneous-text-trademark-thumbnail.png',
        audio='dummydata.mp4',
        song_likes=sample(all_users, randint(0, len(all_users)))
        )

    song14 = Song(
        name='Song14',
        user_id=2,
        image='https://png.pngtree.com/png-clipart/20210301/ourmid/pngtree-number-14-3d-rendering-png-image_2992758.jpg',
        audio='dummydata.mp4',
        song_likes=sample(all_users, randint(0, len(all_users)))
        )

    song15 = Song(
        name='Song15',
        user_id=3,
        image='https://png.pngtree.com/png-clipart/20210301/ourmid/pngtree-number-15-3d-rendering-png-image_2992759.jpg',
        audio='dummydata.mp4',
        song_likes=sample(all_users, randint(0, len(all_users)))
        )

    song16 = Song(
        name='Song16',
        user_id=1,
        image='https://png.pngtree.com/png-vector/20210216/ourmid/pngtree-black-gradient-3d-number-16-png-image_2923782.jpg',
        audio='dummydata.mp4',
        song_likes=sample(all_users, randint(0, len(all_users)))
        )

    song17 = Song(
        name='Song17',
        user_id=2,
        image='https://png.pngtree.com/png-clipart/20210301/ourmid/pngtree-number-17-3d-rendering-png-image_2992761.jpg',
        audio='dummydata.mp4',
        song_likes=sample(all_users, randint(0, len(all_users)))
        )

    song18 = Song(
        name='Song18',
        user_id=3,
        image='https://png.pngtree.com/png-clipart/20210411/original/pngtree-number-18-png-image_6212867.jpg',
        audio='dummydata.mp4',
        song_likes=sample(all_users, randint(0, len(all_users)))
        )

    song19 = Song(
        name='Song19',
        user_id=1,
        image='https://www.pngkit.com/png/full/160-1607668_number-19-png.png',
        audio='dummydata.mp4',
        song_likes=sample(all_users, randint(0, len(all_users)))
        )

    song20 = Song(
        name='Song20',
        user_id=2,
        image='https://www.clipartmax.com/png/small/11-119352_heartbeat-20clipart-clipart-panda-free-number-20-clipart.png',
        audio='dummydata.mp4',
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
