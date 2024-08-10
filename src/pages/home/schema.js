import * as yup from "yup";

export const schema = yup.object({
  name: yup.string().required("Campo obrigatório"),
  price: yup.number().typeError("Preço inválido").required("Campo obrigatório"),

  supplier: yup
    .string()
    .typeError("Preço inválido")
    .required("Campo obrigatório"),
  img: yup.string().typeError("Preço inválido").required("Campo obrigatório"),
  description: yup
    .string()
    .typeError("Preço inválido")
    .required("Campo obrigatório"),
});
