from . import db


class Cars(db.Model):
    
    __tablename__ = 'cars'

    id = db.Column(db.Integer, primary_key=True)
    description = db.Column(db.String(80),unique=True)
    make= db.Column(db.String(80))
    model=db.Column(db.String(80))
    color=db.Column(db.String(80))
    year=db.Column(db.String(80))
    transmission=db.Column(db.String(80))
    car_type=db.Column(db.String(80))
    price=db.Column(db.Float)
    photo=db.Column(db.String(80))
    user_id=db.Column(db.Integer)
    
    def __init__(self,):
        
        
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
        return '<Cars %r>' % (self.id)

