#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

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

            user = User(
                username = fake.user_name(),
                email = fake.email(),
                age =  , #add number between 15 & 75
                height = , # add height between 4 feet & 7'5 feet
                weight = , # add weight between 70 & 400
            )
            db.session.add(user)
        db.session.commit()

        print("Populating exercises...")

        for i in range(20):

            full_description = fake.paragraph(nb_sentences = 2)
            description_preview = full_description[:25] + '...'

            exercise = Exercise(
                name = , #add fake name
                category = fake.random_element(elements=("cardio", "strength")),
                muscle_group = fake.random_element(elements=("fake elements", "fake elements ")), #add elements 
                equipment = fake.random_element(elements=("fake elements", "fake elements ")), #add elements 
                description = description_preview, # or add fake elements 
            )
            db.session.add(exercise)
        db.session.commit()

        print("Populating workouts sessions...")

        for i in range(30):

            workout = Workout(
                date = , #add fake date during the year of 2024
                duration = , #add fake time between 30 minutes and 150 minutes
            )
            db.session.add(workout)
        db.session.commit()


        print("Logging workouts...")
        for i in range(150):

            log = Log(
                sets = , #add number between 3 & 4
                reps = , #add number between 5 & 20
                weight =  , #add number greater than 5
                distance = , # add decimal number between 0 & 5 (miles)
                time = , # add time betweem 30 & 90 seconds 
            )
            db.session.add(log)
        db.session.commit()
        print("Complete.")

    

    
        
