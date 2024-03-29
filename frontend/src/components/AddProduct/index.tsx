import { ChangeEvent, useContext, useState } from 'react';
import { productsPost } from '../../services/productRequests';
import Context from '../../context/Context';
import isValidPriceFormat from '../../utils/productValidation';
import { MdSave } from 'react-icons/md';
import './style.css';

function AddProduct() {
  const { getProducts } = useContext(Context);
  const [product, setProduct] = useState({
    name: '',
    code: '',
    description: '',
    price: ''
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (product.name === '' || product.code === '' || product.description === '' || product.price === '') {
      return alert('Preencha todos os campos');
    }
    if (!isValidPriceFormat(product.price)) {
      return alert('Formato de preço inválido. Use o formato 0.00');
    }
    try {
      await productsPost(product);
      return alert('Produto salvo com sucesso');
    }
    catch (error) {
      console.log(error);
    }
    finally {
      setProduct({
        name: '',
        code: '',
        description: '',
        price: ''
      });
      getProducts();
    }
  };

  const handleChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    setProduct({
      ...product,
      [target.name]: target.value
    });
  };

  return (
    <div>
      <h3>Novo Produto</h3>
      <form className='flex_center' onSubmit={handleSubmit}>
        <input type="text" data-testid='name-input' name='name' placeholder="Nome" onChange={handleChange} maxLength={255}/>
        <input type="text" data-testid='code-input' name='code' placeholder="Código" onChange={handleChange} maxLength={50}/>
        <input type="text" data-testid='description-input' name='description' placeholder="Descrição" onChange={handleChange} maxLength={500}/>
        <input type="text" data-testid='price-input' name='price' placeholder="Preço" onChange={handleChange}/>
        <button
          className='save-btn'
          data-testid='save-btn'
          type="submit"
        >
          <MdSave size={23} color='gray' />
        </button>
      </form>

    </div>
  );
}

export default AddProduct;
