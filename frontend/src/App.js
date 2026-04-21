import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate
} from "react-router-dom";

/* ---------------- LOAD RAZORPAY SCRIPT ---------------- */

const loadScript = (src) => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

/* ---------------- HOME PAGE ---------------- */

function Home({ products, addToCart }) {
  return (
    <div style={{ padding: "40px" }}>
      <h2>Welcome to E-Commerce Shopping System</h2>
      <p>Browse latest products with AWS + Docker deployment</p>

      <h2>Available Products</h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "20px"
        }}
      >
        {products.map((product) => (
          <div
            key={product.id}
            style={{
              background: "white",
              borderRadius: "12px",
              overflow: "hidden",
              boxShadow: "0 4px 10px rgba(0,0,0,0.08)"
            }}
          >
            <img
              src={product.image}
              alt={product.name}
              style={{
                width: "100%",
                height: "220px",
                objectFit: "cover"
              }}
            />

            <div style={{ padding: "20px" }}>
              <h3>{product.name}</h3>

              <p
                style={{
                  color: "#27ae60",
                  fontWeight: "bold"
                }}
              >
                ₹{product.price}
              </p>

              <p>{product.description}</p>

              <button
                onClick={() => addToCart(product)}
                style={{
                  background: "#273c75",
                  color: "white",
                  border: "none",
                  padding: "10px 18px",
                  borderRadius: "8px",
                  cursor: "pointer"
                }}
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------------- CART PAGE ---------------- */

function Cart({ cartItems, removeFromCart }) {
  const navigate = useNavigate();

  const total = cartItems.reduce(
    (sum, item) => sum + parseFloat(item.price),
    0
  );

  return (
    <div style={{ padding: "40px" }}>
      <h2>Your Cart</h2>

      {cartItems.length === 0 ? (
        <p>Cart is empty</p>
      ) : (
        <>
          {cartItems.map((item, index) => (
            <div
              key={index}
              style={{
                background: "white",
                padding: "20px",
                marginBottom: "15px",
                borderRadius: "10px"
              }}
            >
              <h3>{item.name}</h3>
              <p>₹{item.price}</p>

              <button
                onClick={() => removeFromCart(index)}
                style={{
                  background: "#c23616",
                  color: "white",
                  border: "none",
                  padding: "8px 15px",
                  borderRadius: "8px"
                }}
              >
                Remove
              </button>
            </div>
          ))}

          <h3>Total: ₹{total}</h3>

          <button
            onClick={() => navigate("/checkout")}
            style={{
              background: "#27ae60",
              color: "white",
              border: "none",
              padding: "12px 20px",
              borderRadius: "8px"
            }}
          >
            Proceed to Checkout
          </button>
        </>
      )}
    </div>
  );
}

/* ---------------- CHECKOUT PAGE ---------------- */

function Checkout({ cartItems }) {
  const navigate = useNavigate();

  const total = cartItems.reduce(
    (sum, item) => sum + parseFloat(item.price),
    0
  );

  const handlePayment = async () => {
    const loaded = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!loaded) {
      alert("Razorpay SDK failed to load");
      return;
    }

    const response = await fetch("http://localhost:5001/create-order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        amount: total
      })
    });

    const order = await response.json();

    const options = {
      key: "rzp_test_Sf64BK6mXPkrWn", // replace with your real test key
      amount: order.amount,
      currency: order.currency,
      name: "ShopKart",
      description: "E-Commerce Payment",
      order_id: order.id,

      handler: function () {
        alert("Payment Successful!");
        navigate("/");
      },

      prefill: {
        name: "Pratik Pandey",
        email: "kabirpandey16@gmail.com",
        contact: "6352777984"
      },

      theme: {
        color: "#273c75"
      }
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  return (
    <div style={{ padding: "40px" }}>
      <h2>Checkout Page</h2>

      <h3>Total Amount: ₹{total}</h3>

      <button
        onClick={handlePayment}
        style={{
          marginTop: "20px",
          background: "#273c75",
          color: "white",
          border: "none",
          padding: "12px 20px",
          borderRadius: "8px"
        }}
      >
        Pay with Razorpay
      </button>
    </div>
  );
}

/* ---------------- ADMIN PAGE ---------------- */

function Admin({
  newProduct,
  setNewProduct,
  addProduct,
  products,
  deleteProduct
}) {
  return (
    <div style={{ padding: "40px" }}>
      <h2>Admin Panel</h2>

      <div
        style={{
          background: "white",
          padding: "25px",
          borderRadius: "12px",
          marginBottom: "30px"
        }}
      >
        <h3>Add New Product</h3>

        <input
          type="text"
          placeholder="Product Name"
          value={newProduct.name}
          onChange={(e) =>
            setNewProduct({
              ...newProduct,
              name: e.target.value
            })
          }
          style={{
            display: "block",
            marginBottom: "15px",
            padding: "10px",
            width: "300px"
          }}
        />

        <input
          type="number"
          placeholder="Price"
          value={newProduct.price}
          onChange={(e) =>
            setNewProduct({
              ...newProduct,
              price: e.target.value
            })
          }
          style={{
            display: "block",
            marginBottom: "15px",
            padding: "10px",
            width: "300px"
          }}
        />

        <textarea
          placeholder="Description"
          value={newProduct.description}
          onChange={(e) =>
            setNewProduct({
              ...newProduct,
              description: e.target.value
            })
          }
          style={{
            display: "block",
            marginBottom: "15px",
            padding: "10px",
            width: "300px",
            height: "100px"
          }}
        />

        <input
          type="text"
          placeholder="Image URL"
          value={newProduct.image}
          onChange={(e) =>
            setNewProduct({
              ...newProduct,
              image: e.target.value
            })
          }
          style={{
            display: "block",
            marginBottom: "15px",
            padding: "10px",
            width: "300px"
          }}
        />

        <button
          onClick={addProduct}
          style={{
            background: "#27ae60",
            color: "white",
            border: "none",
            padding: "10px 18px",
            borderRadius: "8px"
          }}
        >
          Add Product
        </button>
      </div>

      <h3>Manage Products</h3>

      {products.map((product) => (
        <div
          key={product.id}
          style={{
            background: "white",
            padding: "20px",
            marginBottom: "15px",
            borderRadius: "10px"
          }}
        >
          <h3>{product.name}</h3>
          <p>₹{product.price}</p>

          <button
            onClick={() => deleteProduct(product.id)}
            style={{
              background: "#e84118",
              color: "white",
              border: "none",
              padding: "8px 15px",
              borderRadius: "8px"
            }}
          >
            Delete Product
          </button>
        </div>
      ))}
    </div>
  );
}

/* ---------------- MAIN APP ---------------- */

function App() {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    description: "",
    image: ""
  });

  const fetchProducts = () => {
    fetch("http://localhost:5001/products")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setProducts(data);
        }
      });
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const addToCart = (product) => {
    setCartItems([...cartItems, product]);
    alert(`${product.name} added to cart`);
  };

  const removeFromCart = (index) => {
    const updated = [...cartItems];
    updated.splice(index, 1);
    setCartItems(updated);
  };

  const addProduct = () => {
    fetch("http://localhost:5001/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newProduct)
    })
      .then((res) => res.json())
      .then(() => {
        alert("Product Added Successfully");

        setNewProduct({
          name: "",
          price: "",
          description: "",
          image: ""
        });

        fetchProducts();
      });
  };

  const deleteProduct = (id) => {
    fetch(`http://localhost:5001/products/${id}`, {
      method: "DELETE"
    })
      .then((res) => res.json())
      .then(() => {
        alert("Product Deleted Successfully");
        fetchProducts();
      });
  };

  return (
    <Router>
      <div
        style={{
          background: "#f5f6fa",
          minHeight: "100vh"
        }}
      >
        <div
          style={{
            background: "#2f3640",
            color: "white",
            padding: "20px 40px",
            display: "flex",
            justifyContent: "space-between"
          }}
        >
          <h1>ShopKart</h1>

          <div>
            <Link
              to="/"
              style={{
                color: "white",
                marginRight: "20px"
              }}
            >
              Home
            </Link>

            <Link
              to="/cart"
              style={{
                color: "white",
                marginRight: "20px"
              }}
            >
              Cart ({cartItems.length})
            </Link>

            <Link
              to="/checkout"
              style={{
                color: "white",
                marginRight: "20px"
              }}
            >
              Checkout
            </Link>

            <Link
              to="/admin"
              style={{
                color: "white"
              }}
            >
              Admin
            </Link>
          </div>
        </div>

        <Routes>
          <Route
            path="/"
            element={
              <Home
                products={products}
                addToCart={addToCart}
              />
            }
          />

          <Route
            path="/cart"
            element={
              <Cart
                cartItems={cartItems}
                removeFromCart={removeFromCart}
              />
            }
          />

          <Route
            path="/checkout"
            element={
              <Checkout
                cartItems={cartItems}
              />
            }
          />

          <Route
            path="/admin"
            element={
              <Admin
                newProduct={newProduct}
                setNewProduct={setNewProduct}
                addProduct={addProduct}
                products={products}
                deleteProduct={deleteProduct}
              />
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;