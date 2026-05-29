import { render, screen } from '@testing-library/react';
import { describe, it, expect, beforeAll } from 'vitest';
import ScoreGauge from './ScoreGauge';

describe('ScoreGauge Component', () => {
  // Mock do método do SVG que não é implementado por padrão no jsdom do Vitest
  beforeAll(() => {
    if (typeof window !== 'undefined') {
      // @ts-ignore
      if (window.SVGPathElement) {
        window.SVGPathElement.prototype.getTotalLength = () => 100;
      }
      // @ts-ignore
      if (window.SVGElement) {
        window.SVGElement.prototype.getTotalLength = () => 100;
      }
    }
  });

  it('deve renderizar o score fornecido corretamente', () => {
    render(<ScoreGauge score={90} />);
    expect(screen.getByText('90/100')).toBeInTheDocument();
  });

  it('deve renderizar o score padrão de 75 se nenhuma prop for fornecida', () => {
    // @ts-ignore - Testando caso sem prop
    render(<ScoreGauge />);
    expect(screen.getByText('75/100')).toBeInTheDocument();
  });

  it('deve aplicar o strokeDashoffset correto baseado no score', () => {
    const { container } = render(<ScoreGauge score={40} />);
    const paths = container.querySelectorAll('path');
    
    // O segundo path é o que tem o preenchimento dinâmico
    const progressPath = paths[1];
    expect(progressPath).toBeInTheDocument();
    
    // O mock define o comprimento total como 100
    expect(progressPath.getAttribute('stroke-dasharray')).toBe('100');
    
    const strokeDashoffsetStr = progressPath.getAttribute('stroke-dashoffset');
    expect(strokeDashoffsetStr).not.toBeNull();
    
    const strokeDashoffset = parseFloat(strokeDashoffsetStr!);
    
    // Para score 40 (40%), a porcentagem preenchida é 0.4, logo o offset é: 100 * (1 - 0.4) = 60
    expect(strokeDashoffset).toBeCloseTo(60, 2);
  });
});
