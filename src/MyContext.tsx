
import React, { createContext, useContext, useState, FC, ReactNode, useEffect } from 'react';
import { iClassification } from './Interface/iProducts';
import ApiFireBase from './API/ApiFireBase';

// Definindo o tipo dos dados no contexto
interface MyContextProduct {
  product: iClassification[];
  updateproduct: (newProduct: iClassification[]) => void;
}

interface Props {
  children: JSX.Element; // Tipo para o children
}
// Criar o contexto
export const MyContext = createContext<MyContextProduct | undefined>(undefined);

// Componente que fornece o contexto
export const MyProvider: FC<Props> = ({ children }) => {
  const [product, setproduct] = useState<iClassification[]>(
    [{
      id:0,
      description: ''
    }]
  );
  useEffect(() => {
    async function init() {
      const api = new ApiFireBase('Classificação');
      let result:iClassification[] = await api.get();
      setproduct(result);
    };
    init();
  }, []);

  function updateproduct(newProduct: iClassification[]){
    setproduct(newProduct);
  };

  return (
    <MyContext.Provider value={{ product, updateproduct }}>
      {children}
    </MyContext.Provider>
  );
};

// Hook personalizado para usar o contexto
export const useMyContext = (): MyContextProduct => {
  const context = useContext(MyContext);
  if (!context) {
    throw new Error('useMyContext must be used within a MyProvider');
  }
  return context;
};
