"""
Flask Documentation:     http://flask.pocoo.org/docs/
Jinja2 Documentation:    http://jinja.pocoo.org/2/documentation/
Werkzeug Documentation:  http://werkzeug.pocoo.org/documentation/
This file creates your application.
"""

from logging import error
import os,time, base64
from app import app,db,csrf, login_manager
from flask import render_template, request, redirect, url_for, flash, jsonify
from flask_login import login_user, logout_user, current_user, login_required
from app.models import Users,Favourites,Cars
from werkzeug.utils import secure_filename
from werkzeug.security import check_password_hash
from flask.helpers import send_from_directory

###
# Routing for your application.
###


#Get car details
@app.route('/api/cars/<int:car_id>', methods = ['GET'])
def viewcar(car_id):
    car = Cars.query.filter_by(car_id=id).first()
    if car is not None:
        return jsonify(car=car),200
    else:
        response = "Car not found."
        return jsonify(error=response),404 


#Add car to favorites
@app.route('/api/cars/<int:car_id>/favourite', methods = ['POST'])
@login_required
def favcar(car_id):
    if current_user.is_authenticated():
        usid = current_user.get_id()
        cid = Favourites.query.filter(car_id=car_id).one()
        if cid is None:
            fav = Favourites(cid, usid)
            db.session.add(fav)
            db.session.commit()

            response = "Car added to favorites"
            return jsonify(message=response),200
        else:
            response = "Car already a favorite"
            return jsonify(error=response)
    
    else:
        response = "Must be logged in to perform this action"
        return jsonify(error=response)


# Please create all new routes and view functions above this route.
# This route is now our catch all route for our VueJS single page
# application.
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def index(path):
    """
    Because we use HTML5 history mode in vue-router we need to configure our
    web server to redirect all routes to index.html. Hence the additional route
    "/<path:path".

    Also we will render the initial webpage and then let VueJS take control.
    """
    return render_template('index.html')


# Here we define a function to collect form errors from Flask-WTF
# which we can later use
def form_errors(form):
    error_messages = []
    """Collects form errors"""
    for field, errors in form.errors.items():
        for error in errors:
            message = u"Error in the %s field - %s" % (
                    getattr(form, field).label.text,
                    error
                )
            error_messages.append(message)

    return error_messages


###
# The functions below should be applicable to all Flask apps.
###


@app.route('/<file_name>.txt')
def send_text_file(file_name):
    """Send your static text file."""
    file_dot_text = file_name + '.txt'
    return app.send_static_file(file_dot_text)


@app.after_request
def add_header(response):
    """
    Add headers to both force latest IE rendering engine or Chrome Frame,
    and also tell the browser not to cache the rendered page. If we wanted
    to we could change max-age to 600 seconds which would be 10 minutes.
    """
    response.headers['X-UA-Compatible'] = 'IE=Edge,chrome=1'
    response.headers['Cache-Control'] = 'public, max-age=0'
    return response


@app.errorhandler(404)
def page_not_found(error):
    """Custom 404 page."""
    return render_template('404.html'), 404


if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0", port="8080")
