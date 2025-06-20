import os
import logging
from flask import Flask, render_template

# Set up logging for debugging
logging.basicConfig(level=logging.DEBUG)

# Create the Flask app
app = Flask(__name__)
app.secret_key = os.environ.get("SESSION_SECRET", "dev-secret-key-for-core-pmc")

@app.route('/')
def index():
    """Main dashboard route for CORE PMC admin panel"""
    return render_template('index.html')

@app.route('/dashboard')
def dashboard():
    """Dashboard route - same as index for now"""
    return render_template('index.html')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
