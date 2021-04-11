from . import db

class Users(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80))
    password= db.Column(db.String(80))
    name=db.Column(db.String(80))
    email=db.Column(db.String(80))
    location=db.Column(db.String(80))
    biography=db.Column(db.String(80))
    photo=db.Column(db.String(80))
    date_joined=db.Columnn(db.Date)
    
    def __init__(self,username,password,name,email,location,biography,photo,date_joined):
        self.username=username
        self.password=password
        self.name=name
        self.email=email
        self.location=location
        self.biography=biography
        self.photo=photo
        self.date_joined=date_joined
        
        

        
        
    def is_authenticated(self):
        return True

    def is_active(self):
        return True

    def is_anonymous(self):
        return False

    def get_id(self):
        try:
            return unicode(self.id)  # python 2 support
        except NameError:
            return str(self.id)  # python 3 support

    def __repr__(self):
        return '<Users %r>' % (self.id)

