import "./orderscreen.css";

export default function Ordersum() {
  return (
    <div className="ordersum text-light  text-center pt-5">
      <h1 className="header mt-5 mb-3">order summary</h1>
      <div className="info fw-5 fs-5">
        <div className="name">
          <span>Name: </span>
          <span>Someone</span>
        </div>
        <div className="adresse">
          <span>Adresse: </span>
          <span>Some Place</span>
        </div>
        <div className="email">
          <span>Email: </span>
          <span>Someone@smth.smth</span>
        </div>
      </div>
      <h4 className="my-3 sub-header">Products :</h4>
      <div className="products text-start container py-5">
        <div className="product mb-5 row rounded-5 d-flex justify-content-evenly">
          <div className="col-2 p-img-container p-3">
            <img src="/flavors/f-0.png" className="p-img" />
          </div>
          <div className="details col-8">
            <span className="categ">Einweg E-Zigarette Smok Novobar B600</span>
            <span className="p-name">BLUEBERRY ICE</span>
            <div className="quant-price text-black d-flex justify-content-between align-items-center">
              <div className="quant rounded-pill d-flex justify-content-between row">
                <span className="col-8">Quantity</span>
                <input
                  className="bg-light col-4 rounded-pill text-center"
                  type={"number"}
                  min={1}
                  max={5}
                />
              </div>
              <div className="price text-end">€ 7.99</div>
            </div>
          </div>
        </div>
        <div className="product mb-5 row rounded-5 d-flex justify-content-evenly">
          <div className="col-2 p-img-container p-3">
            <img src="/flavors/f-0.png" className="p-img" />
          </div>
          <div className="details col-8">
            <span className="categ">Einweg E-Zigarette Smok Novobar B600</span>
            <span className="p-name">BLUEBERRY ICE</span>
            <div className="quant-price text-black d-flex justify-content-between align-items-center">
              <div className="quant rounded-pill d-flex justify-content-between row">
                <span className="col-8">Quantity</span>
                <input
                  className="bg-light col-4 rounded-pill text-center"
                  type={"number"}
                  min={1}
                  max={5}
                />
              </div>
              <div className="price text-end">€ 7.99</div>
            </div>
          </div>
        </div>
        <div className="product mb-5 row rounded-5 d-flex justify-content-evenly">
          <div className="col-2 p-img-container p-3">
            <img src="/flavors/f-0.png" className="p-img" />
          </div>
          <div className="details col-8">
            <span className="categ">Einweg E-Zigarette Smok Novobar B600</span>
            <span className="p-name">BLUEBERRY ICE</span>
            <div className="quant-price text-black d-flex justify-content-between align-items-center">
              <div className="quant rounded-pill d-flex justify-content-between row">
                <span className="col-8">Quantity</span>
                <input
                  className="bg-light col-4 rounded-pill text-center"
                  type={"number"}
                  min={1}
                  max={5}
                />
              </div>
              <div className="price text-end">€ 7.99</div>
            </div>
          </div>
        </div>
        <div className="product mb-5 row rounded-5 d-flex justify-content-evenly">
          <div className="col-2 p-img-container p-3">
            <img src="/flavors/f-0.png" className="p-img" />
          </div>
          <div className="details col-8">
            <span className="categ">Einweg E-Zigarette Smok Novobar B600</span>
            <span className="p-name">BLUEBERRY ICE</span>
            <div className="quant-price w-100 text-black d-flex justify-content-between align-items-center">
              <div className="quant rounded-pill d-flex justify-content-between row">
                <span className="col-8">Quantity</span>
                <input
                  className="bg-light col-4 rounded-pill text-center"
                  type={"number"}
                  min={1}
                  max={5}
                />
              </div>
              <div className="price text-end">€ 7.99</div>
            </div>
          </div>
        </div>
      </div>
      <div className="total-container">
        <div className="total mb-3 ">
          <span>Total: €</span>
          <span>80.99</span>
        </div>
        <div className="tax mb-3 ">
          <span>Tax: </span>
          <span>19%</span>
        </div>
        <div className="net mb-5 ">
          <span>Total NET: €</span>
          <span>50.66</span>
        </div>
      </div>
      <button className="btn check-btn bg-orange rounded-pill py-3">
        Check out
      </button>
      <div className="ship-fee d-flex justify-content-between w-md-50 w-75 mx-auto my-5">
        <span className="fw-semibold">Shipping fee:</span>
        <span>1 to 3 pieces : €1.95</span>
        <span>4 and more: €2.99</span>
      </div>
      <div className="ending">
        <span className="">
          If you have any questions or concerns about your order, please contact
          our customer service team at [Email Address/Phone Number].
        </span>
      </div>
    </div>
  );
}
