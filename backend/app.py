from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt

app = Flask(__name__)

# Configuración de la conexión con MySQL
app.config["SQLALCHEMY_DATABASE_URI"] = "mysql+pymysql://root:ClaveSegura123@@localhost/tesis_db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db = SQLAlchemy(app)
bcrypt = Bcrypt(app)

# Modelo de Usuario
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(200), nullable=False)

# Crear la base de datos (si no existe)
with app.app_context():
    db.create_all()

# Ruta para registrar usuarios
@app.route("/register", methods=["POST"])
def register():
    data = request.get_json()
    hashed_password = bcrypt.generate_password_hash(data["password"]).decode("utf-8")
    new_user = User(email=data["email"], password=hashed_password)
    db.session.add(new_user)
    db.session.commit()
    return jsonify({"message": "Usuario registrado con éxito"}), 201

# Ruta de inicio de sesión
@app.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    user = User.query.filter_by(email=data["email"]).first()
    
    if user and bcrypt.check_password_hash(user.password, data["password"]):
        return jsonify({"message": "Inicio de sesión exitoso"})
    
    return jsonify({"message": "Credenciales incorrectas"}), 401

if __name__ == "__main__":
    app.run(debug=True)
