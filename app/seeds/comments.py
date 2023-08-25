from app.models import db, Comment, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime

def seed_comments():
    comment1 = Comment(
        comment='This is a great song!',
        user_id=2,
        song_id=1,
        createdAt=datetime.utcnow()
    )
    comment2 = Comment(
        comment='I love the chorus.',
        user_id=3,
        song_id=1,
        createdAt=datetime.utcnow()
    )
    comment3 = Comment(
        comment='The beat is so catchy!',
        user_id=3,
        song_id=2,
        createdAt=datetime.utcnow()
    )

    db.session.add(comment1)
    db.session.add(comment2)
    db.session.add(comment3)
    db.session.commit()

def undo_comments():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.comments RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM comments"))

    db.session.commit()
