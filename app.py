from flask import Flask, request, jsonify, render_template
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///blogs.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

class Blog(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    content = db.Column(db.Text, nullable=False)
    date = db.Column(db.DateTime, default=db.func.current_timestamp())

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/new_blog')
def new_blog():
    return render_template('new_blog.html')

@app.route('/blog/<int:id>')
def blog(id):
    return render_template('blog.html')

@app.route('/api/blogs', methods=['GET'])
def get_blogs():
    blogs = Blog.query.all()
    return jsonify([{'id': blog.id, 'title': blog.title, 'content': blog.content, 'date': blog.date} for blog in blogs])

@app.route('/api/blogs/<int:id>', methods=['GET'])
def get_blog(id):
    blog = Blog.query.get_or_404(id)
    return jsonify({'id': blog.id, 'title': blog.title, 'content': blog.content, 'date': blog.date})

@app.route('/api/blogs', methods=['POST'])
def add_blog():
    data = request.json
    new_blog = Blog(title=data['title'], content=data['content'])
    db.session.add(new_blog)
    db.session.commit()
    return jsonify({'id': new_blog.id, 'title': new_blog.title, 'content': new_blog.content, 'date': new_blog.date})

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)
