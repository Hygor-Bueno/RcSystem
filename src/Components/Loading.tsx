import React from 'react';
import './Loading.css';

interface LoadingProps {
  show: boolean; // Propriedade para controlar a exibição do componente de carregamento
}

// Mantendo a declaração de função
export default function Loading({ show }: LoadingProps): JSX.Element {
  return (
    show ? <LoadingSpinner /> : <React.Fragment></React.Fragment>
  );
}

function LoadingSpinner(): JSX.Element {
  return (
    <div id='containerSpinner' className='d-flex flex-column justify-content-center align-items-center'>
      <div className="spinner-border " role="status">
      </div>
      <span className="sr-only">Loading...</span>
    </div>
  );
}

// Adicionando defaultProps
Loading.defaultProps = {
  show: false,
};
