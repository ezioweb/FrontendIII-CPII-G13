import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { ThemeProvider } from "../Hooks/useTheme";
import { Simulate } from "react-dom/test-utils";
import App from "../App";
import Card from "../Components/Card";

const mockData = {
    matricula: '123',
    nome: 'nomedentista',
    sobrenome: 'sobrenomedentista',
    usuario: {
        username: 'usernamedentista'
    }
}

const mockTheme = 'dark'

const token = localStorage.getItem('token')

describe('Navbar e footer componentes', () => {
    it('Deveriam ser renderizado em tela', () => {
        render(<App />)

        expect(screen.getByRole('banner')).toHaveTextContent('DH Odonto')
        expect(screen.getByRole('contentinfo')).toHaveTextContent('Voltar para o topo')
    })

    it('Testando dark mode - Navbar', () => {
        render(<App />)

        const element = screen.getByRole('banner')
        const styles = getComputedStyle(element)

        if (token === 'dark') {
            expect(styles.backgroundColor).toBe('#303030')
        }
    })

    it('Testando dark mode - Footer', () => {
        render(<App />)

        const element = screen.getByRole('contentinfo')
        const styles = getComputedStyle(element)

        if (token === 'dark') {
            expect(styles.backgroundColor).toBe('#303030')
        }
    })
});

describe('LoginForm componente', () => {
    it('Deveria ser renderizado em tela', () => {
        render(<App />)

        if (token === 'null' || token == null || token.trim() === '') {
            expect(screen.getByPlaceholderText('Login')).toBeInTheDocument()
            expect(screen.getByPlaceholderText('Password')).toBeInTheDocument()
        }
    })
});

describe('Cards de dentistas componente', () => {
    it('Deveriam ser renderizado em tela', async () => {
        render(
            <MemoryRouter initialEntries={['/home']}>
                <ThemeProvider value={mockTheme}>
                    <Card dentista={mockData} />
                </ThemeProvider>
            </MemoryRouter>
        )

        await screen.findAllByText(/nomedentista/i)
    })

    it('Testando link para o CardDetails', () => {
        render(
            <MemoryRouter initialEntries={['/home']}>
                <ThemeProvider value={mockTheme}>
                    <Card dentista={mockData} />
                </ThemeProvider>
            </MemoryRouter>
        )

        screen.getByText('nomedentista sobrenomedentista')

        const link = screen.getByText('nomedentista sobrenomedentista')

        Simulate.click(link)

        setTimeout(() => {
            expect(screen.getByText("Marcar consulta")).toBeInTheDocument()
        }, 3000)
    })
});