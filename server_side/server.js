const express = require('express');
const app = express();
const mongo = require('./mongoose')
const userSchema = require('./server/schemas/testing schema')
const bodyparser = require('body-parser');
const cors = require('cors')
const controller = require('./server/controller/controller')
const store = require('./server/middleware/multer')

app.use(bodyparser.json())
app.use(cors())
app.use(express.json())

const connectToMongoDB = async () => {
    await mongo().then( async (mongoose) => {
        try {
            console.log('Connected Successfully !!!')

        }
        finally{
            // mongoose.connection.close()
        }
    })
} 

const add = async (name,password) => {
    console.log(name,password)
    connectToMongoDB()
    const user = {
        name: name,
        password: password
    }
    await new userSchema(user).save()

    console.log('Saved')
    return user
}

async function upload() {
    connectToMongoDB()
    
    const finalImg = {
        filename : 'fi',
        contentType : 'fi',
        imageBase64 : 'sr'
    }

    await new UploadModel(finalImg)
            .save()
            .then(()=> {console.log('saved')})
            .catch((err)=>{console.log("ERROR",err)})

}

app.get('/' , (req,res) => {
    res.send('ONUM ILA')
})

app.get('/register' , (req,res) => {
    res.send('REGISTER SIDE')
})

app.post('/register' , (req,res) => {

    data = add(req.body.name,req.body.password)
    res.send()
})

app.post('/upload' , async (req,res) => {

    try {
        await store(req,res);
        
        if (req.body.file == undefined) {
          return res.send({
            message: "You must select a file.",
          });
        }
        upload()
        return res.send({
          message: `"File has been uploaded."`,
        });

    }
    catch(err) {
        console.log(err)
    }

})

port = process.env.PORT || 8080 ;

app.listen(port, ()=>{ console.log(`'Server started on ${port}'`)})
