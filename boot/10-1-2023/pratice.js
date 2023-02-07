var total_price;
var number_value;
var product_containers;
var getting_value;
var temp_local;
var totaltenderamount;
var change;
document.addEventListener("DOMContentLoaded", () => {
  let xhr = new XMLHttpRequest();
  xhr.open("GET", "index.json", true);
  xhr.send();
  xhr.onload = () => {
    if (xhr.status === 200) {
      if (!localStorage.getItem("product")) {
        let setting_value = localStorage.setItem("product", xhr.responseText);
      }
      // it will change the string to the object
      getting_value = JSON.parse(localStorage.getItem("product"));
      temp_local = getting_value;
      //   show the object on the console
      //   console.log(getting_value);
      let drinks = getting_value.filter((item) => item.type === "drinks");
      let snacks = getting_value.filter((item) => item.type === "snacks");
      console.log(drinks, snacks);
      //   here the 24 representing the number of drinks shown in the webpage
      for (let i = 0; i < drinks.length; i++) {
        // getting the corresponding value from the object and store it in the variable
        let img_name = drinks[i].item_name;
        let img_path = drinks[i].img;
        let img_price = drinks[i].price;
        let img_number = drinks[i].item_no;
        // console.log(img_name);
        // console.log(img_path);
        // now creating an element and attribute in the place we  want
        let ptag = document.createElement("p");
        let imgtag = document.createElement("img");
        ptag.textContent = img_name;
        imgtag.setAttribute("src", img_path);
        // it will select all the .img in the file
        let dri_container = document.querySelectorAll(".img")[i];
        dri_container.appendChild(ptag);
        dri_container.appendChild(imgtag);
      }
      //   here the 13 representing the number of snacks shown in the webpage
      for (let i = 0; i < snacks.length; i++) {
        let snack_list = snacks[i].item_name;
        let sanck_price = snacks[i].price;
        let snack_number = snacks[i].item_no;
        // console.log(snack_name);
        let snack_name = document.createElement("p");
        snack_name.setAttribute("class", "snack-item");
        snack_name.setAttribute("onClick", "snack_run(this)");
        snack_name.textContent = snack_list;
        let snack_container = document.querySelectorAll(".drink")[i];
        snack_container.appendChild(snack_name);
      }
    }
  };
});
// create a function for the drinks item, when we clcik the item it will show the output on the content area
let product = JSON.parse(localStorage.getItem("product"));
let table = document.querySelector("#content table");
product_containers = [];
document.querySelectorAll("#images td").forEach((td) => {
  td.addEventListener("click", () => {
    let drink = td.innerText;
    // console.log(drink);
    let drink_price = product.find(function (p) {
      return p.item_name === drink;
    });
    // console.log(drink_price.price);
    let dri_price = parseFloat(drink_price.price);
    console.log(drink);
    var total_item_price = drink;
    console.log(dri_price);
    if (!product_containers[drink]) {
      product_containers[drink] = {
        quantity: 1,
        unit_price: dri_price,
      };
    } else {
      product_containers[drink].quantity++;
    }
    console.log(product_containers);
    let update_snack = document.getElementById(`${drink}_row`);
    // console.log(update_snack);
    let roundoff = (
      product_containers[drink].quantity * product_containers[drink].unit_price
    ).toFixed(2);
    if (update_snack) {
      // here there are already an <tr> is avilable so we don't need to create a new row
      update_snack.innerHTML = `
        <td class="table-item styles myproduct_item_name">${drink}</td>
        <td class="table-quantity styles table-quantities myproduct_quantity">${product_containers[drink].quantity}</td>
        <td class="table-unitprice styles table-unitprices">${product_containers[drink].unit_price}</td>
        <td class="table-totalprice styles" id="tprice">${roundoff}</td>`;
    } else {
      table.innerHTML += `
        <tr id="${drink}_row">
        <td class="table-item styles myproduct_item_name">${drink}</td>
        <td class="table-quantity styles table-quantities myproduct_quantity">${product_containers[drink].quantity}</td>
        <td class="table-unitprice styles table-unitprices">${product_containers[drink].unit_price}</td>
        <td class="table-totalprice styles" id="tprice">${roundoff}</td>
        </tr>`;
    }
    update_total_price(total_item_price);
  });
});
// create a function for the snack item, when we click the item it will show the output on the content area
function snack_run(elem) {
  let snack = elem.innerText;
  let snack_price = product.find(function (p) {
    return p.item_name === snack;
  });
  let snk_price = parseFloat(snack_price.price);
  console.log(snack);
  console.log(snk_price);
  var total_item_price = snack;
  if (!product_containers[snack]) {
    product_containers[snack] = {
      quantity: 1,
      unit_price: snk_price,
    };
  } else {
    product_containers[snack].quantity++;
  }
  console.log(product_containers);
  let update_snack = document.getElementById(`${snack}_row`);
  // console.log(update_snack);
  let roundoff = (
    product_containers[snack].quantity * product_containers[snack].unit_price
  ).toFixed(2);
  if (update_snack) {
    // here there are already an <tr> is avilable so we don't need to create a new row
    update_snack.innerHTML = `
      <td class="table-item styles myproduct_item_name">${snack}</td>
      <td class="table-quantity styles table-quantities myproduct_quantity">${product_containers[snack].quantity}</td>
      <td class="table-unitprice styles table-unitprices">${product_containers[snack].unit_price}</td>
      <td class="table-totalprice styles" id="tprice">${roundoff}</td>`;
  } else {
    table.innerHTML += `
      <tr id="${snack}_row">
      <td class="table-item styles myproduct_item_name">${snack}</td>
      <td class="table-quantity styles table-quantities myproduct_quantity">${product_containers[snack].quantity}</td>
      <td class="table-unitprice styles table-unitprices">${product_containers[snack].unit_price}</td>
      <td class="table-totalprice styles" id="tprice">${roundoff}</td>
      </tr>`;
  }
  update_total_price(total_item_price);
  // myproductdata += product_containers;
}
// setting the input for the four input field
let numberpad = document.getElementById("numbers");
const input1 = document.querySelector("#input-item-number");
const input2 = document.querySelector("#input-quantity");
const input3 = document.querySelector("#calc-language-in1");
const input4 = document.querySelector("#calc-language-in2");
const inputs = [input1, input2, input3, input4];
let currentinput = input1;
inputs.forEach((input) => {
  input.addEventListener("click", () => {
    currentinput = input;
    console.log(currentinput);
  });
});
numberpad.addEventListener("click", (event) => {
  if (event.target.classList.contains("num-btn")) {
    const value = event.target.textContent;
    currentinput.value += value;
  }
});
// setting the function for the all clear button
let all_clear = document.querySelector("#all-clear-button");
all_clear.addEventListener("click", () => {
  input1.value = "";
  input2.value = "";
  input3.value = "";
  input4.value = "";
});
// setting the function for the clear button
let clear = document.querySelector("#clear-button");
clear.addEventListener("click", () => {
  currentinput.value = "";
});
// setting the function for the input fields
let add_button = document.querySelector("#display-add");
add_button.addEventListener("click", () => {
  let itemnumber = Number(input1.value);
  let quantity = Number(input2.value);
  console.log(itemnumber, quantity);
  let getting_value = JSON.parse(localStorage.getItem("product"));
  // let product = localStorage.getItem("product");
  // console.log(product);
  console.log(getting_value);
  let item_random = getting_value.filter(function (e) {
    return e.item_no === itemnumber;
  });
  // name of the random_item
  let random_item = item_random[0].item_name;
  var total_item_price = random_item;
  // price of the random_item
  let snk_price = item_random[0].price;
  console.log(random_item, snk_price);
  // let random_item = item_random.item_name;
  // console.log(random_item);
  if (!product_containers[random_item]) {
    product_containers[random_item] = {
      quantity: quantity,
      unit_price: snk_price,
    };
  } else {
    product_containers[random_item].quantity += quantity;
  }
  console.log(product_containers);
  let update_snack = document.getElementById(`${random_item}_row`);
  // console.log(update_snack);
  let roundoff = (
    product_containers[random_item].quantity *
    product_containers[random_item].unit_price
  ).toFixed(2);
  if (update_snack) {
    // here there are already an <tr> is avilable so we don't need to create a new row
    update_snack.innerHTML = `
      <td class="table-item styles myproduct_item_name">${random_item}</td>
      <td class="table-quantity styles table-quantities myproduct_quantity">${product_containers[random_item].quantity}</td>
      <td class="table-unitprice styles table-unitprices">${product_containers[random_item].unit_price}</td>
      <td class="table-totalprice styles" id="tprice">${roundoff}</td>`;
  } else {
    table.innerHTML += `
      <tr id="${random_item}_row">
      <td class="table-item styles myproduct_item_name">${random_item}</td>
      <td class="table-quantity styles table-quantities myproduct_quantity">${product_containers[random_item].quantity}</td>
      <td class="table-unitprice styles table-unitprices">${product_containers[random_item].unit_price}</td>
      <td class="table-totalprice styles" id="tprice">${roundoff}</td>
      </tr>`;
  }
  input1.value = "";
  input2.value = "";
  input3.value = "";
  input4.value = "";
  update_total_price(total_item_price);
  // myproductdata += product_containers;
});
// setting the function for the arrows in the snacks section
const upButton = document.getElementById("up");
const downButton = document.getElementById("down");
const snackList = document.getElementById("snack-list");

upButton.addEventListener("click", function () {
  snackList.scrollTop -= 70; // scrolls up by 70 pixels
});

downButton.addEventListener("click", function () {
  snackList.scrollTop += 70; // scrolls down by 70 pixels
});
// setting the function for the update_total_price
function update_total_price() {
  total_price = 0;

  for (var key in product_containers) {
    total_price +=
      product_containers[key].quantity * product_containers[key].unit_price;
  }
  console.log(total_price);
  document.getElementById(
    "price"
  ).innerHTML = `Total Price: $${total_price.toFixed(2)}`;
}
// setting the function for the new bill button
let new_bill = document.querySelector(".box-1");
var content = document.querySelector("#content table");
let price = document.querySelector("#price");

new_bill.addEventListener("click", () => {
  content.textContent = "";
  let tprice = document.querySelector(".tenderpricebutton");

  console.log(tprice);
  for (var key in product_containers) {
    product_containers[key].quantity = 0;
  }
  console.log(product_containers);
  update_total_price();
  document.querySelector("#content table").removeAttribute("style");
  document
    .querySelector("#content #billing")
    .setAttribute("style", "display:none");
  document.querySelector("#values").removeAttribute("style", "display:none");
});

// setting the function for the print button
let print = document.querySelector(".box-10");
print.addEventListener("click", () => {
  var content = document.querySelector("#content");
  var table = content.querySelector("table");
  var billing = content.querySelector("#billing");
  // function before print function
  window.addEventListener("beforeprint", beforeprint());
  function beforeprint() {
    // alert("before print");
    document.querySelector(".printhidden").style.display = "none";
    document.querySelector("#snacks").style.display = "none";
    document.querySelector("#images").style.display = "none";
    document.querySelector("#display").style.display = "none";
    document.querySelector("#calculation").style.display = "none";
    document.querySelector("#options").style.display = "none";
    document.querySelector("#values").removeAttribute("style");
    document.querySelector("#content table").removeAttribute("style");
  }
  // print the current window
  window.print();
  // function after print function
  window.addEventListener("afterprint", afterprint());
  function afterprint() {
    document.querySelector(".printhidden").style.display = "";
    document.querySelector("#snacks").style.display = "";
    document.querySelector("#images").style.display = "";
    document.querySelector("#display").style.display = "";
    document.querySelector("#calculation").style.display = "";
    document.querySelector("#options").style.display = "";
    document.querySelector("#values").setAttribute("style", "display:none");
    document
      .querySelector("#content table")
      .setAttribute("style", "display:none");
    // alert("after print");
  }
  // // var values = content.querySelector("#values");
  // // values.removeAttribute("style");
  // table.removeAttribute("style");
  // // var contentToPrint = values.innerHTML + table.innerHTML + billing.innerHTML;
  // // console.log(contentToPrint);
  // // var printWindow = window.open("", "", "height=500,width=1000");
  // // printWindow.document.write(contentToPrint);
  // // printWindow.document.close();

  // window.onbeforeprint = function () {
  //   // printWindow.focus();
  //   alert("hello world!");
  // };

  // window.onafterprint = function () {
  //   // printWindow.close();
  //   alert("after print!");
  // };
});
// setting the function for the cancel item
let cancel_item = document.querySelector(".box-6");
let content_table = document.querySelector("#content table");
cancel_item.addEventListener("click", () => {
  console.log(product_containers);
  let lastKey =
    Object.keys(product_containers)[Object.keys(product_containers).length - 1];
  console.log(`Last key before deletion: ${lastKey}`);
  delete product_containers[lastKey];
  console.log(product_containers);
  update_total_price();
  let lastrow = content_table.rows[content_table.rows.length - 1];
  content_table.deleteRow(lastrow.rowIndex);
});
// setting the function for the input tender values
let two = document.querySelector(".box-2");
let ten = document.querySelector(".box-3");
let five = document.querySelector(".box-12");
let fifty = document.querySelector(".box-13");
let bill_values = [two, ten, five, fifty];
totaltenderamount = 0;
change = 0;
bill_values.forEach((p) => {
  // totaltenderamount = 0;
  // change = 0;
  p.addEventListener("click", () => {
    var tender = p.getAttribute("data-price");
    var tenderamount = parseFloat(tender);
    totaltenderamount += tenderamount;
    console.log(totaltenderamount);
    var tenderpricebutton = document.querySelector(".tenderpricebutton");
    tenderpricebutton.innerText = `$${totaltenderamount.toFixed(2)}`;
    // change
    var changeprice = document.querySelector(".changeprice");
    var payablemoney = parseFloat(
      document.querySelector(".payableprice").innerHTML.slice(1)
    );
    console.log(payablemoney);
    if (totaltenderamount > 0) {
      change = totaltenderamount - payablemoney;
    }
    changeprice.innerHTML = `$${change.toFixed(2)}`;
    document.getElementById("price").innerHTML = `Change: $${change.toFixed(
      2
    )}`;
  });
});
// setting the function for the bill option
let bill = document.querySelector(".box-11");
bill.addEventListener("click", () => {
  document
    .querySelector("#content table")
    .setAttribute("style", "display:none");
  document.querySelector("#content #billing").removeAttribute("style");
  // display content none
  var content = document.querySelector("#content table");
  content.style.display = "none";
  // values set to none
  var value = document.querySelector("#values");
  value.style.display = "none";
  // getting the content of the billing using the billing varible
  var billing = document.querySelector("#billing");
  document.getElementById("price").innerHTML = `Change: $0.00`;
  console.log(total_price);
  // crating the values for t_price , GSTAmount,payable
  var t_price = Number(total_price);
  var GSTAmount = Number((total_price * 0.08).toFixed(2));
  var payable = t_price + GSTAmount;
  console.log(typeof payable);
  myproduct();
  // pushing the values to the billing page

  billing.innerHTML = `
  <div id="Bill_page_change">
 <div>
 <table id="Amount-table">
 <tr>
   <td class="left">Amount</td>
   <td id="right" class="light"id="amountprice">$${t_price.toFixed(2)}</td>
 </tr>
 <tr>
   <td class="left">GST Amount</td>
   <td id="right" class="light" id="gstprice">$${GSTAmount.toFixed(2)}</td>
 </tr>
</table>
 </div>

  <div>
  <table>
    <tr id="change_size">
      <td class="left" style="font-size:25px">Payable</td>
      <td id="right" class="light payableprice" id="payable_right"style="font-size:25px" id="payableprice">$${payable.toFixed(
        2
      )}</td>
    </tr>
  </table>
  </div>

<div>
  <table id="tender_table" >
    <tr class="change_value">
      <td class="left">Tender</td>
      <td id="right" class="light tenderpricebutton" id="tenderpricebutton" >$${totaltenderamount.toFixed(
        2
      )}</td>
    </tr>
    <tr class="change_value">
      <td class="left">Change</td>
      <td id="right" class="light changeprice" id="changeprice">$${change.toFixed(
        2
      )}</td>
    </tr>
  </table>
  </div>
</div>`;
  totaltenderamount = 0;
  var tenderpricebutton = document.querySelector(".tenderpricebutton");
  tenderpricebutton.innerText = `$${totaltenderamount.toFixed(2)}`;
  change = 0;
  document.querySelector(".changeprice").innerText = `$${change.toFixed(2)}`;
});
// setting the localstorage concept, while the bill button was clicked
function myproduct() {
  // console.log("hello");
  console.log(getting_value);
  console.log(product_containers);
  // let filteredItems = [];
  const keys = Object.keys(product_containers);
  console.log(keys);
  // creating the new array of objects
  let itemArray = [];
  const updateArray = (myproduct_item_name, myproduct_quantity) => {
    let item = { item_name: myproduct_item_name, quantity: myproduct_quantity };
    itemArray.push(item);
  };
  for (let i = 0; i < keys.length; i++) {
    let myproductItemNameEl = document.getElementsByClassName(
      "myproduct_item_name"
    )[i];
    let myproductQuantityEl =
      document.getElementsByClassName("myproduct_quantity")[i];
    if (myproductItemNameEl && myproductQuantityEl) {
      let myproduct_item_name = myproductItemNameEl.innerText;
      let myproduct_quantity = myproductQuantityEl.innerText;
      updateArray(myproduct_item_name, myproduct_quantity);
    }
  }

  console.log(itemArray);
  // filtering and append the data
  const processedItemNames = [];
  const filteredItemes = getting_value.filter((item) => {
    if (!processedItemNames.includes(item.item_name)) {
      for (let i = 0; i < itemArray.length; i++) {
        if (itemArray[i].item_name === item.item_name) {
          // setting the values in the localstorage
          item.purchased += Number(itemArray[i].quantity);
          item.sold += Number(itemArray[i].quantity);
          item.stock = item.stock - itemArray[i].quantity;
          processedItemNames.push(item.item_name);
          return true;
        }
      }
    }
    return false;
  });
  // assigning the data in the getting_value container
  for (let i = 0; i < itemArray.length; i++) {
    let item1 = itemArray[i];
    console.log(temp_local);
    for (let j = 0; j < getting_value.length; j++) {
      let item2 = getting_value[j];
      if (item1.item_name === item2.item_name) {
        // console.log(item1.sold_name);
        item2.purchased = Number(item1.quantity);
        // item2.purchased += item1.sold;
        break;
      }
    }
  }
  console.log(getting_value);
  console.log(filteredItemes);
  localStorage.setItem("product", JSON.stringify(getting_value));
  localStorage.setItem("filteredItems", JSON.stringify(filteredItemes));
  localStorage.setItem("myproduct", JSON.stringify(itemArray));
}
// setting the function for the delete all transactions
function deleteAllTransactions() {
  localStorage.clear();
  location.reload();
}
