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

        muscle_groups = ["chest", "tricep", "back", "bicep", "shoulder", "trap", "lat", "leg", "abs", "quad", "hamstring", "glute"]
        actions = ["curl", "press", "raise", "lift", "hold"]
        description_terms = ["hard", "controlled", "for 30 seconds", "slowly"]

        for i in range(20):

            # select a random muscle group
            selected_muscle_group = fake.random_element(elements=muscle_groups) 

            # select a random action 
            selected_action = fake.random_element(elements=actions)

            # generate random exercise name with selected muscle group and action
            exercise_name = f"{selected_muscle_group} {selected_action}"

            # create a random description
            term = fake.random_element(elements=description_terms)
            description = f"{selected_action} {term}"

            exercise = Exercise(
                name = exercise_name, #add fake name
                category = fake.random_element(elements=("cardio", "strength")),
                muscle_group = selected_muscle_group, #add elements 
                equipment = fake.random_element(elements=("barbell", "dumbells ", "kettle ball", "medince ball", "resistance bands")), #add elements 
                description = description, # or add fake elements of ecercises
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
            exercise = rc(exercises)

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

    

    
        
