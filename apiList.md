# Dev Tinder APIs

  authRouter
- POST /signup
- POST /login
- POST /logout

  profileRouter
- GET /profile/view
- PATCH /profile/edit
- PATCH /profile/password

  connectionRequestRouter
- POST /request/send/interested/:userId
- POST /request/send/ignored/:userId

    
- POSt /request/review/accepted/:requestId
- POSt /request/review/rejected/:requestId

- GET user/connections
- GET user/request/received
- GET user/feed

