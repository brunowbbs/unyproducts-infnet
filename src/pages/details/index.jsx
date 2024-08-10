import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaEdit, FaRegTrashAlt } from "react-icons/fa";
import Modal from "react-modal";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../../components/header/index,";
import { customStyles } from "../home/customStyles";
import { schema } from "../home/schema";
import "./styles.css";

export default function Details() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState({});
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [isModalVisibleDelete, setIsModalVisibleDelete] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  async function getProductDetails() {
    try {
      const response = await axios.get(
        `https://api-produtos-unyleya.vercel.app/produtos/${id}`
      );

      setProduct(response.data);
    } catch (error) {
      alert("Erro ao buscar detalhes do produto");
    }
  }

  useEffect(() => {
    getProductDetails();
  }, [id]);

  async function removeProduct() {
    try {
      await axios.delete(
        `https://api-produtos-unyleya.vercel.app/produtos/${id}`
      );
      setIsModalVisibleDelete(false);
      alert("Produto removido com sucesso");
      navigate(-1);
    } catch (error) {
      alert("Erro ao remover produto");
    }
  }

  async function saveProduct(data) {
    // console.log(data);

    try {
      await axios.put(
        `https://api-produtos-unyleya.vercel.app/produtos/${id}`,
        {
          nome: data.name,
          preco: data.price,
          fornecedor: data.supplier,
          url_imagem: data.img,
          descricao: data.description,
        }
      );
      setIsModalVisible(false);
      alert("Produto editado com sucesso!");
      getProductDetails();
      reset();
    } catch (error) {
      alert("Erro ao cadastrar produto");
    }
  }

  return (
    <div>
      <Header />

      <div className="details_container">
        <h2>{product.nome}</h2>{" "}
        <FaEdit
          cursor="pointer"
          size={28}
          color="#555"
          onClick={() => {
            setIsModalVisible(true);
            setValue("name", product.nome);
            setValue("price", product.preco);
            setValue("supplier", product.fornecedor);
            setValue("img", product.url_imagem);
            setValue("description", product.descricao);
          }}
        />
        <FaRegTrashAlt
          cursor="pointer"
          size={26}
          color="#555"
          onClick={() => setIsModalVisibleDelete(true)}
        />
        <h6>{product.fornecedor}</h6>
        <p className="price">{product.preco}</p>
        <img src={product.url_imagem} />
        <p className="description">{product.descricao}</p>
      </div>

      <Modal
        isOpen={isModalVisible}
        style={customStyles}
        onRequestClose={() => {
          setIsModalVisible(false);
          reset();
        }}
      >
        <h3 className="title_form">Editar produto</h3>

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

      <Modal
        isOpen={isModalVisibleDelete}
        style={customStyles}
        onRequestClose={() => {
          setIsModalVisibleDelete(false);
        }}
      >
        <h4>Confirmar exclusão</h4>

        <p>Deseja realmente excluir o produto selecionado?</p>

        <div className="container_modal_delet_buttons">
          <button onClick={removeProduct}>Confirmar</button>
          <button onClick={() => setIsModalVisibleDelete(false)}>
            Cancelar
          </button>
        </div>
      </Modal>
    </div>
  );
}
