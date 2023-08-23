from .db import db
from .like import likes


class User(db.Model):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(150), nullable=False, unique=True)
    firstname = db.Column(db.String(100))
    lastname = db.Column(db.String(100))
    password = db.Column(db.String(100), nullable=False)

    # relationship attributes
    songs = db.relationship("Song", back_populates="users", cascade="all, delete-orphan")
    comments = db.relationship("Comment", back_populates="user", cascade="all, delete-orphan")
    user_likes = db.relationship(
        "Song",
        secondary=likes,
        back_populates="song_likes"
    )

    def to_dict(self):
        return {
            "id": self.id,
            "username": self.username,
            "firstname": self.firstname,
            "lastname": self.lastname,
            "email": self.email,
            "songs": [song.to_dict() for song in self.songs],
            "likes": len(self.user_likes)
        }
    
    def to_dict_no_song(self):
        return {
            "id": self.id,
            "username": self.username,
            "firstname": self.firstname,
            "lastname": self.lastname,
            "email": self.email
        }