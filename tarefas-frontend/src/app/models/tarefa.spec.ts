import { Tarefa } from './tarefa';

describe('Tarefa', () => {
  it('should create an instance', () => {
    const tarefa: Tarefa = { titulo: 'Teste', concluida: false };
    expect(tarefa).toBeTruthy();
  });
});