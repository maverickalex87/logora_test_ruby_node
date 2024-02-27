const express = require("express")
let fetch=require("node-fetch")
const PORT=3000;

const app =express()


app.post("/api/moderation/predict",async (req,res)=>
{
    let language="fr-FR"
    if(req.query.language)
        language=req.query.language
    if(!req.query.text)
    {
        res.json({error:"No Text Provided"})
        return
    }
    let response =await fetch(`https://moderation.logora.fr/predict?text=${req.query?.text}&language=${language}`)
    let data =await response.json()
    res.json({prediction:data.prediction,text:req.query.text,language:language})
})

app.post("/api/moderation/score",async (req,res)=>
{
    let language="fr-FR"
    if(req.query.language)
        language=req.query.language
    if(!req.query.text)
    {
        res.json({error:"No Text Provided"})
        return
    }
    let response =await fetch(`https://moderation.logora.fr/score?text=${req.query?.text}&language=${language}`)
    let data =await response.json()
    res.json({score:data.score,text:req.query.text,language:language})
})

app.listen(PORT, ()=>
{
    console.log(`server listening in port :${PORT}`)
})
module.exports=app
