#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, make_response, jsonify
from flask_restful import Resource

# Local imports
from config import app, db, api
# Add your model imports
from models import User, Exercise, Workout, Log
from datetime import datetime




class Users(Resource):
    def get(self):
        users = [user.to_dict() for user in User.query.all()]
        return users, 200

    def post(self):
        data = request.get_json()
        new_user = User(
            username=data['username'],
            email=data['email'],
            age=data['age'],
            height=data['height'],
            weight=data['weight']
        )
        db.session.add(new_user)
        db.session.commit()
        return make_response(new_user.to_dict(), 201)


api.add_resource(Users, '/users')



class UsersByID(Resource):
    def get(self, id):
        user = User.query.filter_by(id=id).first().to_dict()
        if user:
            return user, 200
        else:
            return {"Error":"Car not found"}, 404

    # def patch(self, id):
    #     user = User.query.filter_by(id=id).first()
    #     if user:
    #         request_data = request.get_json()
    #         for attr, value in request_data.items():
    #             setattr(user, attr, value)

    #         db.session.commit()
    #         return user.to_dict(), 200
    #     else:
    #         return{"Error": "User not found"}, 404


    def delete(self, id):
        user = User.query.filter_by(id=id).first()
        db.session.delete(user)
        db.session.commit()
        return make_response({}, 204)


api.add_resource(UsersByID, '/users/<int:id>')





class Workouts(Resource):
    def get(self, user_id):
        workouts = Workout.query.filter_by(user_id=user_id).all()
        workout_list = [workout.to_dict() for workout in workouts]
        return workout_list, 200

    def post(self, user_id):
        data = request.get_json()
        new_workout = Workout(
            date=datetime.strptime(data['date'], '%Y-%m-%d').date(),
            duration=data['duration'],
            user_id=user_id
        )
        db.session.add(new_workout)
        db.session.commit()
        return make_response(new_workout.to_dict(), 201)


api.add_resource(Workouts, '/users/<int:user_id>/workouts')


class WorkoutsByID(Resource):
    def get(self, user_id, workout_id):
        workout = Workout.query.filter_by(user_id=user_id, id=workout_id).first()
        if not workout:
            return{'Workout not found'}, 404
        return workout.to_dict(), 200

    # def patch(self, user_id, workout_id):
    #     workout = Workout.query.filter_by(user_id=user_id, id=workout_id).first()
    #     if workout:
    #         request_data = request.get_json()
    #         for attr, value in request_data.items():
    #             setattr(workout, attr, value)
        
    #         db.session.commit()
    #         return workout.to_dict(), 200
    #     else:
    #         return{"Error": "Workout not found"}, 404


    def delete(self, user_id, workout_id):
        workout = Workout.query.filter_by(user_id=user_id, id=workout_id).first()
        if not workout:
            return{'workout not found'}, 404

        db.session.delete(workout)
        db.session.commit()
        return {'message': 'Workout deleted successfully'}, 204


api.add_resource(WorkoutsByID, '/users/<int:user_id>/workouts/<int:workout_id>')










class Logs(Resource):
    def get(self, user_id, workout_id):
        workout = Workout.query.filter_by(user_id=user_id, id=workout_id).first()
        if not workout:
            return {'message': 'Workout not dfound'}, 404

        logs = Log.query.filter_by(workout_id=workout.id).all()
        return[log.to_dict() for log in logs], 200

    def post(self, user_id, workout_id):
        data = request.get_json()
        new_log = Log(
            sets=data['sets'],
            reps=data['reps'],
            weight=data['weight'],
            distance=data['distance'],
            time=data['time'],
            exercise_id=data['exercise_id'],
            workout_id=workout_id
        )
        db.session.add(new_log)
        db.session.commit()
        return make_response(new_log.to_dict(), 201)

api.add_resource(Logs, '/users/<int:user_id>/workouts/<int:workout_id>/logs')


class LogsByID(Resource):
    def get(self, user_id, workout_id, log_id):
        workout = Workout.query.filter_by(user_id=user_id, id=workout_id).first()
        if not workout:
            return {'message': 'Workout not dfound'}, 404

        log = Log.query.filter_by(workout_id=workout.id, id=log_id).first()
        if not log:
            return {'message': 'Log not found'}, 404
        return log.to_dict(), 200
        

    # def patch(self, user_id, workout_id, log_id):
    #     workout = Workout.query.filter_by(user_id=user_id, id=workout_id).first()
    #     if not workout:
    #         return {'message': 'Workout not found'}, 404

    #     log = Log.query.filter_by(workout_id=workout.id, id=log_id).first()
    #     if log:
    #         request_data = request.get_json()
    #         for attr, value in request_data.items():
    #             if hasattr(log, attr):
    #                 setattr(log, attr, value)

    #         db.session.commit()
    #         return log.to_dict(), 200
    #     else:
    #         return{"Error": "Log not found"}, 404



    def delete(self, user_id, workout_id, log_id):
        workout = Workout.query.filter_by(user_id=user_id, id=workout_id).first()
        if not workout:
            return {'message': 'Workout not found'}, 404
        
        log = Log.query.filter_by(workout_id=workout.id, id=log_id).first()
        if not log:
            return {'message': 'Log not found'}, 404
        
        db.session.delete(log)
        db.session.commit()
        return{'message': 'Log deleted succesfully'}, 204


api.add_resource(LogsByID, '/users/<int:user_id>/workouts/<int:workout_id>/logs/<int:log_id>')








class Exercises(Resource):
    def get(self):
        exercises = [exercise.to_dict() for exercise in Exercise.query.all()]
        return exercises, 200

    def post(self):
        data = request.get_json()
        new_exercise = Exercise(
            name=data['name'],
            category=data['category'],
            muscle_group=data['muscle_group'],
            equipment=data['equipment'],
            description=data['description']
        )
        db.session.add(new_exercise)
        db.session.commit()
        return make_response(new_exercise.to_dict(), 201)

api.add_resource(Exercises, '/exercises')



class ExercisesByID(Resource):
    def get(self, id):
        exercise = Exercise.query.filter_by(id=id).first().to_dict()
        if exercise:
            return exercise, 200
        else:
            return {"Error":"Car not found"}, 404

    # def patch(self, id):
    #     exercise = Exercise.query.filter_by(id=id).first()
    #     if exercise:
    #         request_data = request.get_json()
    #         for attr, value in request_data.items():
    #             setattr(exercise, attr, value)

    #         db.session.commit()
    #         return exercise.to_dict(), 200
    #     else:
    #         return{"Error": "Exercise not found"}, 404

api.add_resource(ExercisesByID, '/exercises/<int:id>')


if __name__ == '__main__':
    app.run(port=5555, debug=True)

