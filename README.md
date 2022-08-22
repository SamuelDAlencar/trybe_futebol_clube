# ⚽ Trybe Futebol Clube

Projeto back-end (front e toda a estilização feita pelo time da Trybe!) que consiste em um CRUD de times e partidas de futebol, permitindo o usuário logar na aplicação, conferir partidas, filtra-las por "Em andamento" ou "Concluídas" e conferir a lista das classificações dos times, filtrando-os por "Mandantes" e "Visitantes"!

## 🚴 Começando

Clone o projeto em sua maquina rodando o seguinte comando no terminal:
```
git clone git@github.com:SamuelDAlencar/trybe_futebol_clube.git
```
Depois de clonado, caso opte por rodar a aplicação *sem Docker*, instale as dependências de ambos front e back com:
```
npm run install:apps
```
Para startar a aplicação sem docker, é necessario ter uma instância do MySQL rodando na porta `3306`
> Por default, a senha do banco que a aplicação espera é "123456", mas caso tenha colocado uma senha própria, lembre de atualizar o arquivo de configuração do [sequelize](https://sequelize.org/) na pasta `/app/backend/src/database/config`

E então para iniciar a aplicação, entre em `app/backend` e `app/backend`, e rode o comando `npm start` em *ambos*
