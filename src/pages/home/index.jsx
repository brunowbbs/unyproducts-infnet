import axios from "axios";
import Modal from "react-modal";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { customStyles } from "./customStyles";

import Header from "../../components/header/index,";

import "./styles.css";
import { useEffect, useState } from "react";
import { schema } from "./schema";
import { Link } from "react-router-dom";

Modal.setAppElement("#root");

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

  const [products, setProducts] = useState([]);

  async function getProducts() {
    try {
      const response = await axios.get(
        "https://api-produtos-unyleya.vercel.app/produtos"
      );

      setProducts(response?.data);
    } catch (error) {
      alert("erro ao buscar produtos");
    }
  }

  useEffect(() => {
    getProducts();
  }, []);

  async function saveProduct(data) {
    // console.log(data);

    try {
      await axios.post("https://api-produtos-unyleya.vercel.app/produtos", {
        nome: data.name,
        preco: data.price,
        fornecedor: data.supplier,
        url_imagem: data.img,
        descricao: data.description,
      });
      setIsModalVisible(false);
      alert("Produto cadastrado com sucesso!");
      getProducts();
      reset();
    } catch (error) {
      alert("Erro ao cadastrar produto");
    }
  }

  return (
    <div>
      <Header />
      <div className="home_container">
        <h1>Produtos</h1>

        <div className="content_products">
          {products.map((product, index) => (
            <Link key={index} to={`/details/${product._id}`}>
              <div className="card">
                <p className="title">{product.nome}</p>

                <img className="img_product" src={product.url_imagem} />

                <p className="manufacturer">{product.fornecedor}</p>
                <p className="price">R$ {product.preco}</p>
              </div>
            </Link>
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
            <input placeholder="Nome do produto" {...register("name")} />
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

          <div style={{ marginBottom: 10 }}>
            <input placeholder="Fornecedor" {...register("supplier")} />
            {errors.price && (
              <p style={{ fontSize: 12, marginTop: -5, color: "red" }}>
                {errors?.supplier?.message}
              </p>
            )}
          </div>

          <div style={{ marginBottom: 10 }}>
            <input
              placeholder="Url da imagem"
              {...register("img")}
              style={{ borderColor: errors?.img?.message ? "red" : null }}
            />
            {errors.price && (
              <p style={{ fontSize: 12, marginTop: -5, color: "red" }}>
                {errors?.img?.message}
              </p>
            )}
          </div>

          <div style={{ marginBottom: 10, width: "100%" }}>
            <textarea
              placeholder="Descrição"
              {...register("description")}
              style={{ width: "100%" }}
            />
            {errors.price && (
              <p style={{ fontSize: 12, marginTop: -10, color: "red" }}>
                {errors?.description?.message}
              </p>
            )}
          </div>

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
