import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const styled = { createGlobalStyle };

const GlobalStyle = styled.createGlobalStyle`
  ${reset};
  button {
    cursor: pointer;
    outline: none;
    border-radius: 10px;
    outline: none;
    border: none;
  }

  input {
    display: flex;
    outline: none;
  }
`;

export default GlobalStyle;
