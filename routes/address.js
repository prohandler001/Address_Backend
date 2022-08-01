import express from "express";
import Address from "../models/Address.js";
import verify from "../verifyToken.js";

const addressRouter = express.Router();


addressRouter.post(
    "/register",
    async(req,res)=>{
        const newAddress = new Address({
            CompanyName: req.body.CompanyName,
            LocationName: req.body.LocationName,
            ZipCode : req.body.ZipCode,
            PhoneNumber : req.body.PhoneNumber,
            Email : req.body.Email,
            Country : req.body.Country,
            RegionState : req.body.RegionState,
            TownVillage : req.body.TownVillage,
            CompanyAddress : req.body.CompanyAddress,
            LandMark : req.body.LandMark,
            WebAddress : req.body.WebAddress,
            ListingCategory : req.body.ListingCategory,
            //Logo : req.body.Logo
        });

        try{
            const address = await newAddress.save();
            res.status(201).json(address);
        }
        catch(err){
            res.status(500).json(err);
        }
    }
);

addressRouter.get(
    "/",
    async(req,res)=>{
        try{
            const address = await Address.find({});
            res.status(200).json(address);
        }
        catch(err){
            //console.log(err);
            res.status(500).json(erer);
        }
    }
)

addressRouter.put(
    "/:id",
    verify,
    async(req,res)=>{
        if(req.user.id){
            try{
                const updateAddress = await Address.findByIdAndUpdate(
                    req.params.id,
                    {
                        $set:req.body
                    },
                    {new:true}
                );
                res.status(200).json(updateAddress);
            }
            catch(err){
                res.status(500).json(err);
            }
        }
        else{
            res.status(403).json("You are not allowed to udpate address");
        }
    }
)


addressRouter.delete(
    "/:id",
    verify,
    async(req,res)=>{
        if(req.user.id === req.params.id ){
            try{
                await Address.findByIdAndDelete(req.params.id);
                res.status(200).json("Address deleted sucessfully.......");
            }
            catch(err){
                res.status(500).json(err)
            }
        }
    }
)

//Route for search based on picking address ID
addressRouter.get(
    "/find/:id",
    verify,
    async(req,res)=>{
        try{
            const address = await Address.findById(req.params.id);
            res.status(200).json(address);
        }
        catch(err){
            res.status(500).json(err);
        }
    }
)

export default addressRouter;