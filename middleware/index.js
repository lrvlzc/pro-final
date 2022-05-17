module.exports = (req, res, next) => { //req: peticion cliente, res: repuesta
    return res.status(200).json({ code: 1, message: "Bienvenido de NodeJs"});
}