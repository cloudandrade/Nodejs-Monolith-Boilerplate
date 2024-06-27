export class Hello {
  helloText: string;
  createdAt: Date;

  constructor({ helloText, createdAt = new Date() }: { helloText: string; createdAt?: Date }) {
    this.helloText = helloText;
    this.createdAt = createdAt;
  }
}