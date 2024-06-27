class Hello {
    constructor({ helloText, createdAt }) {
      this.helloText = helloText;
      this.createdAt = createdAt || new Date().toISOString();
    }
  }
  
  module.exports = Hello;