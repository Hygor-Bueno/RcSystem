
import React, { createContext, useContext, useState, FC, ReactNode, useEffect } from 'react';
import { iClassification, iProduct } from './Interface/iProducts';
import ApiFireBase from './API/ApiFireBase';

// Definindo o tipo dos dados no contexto
interface MyContextProduct {
  product: iProduct[];
  updateProduct: (newProduct: iProduct[]) => void;
  
  classification:iClassification[];
  updateClass: (newProduct: iClassification[]) => void;


  loading: boolean;
  setLoading: (step: boolean) => void;
}

interface Props {
  children: JSX.Element; // Tipo para o children
}
// Criar o contexto
export const MyContext = createContext<MyContextProduct | undefined>(undefined);

// Componente que fornece o contexto
export const MyProvider: FC<Props> = ({ children }) => {
  const [product, setproduct] = useState<iProduct[]>([
      {
        classification: '',
        description: '',
        price: 0
      }
    ]);
  const [classification, setClassification] = useState<iClassification[]>([
    {
      id: 0,
      description: ''
    }
  ]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    async function init() {
      const reqClass = new ApiFireBase('Classificação');
      let resClassification: iClassification[] = await reqClass.get();

      const reqProd = new ApiFireBase('Produtos');
      let resProduct: iProduct[] = await reqProd.get();

      setproduct(resProduct);
      setClassification(resClassification);
    };
    init();
  }, []);

  function updateProduct(newProduct: iProduct[]) {
    setproduct(newProduct);
  };
  function updateClass(newClass: iClassification[]) {
    setClassification(newClass);
  };

  return (
    <MyContext.Provider value={{ product, updateProduct,classification,updateClass, loading, setLoading }}>
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
