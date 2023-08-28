const OpenAI =require('openai');
const express =require ("express");
const bodyParser =require ("body-parser");
const cors =require ("cors");
const path=require("node:path");

const app=express();
app.use(bodyParser.json())
app.use(cors());
app.use(express.static("../frontend/build"));

// app.use(bodyParser.urlencoded({extended:true}));
const staticPath=path.join(__dirname,"..","frontend","build","index.html")
console.log(staticPath)

app.get("/",(req,res)=>{
    res.sendFile(staticPath);
});

const openai = new OpenAI({
    // apiKey: "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"
  });
  

// const configuration = new Configuration({
//     organization:"org-l5bTD6IW4vac07zqcPHokdBH",
//     apikey:"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",
// });

// const openai=new OpenAIApi(configuration);

app.post("/", async (req,res)=>{
    try{
        const {chats} = req.body;
    console.log(req.body)
    // console.log("first")

    const result = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{"role": "user", "content": "Hello!"},...chats,],
      });
      console.log(result.choices[0].message);
    
      
    console.log(result)
    res.json({
        output: result.data.choices[0].message
    });
    }
    catch(error){
        console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
    }
    // const result = await openai.createChatCompletion({
    //     model:"gpt-3.5-turbo",
    //     messages: [
    //         {
    //           role: "system",
    //           content: "You are a EbereGPT. You can help with graphic design tasks",
    //         },
    //         ...chats,
    //       ],

    // });

    
});

app.listen(8000,()=>{
    console.log(" Server is running at port 8000");
})