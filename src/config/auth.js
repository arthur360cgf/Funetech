const localStrategy = require("passport-local").Strategy
const Usuario=require("../models/usuario");
const bcrypt = require("bcryptjs")

module.exports = function(passport){
    passport.use(new localStrategy({usernameField: 'nome', passwordField: "senha"}, (nome, senha, done) => {
        Usuario.findOne({where:{nome}}).then(function(Usuario) {
            if(!Usuario){
                return done(null, false, {message: "Esta conta não existe"})
            }

            bcrypt.compare(senha, Usuario.senha, function(erro, batem){
                if(batem){
                    return done(null, Usuario)
                }else{
                    return done(null, false, {message: "Usuario ou senha incorretos"})
                }
            })
        })
    }))

    passport.serializeUser(function(Usuario, done){
        done(null, Usuario.id)
    })

    passport.deserializeUser(function(id, done){
        Usuario.findByPk(id).then(function(Usuario){
            done(null, Usuario)
        }), function(error){
            done(err,null)
        }
    })
}