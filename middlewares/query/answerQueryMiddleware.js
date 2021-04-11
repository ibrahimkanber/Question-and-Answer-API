const asyncErrorWrapper = require("express-async-handler");
const { searchHelper, populateHelper,questionSortHelper, paginationHelper} = require("./QueryMiddlewareHelpers");


const answerQueryMiddleware=function(model,options){
    return asyncErrorWrapper( async function(req,res,next){
        
        const {id}=req.params
        const arrayName="answers"
        const total=(await model.findById(id))["answerCount"]
        
        const paginationResult=await paginationHelper(total,undefined,req)

        const {startIndex, limit}=paginationResult

        let queryObj={}
        
        console.log(limit)
        queryObj[arrayName]={$slice:[startIndex,limit]}

        let query = model.find({_id:id},queryObj)

            query=populateHelper(query,options.population)

        const queryResults=await query

        res.queryResults={
            success:true,
            pagination:paginationResult,
            data:queryResults
        }


        next()
    })
}

module.exports=answerQueryMiddleware;