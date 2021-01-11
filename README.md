# Mis en place d'une stack TS + WebPack

## Installer le programme typescript
 npm i typescript -g


## Allez dans votre projet et initiliaser un fichier de configuration pour typescript
2. tsc --init

## Initialiser un nouveau projet node.js
3. npm init 

## Installer les dépendances de développement pour webpack.js

npm i webpack webpack-cli ts-loader -D

### Installer Typescript localement dans votre projet

> Bien que typescript ait été installé de façon globale, vous avez besoin de l'installer localement dans votre projet comme dépendance de développement

npm i typescript -D

## créer le répertoire qui contiendra toutes les sources de votre proje

mkdir src/
touch src/index.ts

## créer le répetoire qui contiendra vos fichiers javascript et css finaux.

mkdir public/


## créer la configuration pour webpack.

> A la racine de votre projet, créer le fichier nécessaire 

touch webpack.config.js     

> contenu du fichier ci-haut: 

const path = require('path');

module.exports = {

    entry: './src/index.ts',
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                include: [path.resolve(__dirname, 'src')],
            }
        ],
    },
    output: {
        publicPath: 'public',
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'public/js')
    },

}

## ajouter un script de build au fichier package.json 

  "scripts": {
    "build": "webpack",
    "test": "echo \"Error: no test specified\" && exit 1"
  },

## mettre en place un livereload pour la phase de développement

npm i webpack-dev-server -D


## ajouter un nouveau script au fichier package.json

  "scripts": {
    "serve": "webpack-dev-server",
    "build": "webpack",
  },

## executer le server webpack
 npm run serve

> en cas de probleme, changer la version du serveur webpack

  "devDependencies": {
    "webpack": "^4.42.1",
    "webpack-cli": "^3.3.11",
    "webpack-dev-server": "^3.10.3"
  }

  ## installer les packages firebase 

  '''
  npm install -g firebase-tools
  '''



  REMARQUE : 
  - Améliorer le search
  - Ajouter une bulle d'aide pour indiquer qu'il s'agit de la période d'affichage de l'annonce
