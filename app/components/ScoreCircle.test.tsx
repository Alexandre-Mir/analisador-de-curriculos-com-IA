import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import ScoreCircle from './ScoreCircle';

describe('ScoreCircle Component', () => {
  it('deve renderizar o score fornecido corretamente', () => {
    render(<ScoreCircle score={85} />);
    expect(screen.getByText('85/100')).toBeInTheDocument();
  });

  it('deve renderizar o score padrão de 75 se nenhuma prop for fornecida', () => {
    // @ts-ignore - Testando caso sem prop em JS/TS compilation relaxada
    render(<ScoreCircle />);
    expect(screen.getByText('75/100')).toBeInTheDocument();
  });

  it('deve calcular e aplicar o strokeDashoffset correto baseado no score', () => {
    const { container } = render(<ScoreCircle score={50} />);
    const circles = container.querySelectorAll('circle');
    
    // O segundo círculo é o que tem o preenchimento dinâmico
    const progressCircle = circles[1];
    expect(progressCircle).toBeInTheDocument();
    
    const strokeDasharrayStr = progressCircle.getAttribute('stroke-dasharray');
    const strokeDashoffsetStr = progressCircle.getAttribute('stroke-dashoffset');
    
    expect(strokeDasharrayStr).not.toBeNull();
    expect(strokeDashoffsetStr).not.toBeNull();
    
    const strokeDasharray = parseFloat(strokeDasharrayStr!);
    const strokeDashoffset = parseFloat(strokeDashoffsetStr!);
    
    // Para score 50 (50%), o offset deve ser metade da circunferência (1 - 0.5 = 0.5)
    expect(strokeDashoffset).toBeCloseTo(strokeDasharray * 0.5, 2);
  });

  it('deve zerar o strokeDashoffset se o score for 100', () => {
    const { container } = render(<ScoreCircle score={100} />);
    const circles = container.querySelectorAll('circle');
    const progressCircle = circles[1];
    
    const strokeDashoffsetStr = progressCircle.getAttribute('stroke-dashoffset');
    const strokeDashoffset = parseFloat(strokeDashoffsetStr!);
    
    // Para score 100 (100%), o offset deve ser 0
    expect(strokeDashoffset).toBe(0);
  });
});
