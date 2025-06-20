#!/usr/bin/env python3
"""
CORE PMC Static File Server
Simple Flask server to serve the frontend-only application
"""

import os
from flask import Flask, send_from_directory, redirect, url_for

app = Flask(__name__, static_folder='static', static_url_path='/static')

@app.route('/')
def home():
    """Serve the login page as the default route"""
    return send_from_directory('.', 'index.html')

@app.route('/dashboard')
def dashboard():
    """Serve the dashboard page"""
    return send_from_directory('.', 'dashboard.html')

@app.route('/admin')
def admin():
    """Serve the admin page if it exists, otherwise redirect to dashboard"""
    if os.path.exists('admin.html'):
        return send_from_directory('.', 'admin.html')
    return redirect(url_for('dashboard'))

@app.route('/<path:filename>')
def serve_static_files(filename):
    """Serve any other static files from the root directory"""
    return send_from_directory('.', filename)

@app.route('/attached_assets/<path:filename>')
def serve_assets(filename):
    """Serve files from the attached_assets directory"""
    return send_from_directory('attached_assets', filename)

if __name__ == '__main__':
    # For development
    app.run(host='0.0.0.0', port=5000, debug=True)