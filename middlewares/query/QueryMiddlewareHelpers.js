const searchHelper=(searchKey,query,req)=>{
    if(req.query.search){
        const searchObj={}
        const reqex=new RegExp(req.query.search,"i")
        searchObj[searchKey]=reqex

        return query.where(searchObj)
    }
    return query
}

const populateHelper=(query,population)=>{
    return query.populate(population)
}
const questionSortHelper=(query,req)=>{

    const sortQuery=req.query.sortBy

        
    if(sortQuery=="most-answered"){
        return query.sort("-answerCount")
    }
    if(sortQuery=="most-liked"){
        return query.sort("-likeCount")
    }

    return query.sort("-createdAt")
   
}


const paginationHelper=async (totalDocuments,query,req)=>{
        const page=parseInt(req.query.page) || 1
        const limit=parseInt(req.query.limit)|| 1

        const startIndex= (page-1)*limit
        const endIndex=page*limit

        const pagination={}
        const total=totalDocuments

        if (startIndex>0){
            pagination.previous={
                page:page-1
            }
        }

        if (endIndex<total){
            pagination.next={
                page:page+1,
                limit:limit
            }
        }

        /* console.log(limit) */
        return {
            query: query==undefined ? undefined :query.skip(startIndex).limit(limit),
            pagination,
            startIndex,
            limit
        }
}


module.exports={searchHelper,populateHelper,questionSortHelper,paginationHelper}