import React from "react";
import App from "../App";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithRouterAndRedux } from "./helpers/renderWith";

describe('Testando pagina de Login', () => {
  it('Testa se consegue fazer o login', () => {
   renderWithRouterAndRedux(<App />);

    const inputEmail = screen.getByRole('textbox', {
      name: /email:/i
    });
    userEvent.type(inputEmail, 'test@test.com');

    const inputSenha = screen.getByLabelText(/senha:/i);
    userEvent.type(inputSenha, '123123');
    const button = screen.getByRole('button', {
      name: /entrar/i
    })
    userEvent.click(button);
  })
});