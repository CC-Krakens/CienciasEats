from sqlalchemy import Column, Integer, String, Boolean, ForeignKey

from alchemyClasses import db

class Producto(db.Model):
    __tablename__ = 'producto'

    idProducto = db.Column(db.Integer, primary_key=True)
    descripcion = db.Column(db.String(999))
    foto = db.Column(db.LargeBinary)  # 'longblob' type
    categoria = db.Column(db.String(20))
    precio = db.Column(db.Integer, nullable=False)
    inventario = db.Column(db.Integer, nullable=False)
    vendedor = db.Column(db.Integer, db.ForeignKey('usuario.idUsuario'), nullable=False)

    reseñas = db.relationship('Reseña', backref='producto_ref', lazy=True)

    def __repr__(self):
        return f'<Producto {self.descripcion}>'