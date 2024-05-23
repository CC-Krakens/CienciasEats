from sqlalchemy import Column, Integer, String, Boolean, ForeignKey

from alchemyClasses import db

class Usuario(db.Model):
    __tablename__ = 'usuario'

    idUsuario = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(20), nullable=False)
    correo = db.Column(db.String(50), nullable=False)
    telefono = db.Column(db.String(10), nullable=False)
    contraseña = db.Column(db.String(50), nullable=False)
    esVendedor = db.Column(db.Boolean, nullable=False)

    productos = db.relationship('Producto', backref='vendedor_ref', lazy=True)

    def __repr__(self):
        return f'<Usuario {self.nombre}>'
