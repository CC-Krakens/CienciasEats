from sqlalchemy import Column, Integer, String, Boolean, ForeignKey
from alchemyClasses import db

class Producto(db.Model):
    __tablename__ = 'producto'

    idProducto = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(50), nullable=False)
    descripcion = db.Column(db.String(999))
    foto = db.Column(db.String(999)) 
    categoria = db.Column(db.String(20))
    precio = db.Column(db.Integer, nullable=False)
    inventario = db.Column(db.Integer, nullable=False)
    vendedor = db.Column(db.Integer, db.ForeignKey('usuario.idUsuario'), nullable=False)

    reseñas = db.relationship('Reseña', backref='producto_ref', lazy=True)

    def __repr__(self):
        return f'<Producto {self.descripcion}>'

    def serialize(self):
        return {
            'idProducto': self.idProducto,
            'nombre': self.nombre,
            'descripcion': self.descripcion,
            'foto': self.foto,
            'categoria': self.categoria,
            'precio': self.precio,
            'inventario': self.inventario,
            'vendedor': self.vendedor
        }
