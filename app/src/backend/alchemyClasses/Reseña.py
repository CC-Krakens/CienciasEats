from sqlalchemy import Column, Integer, String, Boolean, ForeignKey

from alchemyClasses import db

class Reseña(db.Model):
    __tablename__ = 'reseña'

    idReseña = db.Column(db.Integer, primary_key=True)
    comentario = db.Column(db.String(999), nullable=False)
    calificacion = db.Column(db.Integer, nullable=False)
    idProducto = db.Column(db.Integer, db.ForeignKey('producto.idProducto'), nullable=False)

    def __repr__(self):
        return f'<Reseña {self.comentario}>'
