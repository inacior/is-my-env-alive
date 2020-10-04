Is my environment alive?
======================

:star: Star us on GitHub — it helps!

[is-my-env-alive](https://to-do-link) is a simple project that helps you to check - easily and quickly - if all your APIs or Frontends are online!

![Example](example.png "Example")

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

Insert your environments and projects

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
is-my-env-alive -e stage -f projects.json
```

## JSON Structure


`url` \
Endpoint that will be pointed out in the request to validate whether the API is online or not

`status` \
Expected _url_ status to define that the API is online

## License

The [is-my-env-alive](https://to-do-link)  extension is licensed under the terms of the GPL Open Source
license and is available for free.

## Links

* [Source code](https://github.com/inacior/is-my-env-alive)
