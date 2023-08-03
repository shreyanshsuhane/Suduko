# A LOGIC-BASED PUZZLE: SUDOKU
*****************************
This application provides a filled-in grid of various numbers where each number 1-9 occupies each row, column, and box. It is a popular game where you place numbers into cells. Using HTML, CSS, JavaScript and Flask, we have developed this popular online single player puzzle.

*****************************

This application provides functionality for:

Log in and Registration: Users can save their usernames and passwords for logging in, allowing access to their sudoku scores. 
The passwords are hashed and so account security is present. 

The game itself of course! A 9x9 sudoku board is present on the main page ("Home") page once logged in. Here the user plays the game and once finished can submit the game, upon doing so recieves results based on their performance.

Rules: We understand not everyone has played sudoku or understand the rules, so we have implemented a rules page explaining in depth the rules of sudoku. Use this to understand how to play if you are unsure.

Profile and Edit Profile: There is also a user profile page, this page records the time the user was last seen on the page and also contains a small bio of the user's choosing. The bio can be created in the "Edit Profile" page. There the user can also choose to chnage their username should they wish to do so.

To participate in this game, users have to register with login details. Unauthorised users must be in the record. Successful registration is necessary for the sudoku challenge to appear. 

## Authors
*****************************
- Ayush Paudel - 22905615
- Rajat Menon - 22711531
- Saiyra Beri - 23648861
- Shreyansh Suhane - 23239611

## Installation and Runnning Application

1: Install python3 (if not installed)

2: Install pip (or pip3 on Mac) (if not installed)

3: Install virtual environement:

    $ pip install virtualenv

4: Make sure the working directory is the same as the directory of this application

5: Enter the virtual environment:

    $ virtualenv venv

6: For Windows:

    $ cd venv
    $ cd Scripts
    $ . activate

##### Make sure to go back into the application directory before you run the app

7: For Mac:

    $ source venv/bin/activate

8: Install requirements file:

    $ pip install -r requirements.txt

9: Set the path variable for the Flask App:

    $ export FLASK_APP=sudoku.py

10: Run the Flask app:

    $ flask run

## Unit Testing

The unit tests can be found in the Tests folder in tests.py. 
These unit tests test various functionalities of the application.
Here are three examples:

1: Testing valid registration:

    #Testing valid registration attempt
    
    def test_valid_registration(self):
        response = self.register("user", "example@email.com", "password", "password")
        self.assertEqual(response.status_code, 200)
        self.assertIn(b'<title>Sign In - Sudoku</title>', response.data)

2: Testing invalid registration due to invalid email (hash in email)

    #Testing invalid registration (invalid email)
    
    def test_invalid_registration_email(self):
        #hash tag in email
        response = self.register("user", "example@em#ail.com", "password", "password")
        self.assertEqual(response.status_code, 200)
        self.assertIn(b'<title>Register - Sudoku</title>', response.data)

3: Testing invalid registration due to non-matching passwords

    #Testing invalid registration (invalid passwords [not matching])
    
    def test_invalid_registration_passwords(self):
        response = self.register("user", "example@email.com", "password", "apassword")
        self.assertEqual(response.status_code, 200)
        self.assertIn(b'<title>Register - Sudoku</title>', response.data)

To run the tests enter this into terminal:

    $ python -m Tests.tests

## References

* Miguel Grindberg's "Flask Mega-Tutorial, Part I-VIII". From: https://blog.miguelgrinberg.com/post/the-flask-mega-tutorial-part-i-hello-world.