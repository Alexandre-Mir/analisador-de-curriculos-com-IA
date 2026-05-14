import { describe, it, expect, beforeEach, vi } from 'vitest';
import { usePuterStore } from './puter';

describe('usePuterStore (Zustand)', () => {
  // Limpa/prepara o estado antes de cada teste
  beforeEach(() => {
    usePuterStore.setState({
      isLoading: false,
      error: null,
      puterReady: false,
      auth: {
        user: null,
        isAuthenticated: false,
        signIn: usePuterStore.getState().auth.signIn,
        signOut: usePuterStore.getState().auth.signOut,
        refreshUser: usePuterStore.getState().auth.refreshUser,
        checkAuthStatus: usePuterStore.getState().auth.checkAuthStatus,
        getUser: () => null,
      }
    });
    
    // @ts-ignore - Mock window.puter for tests
    window.puter = undefined;
  });

  describe('Estado Inicial e Erros', () => {
    it('deve inicializar e limpar erro corretamente', () => {
      usePuterStore.setState({ error: 'Erro simulado no sistema' });
      let estado = usePuterStore.getState();
      expect(estado.error).toBe('Erro simulado no sistema');
      
      // Executa a ação do Zustand
      estado.clearError();
      
      // Verifica se a mutação ocorreu com sucesso
      estado = usePuterStore.getState();
      expect(estado.error).toBeNull();
    });
  });

  describe('Autenticação (auth)', () => {
    it('deve falhar ao fazer signIn se window.puter não estiver disponível', async () => {
      const store = usePuterStore.getState();
      await store.auth.signIn();
      const estado = usePuterStore.getState();
      expect(estado.error).toBe('Puter.js not available');
    });

    it('deve realizar signIn corretamente e atualizar estado', async () => {
      const mockUser = { username: 'testuser', id: '123' };
      // @ts-ignore - Configurando mock
      window.puter = {
        auth: {
          signIn: vi.fn().mockResolvedValue(undefined),
          isSignedIn: vi.fn().mockResolvedValue(true),
          getUser: vi.fn().mockResolvedValue(mockUser),
        }
      };

      const store = usePuterStore.getState();
      await store.auth.signIn();

      const estado = usePuterStore.getState();
      expect(estado.error).toBeNull();
      expect(estado.isLoading).toBe(false);
      expect(estado.auth.isAuthenticated).toBe(true);
      expect(estado.auth.user).toEqual(mockUser);
    });

    it('deve realizar signOut corretamente', async () => {
      // @ts-ignore
      window.puter = {
        auth: {
          signOut: vi.fn().mockResolvedValue(undefined),
        }
      };

      const store = usePuterStore.getState();
      await store.auth.signOut();

      const estado = usePuterStore.getState();
      expect(estado.error).toBeNull();
      expect(estado.auth.isAuthenticated).toBe(false);
      expect(estado.auth.user).toBeNull();
    });

    it('deve confirmar que checkAuthStatus detecta se está não logado', async () => {
      // @ts-ignore
      window.puter = {
        auth: {
          isSignedIn: vi.fn().mockResolvedValue(false),
        }
      };

      const store = usePuterStore.getState();
      const isAuth = await store.auth.checkAuthStatus();

      expect(isAuth).toBe(false);
      const estado = usePuterStore.getState();
      expect(estado.auth.isAuthenticated).toBe(false);
      expect(estado.auth.user).toBeNull();
    });
  });

  describe('File System (fs)', () => {
    it('deve retornar erro em fs.write se puter.js não estiver disponível', async () => {
      const store = usePuterStore.getState();
      await store.fs.write('test.txt', 'hello world');
      const estado = usePuterStore.getState();
      expect(estado.error).toBe('Puter.js not available');
    });

    it('deve chamar fs.write quando puter.js está disponível', async () => {
      // @ts-ignore
      window.puter = {
        fs: {
          write: vi.fn().mockResolvedValue(undefined),
        }
      };

      const store = usePuterStore.getState();
      await store.fs.write('test.txt', 'hello world');
      
      // @ts-ignore
      expect(window.puter.fs.write).toHaveBeenCalledWith('test.txt', 'hello world');
      const estado = usePuterStore.getState();
      expect(estado.error).toBeNull();
    });
  });
});
