module.exports = {
  testMatch: ['**/__tests__/**/*.test.js', '**/tests/**/*.test.js'], // Define onde os testes devem ser procurados. Seu padrão está perfeito para pasta tests/.
  testEnvironment: 'node',                                           // Indica que não há necessidade de DOM (é servidor Node).
  clearMocks: true,                                                  // Limpa mocks automaticamente entre testes.
  coverageDirectory: 'coverage',                                     // Gera relatórios de cobertura de teste na pasta coverage.
  collectCoverageFrom: [                                             // Define os arquivos de código dos quais o Jest deve calcular cobertura. Adapte os caminhos conforme sua estrutura (src/models, src/services).
    'src/services/**/*.js',
    'src/models/**/*.js',
    '!**/node_modules/**'
  ],
  verbose: true,
  setupFiles: ['dotenv/config'], // carrega automaticamente .env. Boa escolha com dotenv/config, pois carrega automaticamente as variáveis de ambiente.
};