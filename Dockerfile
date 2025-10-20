# Usa uma imagem base oficial do Playwright com Node.js e navegadores pré-instalados
FROM mcr.microsoft.com/playwright:v1.46.0-jammy

# Define o diretório de trabalho dentro do container
WORKDIR /usr/src/app

# Copia os arquivos de configuração do Node
COPY package*.json ./

# Instala as dependências
RUN npm ci

# Copia o restante do código para dentro do container
COPY . .

# Define o comando padrão para execução. O "ci" fará a instalação limpa e rodará o teste
CMD [ "npm", "run", "ci" ]