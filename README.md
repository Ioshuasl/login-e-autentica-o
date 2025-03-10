# login-e-autentica-o

Para fazer essa aplicação foi usado:
- Servidor com node.js
- Framework Express e Express-session
- Docker com banco de dados Postgres
- Sequelize para autenticação e conexão com banco de dados

  Bibliotecas e Dependencias Utilizadas ( usar comandos no terminal )
  Express:<br>
  npm i express
  Express-session:
  npm i express-session
  Sequelize:
  npm i sequelize
  Postgres
  npm i pg
  Conteiner docker
  docker run --name testeusers -e POSTGRES_PASSWORD=1234 -d -p 5432:5432 postgres
