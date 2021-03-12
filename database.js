const {Client}=require('pg');
const client=new Client({
    host:"localhost",
    port:5432,
    user:"postgres",
    password:"    ",
    database:"postgres"
})
client.connect();
client.query('select * from maps', (err,result)=>
{
    if(!err)
    {
        console.log(result.rows);
    }
 
    client.end();
})