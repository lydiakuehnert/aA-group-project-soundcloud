from .db import db, add_prefix_for_prod


class Comment(db.Model):
    __tablename__ = 'comments'

    id = db.Column(db.Integer, primary_key=True)
    comment = db.Column(db.String(2000), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    song_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("songs.id")), nullable=False)
    createdAt = db.Column(db.Date, nullable=False)

    # relationship attributes
    user = db.relationship("User", back_populates="comments")
    song = db.relationship("Song", back_populates="comments")

    def to_dict(self):
        return {
            "id": self.id,
            "comment": self.comment,
            "createdAt": self.createdAt,
            "user": self.user.to_dict_no_song(),
            "song": self.song.to_dict()
       }