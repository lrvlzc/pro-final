const express = require('express');
const employees = express.Router();
const db = require('../config/database');

employees.post("/", async(req,res,next) =>{
    const {Name, LastName, Phone, Mail, Address, Alta} = req.body;

    if(Name && LastName && Phone && Mail && Address && Alta){
            let query= "INSERT INTO employees(Name, LastName, Phone, Mail, Address, Alta)"
            query += ` VALUES ('${Name}', '${LastName}', '${Phone}', '${Mail}', '${Address}', '${Alta}')`;
            const rows = await db.query(query);
            
            if(rows.affectedRows == 1){
                return res.status(201).json({ code: 201, message: "Empleado insertado correctamente"});
            }
            return res.status(500).json({ code: 500, message: "Ocurrio un error"});
        }
        return res.status(500).json({ code: 500, message: "Campos incompletos"});
        
});

employees.delete("/:id([0-9]{1,3})", async(req,res,next) =>{
    const query = `DELETE FROM employees WHERE ID = ${req.params.id}`;

    const rows = await db.query(query);

    if(rows.affectedRows == 1){
        return res.status(201).json({ code: 201, message: "Empleado eliminado"});
    }
        return res.status(500).json({ code: 500, message: "Empleado no encontrado"});
        
});

employees.put("/:id([0-9]{1,3})", async(req,res,next) =>{
    const {Name, LastName, Phone, Mail, Address, Alta} = req.body;

    if(Name && LastName && Phone && Mail && Address && Alta){
            let query= `UPDATE employees SET Name = '${Name}', LastName = '${LastName}', Phone ='${Phone}', Mail = '${Mail}', Address='${Address}', Alta='${Alta}' where id = '${req.params.id};'`;
            const rows = await db.query(query);
            
            if(rows.affectedRows == 1){
                return res.status(201).json({ code: 201, message: "Empleado actualizado"});
            }
            return res.status(500).json({ code: 500, message: "Ocurrio un error"});
        }
        return res.status(500).json({ code: 500, message: "Campos incompletos"});
        
});

employees.patch('/:id([0-9]{1,3})', async (req,res,next) =>{

    if(req.body.name){
        let query=`UPDATE employees SET Name= '${req.body.name}' WHERE ID= ${req.params.id};`;
        const rows = await db.query(query);

        if(rows.affectedRows ==1 ){
            return res.status(201).json({code:200, message: "Empleado actualizado"});
        }
        return res.status(500).json({code:500, message: "Oops! Ocurrio un error"});
    }
    return res.status(500).json({code:500, message: "Campos incompletos"});
});

employees.get('/', async(req, res, next) => {
    const employ = await db.query("SELECT * FROM employees");
    return res.status(200).json({ code: 1, message: employ});
});

employees.get('/:id([0-9]{1,3})', async (req,res,next) => {
    const id = req.params.id -1;
    if(id >= 0 && id <= employees.length){
        const employ = await db.query("SELECT * FROM employees WHERE Id="+id+";");
        return res.status(200).json({ code: 200, message: employ});
    }
    return res.status(404).send({ code: 404, message: "Empleado no encontrado"});
    
});

// (condicion) ? valor si T: valor si F;

employees.get('/:name([A-Za-z]+)', async (req,res,next) => {
    const name = req.params.name;
    /*const emp = emplo.filter((e)=>{
        return (e.name.toUpperCase()==name.toUpperCase()) && e;
    });*/

    const employ = await db.query("SELECT * FROM employees WHERE Name="+name+";");
    
    if (emp.length > 0){
        return res.status(200).json({ code: 200, message: employ});
    }
    return res.status(404).send({ code: 404, message: "Empleado no encontrado"});
});

module.exports = employees;