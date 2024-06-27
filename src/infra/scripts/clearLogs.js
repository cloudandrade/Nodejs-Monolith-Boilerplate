const fs = require('fs');

// Função para limpar as mensagens de log
function cleanLogMessages(logMessages) {
  return logMessages.map(message => {
    // Remove os caracteres de formatação do log
    return message.replace(/\u001b\[\d+m/g, '');
  });
}

// Leitura do arquivo de logs
fs.readFile('logs/combined.log', 'utf8', (err, data) => {
  if (err) {
    console.error('Erro ao ler o arquivo de logs:', err);
    return;
  }

  // Separa as mensagens de log por linhas
  const logMessages = data.split('\n');

  // Limpa as mensagens de log
  const cleanedMessages = cleanLogMessages(logMessages);

  // Escreve as mensagens limpas em um novo arquivo
  fs.writeFile('logs/server_logs.log', cleanedMessages.join('\n'), 'utf8', err => {
    if (err) {
      console.error('Erro ao escrever o arquivo de logs limpo:', err);
      return;
    }
    console.log('Logs limpos foram salvos em "logs/server_logs.log".');
  });
});
