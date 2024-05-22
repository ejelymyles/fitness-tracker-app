from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.orm import validates

from config import db

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    #add serialization rules 

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, nullable=False)
    email = db.Column(db.String)
    age  = db.Column(db.Integer)
    height = db.Column(db.Integer)
    weight = db.Column(db.Integer)

    #add relationships 

    def __repr__(self):
        return f'<User: {self.username} Email: {self.email} Age: {self.age} Height: {self.height} Weight: {self.weight}'


class Exercise(db.Model, SerializerMixin):
    __tablename__ = 'exercises'

     #add serialization rules 
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    category = db.Column(db.String, nullable=False)
    muscle_group = db.Column(db.String, nullable=False)
    equipment = db.Column(db.String)
    description = db.Column(db.String)

     #add relationships 

    def __repr__(self):
        return f'<Exercise: {self.name} - {self.category} - {self.muscle_group} - {self.equipment} - {self.description}>'



class Workout(db.Model, SerializerMixin):
    __tablename__ = 'workouts'

     #add serialization rules 

    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.Date, nullable=False)
    duration = db.Column(db.Integer)

     #add relationships 

    def __repr__(self):
        return f'< Date:{self.date} Duration:{self.duration}>'


class Log(db.Model, SerializerMixin):
    __tablename__ = 'logs'

    #add serialization rules 

    id = db.Column(db.Integer, primary_key=True)
    sets = db.Column(db.Integer)
    reps = db.Column(db.Integer)
    weight  = db.Column(db.Integer)
    distance = db.Column(db.Integer)
    time = db.Column(db.Integer)

    #add relationships 

    def __repr__(self):
        return f'<Log Sets: {self.sets} Reps: {self.reps} Weight: {self.weight} Distance: {self.distance} Time: {self.time}>'