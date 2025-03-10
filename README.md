### Login e Autenticação

Pequena aplicação que pode ser usada para login de usuário, autenticação e armazenamento dos dados para que possam ser usados posteriormente

Para fazer essa aplicação foi usado:
- Servidor com node.js
- Framework Express e Express-session
- Docker com banco de dados Postgres
- Sequelize para autenticação e conexão com banco de dados

<h3>Bibliotecas e Dependencias Utilizadas ( usar comandos no terminal )</h3><br>
Express:<br>
npm i express<br>
Express-session:<br>
npm i express-session<br>
Sequelize:<br>
npm i sequelize<br>
Postgres<br>
npm i pg<br>
Conteiner docker<br>
docker run --name testeusers -e POSTGRES_PASSWORD=1234 -d -p 5432:5432 postgres
