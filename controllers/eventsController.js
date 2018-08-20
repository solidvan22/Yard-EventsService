var db = require('../db/db');
exports.list_get=function(req,res){

    let getEventsQuery = `select * from Events`
    db.executeQuery(getEventsQuery).then(resEvents => {
       res.send(resEvents);
    });
   
}
exports.create_post=function(req,res){
    var newObject = req.body
    
    let queryInsertEvent= `INSERT into Events
    (
        TrackVisitID,
        creationDate,
        AITime,
        CaudalTime,
        SapOrder,
        EventName,
        Plate,
        IsBox,
        CameraFile,
        Pallets,
        CameraID
    )
    VALUES
    (
        'C4399178-8323-4DA4-9D63-9DCC69EA1BF7',
        getDate(),
        '${req.body.AITime}',
        '${req.body.CaudalTime}',
        '${req.body.SapOrder}',
        '${req.body.EventName}',
        '${req.body.Plate}',
         ${req.body.IsBox},
        '${req.body.CameraFile}',
         ${req.body.Pallets},
        'F0531F7F-019C-4C80-A1C5-423318093F78')
    `
    console.log(queryInsertEvent);
    db.executeQuery(queryInsertEvent).then(resEvent => {

        console.log("Respuesta Insercion:")
        console.log(resEvent)
        res.send({
            success:true,
            data:req.body
        })
        io.of('/').emit('event', newObject);
        
    }).catch(errorObject => {
        
        console.log(errorObject.originalError.info)
        res.send({
            success:false,
            data:errorObject.originalError.info
        })


    });

    
    
}