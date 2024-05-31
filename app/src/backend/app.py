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
    try:
        data = request.get_json()
        nuevo_producto = Producto(
            nombre=data['nombre'],
            descripcion=data.get('descripcion', ''),
            foto=data.get('foto'),
            categoria=data.get('categoria', ''),
            precio=data['precio'],
            inventario=data['inventario'],
            vendedor = 88
        )
        db.session.add(nuevo_producto)
        db.session.commit()
        return jsonify(nuevo_producto.serialize()), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 400
    


@app.route('/eliminarProducto/<int:id>', methods=['DELETE'])
def eliminar_producto(id):
    producto = Producto.query.get(id)
    if producto is None:
        return jsonify({'error': 'Producto no encontrado'}), 404

    db.session.delete(producto)
    db.session.commit()
    return jsonify({'message': 'Producto eliminado'}), 200

@app.route('/actualizarProducto/<int:id>', methods=['PUT'])
def actualizar_producto(id):
    data = request.get_json()
    producto = Producto.query.get(id)
    if producto is None:
        return jsonify({'error': 'Producto no encontrado'}), 404

    producto.nombre = data.get('nombre', producto.nombre)
    producto.descripcion = data.get('descripcion', producto.descripcion)
    producto.foto = data.get('foto', producto.foto)
    producto.categoria = data.get('categoria', producto.categoria)
    producto.precio = data.get('precio', producto.precio)
    producto.inventario = data.get('inventario', producto.inventario)
    producto.vendedor = data.get('vendedor', producto.vendedor)

    db.session.commit()
    return jsonify(producto.serialize()), 200




if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug = True)