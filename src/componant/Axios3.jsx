import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { base_url } from "./constant";

const Api = () => {
  //api data
  const [data, setdata] = useState([]);

  //view data
  const [view, setview] = useState({});

  let productName = useRef();
  let price = useRef();
  let Desc = useRef();

  //add product api
  let addProduct = async () => {
    let product = {
      productName: productName.current.value,
      price: price.current.value,
      desc: Desc.current.value,
    };

    let result = await axios.post(base_url, product);
    console.log(result.data);
    setdata([...data, result.data]);
  };

  //get product api
  let getProduct = async () => {
    let res = await axios.get(base_url);
    setdata(res.data);
  };

  //delete product api
  let deleteProduct = async (id) => {
    console.log(id);
    let res = await axios.delete(base_url + `/${id}`);
    console.log(res);
    setdata(data.filter((val) => val.id != id));
  };

  //update product api
  //view
  let viewProduct = (index) => {
    let product = data[index];
    console.log(product);
    setview(product);
  };

  let handleView = (e) => {
    setview({ ...view, [e.target.name]: e.target.value });
  };

  let UpdateProduct = async () => {
    // console.log(view);

    let res = await axios.put(base_url + `/${view.id}`, view);
    console.log(res);
    setdata(
      data.map((val) => {
        if (val.id == res.data.id) {
          return res.data;
        } else {
          return val;
        }
      })
    );
  };

  useEffect(() => {
    getProduct();
  }, []);

  return (
    <>
      

      <div className="card m-auto" style={{ width: "18rem" }}>
        <div class="form-group">
          <label for="productName">Product Name</label>
          <input
            type="text"
            class="form-control"
            aria-describedby="emailHelp"
            placeholder="Enter productName"
            ref={productName}
          />
        </div>
        <div class="form-group">
          <label for="exampleInputPassword1">Price</label>
          <input
            type="number"
            class="form-control"
            placeholder="price"
            ref={price}
          />
        </div>
        <div class="form-group">
          <label for="desc">Description</label>
          <input
            type="text"
            class="form-control"
            aria-describedby="emailHelp"
            placeholder="Enter Desc"
            ref={Desc}
          />
        </div>
        <button type="submit" class="btn btn-primary" onClick={addProduct}>
          Add
        </button>
      </div>

      <div className="row">
        {data.map((val, ind) => {
          return (
            <>
              <div class="card" style={{ width: "18rem" }}>
                <div class="card-body">
                  <h5 class="card-title">{val.productName}</h5>
                  <h6 class="card-subtitle mb-2 text-muted">{val.price}</h6>
                  <p class="card-text">{val.desc}</p>
                  <button
                    class="btn btn-danger mr-3"
                    onClick={() => deleteProduct(val.id)}
                  >
                    Delete
                  </button>

                  <button
                    type="button"
                    class="btn btn-primary"
                    data-toggle="modal"
                    data-target="#exampleModal"
                    onClick={() => viewProduct(ind)}
                  >
                    Update
                  </button>
                </div>
              </div>
            </>
          );
        })}
      </div>

      <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                Update Data
              </h5>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <div class="form-group">
                <label for="productName">Product Name</label>
                <input
                  type="text"
                  class="form-control"
                  aria-describedby="emailHelp"
                  placeholder="Enter productName"
                  value={view.productName}
                  onChange={handleView}
                  name="productName"
                />
              </div>
              <div class="form-group">
                <label for="exampleInputPassword1">Price</label>
                <input
                  type="number"
                  class="form-control"
                  placeholder="price"
                  value={view.price}
                  onChange={handleView}
                  name="price"
                />
              </div>
              <div class="form-group">
                <label for="desc">Description</label>
                <input
                  type="text"
                  class="form-control"
                  aria-describedby="emailHelp"
                  placeholder="Enter Desc"
                  value={view.desc}
                  onChange={handleView}
                  name="desc"
                />
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                class="btn btn-primary"
                onClick={UpdateProduct}
              >
                Update
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Api;