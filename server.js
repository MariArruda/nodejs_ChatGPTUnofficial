import {} from 'dotenv/config'
import express from 'express';
import {
    oraPromise
} from 'ora'
import {
    ChatGPTUnofficialProxyAPI
} from 'chatgpt'

const app = express();
const PORT = 3000;

//Configurações para leitura de arquivos//////////////////////
app.use(express.json())
app.use(express.urlencoded({
  extended: true
}));
///////////////////////////////////////////

async function main() {
    // WARNING: this method will expose your access token to a third-party. Please be
    // aware of the risks before using this method.
    //https://chat.openai.com/api/auth/session
    const api = new ChatGPTUnofficialProxyAPI({
        // optionally override the default reverse proxy URL (or use one of your own...)
        apiReverseProxyUrl: 'https://chat.duti.tech/api/conversation',
        apiReverseProxyUrl: 'https://gpt.pawan.krd/backend-api/conversation',

        accessToken: process.env.ACCESS_TOKEN,
        debug: false
    })

    const prompt = 'Entre aspas está descirto um pedido feito por um cliente para um restaurante. Preciso que você gere um array de objetos JSON que indique a quantidade de cada item, ou seja, as chaves do json são "quantidade" e "item", por favor, só me reotrne o JSON, não escreva mais nada. "Quero 2 cheese burguer, 3 lanches especiais, 1 coca-cola e 3 águas. Põe mais uma coca."'

    let res = await oraPromise(api.sendMessage(prompt))

    // let res = await oraPromise(api.sendMessage(prompt), {
    //     text: prompt
    // })
    
    console.log('\n' + res.text + '\n')
}

main().catch((err) => {
    console.error(err)
    process.exit(1)
})

app.listen(PORT, () => console.log(`Servidor iniciado na porta ${PORT}`));