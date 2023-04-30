//PARA CONSEGUIR O TOKEN: https://chat.openai.com/api/auth/session
import {} from 'dotenv/config';
import express from 'express';
import {
    ChatGPTUnofficialProxyAPI
} from 'chatgpt';

const app = express();
const PORT = 3000;

async function main() {
     const api = new ChatGPTUnofficialProxyAPI({
        // optionally override the default reverse proxy URL (or use one of your own...)
        apiReverseProxyUrl: 'https://chat.duti.tech/api/conversation',
        apiReverseProxyUrl: 'https://gpt.pawan.krd/backend-api/conversation',

        accessToken: process.env.ACCESS_TOKEN,
        debug: false
    });

    const prompt = 'Entre aspas está descirto um pedido feito por um cliente para um restaurante. Preciso que você gere um array de objetos JSON que indique a quantidade de cada item, ou seja, as chaves do json são "quantidade" e "item". Os itens iguais devem estar com suas quantidades somadas e você deve identificar itens iguais mesmo que o usuário tenha digitado um nome diferente como por exemplo coca-cola ou coca. Por favor, só me reotrne o JSON, não escreva mais nada. "Quero 2 cheese burguer, 3 lanches especiais, 1 coca-cola e 3 águas. Ah, e tira 1 chese buguer, só quero 1 mesmo"';

    let res = await api.sendMessage(prompt);
    
    console.log('\n' + res.text + '\n');
}

main();

app.listen(PORT, () => console.log(`Servidor iniciado na porta ${PORT}`));