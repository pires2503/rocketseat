import React from 'react';
import { MdAddShoppingCart } from 'react-icons/md';

import { ProductList } from './styles';
import Tenis from '../../assets/images/tenis_mizuno.jpg';

export default function Home() {
  return (
    <ProductList>
      <li>
        <img src={Tenis} alt="Tênis" />

        <strong>Tenis legal</strong>
        <span>R$129,90</span>

        <button type="button">
          <div>
            <MdAddShoppingCart size={16} color="#FFF" /> 3
          </div>

          <span>Adicionar ao carrinho</span>
        </button>
      </li>
    </ProductList>
  );
}
