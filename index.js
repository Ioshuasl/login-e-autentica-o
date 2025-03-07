import express from 'express';
import session from 'express-session';
import sequelize from './config/database.js';
import userController from './Controller/userController.js';

const app = express();
const PORT = 3000;

// Middleware para analisar dados de formulários
app.use(express.urlencoded({ extended: true }));

// Middleware para analisar body JSONa
app.use(express.json())

// Conexão e autenticação com o banco
try {
    await sequelize.authenticate(); //verifica a conexão com o banco de dados
    console.log("Conexão com o banco de dados estabelecida com sucesso!");
    await sequelize.sync(); // Sincroniza os modelos com o banco de dados
    console.log("Modelos sincronizados com sucesso!");
} catch (error) {
    console.error("Falha ao conectar com o banco de dados:", error);
}

// Configuração do middleware de sessão
app.use(session({
    secret: 'mySecret', // Chave secreta para assinar o cookie da sessão
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Defina como true se estiver usando HTTPS
}));

// Rota para processar o login
app.post('/login', async (req, res) => {
    const { username, password } = req.body; // Obtém os dados do formulário

    // Verifica se o usuário existe e se a senha está correta
    const user = await userController.loginUser(username,password)

    if (user) {
        // Armazena os dados do usuário na sessão
        req.session.user = {
            id: user.id,
            username: user.username,
            useremail: user.usermail,
            isAdmin: user.isAdmin
        };
        res.status(200).send('Login bem-sucedido! Você está logado.');
    } else {
        res.status(401).send('Usuário ou senha incorretos.');
    }
});

// Rota para acessar o painel de controle
app.get('/dashboard', (req, res) => {
    if (req.session.user) {
        // Acessa os dados do usuário armazenados na sessão
        res.status(200).json(req.session.user)
    } else {
        return res.status(401).send('Você precisa estar logado para acessar esta página.');
    }
});

// Rota para logout
app.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.error(err)
            return res.status(500).send('Erro ao fazer logout.');
        }
        res.send('Logout realizado com sucesso!');
    });
});

// Rota para criar usuário
app.post('/user', async (req,res) => {
    const {username, useremail, password, isAdmin} = req.body

    try {
        const user = await userController.createUser({username, useremail, password, isAdmin})
        return res.status(200).json(user)
    } catch (error) {
        console.error(error)
        return res.status(400).send(error)
    }
})

app.get('/user', async (req,res) => {
    try {
        const users = await userController.getUsers()
        return res.status(200).json(users)
    } catch (error) {
        console.error(error)
        return res.status(400).send(error)
    }
})

// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});