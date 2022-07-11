import { Request, Response } from 'express';

import { Product } from '../models/Product';
import User from '../models/User';

export const home = async (req: Request, res: Response)=>{
    // find({}) é utilizado em pesquisas com + de 1 registro
    // findOne({}) retorna o objeto da condição
    // findById({}) retorna o objeto pelo id

    /*
    let usuarios = await User.find({  
        age: { $gt: 18 } 
    }).sort({ "name.firstName": -1 }).skip(1).limit(2); 
    */

    // "name.firstName": "Silas" - Para procurar uma propriedade do objeto
    // interests: "jiu" - procurar algo em um Array  
    // .sort ({"name.firstName": 1}) (1) -> ordem crescente (-1) -> ordem decrescente
    // se passarmos um 2° parametro, será o critério desempate
    // .skip(0).limit(2) -> skip pula (n) registros - limit exibe apenas (n) registros, os primeiros

    /* console.log("USUARIOS", usuarios); */

    let newUser = new User();
    newUser.name = { firstName: 'André', lastName: 'Soares' };
    newUser.email = 'andre@hotmail.com';
    newUser.age = 35;
    newUser.interests = ['tecnologia', 'skate', 'surf'];
    let result = await newUser.save();

    console.log("NOVO USUARIO", result);
    
    let age: number = 90;
    let showOld: boolean = false;

    if(age > 50) {
        showOld = true;
    }

    let list = Product.getAll();
    let expensiveList = Product.getFromPriceAfter(12);

    res.render('pages/home', {
        name: 'Bonieky',
        lastName: 'Lacerda',
        showOld,
        products: list,
        expensives: expensiveList,
        frasesDoDia: []
    });
};

/*
    age: { $gt: 25 } -> maior que 25
    gt = Greater Then = Maior
    gte = Greater Then or Equal = Maior ou igual
    lt = Lower T... = Abaixo de
    lte = Lower T... = Abaixo de OU igual
*/
