import { describe, it, expect, beforeEach } from 'vitest';
import { usePuterStore } from './puter';
describe('usePuterStore (Zustand)', () => {
  // Limpa/prepara o estado antes de cada teste
  beforeEach(() => {
    usePuterStore.setState({ error: 'Erro simulado no sistema' });
  });
  it('deve inicializar com o estado alterado pelo beforeEach', () => {
    const estado = usePuterStore.getState();
    expect(estado.error).toBe('Erro simulado no sistema');
  });
  it('deve limpar o erro corretamente ao chamar clearError()', () => {
    const store = usePuterStore.getState();
    
    // Executa a ação do Zustand
    store.clearError();
    
    // Verifica se a mutação ocorreu com sucesso
    const novoEstado = usePuterStore.getState();
    expect(novoEstado.error).toBeNull();
  });
});
