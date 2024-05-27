from pickle import FALSE
from flask import Flask, redirect, render_template, url_for, request, flash, session
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from alchemyClasses import db
from flask import jsonify
from alchemyClasses.Producto import Producto

from alchemyClasses.Usuario import Usuario


app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:Jrosales8.@localhost:3306/cc_krakens'
app.config.from_mapping(
    SECRET_KEY='dev'
)
db.init_app(app)
CORS(app)


@app.route('/productos', methods=['GET'])
def productos():
    productos = Producto.query.all()
    return jsonify([producto.serialize() for producto in productos])




@app.route('/logout', methods=['POST'])
def logout():
    session['user_id'] = None
    return jsonify({'status': 'success'})

    


@app.route('/agregarProducto', methods=['POST'])
def agregar_producto():
    data = request.get_json()
    nuevo_producto = Producto(
        nombre=data['nombre'],
        descripcion=data.get('descripcion', ''),
        foto=data.get('foto'),
        categoria=data.get('categoria', ''),
        precio=data['precio'],
        inventario=data['cantidad'],
        vendedor = 88
    )
    db.session.add(nuevo_producto)
    db.session.commit()
    return jsonify(nuevo_producto.serialize()), 201


@app.route('/eliminarProducto/<int:id>', methods=['DELETE'])
def eliminar_producto(id):
    print(id)
    print("VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV")
    producto = Producto.query.get(id)
    if producto is None:
        return jsonify({'error': 'Producto no encontrado'}), 404

    db.session.delete(producto)
    db.session.commit()
    return jsonify({'message': 'Producto eliminado'}), 200



if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug = True)