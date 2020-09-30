Is my environment alive?
======================

:star: Star us on GitHub — it helps!

[is-my-env-alive](https://to-do-link) é um simples projeto que te ajuda a verificar - de maneira facil e rapida - se todas as suas APIs ou Frontends estão on-line!

## Table of content

- [Installation](#installation)
- [Usage](#usage)
- [JSON Structure](#json-structure)
- [License](#license)
- [Links](#links)

## Installation

Install the package

```bash
npm i -g is-my-env-alive
```

Create a JSOn file to define your projects

```bash
touch projects.json
vi projects.json
```

Insira seus ambientes e projetos

```json
{
  "stage": {
    "products-api": {
      "url": "https://stage.my-awesome-api/products/search?limit=1",
      "status": 200
    },
     "categories-api": {
      "url": "https://stage.my-awesome-api/categories/search?limit=1",
      "status": 200
    }
  },
  "develop": {
    "products-api": {
      "url": "https://develop.my-awesome-api/products/search?limit=1",
      "status": 200
    },
     "categories-api": {
      "url": "https://develop.my-awesome-api/categories/search?limit=1",
      "status": 200
    }
  }
}
```


## Usage

```bash
is-my-env-alive stage -f projects.json
```

## JSON Structure


`url` \
Rota que sera apontada na requisicao para validar se a API esta on-line ou nao

`status` \
Status esperado da _url_ para definir que a API esta on-line

## License

The [is-my-env-alive](https://to-do-link)  extension is licensed under the terms of the GPL Open Source
license and is available for free.

## Links

* [Source code](https://github.com/inacior/is-my-env-alive)