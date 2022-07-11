import { Request, Response } from 'express';
import User from '../models/User';

export const home = async (req: Request, res: Response) => {
    //updateMany() atualiza vários
    //updateOne() atualiza um 
    /*
    await User.updateMany(
        { age: {$lte: 33}},
        { age: 18 }
    );
    */
    // let user = await User.findOneAndUpdate(); tbm funciona, retorna um objeto

    // Atualiza/altera dados
    let blake = await User.findOne({ age: 35});
    if(blake) {
        blake.name.lastName = "Griffin";
        await blake.save();
    };

    let users = await User.find({}).sort({"name.firstName": 1});

    res.render('pages/home', {
        users
    });

    // DELETAR
    // await.blake.remove()
    // quando for remover através de um objeto já criado utilzar remove()

    // DELETA DIRETAMENTE
    await User.findOneAndDelete({ email: 'mona@paris.org' });
    
};

export const addUserAction = async (req: Request, res: Response) => {
    let newUser = new User();
    
    let newFirstName: string = req.body.firstName;
    let newLastName: string = req.body.lastName;
    let newAge: number = parseInt(req.body.age);
    let newEmail: string = req.body.email;
    let newInterests: string[] = req.body.interests.split(',');

    newUser.name = {firstName: newFirstName, lastName: newLastName};
    newUser.age = newAge;
    newUser.email = newEmail;
    newInterests = newInterests;

    try {
        await newUser.save();
        console.log("Usuário criado com sucesso");
    } catch (error) {
        console.log(`Usuário não criado, error: ${error}`);
    }

    res.redirect('/');
};

export const addAgeAction = async (req: Request, res: Response) => {
    let id: string = req.params.id;

    let user = await User.findOne({_id: id});

    if(user){
        user.age++;
        await user.save();
        res.redirect('/');
    };  
}

export const decrementAgeAction = async (req: Request, res: Response) => {
    let id: string = req.params.id;

    let user = await User.findOne({_id: id});

    if(user){
        user.age--;
        await user.save();
        res.redirect('/');
    };  
}

export const removeUserAction = async (req: Request, res: Response) => {
    let id: string = req.params.id;

    let user = await User.findOne({_id: id});

    if(user){
        await user.remove();
        res.redirect('/');
    }
}