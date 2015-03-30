module.exports = {
  "DATABASE_URI": "mongodb://localhost:27017/gepio",
  "SESSION_SECRET": "Optimus Prime is my real dad",
  "TWITTER": {
    "consumerKey": "ZVQ2NZscYX1aa6nZI81Fg8HBg",
    "consumerSecret": "FkNrAsPhXVwr1qKgV5fSMGtuTsQNoWqybHlkKFf4g6FG1n4J1V",
    "callbackUrl": "http://127.0.0.1:1337/auth/twitter/callback"
  },
  "FACEBOOK": {
    "clientID": "670456933099660",
    "clientSecret": "e7f3133254d2fe75f25998fbd348c6a0",
    "callbackURL": "http://localhost:1337/auth/facebook/callback"
  },
  "GOOGLE": {
    "clientID": "602274302205-f68k5gte9299kbrpruekls7l81nih2og.apps.googleusercontent.com",
    "clientSecret": "B6Uh-MoWc9VNCNJko1S7n4dT",
    "callbackURL": "http://localhost:1337/auth/google/callback"
  }
};