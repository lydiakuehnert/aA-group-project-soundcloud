from .db import db
import os
environment = os.getenv("FLASK_ENV")
SCHEMA = os.environ.get("SCHEMA")

likes = db.Table(
    "likes",
    db.Model.metadata,
    db.Column("user_id", db.Integer, db.ForeignKey("users.id"), primary_key=True),
    db.Column("song_id", db.Integer, db.ForeignKey("songs.id"), primary_key=True)
)

if environment == "production":
    likes.schema = SCHEMA