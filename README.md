# Yard-EventsService

Ejemplo de servidor básico MVC sobre nodeJS con sockets

Uso:

  1 npm install
  
  2 node Server
  
  3 Autenticarse (En postman):
  
    POST http://localhost:8080/api/auth
    
    BODY : {
    
      "userName":"Serch", 
      "password": "Serch1234"
    }
    RESPUESTA : {
    
      "success": true,
      "message": "Enjoy your token!",
      "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhZG1pbiI6IlNlcmNoIiwiaWF0IjoxNTM0Nzk0NzI5LCJleHAiOjE1MzQ4ODExMjl9.cW-JYydtJ5Crvjp_Vr2_nH5PqhHY1ObyUITy9Mi58HI"
      }
  4 Crear nuevo evento :
  
    POST http://localhost:8080/api/events
    
    HEADERS :
    x-access-token :eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhZG1pbiI6IlNlcmNoIiwiaWF0IjoxNTM0Nzk0NzI5LCJleHAiOjE1MzQ4ODExMjl9.cW-JYydtJ5Crvjp_Vr2_nH5PqhHY1ObyUITy9Mi58HI
    
    BODY :{
      
      "AITime": "2018-08-20T19:39:24.540Z",
      "CaudalTime": "2018-08-20T19:18:05.000Z",
      "SapOrder": "SAP010022",
      "EventName": "OnPalletLoaded",
      "Plate": "CAS02X89",
      "IsBox": 0,
      "CameraFile": "/sergi/009",
      "Pallets": 25
      }
      
  5 Mostrar todos los eventos:
  
    GET http://localhost:8080/api/events
  
    HEADERS :
    x-access-token :eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhZG1pbiI6IlNlcmNoIiwiaWF0IjoxNTM0Nzk0NzI5LCJleHAiOjE1MzQ4ODExMjl9.cW-JYydtJ5Crvjp_Vr2_nH5PqhHY1ObyUITy9Mi58HI
  
    RESPUESTA:
 
    [
      {
          "EventID": "A8637E29-E1D0-4CEB-96AF-27A8E3FD5E25",
          "TrackVisitID": "C4399178-8323-4DA4-9D63-9DCC69EA1BF7",
          "CreationDate": "2018-08-20T17:56:57.507Z",
          "AITime": "2018-08-20T17:31:24.540Z",
          "CaudalTime": "2018-02-23T14:23:05.000Z",
          "SapOrder": "SAP002",
          "EventName": "onPlantExit",
          "Plate": "U98AXP",
          "IsBox": false,
          "CameraFile": "/sadasd/007",
          "Pallets": 94,
          "CameraID": "F0531F7F-019C-4C80-A1C5-423318093F78"
      },
      {
          "EventID": "5DEDD603-6B6A-4B07-AF45-405D399CFD84",
          "TrackVisitID": "C4399178-8323-4DA4-9D63-9DCC69EA1BF7",
          "CreationDate": "2018-08-20T17:55:38.620Z",
          "AITime": "2018-08-20T17:31:24.540Z",
          "CaudalTime": "2018-02-23T14:23:05.000Z",
          "SapOrder": "SAP4027",
          "EventName": "onPlantExit",
          "Plate": "U98AXP",
          "IsBox": false,
          "CameraFile": "/sadasd/007",
          "Pallets": 94,
          "CameraID": "F0531F7F-019C-4C80-A1C5-423318093F78"
      }
    ]
    
   6 Cuenta con un servior de sockets que envía un broadcast a todos los clientes cuando se acaba de crear un nuevo evento.
    Para consultar el ejemplo ingrear a http://localhost:8080/
    Probar creando nuevos registros a través de cualquier cliente API REST
  

