from pymongo import MongoClient
from random import randint
import os

myvars = {}
db_host = ""
with open(os.path.join("/home/ubuntu/webapp.properties")) as myfile:
    for line in myfile:
        name, var = line.partition("=")[::2]
        myvars[name.strip()] = (str(var)).strip('\n')
    db_host = str(myvars['db_host']).strip('\n')
    print(db_host)

client =MongoClient(host=db_host, port=27017)
db=client.Uber

def getCities():
    print("Getting Cities")
    result = {}
    cities = []
    count = []
    result = db.bookings.aggregate(
        [
        {
            "$group":{"_id":"$destination","Total":{"$sum":1}}
        }
        ])
    for i in result: 
        cities.append(i["_id"])
        count.append(i["Total"])
    return cities, count

def add_booking(booking):
    print("Adding booking to database!")
    bookingId = None
    try:
        result = db.bookings.insert_one(booking)
        print("Booking added to database..")
        bookingId = result.inserted_id
    except Exception as e:
        print("Booking new trip: An exception occurred: ", e)
    return bookingId

def get_bookings():
    print("Getting all bookings from database!")
    try:
        bookingsList = []
        result = db.bookings.find().sort("journeyDate")
        for booking in result:
            bookingsList.append(booking)
        print("Fetched all bookings from database..")
        return bookingsList
    except Exception as e:
        print("Getting all bookings: An exception occurred: ", e)
    return None