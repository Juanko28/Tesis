from flask import Flask, request, jsonify, render_template
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt

app = Flask(__name__, static_folder="Component", template_folder="ventanas")

# Configuración de la conexión con MySQL
app.config["SQLALCHEMY_DATABASE_URI"] = "mysql+pymysql://root:ClaveSegura123%40@localhost/tesis_db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db = SQLAlchemy(app)
bcrypt = Bcrypt(app)

# Modelo de Usuario (solo referencia, NO crea la tabla)
class User(db.Model):
    __tablename__ = 'user'  # Usamos la tabla existente
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)  # Nuevo campo
    email = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(200), nullable=False)


@app.route("/")
def home():
    return render_template("index.html")

# Ruta para registrar usuarios
@app.route("/register", methods=["POST"])
def register():
    data = request.get_json()
    hashed_password = bcrypt.generate_password_hash(data["password"]).decode("utf-8")
    
    new_user = User(
        name=data["name"],  # Se guarda el nombre
        email=data["email"], 
        password=hashed_password
    )
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
