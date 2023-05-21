const express=require('express');
const app=express();
const path=require('path');
const { v4: uuid } = require('uuid');
const methodOverride = require('method-override');

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));

app.use(express.urlencoded({extended:true}));

app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));

// app.use(methodOverride('_method'));



let comments = [
    {
        // id: uuid(),
        id: uuid(),
        username: 'praful',
        text: 'Nice Product.Go for It!!'
    },
    {
        // id: uuid(),
        id: uuid(),
        username: 'gaurisha',
        text: 'Bad Product dont buy it'
    }
];



app.get('/comments',(req,res)=>{
    res.render('index',{comments});
})



app.get('/comments/new',(req,res)=>{
    res.render('new');
})

app.post('/comments',(req,res)=>{

    const { username,text}=req.body;
    comments.push({username,text,id:uuid()});
    // console.log(req.body);
    // res.send("post");
    res.redirect('/comments');//get req lagega
})



app.get('/comments/:commentid',(req,res)=>{
    // console.log(req.params);
    const { commentid } = req.params;
        const foundComment  = comments.find((comment)=>comment.id === commentid);
        res.render('show',{comment:foundComment });
    // res.send("request accepted")
    })



app.get('/comments/:commentid/edit',(req,res)=>{
    const { commentid }=req.params;
    const fi= comments.find((comment)=>comment.id === commentid);
    res.render('edit',{comment:fi});
})


app.patch('/comments/:commentid', (req, res) => {
    
    const { commentid } = req.params;
    const foundComment = comments.find((comment) => comment.id === commentid);

    const { text } = req.body;

    foundComment.text = text;

    res.redirect('/comments');
});

app.delete('/comments/:commentid', (req, res) => {
    
    const { commentid } = req.params;
    const newCommentsArray = comments.filter((comment) => comment.id !== commentid);
    comments = newCommentsArray;
    
    res.redirect('/comments');

});


const port=6500;
app.listen(port,()=>{
    console.log(`server is running at port number : ${port}`)
})