
//here 'it' deals with the program below.

//the handle store recieves the req, res and db as inputs

//it gets the data from the body of post request

//it deconstructs the data into the required parameters

//it checks if the device already exists in the database
//or it is a new device.it store the info in the temp //variable

//since we are acting on two databases, we must use a 
//trasaction for protection of database integrity.

//It enters the details in the devicestatus table and
//checks if the deviceid is unique or not in the deviceid
//table.if the device is unique it returns the device //details in the form of json,  else it returns the message
//'device status stored,device not unique' message

//in all other cases it responds with an error 'connection //problem'


const handleStore =(req,res,db)=>{
    // console.log(req.body)
    let { DeviceId, DeviceName, BatteryStatus, Longitude, Latitude } = req.body;
    console.log(DeviceId, DeviceName, BatteryStatus, Longitude, Latitude);
    let temp = Boolean();
    db.select('*').from('deviceinfo').where('deviceid', DeviceId)
        .then(data => { console.log(data); return data })
        .then(info => {
            if (info.length === 0) { temp = true }
            else { temp = false }
        });
    console.log(temp);
    db.transaction(trx => {
        trx.insert({
            deviceid: DeviceId,
            batterystatus: BatteryStatus,
            longitude: Longitude,
            latitude: Latitude,
            time: new Date()
        }).into('devicestatus')
            .returning('deviceid')
            .then(deviceid => {
                if (temp) {
                    console.log(deviceid[0])
                    return trx('deviceinfo').insert({
                        deviceid: deviceid[0],
                        devicename: DeviceName
                    })
                        .returning('*')
                        .then(details => {
                            res.json(details[0]).status(200)
                        })
                } else {
                    res.json('device status stored,device not unique').status(200)
                }
            })
            .then(trx.commit)
            .catch(trx.rollback)
    }).catch(err => res.json('connection problem').status(400))

}

module.exports={
    handleStore:handleStore
}