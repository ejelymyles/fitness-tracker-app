from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.orm import validates
from sqlalchemy import Time, Date

from config import db

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    #add serialization rules 
    serialize_rules = ('-workouts.user',)

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, unique=True, nullable=False)
    email = db.Column(db.String)
    age = db.Column(db.Integer, db.CheckConstraint('age > 0'))
    height = db.Column(db.Integer, db.CheckConstraint('height > 0'))
    weight = db.Column(db.Integer, db.CheckConstraint('weight > 0'))

    @validates('email')
    def validate_email(self, key, email):
        if '@' not in email or not email.endswith('.com'):
            raise ValueError('Email must contain "@" and end with ".com"')
        return email 

    #ONE-to-many relationship with Workouts"
    workouts = db.relationship('Workout', back_populates="user")

    def __repr__(self):
        return f'<User: {self.username} Email: {self.email} Age: {self.age} Height: {self.height} Weight: {self.weight}'


class Exercise(db.Model, SerializerMixin):
    __tablename__ = 'exercises'

     #add serialization rules 
     serialize_rules = ('-logs.exercise',)
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    category = db.Column(db.String, nullable=False)
    muscle_group = db.Column(db.String, nullable=False)
    equipment = db.Column(db.String)
    description = db.Column(db.String)

    @validates('category')
    def validate_category(self, key, category):
        if category not in ['cardio', 'strength']:
            raise ValueError('Category must be either "cardio" or "strength"')
        return category

    #many-to-many relationship with workouts stored through logs
    logs = db.relationship('Log', back_populates="exercise") 

    def __repr__(self):
        return f'<Exercise: {self.name} - {self.category} - {self.muscle_group} - {self.equipment} - {self.description}>'



class Workout(db.Model, SerializerMixin):
    __tablename__ = 'workouts'

     #add serialization rules 
     serialize_rules = ('-user.workouts', '-logs.workout',)

    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.Date, nullable=False)
    duration = db.Column(db.Time)

    #one-to-MANY relationship with User
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    user = db.relationship('User', back_populates="workouts")

    # many-to-many relationship with exercise stored through logs)
    logs = db.relationship('Log', back_populates="workout")

    def __repr__(self):
        return f'< Date:{self.date} Duration:{self.duration}>'


class Log(db.Model, SerializerMixin):
    __tablename__ = 'logs'

    #add serialization rules 
    serialize_rules = ('-exercise.logs', '-workout.logs',)

    id = db.Column(db.Integer, primary_key=True)
    sets = db.Column(db.Integer, db.CheckConstraint('sets > 0'), nullable=False)
    reps = db.Column(db.Integer, db.CheckConstraint('reps > 0'), nullable=False)
    weight  = db.Column(db.Integer, db.CheckConstraint('weight > 0'))
    distance = db.Column(db.Integer, db.CheckConstraint('distance > 0'))
    time = db.Column(db.Time)

    #Storing many-to-many relationship between exercise and workouts
    exercise_id = db.Column(db.Integer, db.ForeignKey('exercises.id'))
    workout_id = db.Column(db.Integer, db.ForeignKey('workouts.id'))

    exercise = db.relationship('Exercise', back_populates="logs")
    workout = db.relationship('Workout', back_populates="logs")

    def __repr__(self):
        return f'<Log Sets: {self.sets} Reps: {self.reps} Weight: {self.weight} Distance: {self.distance} Time: {self.time}>'