# ⚽ Trybe Futebol Clube

Projeto back-end (front e toda a estilização feita pelo time da Trybe!) que consiste em um CRUD de times e partidas de futebol, permitindo o usuário logar na aplicação, conferir partidas, filtra-las por "Em andamento" ou "Concluídas" e conferir a lista das classificações dos times, filtrando-os por "Mandantes" e "Visitantes"!

## 🚴 Começando
### 🗒 Pré-requisitos

Sem docker: `node v16 >`

Com docker: `docker`

### 🛠 Instalação

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
> Caso queira rodar em modo de desenvolvimento, quando entrar na `app/backend`, rode `npm run dev` ao invés de `npm start`

Caso tenha optado por iniciar a aplicação via *Docker*, basta rodar `npm run compose:up` na pasta `/app`. Se quiser inicializar em modo de desenvolvimento: `npm run compose:up:dev`

## ⚙ Executando testes

Neste projeto foram feitos testes unitários e testes de integração, para executa-los, basta acessar a pasta `app/backend` e rodar o comando `npm test`
> Mesmo tendo inicializado a aplicação via Docker, para executar os testes é necessário instalar as dependências (`npm run install:apps` na raiz)

Os testes cobrem as rotas da API, os middlewares, as camadas de controller, service e models
