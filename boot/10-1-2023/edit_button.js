// getting the vale from the inventory.html ,and show serial number on edit_button.html
const urlParams = new URLSearchParams(window.location.search);
const sno = urlParams.get("sno");
console.log(sno);
const target = Number(sno);
console.log(target);
// getting the respective element from the localstorage and filter the value based on the target variable
const products = JSON.parse(localStorage.getItem("product"));
const filteredProduct = products.filter((item) => item.item_no === target);
console.log(filteredProduct);
console.log(filteredProduct[0].item_name);
document.querySelector("#item_name").value = filteredProduct[0].item_name;
document.querySelector("#price").value = filteredProduct[0].price;
document.querySelector("#purchased").value = filteredProduct[0].purchased;
document.querySelector("#sold").value = filteredProduct[0].sold;
document.querySelector("#in_stock").value = filteredProduct[0].stock;
document.querySelector("#input_type").value = filteredProduct[0].type;
document.querySelector("#input_availability").value =
  filteredProduct[0].availability;
// setting the edited value to the localstorage

document.querySelector("#update_button").addEventListener("click", (event) => {
  const getting_value = JSON.parse(localStorage.getItem("product"));
  console.log(getting_value[target - 1]);
  //   setting the value to the getting_value variable
  getting_value[target - 1].item_name =
    document.querySelector("#item_name").value;
  getting_value[target - 1].price = Number(
    document.querySelector("#price").value
  );
  getting_value[target - 1].purchased = Number(
    document.querySelector("#purchased").value
  );
  getting_value[target - 1].sold = Number(
    document.querySelector("#sold").value
  );
  getting_value[target - 1].stock = Number(
    document.querySelector("#in_stock").value
  );
  getting_value[target - 1].type = document.querySelector("#input_type").value;
  getting_value[target - 1].availability = document.querySelector(
    "#input_availability"
  ).value;
  localStorage.setItem("product", JSON.stringify(getting_value));
  event.preventDefault();
  window.location.href = "inventory.html";
});
