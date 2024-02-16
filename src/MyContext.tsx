
import React, { createContext, useContext, useState, FC, ReactNode, useEffect } from 'react';
import { iClassification, iCommands, iProduct } from './Interface/iProducts';
import ApiFireBase from './API/ApiFireBase';
import Product from './Class/Product';

// Definindo o tipo dos dados no contexto
interface MyContextProduct {
  product: iProduct[];
  updateProduct: (item: iProduct[]) => void;

  classification: iClassification[];
  updateClass: (item: iClassification[]) => void;
  
  command:iCommands[];
  updateCommands: (item: iCommands[]) => void;

  loading: boolean;
  setLoading: (step: boolean) => void;

  modal: boolean;
  setModal: (step: boolean) => void;

  loadClass: () => void;
  loadProduct: () => void;
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
  const [command, setCommand] = useState<iCommands[]>([
    {
       commands:0,
       status:false
    }
  ]);
  const [loading, setLoading] = useState<boolean>(false);
  const [modal, setModal] = useState<boolean>(false);

  useEffect(() => {
    async function init() {
      await loadClass();
      await loadProduct();
      await loadCommands();
    };
    init();
  }, []);

  async function loadClass() {
    const reqClass = new ApiFireBase('Classificação');
    let resClassification: iClassification[] = await reqClass.get();
    setClassification(resClassification);
  }

  async function loadProduct() {
    const reqProd = new ApiFireBase('Produtos');
    let resProduct: iProduct[] = await reqProd.get();
    let list:iProduct[];
    resProduct.forEach(item=>{
      list.push(new Product(item));
    })
    // setproduct();
  }
  async function loadCommands() {
    const reqCommands = new ApiFireBase('Mesas');
    let resCommands: iCommands[] = await reqCommands.get();
    setCommand(resCommands);
  }

  function updateProduct(item: iProduct[]) {
    setproduct(item);
  };
  function updateClass(item: iClassification[]) {
    setClassification(item);
  };
  function updateCommands(item: iCommands[]) {
    setCommand(item);
  };

  return (
    <MyContext.Provider value={{ product, updateProduct, classification, updateClass, loading, setLoading, modal, setModal, loadProduct, loadClass,command, updateCommands}}>
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
