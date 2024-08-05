import Link from "next/link";
import styled from "styled-components";
export const ErrorSt = styled.div`
  width: 100%;
  height: 30rem;
  overflow-y: hidden;
  background: #09090b;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .error_title {
    font-family: var(--motiva1000);
    font-size: 2rem;
    color: white;
  }
  .error_subtitle {
    font-family: var(--motiva300);
    font-size: 1rem;
    color: #cbcbcb;
  }
  .error_button {
    font-family: var(--motiva500);
    font-size: 0.8rem;
    color: #000000;
    background: white;
    border-style: none;
    border-radius: 0.3rem;
    padding: 0.25rem 0.5rem;
    margin-top: 1rem;
    text-decoration: none;
    &:hover {
      background: #dedede;
    }
  }
`;
export default function Error() {
  return (
    <ErrorSt>
      <p className="error_title">404</p>
      <p className="error_subtitle">Página no encontrada</p>
      <Link className="error_button" href={"/"}>
        Ir a inicio
      </Link>
    </ErrorSt>
  );
}
