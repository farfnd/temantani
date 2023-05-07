import { verifyJwt } from "../../utils.js"
export default(req, res, next)=>{
    try {
        const token = req.headers.authorization.split(' ')[1]
        const decoded = verifyJwt(token)
        req.user = decoded
        next()
    } catch (error) {
        res.statusCode = 403
        res.send({
            message:'Token not valid',
        })
    }
}