const getCommentDetail = (req,res)=> {
    // convert id onto objectId type
    let media = mongoose.Types.ObjectId(req.body.mediaId); 
    comment.aggregate([
        {
            $match:
            {
                "mediaId": media
            }
        },
        {
            $lookup:
            {
                from: 'users',
                localField: 'userId',
                foreignField: 'userId',
                as: 'userComment'
            }
        },
        {
            $lookup:
            {
                from: 'songs',
                localField: 'mediaId',
                foreignField: '_id',
                as: 'songComment'
            }
        }

    ]).then(result => {
        if (result.length == 0)
            return res.status(200).json([{ success: "Media doesn't exists" }]);
        res.status(200).json(result);
    }).catch(err => {
        res.status(200).json([{ success: "Fail to retirve comment details", error: err }])
    })
}
