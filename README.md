# seidor
Sistema web que nos permita controlar a utilização dos automóveis de uma empresa.

# Pré requisitos
- Git ([https://git-scm.com/](https://git-scm.com/))
- Node ([https://nodejs.org/](https://nodejs.org/))
# Instalação
Para baixar e rodar na sua própria máquina o projeto é bem simples, é só seguir o passo-a-passo a seguir:

## Start
Partindo do princípio que vocês não estão familiarizados com o **Git** ou **Node.js**, então primeiro você precisa instalar o [Node.js](https://nodejs.org/) no seu pc, caso o seu pc seja **Windows** eu recomento estar utilizando o gerenciador de pacotes [Chocolatey](https://chocolatey.org/) para baixar o **Node.js** e todas as outras dependências. Após a instalação do **Node.js**, recomendo você baixar e instalar o **[Git](https://git-scm.com/)** na sua máquina.

## Clonando o Repositório
Com o Git e o Node.js instalado na sua máquina, para pegar a **URL** do projeto é só clicar em **Code** no GitHub.

Com a **URL** do projeto em mãos, crie em algum lugar do seu pc uma pasta para criarmos uma cópia do repositório, dentro dela (Se você estiver utilizando o Windows) abra o **cmd** ou **powershell** e digite os comandos abaixo:

```
git clone git@github.com:AlessandroAlberg/seidor.git
cd seidor
npm install
```

## Banco de dados

Para a execução do banco de dados basta executar os comandos abaixo:

```
npm run knex:migrate
npm run knex:seed
```

## Executar API e Testes

Para a execução da nossa API basta executar o comando abaixo:

```
npm start
```

Já para executarmos os teste devemos executar o comando abaixo:

```
npm test
```

## Rotas HTTP

Na API existe 3 rotas HTTP:
- /car
- /driver
- /use-car

Nas 3 rotas podemos fazer requisições HTTP de um CRUD:
**GET**
**POST**
**PUT**
**DELETE**
### Car
Na rota de Car temos:

**GET**
```
/car - Retorna todas os carros cadastradas
/car/:id - Retorna o carro que foi passado o parâmetro id

- Retorno
{
    id: int,
    board: string,
    color: string,
    brand: string
}
```

**POST**
```
/car - Cria um carro

- Parâmetros

body: {
    board: string,
    color: string,
    brand: string
}

- Retorno
{
    id: int
}
```

**PUT**
```
/car/:id - Atualiza um carro

Parâmetros
id: int

body: {
    board: string,
    color: string,
    brand: string
}

- Retorno
Carro atualizado
```

**DELETE**
```
/car/:id - Deleta uma carro

Parâmetros
id: int

- Retorno
Carro deletada
```

### Driver
Na rota de Driver temos:

**GET**
```
/driver - Retorna todas os motoristas cadastradas
/driver/:id - Retorna o motorista que foi passado o parâmetro id

- Retorno
{
    id: int,
    name: string
}
```

**POST**
```
/driver - Cria um motorista

- Parâmetros

body: {
    name: string   
}

- Retorno
{
    id: int
}
```

**PUT**
```
/driver/:id - Atualiza um motorista

Parâmetros
id: int

body: {
    name: string
}

- Retorno
Motorista atualizada
```

**DELETE**
```
/driver/:id - Deleta um motorista

Parâmetros
id: int

- Retorno
Motorista deletado
```

### use-car
Na rota de Use-Car temos:

**GET**
```
/use-car - Retorna todas os carros utilizados
/use-car/:id - Retorna o carro utilizado que foi passado o parâmetro id

- Retorno
{
    id: int,
    driver_id: string,
    car_id: string,
    reason: string,
    start_date: string,
    end_date: string,
    board: string,
    color: string,
    brand: string,
    name: string
}
```

**POST**
```
/use-car - Cria um registro de veículo utilizado

- Parâmetros

body: {
    driver_id: string,
    car_id: string,
    reason: string,
    start_date: string
}

- Retorno
{
    id: int
}
```

**PUT**
```
/use-car/end-case/:id - Finaliza o uso de um veículo

Parâmetros
id: int

body: {
    end-date: string
}

- Retorno
O uso do veículo está encerrado.
```