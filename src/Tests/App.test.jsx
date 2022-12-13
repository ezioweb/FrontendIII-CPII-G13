import { render, screen } from "@testing-library/react";
import App from "../App";

const token = localStorage.getItem('token');

describe('Navbar e footer componentes', () => {
    it('Deveriam ser renderizado em tela', () => {
        render(<App />)

        expect(screen.getByRole('banner')).toHaveTextContent('DH Odonto')
        expect(screen.getByRole('contentinfo')).toHaveTextContent('Voltar para o topo')

    })
});

describe('Testando dark mode', () => {
    it('Navbar', () => {
        render(<App />)

        const element = screen.getByRole('banner')
        const styles = getComputedStyle(element)

        if (token === 'dark') {
            expect(styles.backgroundColor).toBe('#12121296')
        }
    })

    it('Footer', () => {
        render(<App />)

        const element = screen.getByRole('contentinfo')
        const styles = getComputedStyle(element)

        if (token === 'dark') {
            expect(styles.backgroundColor).toBe('#12121296')
        }
    })
});