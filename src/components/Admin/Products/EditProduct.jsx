import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProductDetail, reset } from "../../Redux/action";
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { getCategories, getBrand, updateDetail } from "../../Redux/action";
// import "../../ProductDetail/Detail.css";

export default function ProductDetail() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const productDetail = useSelector((state) => state.detail);
  const allBrand = useSelector((state) => state.brand);
  const allCategories = useSelector((state) => state.categories);
  const updateDetails = useSelector((state) => state.updateDetail);

  const [input, setInput] = useState();

  console.log(input, "inpuy");

  const { id } = useParams();

  const [pen, setPen] = useState(false);
  useEffect(() => {
    dispatch(getProductDetail(id));
    dispatch(getCategories({ genre: undefined }));
    dispatch(getBrand({ genre: undefined }));
  }, [dispatch, id]);

  function handleChange(e) {
    // console.log(e.target.name, "target")
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(reset());
    dispatch(updateDetail(id, input));
    navigate("/admin/products");
  }

  function penDescription(e) {
    setPen(true);
    setInput({
      name: productDetail[0] && productDetail[0].name,
      image: productDetail[0] && productDetail[0].image[0],
      description: productDetail[0] && productDetail[0].name,
      genre: productDetail[0] && productDetail[0].genre,
      categoryId: productDetail[0] && productDetail[0].category.id,
      brandId: productDetail[0] && productDetail[0].brand.id,
      price: productDetail[0] && productDetail[0].price,
      stock: productDetail[0] && productDetail[0].stock,
    });
  }

  function backOnClicke(e) {
    e.preventDefault();
    dispatch(reset());
    navigate("/admin/products");
  }

  return (
    <>
      {
        <div className="pt-4">
          {/* Image gallery */}
          <div className="mt-10 max-w-2xl mb-20 mx-auto sm:px-6 lg:max-w-5xl lg:px-8 lg:grid lg:grid-cols-2 lg:gap-x-2">
            <div className="hidden aspect-w-3 aspect-h-4 rounded-lg overflow-hidden lg:block">
              <img
                src={productDetail[0] && productDetail[0].image[0]}
                alt={productDetail[0] && productDetail[0].image[0]}
                className="object-contain h-96 w-96 detalle"
              />

              {/* {pen ? (
                <textarea
                  className="w-full rounded-lg bg-gray-300 text-sm "
                  name="image"
                  onChange={(e) => handleChange(e)}
                  cols={100}
                  rows={2}
                  defaultValue={productDetail[0] && productDetail[0].image[0]}
                ></textarea>
              ) : null} */}
            </div>

            {/* Product name */}
            <div className="max-w-xl mx-auto px-4 sm:px-6 lg:max-w-xl lg:pt-5 lg:px-8 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8">
              <div className="lg:col-span-5 lg:pr-10 ">
                <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 capitalize ">
                  {productDetail[0] && productDetail[0].name}
                </h1>
                {pen ? (
                  <textarea
                    className="w-72 rounded-lg bg-gray-300 text-lg mt-3 "
                    name="name"
                    onChange={(e) => handleChange(e)}
                    defaultValue={productDetail[0] && productDetail[0].name}
                  ></textarea>
                ) : null}
              </div>

              {/* Product Description & category */}
              <div className=" mt-2 py-10 lg:pt-6 lg:pb-6 lg:col-start-1 lg:col-span-2">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">
                    Descripción
                  </h3>
                  <div className="space-y-6">
                    <button
                      onClick={(e) => {
                        penDescription(e);
                      }}
                    >
                      <BorderColorIcon />
                    </button>
                    <p className="text-xl text-gray-900">
                      {productDetail[0] &&
                        productDetail[0].description.charAt(0).toUpperCase() +
                          productDetail[0].description.slice(1)}
                    </p>
                    {pen ? (
                      <textarea
                        className="w-72 rounded-lg bg-gray-300 text-lg mt-3 "
                        name="description"
                        onChange={(e) => handleChange(e)}
                        defaultValue={
                          productDetail[0] &&
                          productDetail[0].description.charAt(0).toUpperCase() +
                            productDetail[0].description.slice(1)
                        }
                      ></textarea>
                    ) : null}
                  </div>
                </div>
                <div className="mt-2">
                  <h2 className="text-xl font-bold text-gray-900">Géneros</h2>

                  <div className="space-y-6">
                    <p className="text-xl text-gray-600 capitalize">
                      {productDetail[0] && productDetail[0].genre}
                    </p>
                    {pen ? (
                      <select
                        className="bg-gray-300 w-32 rounded-md"
                        name="genre"
                        onChange={(e) => handleChange(e)}
                      >
                        <option value={"women"}>Mujer</option>
                        <option value={"men"}>Hombre</option>
                        <option value={"no-gender"}>Sin Género</option>
                        <option value={"kids"}>Niño</option>
                      </select>
                    ) : null}
                  </div>
                </div>
                <div className="mt-2">
                  <h2 className="text-xl font-bold text-gray-900">
                    Categorías
                  </h2>

                  <div className="space-y-6">
                    <p className="text-xl text-gray-600 capitalize">
                      {productDetail[0] && productDetail[0].category.name}
                    </p>
                    {pen ? (
                      <select
                        className="bg-gray-300 w-32 rounded-md capitalize"
                        name="categoryId"
                        onChange={(e) => handleChange(e)}
                      >
                        {allCategories?.length &&
                          allCategories.map((e) => (
                            <option value={e.id}>{e.name}</option>
                          ))}
                      </select>
                    ) : null}
                  </div>
                </div>

                <div className="mt-2">
                  <h2 className="text-xl font-bold text-gray-900">Marca</h2>

                  <div className="space-y-6">
                    <p className="text-xl text-gray-600 capitalize">
                      {productDetail[0] && productDetail[0].brand.name}
                    </p>
                    {pen ? (
                      <select
                        className="bg-gray-300 w-32 rounded-md capitalize"
                        name="brandId"
                        onChange={(e) => handleChange(e)}
                      >
                        {allBrand?.length &&
                          allBrand.map((e) => (
                            <option value={e.id}>{e.name}</option>
                          ))}
                      </select>
                    ) : null}
                  </div>
                </div>

                {/* Product Score */}
                {/* Sustituir el 4 por productDetail[0].rating */}
                <h3 className=" mt-2 text-xl font-bold text-gray-900"></h3>
                <div className="flex flex-col">
                  <p className="text-2xl font-semibold">
                    Stock: {productDetail[0] && productDetail[0].stock}
                  </p>
                  {pen ? (
                    <div>
                      <input
                        className="bg-gray-300 w-32 rounded-md inline mt-3"
                        name={"stock"}
                        type={"number"}
                        onChange={(e) => handleChange(e)}
                        defaultValue={
                          productDetail[0] && productDetail[0].stock
                        }
                      ></input>
                    </div>
                  ) : null}
                </div>
              </div>

              {/* Product price */}
              <div className="mt-4 lg:mt-0 lg:row-span-3">
                <h2 className="sr-only">Información del Producto</h2>
                <p className="text-3xl font-bold text-gray-900">
                  ${productDetail[0] && productDetail[0].price}
                </p>
                {pen ? (
                  <input
                    className="bg-gray-300 w-32 rounded-md inline mt-3"
                    name="price"
                    onChange={(e) => handleChange(e)}
                    type={"number"}
                    min={0}
                    defaultValue={productDetail[0] && productDetail[0].price}
                  ></input>
                ) : null}

                <div className="">
                  <button
                    type="submit"
                    className="mt-10 w-full bg-primary border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    onClick={(e) => {
                      handleSubmit(e);
                    }}
                  >
                    Guardar Producto
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Back */}
          <button
            className="bg-black w-32 h-12 rounded-lg shadow-lg border-2 border-gray-600 ml-5 mt-5 text-white hover:bg-gray-700 duration-500"
            onClick={(e) => backOnClicke(e)}
          >
            Volver
          </button>
        </div>
      }
    </>
  );
}
