from flask import Flask, redirect, render_template, url_for, request, flash, session
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS, cross_origin
from flask_session import Session
from alchemyClasses import db
from flask import jsonify
from alchemyClasses.Usuario import Usuario
from alchemyClasses.Producto import Producto
from flask_mail import Mail, Message
from alchemyClasses.Reseña import Reseña
import os
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_session import Session

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://dev:123!@localhost:3306/cc_krakens'
app.config['SESSION_TYPE'] = 'sqlalchemy'
app.config['SESSION_COOKIE_NAME'] = 'session'
app.config['SESSION_COOKIE_PATH'] = '/'
app.config['SESSION_COOKIE_HTTPONLY'] = True
app.config['SESSION_COOKIE_SECURE'] = False
app.config['SESSION_COOKIE_SAMESITE'] = 'Lax'
app.config['SESSION_PERMANENT'] = False
app.config['SESSION_USE_SIGNER'] = True
app.config['SESSION_SQLALCHEMY'] = db
app.config['SESSION_SQLALCHEMY_TABLE'] = 'sessions'
app.config['SECRET_KEY'] = 'dev'

CORS(app, supports_credentials=True)
db.init_app(app)
Session(app)

#Configuración  de Flask-Mail
app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 465
app.config['MAIL_USERNAME'] = 'cienciaseats@gmail.com'
app.config['MAIL_PASSWORD'] = 'qjqn maes xlhs ljcm'
app.config['MAIL_USE_TLS'] = False
app.config['MAIL_USE_SSL'] = True

def existe_usuario(user):
    print
    return Usuario.query.filter_by(nombre=user).first() is not None

def checa_contraseña(user, passwd):
    usuario = Usuario.query.filter_by(nombre=user).first()
    if usuario is None:
        return False
    return usuario.contraseña == passwd

def get_user_id(user):
    usuario = Usuario.query.filter_by(nombre=user).first()
    return usuario.idUsuario

@app.route('/login', methods=['POST'])
def login():
    name = request.json.get('username')
    passwd = request.json.get('password')
    if not existe_usuario(name):
        return jsonify({'status': 'error', 'message': 'No existe el usuario'})
    if not checa_contraseña(name, passwd):
        return jsonify({'status': 'error', 'message': 'Contraseña incorrecta'})
    session['user_id'] = get_user_id(name)
    session['username'] = name
    session['vendedor'] = Usuario.query.filter_by(nombre=name).first().esVendedor
    print(session, flush=True)
    print(session.sid, flush=True)
    return jsonify({'status': 'success', 'user_id': session['user_id'], 'username': session['username'],
                    'vendedor': session['vendedor']})

@app.route('/logout', methods=['POST'])
@cross_origin(supports_credentials=True)
def logout():
    session['user_id'] = None
    return jsonify({'status': 'success'})

@app.route('/registro', methods=['POST'])
def registro():
    name = request.json.get('username')
    tel = request.json.get('telefono')
    correo = request.json.get('correo')
    passwd = request.json.get('password')
    esVendedor = request.json.get('vendedor')
        
    if existe_usuario(name):
        return jsonify({'status': 'error', 'message': 'El nombre de usuario ya existe'})
    usuario = Usuario(nombre=name, correo=correo, telefono=tel, contraseña=passwd, esVendedor=esVendedor)
    db.session.add(usuario)
    db.session.commit()
    return jsonify({'status': 'success'})

@app.route('/productos', methods=['GET'])
def productos():
    productos = Producto.query.all()
    return jsonify([producto.serialize() for producto in productos])

@app.route('/comprar', methods=['POST'])
@cross_origin(supports_credentials=True)
def comprar():
    print(session, flush=True)
    print(session.sid, flush=True)
    producto_id = request.json.get('producto_id')
    comprador_id = session['user_id']
    vendedor_id = Producto.query.get(producto_id).vendedor
    comprador = session['username']
    
    correo_vendedor = Usuario.query.get(vendedor_id).correo
    correo_comprador = Usuario.query.get(comprador_id).correo
    producto = Producto.query.get(producto_id).nombre

    mail = Mail(app)
    msg = Message("Compra realizada", sender="cienciaseats@gmail.com", recipients=[correo_vendedor])
    msg.body = f"El usuario {comprador} ha comprado tu producto '{producto}'. Contáctelo en el correo {correo_comprador} para coordinar la entrega."
    mail.send(msg)

    msg = Message("Confirmación de compra", sender="cienciaseats@gmail.com", recipients=[correo_comprador])
    msg.body = f"Has comprado el producto '{producto}'. El vendedor se pondrá en contacto con usted desde {correo_vendedor}."
    mail.send(msg)

    return jsonify({'status': 'success'})

@app.route('/agregarProducto', methods=['POST'])
@cross_origin(supports_credentials=True)
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
            vendedor=session['user_id']
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
    app.run()