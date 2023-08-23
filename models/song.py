from .db import db
from .like import likes


class Song(db.Model):
    __tablename__ = 'songs'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    image = db.Column(db.String(250), nullable=False)
    audio = db.Column(db.String(255), nullable=False)

    # relationship attributes
    user = db.relationship("User", back_populates="songs")
    comments = db.relationship("Comment", back_populates="song", cascade="all, delete-orphan")
    song_likes = db.relationship(
        "User",
        secondary=likes,
        back_populates="user_likes"
    )

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "image": self.image,
            "audio": self.audio,
            "user": self.user.to_dict_no_song(),
            "likes": len(self.song_likes)
       }