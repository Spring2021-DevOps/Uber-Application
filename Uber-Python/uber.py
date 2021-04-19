from flask import Flask, request, jsonify, Response
from bson.objectid import ObjectId
import uuid
import DatabaseOperations as database
from flask_cors import CORS
import json as JSON

app = Flask(__name__)
CORS(app)

@app.route('/health', methods=["GET"])
def getHealth():
    return "Hello from Python application"

@app.route('/book-trip', methods=["POST"])
def bookTrip():
    print("Booking new trip..")
    try:
        firstName = request.json["firstNameP"]
        lastName = request.json["lastNameP"]
        source = request.json["sourceP"]
        destination = request.json["destinationP"]
        journeyDate = request.json["journeydDateP"]
        bookingID = str(ObjectId())

        booking = dict(firstName=firstName, lastName=lastName, source=source,
                    destination=destination, journeyDate=journeyDate, _id=bookingID
                    )
        bookingId = database.add_booking(booking)
        print("Booked new trip!")
        data = {
                "message": "Booking Successful",
                "BookingID": bookingId
        }
        statusCode = 200

    except Exception as e:
        print("An exception occurred", e)
        data = {
            "message": "Booking unsuccessful. Please try again later",
            "BookingID": None
        }
        statusCode = 500

    js = JSON.dumps(data)
    res = JSON.dumps({"bookings":data})
    response = Response(js, status=statusCode, mimetype='application/json')
    return res

@app.route('/bookings', methods=["GET"])
def getAllBookings():
    try:
        bookings = database.get_bookings()
        if bookings is None:
            bookings = []

    except Exception as e:
        print(e)
        bookings = []

    return JSON.dumps({"results": list(bookings)})

@app.route('/analysis', methods=["GET"])
def getCityFrequency():
    try:
        result = database.getCities()
        return JSON.dumps({"city": list(result[0]), "count":list(result[1])})
    except Exception as e:
        print(e)

if __name__ == "__main__":
    app.run(host='0.0.0.0')