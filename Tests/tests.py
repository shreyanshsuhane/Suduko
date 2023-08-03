import unittest
from app import app, db
from app.models import User, Stats
from app.forms import LoginForm, RegistrationForm, EditProfileForm

class Tests(unittest.TestCase):
    def setUp(self):
        app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite://'
        db.create_all()
        
    def tearDown(self):
        db.session.remove()
        db.drop_all()
        
    #Some Helper Functions
    
    def registration(self, username, email, password, password2):
        return self.app.post("/register", data=dict(
            username=username,
            email=email,
            password=password,
            password2=password2),
            follow_redirects=True)
        
    def login(self, username, password):
        return self.app.post("/login", data=dict(
            username=username,
            password=password),
            follow_redirects=True)
        
    def logout(self):
        return self.app.get('/logout', follow_redirects=True)
    
    #--------------------------------------------------------
    
    #Testing valid registration attempt
    
    def test_valid_registration(self):
        response = self.register("user", "example@email.com", "password", "password")
        self.assertEqual(response.status_code, 200)
        self.assertIn(b'<title>Sign In - Sudoku</title>', response.data)
        
    #Testing invalid registration (invalid email)
    
    def test_invalid_registration_email(self):
        #hash tag in email
        response = self.register("user", "example@em#ail.com", "password", "password")
        self.assertEqual(response.status_code, 200)
        self.assertIn(b'<title>Register - Sudoku</title>', response.data)
        
        #no domain provided
        response = self.register("user", "example@email", "password", "password")
        self.assertEqual(response.status_code, 200)
        self.assertIn(b'<title>Register - Sudoku</title>', response.data)
        
        #space inserted in email
        response = self.register("user", "example@ email.com", "password", "password")
        self.assertEqual(response.status_code, 200)
        self.assertIn(b'<title>Register - Sudoku</title>', response.data)
        
        #missing the @ symbol
        response = self.register("user", "example email.com", "password", "password")
        self.assertEqual(response.status_code, 200)
        self.assertIn(b'<title>Register - Sudoku</title>', response.data)
        
        #two dots before .com
        response = self.register("user", "example@email..com", "password", "password")
        self.assertEqual(response.status_code, 200)
        self.assertIn(b'<title>Register - Sudoku</title>', response.data)
        
    #Testing invalid registration (invalid passwords [not matching])
    
    def test_invalid_registration_passwords(self):
        response = self.register("user", "example@email.com", "password", "apassword")
        self.assertEqual(response.status_code, 200)
        self.assertIn(b'<title>Register - Sudoku</title>', response.data)
        
    #Testing an invalid registration where at least one field is left blank
    def test_invalid_registration_missing(self):
        response = self.register("user", "example@email.com", "", "password")
        self.assertEqual(response.status_code, 200)
        self.assertIn(b'<title>Register - Sudoku</title>', response.data)
        self.assertIn(b'value=""', response.data)
        
    #Testing valid login
    def test_successful_login(self):
        user = User(username="person", email="person@email.com")
        user.set_password('password')
        self.assertTrue(user.check_password('password'))
        db.session.add(user)
        db.session.commit()
        
        response = self.login("person", "password")
        self.assertIn(b'<title>Home - Sudoku</title>', response.data)