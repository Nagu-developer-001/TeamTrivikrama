const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const port = 8080;
const placeList = require("./models/wonderLust.js");
const methodOverload = require("method-override");
const ejsMate = require("ejs-mate");
//TODO use ejs-locals for all ejs templates:
app.engine("ejs",ejsMate);
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"/public")));
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(methodOverload("_method"));
main().then((res)=>{
    console.log("Successfully Connected to DataBase!");
}).catch((err)=>{
    console.log(err.errors);
});

async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/wonderLust");
}

//TODO CREATE ROUTE
app.get("/",(req,res)=>{
    res.send("GET is working!!!... .. .");
});
//todo TESTING ROUTE
app.get("/TestListings",async(req,res)=>{
    place = [{
                title: "Cozy Beachfront Cottage111",
                description:
                    "Escape to this charming beachfront cottage for a relaxing getaway. Enjoy stunning ocean views and easy access to the beach.",
                image: {
                    filename: "listingimage",
                    url: "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHRyYXZlbHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
        },
        price: 1500,
        location: "Malibu",
        country: "United States",
        }]
        let x = await placeList.insertMany(place);
        console.log(x);
});
//TODO INDEX ROUTE
app.get("/Listing",async(req,res)=>{
    let allListing = await placeList.find({});
    console.log(allListing[0].title);
    res.render("listings/index.ejs",{allListing});
});
//TODO NEW ROUTE
app.get("/Listing/new",(req,res)=>{
    res.render("listings/newForm.ejs");
});
//TODO SHOW ROUTE
app.get("/Listing/:id",async(req,res)=>{
    let {id} = req.params;
    let content = await placeList.findById(id);
    res.render("listings/show.ejs",{content});
});
//TODO CREATE ROUTE
app.post("/Listing",async(req,res)=>{
    let palceLists = req.body.Listing;//TODO ANOTHER WAY TO GET THE MULTIPLE DATA FROM FORM ...
    let placeAdd = await placeList.insertMany(palceLists);
    res.redirect("/listing");
});
//TODO EDIT ROUTE
app.get("/listing/:id/edits",async(req,res)=>{
    let {id} = req.params;
    let content = await placeList.findById(id);
    console.log(content);
    res.render("listings/edit.ejs",{content});
});
//TODO UPDATE ROUTE
app.put("/listing/:id",async(req,res)=>{
    let {id} = req.params;
    let updated = await placeList.findByIdAndUpdate(id,{...req.body.Listing});
    res.redirect("/listing");
});
//TODO DELETE ROUTE
app.delete("/listing/:id",async(req,res)=>{
    let {id} = req.params;
    let deleteEle = await placeList.findByIdAndDelete(id);
    res.redirect("/listing");
});
app.listen(port,(req,res)=>{
    console.log(`The server has been Started at localhost // - ${port}`);
});