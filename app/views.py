"""
Flask Documentation:     http://flask.pocoo.org/docs/
Jinja2 Documentation:    http://jinja.pocoo.org/2/documentation/
Werkzeug Documentation:  http://werkzeug.pocoo.org/documentation/
This file creates your application.
"""
from logging import error
import os,time, base64, jwt
from app import app,db,csrf
#  login_manager
from flask import render_template, request, redirect, url_for, flash, jsonify
# from flask_login import login_user, logout_user, current_user, login_required
from app.forms import RegisterForm,SearchForm
from app.models import Users,Favourites,Cars
from werkzeug.utils import secure_filename
from werkzeug.security import check_password_hash
from flask.helpers import send_from_directory

###
# Routing for your application.
###



#Accepts user information and saves it to the database
@app.route("/api/register",methods=["POST"])
def register():
    form=RegisterForm()
    if form.validate_on_submit():
        username = form.username.data
        password = form.password.data
        fullname = form.fullname.data
        email = form.email.data
        location = form.location.data
        bio = form.biography.data
        photo = form.photo.data

        filename = secure_filename(photo.filename)
        photo.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
        datejoin=time.strftime("%m/%d/%Y")
        #Store to data
        try:
            user=Users(username, password, fullname, email, location, bio, filename,datejoin)
            db.session.add(user)
            db.session.commit()

            response="User Added"
            return jsonify(message=response),201
        except Exception as e:
            print(e)
            response="Registration Failed"
            return jsonify(error=response),400

@app.route("/api/search",methods=["GET"])
# @login_required
def search():
    try:
        
        form=SearchForm()
    
        if form.search_make.data:
            make=form.search_make.data
            result= Cars.query.filter_by(make=make).all()

        if form.search_model.data:
            model=form.search_model.data
            result=Cars.query.filter_by(model=model).all()
            
        return jsonify(result=result),200
    except Exception as e:
        print(e)

        response="No Record Found"
        return jsonify(error=response),400




    

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
    return send_static_file('index.html')


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
