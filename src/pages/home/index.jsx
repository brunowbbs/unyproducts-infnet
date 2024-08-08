import axios from "axios";
import Modal from "react-modal";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { customStyles } from "./customStyles";

import Header from "../../components/header/index,";

import "./styles.css";
import { useEffect, useState } from "react";

Modal.setAppElement("#root");

const schema = yup.object({
  name: yup.string().required("Campo obrigatório"),
  price: yup.number().typeError("Preço inválido").required("Campo obrigatório"),
});

export default function Home() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [isModalVisible, setIsModalVisible] = useState(false);

  console.log("ERRORS:", errors);

  async function getProducts() {
    try {
      const response = await axios.get(
        "https://api-produtos-unyleya.vercel.app/produtos"
      );

      console.log(response?.data);
    } catch (error) {
      alert("erro ao buscar produtos");
    }
  }

  useEffect(() => {
    getProducts();
  }, []);

  function saveProduct(data) {
    console.log(data);
  }

  return (
    <div>
      <Header />
      <div className="home_container">
        <h1>Produtos</h1>

        <div className="content_products">
          {MOCK.map((product) => (
            <div className="card">
              <p className="title">{product.titulo}</p>

              <img
                className="img_product"
                src="https://http2.mlstatic.com/D_NQ_NP_715682-MLA74955459593_032024-O.webp"
              />

              <p className="manufacturer">{product.fabricante}</p>
              <p className="price">R$ {product.preco}</p>
            </div>
          ))}
        </div>

        <button
          className="float_button"
          onClick={() => setIsModalVisible(true)}
        >
          +
        </button>
      </div>

      <Modal
        isOpen={isModalVisible}
        style={customStyles}
        onRequestClose={() => {
          setIsModalVisible(false);
          reset();
        }}
      >
        <h3 className="title_form">Cadastro de produtos</h3>

        <form className="form" onSubmit={handleSubmit(saveProduct)}>
          <div style={{ marginBottom: 10 }}>
            <input w placeholder="Nome do produto" {...register("nome")} />
            {errors.name && (
              <p style={{ fontSize: 12, marginTop: -5, color: "red" }}>
                {errors?.name?.message}
              </p>
            )}
          </div>

          <div style={{ marginBottom: 10 }}>
            <input placeholder="Preço" {...register("price")} />
            {errors.price && (
              <p style={{ fontSize: 12, marginTop: -5, color: "red" }}>
                {errors?.price?.message}
              </p>
            )}
          </div>

          <input placeholder="Fornecedor" {...register("supplier")} />
          <input placeholder="Url da imagem" {...register("img")} />

          <textarea placeholder="Descrição" {...register("description")} />

          <div className="form_buttons">
            <button type="submit">Salvar</button>
            <button
              type="button"
              onClick={() => {
                setIsModalVisible(false);
                reset();
              }}
            >
              Cancelar
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

const MOCK = [
  {
    id: "1",
    titulo: "Produto",
    fabricante: "Fabricante",
    preco: 123,
  },
  {
    id: "2",
    titulo: "Produto 2",
    fabricante: "Fabricante 2",
    preco: 1234,
  },
];
