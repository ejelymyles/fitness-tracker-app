#!/usr/bin/env python3

# Standard library imports
from random import random, randint, choice as rc, uniform
from datetime import datetime

# Remote library imports
from faker import Faker


# Local imports
from app import app
from models import db, User, Exercise, Workout, Log

if __name__ == '__main__':

    fake = Faker()

    with app.app_context():
        print("Starting seed...")
        print("Deleting all records...")
        User.query.delete()
        Exercise.query.delete()
        Workout.query.delete()
        Log.query.delete()

        print("Populating users...")
        for i in range(10):

            def generate_custom_email(username):
                domain = fake.domain_name()
                email = f"{username}@{domain.split('.')[0]}.com"
                return email

            username = fake.user_name()
            email = generate_custom_email(username)

            user = User(
                username = username,
                email = email,
                age =  randint(15, 75), #add number between 15 & 75
                height = randint(48, 84), # add height between 4 feet & 7 feet (48-84 inches)
                weight = randint(70, 300), # add weight between 70 & 300
            )
            db.session.add(user)
        db.session.commit()

        print("Populating exercises...")

        for i in range(20):

            full_description = fake.paragraph(nb_sentences = 2)
            description_preview = full_description[:25] + '...'

            exercise = Exercise(
                name = fake.random_element(elements=("exercise here")), #add fake name
                category = fake.random_element(elements=("cardio", "strength")),
                muscle_group = fake.random_element(elements=("chest", "triceps", "back", "biceps", "shoulders", "traps", "lats", "legs", "abs", "quads", "hamstrings", "glutes")), #add elements 
                equipment = fake.random_element(elements=("barbell", "dumbells ", "kettle ball", "medince ball", "resistance bands")), #add elements 
                description = description_preview, # or add fake elements of ecercises
            )
            db.session.add(exercise)
        db.session.commit()

        print("Populating workouts sessions...")

        users = User.query.all()
        exercises = Exercise.query.all()

        for i in range(30):

            start_date = datetime(2024, 1, 1)
            end_date = datetime(2024, 12, 31)

            user = rc(users)
            exercise = rc(exercises)

            workout = Workout(
                date = fake.date_between(start_date=start_date, end_date=end_date), #add fake date during the year of 2024
                duration = randint(6, 30) * 5 , #add fake time between 30 minutes and 150 minutes in increments of 5
                user = user
            )
            db.session.add(workout)
        db.session.commit()


        print("Logging workouts...")
        for i in range(150):

            distance = randint(0, 500) / 100.0

            workout = rc(Workout.query.all())

            log = Log(
                sets = randint(3, 4), #add number between 3 & 4
                reps = randint(5, 20), #add number between 5 & 20
                weight = randint(1, 60) * 5, #add number greater than 5 in increments of 5
                distance = distance, # add decimal number between 0 & 5 (miles)
                time = randint(30, 90), # add time betweem 30 & 90 seconds 
                exercise = exercise,
                workout = workout
            )
            db.session.add(log)
        db.session.commit()
        print("Complete.")

    

    
        
