# Desafio Mobile Bennu
Este é o repositório que contempla o teste para a Bennu, um App de TO-DO List construido em React Native

<div style="display:flex;justify-content:center;">
  <img src="./app.gif" alt="app" style="width:200px;"/>
</div>


## 🚀 Sobre o desafio
Essas instruções permitirão que você obtenha uma cópia do projeto em operação na sua máquina local para fins de teste

## Requisitos
- node ^v14.17.6
- Você pode instalar a versão do node digitando `nvm use` no seu terminal
- [Requisitos do desafio]('./DESAFIO.md')

## Instalando as dependências e rodando o projeto

### Backend 
#### Instalando as dependências:
```sh
$ npm install
```
#### Rodando o projeto: 
```sh
$ npm start
```
</br>

### Frontend 
#### Instalando as dependências:
```sh
$ cd MyApp && yarn
```
Se for usuário de iOS:
```sh
$ cd ios && pod install && cd ..
```

Antes de buildar o app, rode o JS:
```sh
$ yarn start
```

</br>

#### Buildando o app:

Android: 
```sh
$ yarn android
```
iOS: 
```sh
$ yarn ios
```
</br>

#### Rodando testes unitários:
```sh
$ yarn test
```
</br>

## Considerações
### Foi utilizado no projeto:
- Yarn
- React Native
- Typescript
- Redux, Redux Toolkit, Redux persist e Redux Query
- Styled Components
- React Navigation
- React Native Dotenv
- Jest e Testing Library

De todos os requisitos solicitados para o desafio, o único que não foi contemplado foi o `Styled System` porque com o `Styled Componentes` foi possível implementar os requisitos solicitados.


