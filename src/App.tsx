import './App.css';
import ApiFireBase from './API/ApiFireBase';
import Loading from './Components/Loading';
import FormComponent from './Components/Form/Form';
import { iClassification } from './Interface/iProducts';
import { formProduct } from './Configs/ConfigsComponent';


function App(): JSX.Element {
  const initialData: iClassification = {
    description:''
  };

  const handleSubmit = (formData: Record<string, any>) => {
    // Faça o que quiser com os dados do formulário aqui
    console.log(formData);
  };
  return (
    <div className="App">
      <Loading show={false} />
      <FormComponent config={formProduct} onSubmit={handleSubmit} />
      <button className='btn btn-danger' title='Adicione um produto' onClick={async () => {
        const api = new ApiFireBase();
        await api.post({ description: 'sushi', value: 9.75 });
        // await putProduct('Hot Roll','Hot Roll!');
        // await deleteProduct('sushi 2');
        console.log('Hellow Word');
        await api.get();
      }}>Cancelamento</button>
    </div>
  );
}

export default App;
