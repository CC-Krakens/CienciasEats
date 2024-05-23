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


if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run()