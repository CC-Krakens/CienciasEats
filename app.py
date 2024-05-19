from flask import Flask, redirect, render_template, url_for, request, flash, session
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from alchemyClasses import db
from flask import jsonify
from alchemyClasses.Usuario import Usuario
from alchemyClasses.Producto import Producto
from alchemyClasses.Reseña import Reseña

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://dev:123!@localhost:3306/cc_krakens'
app.config.from_mapping(
    SECRET_KEY='dev'
)
db.init_app(app)
CORS(app)

def existe_usuario(user):
    print
    return Usuario.query.filter_by(nombre=user).first() is not None

def checa_contraseña(user, passwd):
    usuario = Usuario.query.filter_by(nombre=user).first()
    if usuario is None:
        return False
    return usuario.contraseña == passwd

@app.route('/login', methods=['POST'])
def login():
    name = request.json.get('username')
    passwd = request.json.get('password')
    session['user_id'] = name
    if not existe_usuario(name):
        return jsonify({'status': 'error', 'message': 'No existe el usuario'})
    if not checa_contraseña(name, passwd):
        return jsonify({'status': 'error', 'message': 'Contraseña incorrecta'})
    return jsonify({'status': 'success', 'user_id': session['user_id']})

@app.route('/logout', methods=['POST'])
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


if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run()