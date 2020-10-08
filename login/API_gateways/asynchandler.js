const asyncHandler = fn => (req,res,next) =>{
	Promise.resolve(fn(req,res,next))
		cast.next
}

module.exports = asyncHandler