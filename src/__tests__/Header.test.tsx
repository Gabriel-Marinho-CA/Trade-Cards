import { render, screen, fireEvent } from "@testing-library/react";
import Header from "../components/header/Header";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";


jest.mock('../hooks/useAuth', () => ({
    useAuth: jest.fn(() => ({
        isLogged: true,
    }))
}))

describe('Header Component', () => {
    it('should call handleLogout on logout button click', async () => {
        const handleLogout = jest.fn();

        render(
            <BrowserRouter>
                <Header isLogin={true} handleLogout={handleLogout} />
            </BrowserRouter>
        );
        const logoutButtons = await screen.findAllByLabelText(/logout/i);

        logoutButtons.forEach((button) => {
            fireEvent.click(button);

            expect(handleLogout).toHaveBeenCalled();
        });

    });
});
