// importando os pacotes para uso no arquivo index.js
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const braille = require('./dictionary');

// crio um servidor express
const server = express();

// aplico configurações para dentro do servidor express, adicionando middlewares (body-parser, morgan, cors)
server.use(morgan('dev'));
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());
server.use(cors());
server.use(express.static(__dirname + '/front/'));
//server.use(express.static(path.join(__dirname, '/front')));

// DB local (tempo de execução)
const payload = {};

// criação de rota que será acessada utilizando o método HTTP GET/
// http://localhost:9000/
server.get('/payload', (req, res) => {
  return res.json({ payload });
});


server.get('/', (req, res) => {
  return res.sendFile('index.html')
  //return res.render('/front/index.html');
});


function breakIntoPayload(){
  const bruteText = document.getElementById('textArea').value
  let treatedText = bruteText.split('\n');
  console.log(treatedText);
}



// criação de rota que será acessada utilizando o método HTTP POST/
// http://localhost:9000/add
server.post('/add', (req, res) => {
  const textInput = req.body.content;   //aqui deve-se passar tambem o .content (propriedade que vamos pegar para conversao)

  if (!textInput) {
    return res.status(400).end();
  }
  
  //const text = textInput.content;
  //braille.toBraille(result);
  
  payload.push(braille.toBraille(textInput));
  return res.json({ payload });
});

// o servidor irá rodar dentro da porta 9000
server.listen(9000, () => console.log('Express started at http://localhost:9000'));



            //      TESTAR ESSA POSSIBILIDADE

// const button = document.getElementById('post-btn');

// button.addEventListener('click', async _ => {
//   try {     
//     const response = await fetch('yourUrl', {
//       method: 'post',
//       body: {
//         // Your body
//       }
//     });
//     console.log('Completed!', response);
//   } catch(err) {
//     console.error(`Error: ${err}`);
//   }
// });

        //      E O HTML SERIA

//<button id="post-btn">I'm a button</button>