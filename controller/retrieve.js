
//here 'it' means the program below.

//handleRetrieve accepst req,res and db(database) as the
//input parameters and retrieves the data from 
// devicestatus table.

//the program returns no data found  in case the data is 
//empty. In case of any network error during the execution,
//the program shows the message of 'connection error'

//the response is a json object of single or multiple //entries depending on the data.
const handleRetrieve = (req,res,db) =>
{
    console.log(req.body)
    let id = req.body.DeviceId;
    console.log(id);

    db.select('*').from('devicestatus').where('deviceid', id)
        .then(data => {
            if (data[0].length != 0) { res.json(data).status(200) }
            else { res.json('no data found').status(200) }
        })
        .catch(err => res.json('connection error').status(400))

}

module.exports={
    handleRetrieve:handleRetrieve
}