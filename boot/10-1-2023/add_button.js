const today = new Date();
const date = today.getDate();
const month = today.getMonth() + 1; // January is 0
const year = today.getFullYear();
const dateString = date + "-" + month + "-" + year;

const addButton = document.querySelector(".add_button");
addButton.addEventListener("click", function () {
  const new_product = {
    item_no: (JSON.parse(localStorage.getItem("product")) || []).length + 1,
    item_name: document.querySelector("input[name='item_name']").value,
    price: Number(document.querySelector("input[name='price']").value),
    purchased: Number(document.querySelector("input[name='purchased']").value),
    sold: Number(document.querySelector("input[name='sold']").value),
    stock: Number(document.querySelector("input[name='in_stock']").value),
    type: document.querySelector("select[name='type']").value,
    availability: document.querySelector("select[name='availability']").value,
    created_date: dateString,
    img: "",
  };
  console.log(document.querySelector("input[name='item_name']").value);
  console.log(document.querySelector("input[name='sold']").value);

  let products = JSON.parse(localStorage.getItem("product")) || [];
  products.push(new_product);
  console.log(new_product);
  localStorage.setItem("product", JSON.stringify(products));
  window.location.href = "inventory.html";
});
