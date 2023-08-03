from flask import render_template, flash, redirect, url_for, request
from app import app, db
from app.forms import LoginForm, EditProfileForm, RegistrationForm
from flask_login import current_user, login_user, logout_user, login_required
from app.models import User, Stats
from werkzeug.urls import url_parse
from datetime import datetime

#Root URL
@app.route('/')

#Home page
@app.route('/sudoku/<username>')
@login_required
def sudoku():
    title = "Home"
    user = current_user.username;
    return render_template("Sudoku.html", title=title, user=user)

#Login page, redirects to home page upon login
@app.route('/login', methods=['GET', 'POST'])
def login():
    if current_user.is_authenticated:
        return redirect(url_for('sudoku'))
    form = LoginForm()
    if form.validate_on_submit():
        user = User.query.filter_by(username=form.username.data).first()
        if user is None or not user.check_password(form.password.data):
            flash('Invalid username or password')
            return redirect(url_for('login'))
        login_user(user, remember=form.remember_me.data)
        next_page = request.args.get('next')
        if not next_page or url_parse(next_page).netloc != '':
            next_page = url_for('sudoku')
        return redirect(url_for('sudoku'))
    return render_template('login.html', title='Sign In', form=form)

#Logout function redirects to login page
@app.route('/logout')
def logout():
    logout_user()
    return redirect(url_for('sudoku'))

#Registration page
@app.route('/register', methods=['GET', 'POST'])
def register():
    if current_user.is_authenticated:
        return redirect(url_for('sudoku'))
    form = RegistrationForm()
    if form.validate_on_submit():
        user = User(username=form.username.data, email=form.email.data)
        user.set_password(form.password.data)
        db.session.add(user)
        db.session.commit()
        flash('Congratulations, you are now a registered user!')
        return redirect(url_for('login'))
    return render_template('register.html', title='Register', form=form)

#User page
@app.route('/user/<username>')
@login_required
def user(username):
    user = User.query.filter_by(username=username).first_or_404()
    return render_template('user.html', user=user, title='Profile')

#Rules page
@app.route('/rules')
@login_required
def rules():
    return render_template('rules.html',title='Rules')

#Allows to show when user was last seen on the page
@app.before_request
def before_request():
    if current_user.is_authenticated:
        current_user.last_seen = datetime.utcnow()
        db.session.commit()

#Edit Profile page
@app.route('/edit_profile', methods=['GET', 'POST'])
@login_required
def edit_profile():
    form = EditProfileForm(current_user.username)
    if form.validate_on_submit():
        current_user.username = form.username.data
        current_user.about_me = form.about_me.data
        db.session.commit()
        flash('Your changes have been saved.')
        return redirect(url_for('edit_profile'))
    elif request.method == 'GET':
        form.username.data = current_user.username
        form.about_me.data = current_user.about_me
    return render_template('edit_profile.html', title='Edit Profile',
                           form=form)