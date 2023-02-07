$(document).ready(function () {
  var table = $("#table").DataTable({
    searching: false,
    lengthChange: false,
  });
});

// setting the function  for the custom value  , for enabling the date , from and to
document
  .getElementById("time_of_select")
  .addEventListener("change", function () {
    let selectValue = this.value;
    console.log(selectValue);
    let fromInput = document.querySelector("#from");
    let toInput = document.querySelector("#to");
    if (selectValue === "Custom") {
      fromInput.removeAttribute("disabled");
      toInput.removeAttribute("disabled");
    } else {
      fromInput.setAttribute("disabled", "true");
      toInput.setAttribute("disabled", "true");
    }
  });

// setting the function for the retrive the data from the localstorage and show it on the screen
var storeddata = JSON.parse(localStorage.getItem("product"));
var table_data = document.querySelector("#table tbody");
console.log(storeddata.length);
let template = "";
for (let i = 0; i < storeddata.length; i++) {
  let temp = storeddata[i];
  template += `
  <tr>
  <td id="table_sno">${i + 1}</td>
  <td id="table_item_name">${temp.item_name}</td>
  <td id="table_price">${temp.price}</td>
  <td id="table_purchased">${temp.purchased}</td>
  <td id="table_sold">${temp.sold}</td>
  <td id="table_instock">${temp.stock}</td>
  <td id="table_type">${temp.type}</td>
  <td id="table_availability">${temp.availability}</td>
  <td id="table_action">
  <img src="./images/delete.png" alt=""class="delete_button"srcset="" style="padding-left:30px; cursor:pointer">
  <img src="./images/edit.png" alt="" class="edit_button" srcset=""style="padding-left:20px;cursor:pointer">
  <img src="./images/file_review.png"data-bs-toggle="modal" id="review_button" class="review_button"  data-bs-target="#viewbutton" alt="" width="45px" style="padding-left:20px;cursor:pointer"></td>
  </tr>`;
}
table_data.innerHTML += template;
// setting the function for the delete , edit and review button
table_body = document.querySelector("#table tbody");
table_body.addEventListener("click", function (event) {
  if (event.target.classList.contains("delete_button")) {
    console.log("delete cicked");
    const row = event.target.closest("tr");

    // Get the item name from the tr element
    const itemName = row.querySelector("#table_item_name").textContent;

    // Remove the row from the table
    row.remove();

    // Remove the corresponding data from local storage
    const products = JSON.parse(localStorage.getItem("product"));
    const updatedProducts = products.filter(
      (product) => product.item_name !== itemName
    );
    localStorage.setItem("product", JSON.stringify(updatedProducts));
    var num_product = JSON.parse(localStorage.getItem("product"));
    for (let i = 0; i < num_product.length; i++) {
      num_product[i].item_no = i + 1;
    }
    localStorage.setItem("product", JSON.stringify(num_product));
    let table = document.getElementById("table");
    let tbody = table.getElementsByTagName("tbody")[0];
    tbody.innerHTML = "";
    // resetting the value
    var resetdate = JSON.parse(localStorage.getItem("product"));
    let template = "";
    for (let i = 0; i < resetdate.length; i++) {
      let temp = resetdate[i];
      template += `
          <tr>
          <td id="table_sno">${i + 1}</td>
          <td id="table_item_name">${temp.item_name}</td>
          <td id="table_price">${temp.price}</td>
          <td id="table_purchased">${temp.purchased}</td>
          <td id="table_sold">${temp.sold}</td>
          <td id="table_instock">${temp.stock}</td>
          <td id="table_type">${temp.type}</td>
          <td id="table_availability">${temp.availability}</td>
          <td id="table_action">
          <img src="./images/delete.png" alt="" class="delete_button"srcset="" style="padding-left:30px; cursor:pointer">
          <a href="edit_button.html"> <img src="./images/edit.png" class="edit_button" alt="" srcset="" style="padding-left:20px;cursor:pointer"></a>
          <img src="./images/file_review.png" data-bs-toggle="modal" id="review_button"  class="review_button" data-bs-target="#viewbutton" alt="" width="45px" style="padding-left:20px;cursor:pointer"></td>
          </tr>`;
    }
    table_data.innerHTML += template;
  } else if (event.target.classList.contains("edit_button")) {
    console.log("edit clicked");
    const tbody = document.querySelector("#table tbody");
    // getting the respective table_sno from the table
    const tr = event.target.parentNode.parentNode;
    const tar = tr.querySelector("#table_sno").innerHTML;
    const target = Number(tar);
    window.location.href = `edit_button.html?sno=${target}`;
  } else if (event.target.classList.contains("review_button")) {
    console.log("review clicked");
    console.log("hello kk");
    const targ = event.target.parentNode.parentNode;
    console.log(targ);
    document.querySelector("#s_no").value =
      targ.querySelector("#table_sno").innerText;
    document.querySelector("#item_name_kk").value =
      targ.querySelector("#table_item_name").innerText;
    document.querySelector("#input_price").value =
      targ.querySelector("#table_price").innerText;
    document.querySelector("#input_purchased_kk").value =
      targ.querySelector("#table_purchased").innerText;
    document.querySelector("#input_sold_kk").value =
      targ.querySelector("#table_sold").innerText;
    document.querySelector("#input_instock").value =
      targ.querySelector("#table_instock").innerText;
    // type drop down
    const table_value_type = document.querySelector("#table_type").innerText;
    const value_type = document.querySelector("#input_type");
    value_type.innerHTML = "";
    var options = "";
    options += `<option value="${table_value_type}">${table_value_type}</option>`;
    value_type.innerHTML += options;
    // availability drop down
    const availability = document.querySelector(
      "#table_availability"
    ).innerText;
    console.log(availability);
    const value_availability = document.querySelector("#input_availability");
    value_availability.innerHTML = "";
    var options = "";
    options += `<option value="${availability}}">${availability}</option>`;
    value_availability.innerHTML += options;
  }
});
// setting the function for the filter options

const timeOfSelect = document.getElementById("time_of_select");
timeOfSelect.addEventListener("change", function () {
  // filter data and filter results
  let filtereddata = [];
  if (timeOfSelect.value === "Today") {
    console.log("hello");
    let date = new Date();
    let dateString =
      date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear();
    let localStorageArray = JSON.parse(localStorage.getItem("product"));
    filtereddata = localStorageArray.filter(
      (item) => item.created_date === dateString
    );
    console.log(dateString);
    console.log(filtereddata);
    table_body.innerHTML = "";
    filtereddata.forEach((item) => {
      let tr = document.createElement("tr");

      let td1 = document.createElement("td");
      td1.innerHTML = item.item_no;
      td1.setAttribute("id", "table_sno");
      td1.setAttribute("class", "sorting_1");
      tr.appendChild(td1);

      let td2 = document.createElement("td");
      td2.innerHTML = item.item_name;
      td2.setAttribute("id", "table_item_name");
      tr.appendChild(td2);

      let td3 = document.createElement("td");
      td3.innerHTML = item.price;
      td3.setAttribute("id", "table_price");
      tr.appendChild(td3);

      let td4 = document.createElement("td");
      td4.innerHTML = item.purchased;
      td4.setAttribute("id", "table_purchased");
      tr.appendChild(td4);

      let td5 = document.createElement("td");
      td5.innerHTML = item.sold;
      td5.setAttribute("id", "table_sold");
      tr.appendChild(td5);

      let td6 = document.createElement("td");
      td6.innerHTML = item.stock;
      td6.setAttribute("id", "table_instock");
      tr.appendChild(td6);

      let td7 = document.createElement("td");
      td7.innerHTML = item.type;
      td7.setAttribute("id", "table_type");
      tr.appendChild(td7);

      let td8 = document.createElement("td");
      td8.innerHTML = item.availability;
      td8.setAttribute("id", "table_availability");
      tr.appendChild(td8);

      let td9 = document.createElement("td");
      td9.setAttribute("id", "table_action");
      td9.innerHTML = `
      <img src="./images/delete.png" alt=""class="delete_button"srcset="" style="padding-left:30px; cursor:pointer">
      <img src="./images/edit.png" alt="" class="edit_button"srcset=""style="padding-left:20px;cursor:pointer">
      <img src="./images/file_review.png"data-bs-toggle="modal"id="review_button" class="review_button" data-bs-target="#viewbutton" alt="" width="45px" style="padding-left:20px;cursor:pointer">`;
      tr.appendChild(td9);

      table_body.appendChild(tr);
    });
  } else if (this.value === "Yesterday") {
    console.log("Yesterday is selected");
    let date = new Date();
    date.setDate(date.getDate() - 1);
    let yesterday =
      date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear();
    console.log(yesterday);
    let localStorageArray = JSON.parse(localStorage.getItem("product"));
    filtereddata = localStorageArray.filter(
      (item) => item.created_date === yesterday
    );
    console.log(filtereddata);
    table_body.innerHTML = "";
    filtereddata.forEach((item) => {
      let tr = document.createElement("tr");

      let td1 = document.createElement("td");
      td1.innerHTML = item.item_no;
      td1.setAttribute("id", "table_sno");
      td1.setAttribute("class", "sorting_1");
      tr.appendChild(td1);

      let td2 = document.createElement("td");
      td2.innerHTML = item.item_name;
      td2.setAttribute("id", "table_item_name");
      tr.appendChild(td2);

      let td3 = document.createElement("td");
      td3.innerHTML = item.price;
      td3.setAttribute("id", "table_price");
      tr.appendChild(td3);

      let td4 = document.createElement("td");
      td4.innerHTML = item.purchased;
      td4.setAttribute("id", "table_purchased");
      tr.appendChild(td4);

      let td5 = document.createElement("td");
      td5.innerHTML = item.sold;
      td5.setAttribute("id", "table_sold");
      tr.appendChild(td5);

      let td6 = document.createElement("td");
      td6.innerHTML = item.stock;
      td6.setAttribute("id", "table_instock");
      tr.appendChild(td6);

      let td7 = document.createElement("td");
      td7.innerHTML = item.type;
      td7.setAttribute("id", "table_type");
      tr.appendChild(td7);

      let td8 = document.createElement("td");
      td8.innerHTML = item.availability;
      td8.setAttribute("id", "table_availability");
      tr.appendChild(td8);

      let td9 = document.createElement("td");
      td9.setAttribute("id", "table_action");
      td9.innerHTML = `
      <img src="./images/delete.png" alt=""class="delete_button"srcset="" style="padding-left:30px; cursor:pointer">
      <img src="./images/edit.png" alt="" class="edit_button"srcset=""style="padding-left:20px;cursor:pointer">
      <img src="./images/file_review.png"data-bs-toggle="modal"id="review_button" class="review_button" data-bs-target="#viewbutton" alt="" width="45px" style="padding-left:20px;cursor:pointer">`;
      tr.appendChild(td9);

      table_body.appendChild(tr);
    });
  } else if (this.value === "This Week") {
    let date = new Date();
    let thisWeekStart = new Date(
      date.setDate(date.getDate() - date.getDay() + 1)
    );
    let thisWeekEnd = new Date(
      date.setDate(date.getDate() - date.getDay() + 7)
    );

    let thisWeek = [];

    for (let i = thisWeekStart; i <= thisWeekEnd; i.setDate(i.getDate() + 1)) {
      thisWeek.push(
        i.getDate() + "-" + (i.getMonth() + 1) + "-" + i.getFullYear()
      );
    }
    console.log(thisWeek);

    let localStorageArray = JSON.parse(localStorage.getItem("product"));
    let filtereddata = localStorageArray.filter((item) => {
      return thisWeek.includes(item.created_date);
    });
    console.log(filtereddata);
    table_body.innerHTML = "";
    filtereddata.forEach((item) => {
      let tr = document.createElement("tr");

      let td1 = document.createElement("td");
      td1.innerHTML = item.item_no;
      td1.setAttribute("id", "table_sno");
      td1.setAttribute("class", "sorting_1");
      tr.appendChild(td1);

      let td2 = document.createElement("td");
      td2.innerHTML = item.item_name;
      td2.setAttribute("id", "table_item_name");
      tr.appendChild(td2);

      let td3 = document.createElement("td");
      td3.innerHTML = item.price;
      td3.setAttribute("id", "table_price");
      tr.appendChild(td3);

      let td4 = document.createElement("td");
      td4.innerHTML = item.purchased;
      td4.setAttribute("id", "table_purchased");
      tr.appendChild(td4);

      let td5 = document.createElement("td");
      td5.innerHTML = item.sold;
      td5.setAttribute("id", "table_sold");
      tr.appendChild(td5);

      let td6 = document.createElement("td");
      td6.innerHTML = item.stock;
      td6.setAttribute("id", "table_instock");
      tr.appendChild(td6);

      let td7 = document.createElement("td");
      td7.innerHTML = item.type;
      td7.setAttribute("id", "table_type");
      tr.appendChild(td7);

      let td8 = document.createElement("td");
      td8.innerHTML = item.availability;
      td8.setAttribute("id", "table_availability");
      tr.appendChild(td8);

      let td9 = document.createElement("td");
      td9.setAttribute("id", "table_action");
      td9.innerHTML = `
      <img src="./images/delete.png" alt=""class="delete_button"srcset="" style="padding-left:30px; cursor:pointer">
      <img src="./images/edit.png" alt="" class="edit_button"srcset=""style="padding-left:20px;cursor:pointer">
      <img src="./images/file_review.png"data-bs-toggle="modal"id="review_button" class="review_button" data-bs-target="#viewbutton" alt="" width="45px" style="padding-left:20px;cursor:pointer">`;
      tr.appendChild(td9);

      table_body.appendChild(tr);
    });
  } else if (this.value === "Last Week") {
    console.log("Last Week is selected");

    let lastweekdate = new Date();
    let lastWeekStart = new Date(
      lastweekdate.setDate(lastweekdate.getDate() - lastweekdate.getDay() - 6)
    );

    let lastdate = new Date();
    let lastWeekEnd = new Date(
      lastdate.setDate(lastdate.getDate() - lastdate.getDay())
    );

    let lastWeek = [];
    let start =
      lastWeekStart.getDate() +
      "-" +
      (lastWeekStart.getMonth() + 1) +
      "-" +
      lastWeekStart.getFullYear();
    let end =
      lastWeekEnd.getDate() +
      "-" +
      (lastWeekEnd.getMonth() + 1) +
      "-" +
      lastWeekEnd.getFullYear();

    for (let i = lastWeekStart; i <= lastWeekEnd; i.setDate(i.getDate() + 1)) {
      lastWeek.push(
        i.getDate() + "-" + (i.getMonth() + 1) + "-" + i.getFullYear()
      );
    }
    let localStorageArray = JSON.parse(localStorage.getItem("product"));
    let filtereddata = localStorageArray.filter((item) => {
      return lastWeek.includes(item.created_date);
    });
    console.log(filtereddata);
    console.log(lastWeek);
    table_body.innerHTML = "";
    filtereddata.forEach((item) => {
      let tr = document.createElement("tr");

      let td1 = document.createElement("td");
      td1.innerHTML = item.item_no;
      td1.setAttribute("id", "table_sno");
      td1.setAttribute("class", "sorting_1");
      tr.appendChild(td1);

      let td2 = document.createElement("td");
      td2.innerHTML = item.item_name;
      td2.setAttribute("id", "table_item_name");
      tr.appendChild(td2);

      let td3 = document.createElement("td");
      td3.innerHTML = item.price;
      td3.setAttribute("id", "table_price");
      tr.appendChild(td3);

      let td4 = document.createElement("td");
      td4.innerHTML = item.purchased;
      td4.setAttribute("id", "table_purchased");
      tr.appendChild(td4);

      let td5 = document.createElement("td");
      td5.innerHTML = item.sold;
      td5.setAttribute("id", "table_sold");
      tr.appendChild(td5);

      let td6 = document.createElement("td");
      td6.innerHTML = item.stock;
      td6.setAttribute("id", "table_instock");
      tr.appendChild(td6);

      let td7 = document.createElement("td");
      td7.innerHTML = item.type;
      td7.setAttribute("id", "table_type");
      tr.appendChild(td7);

      let td8 = document.createElement("td");
      td8.innerHTML = item.availability;
      td8.setAttribute("id", "table_availability");
      tr.appendChild(td8);

      let td9 = document.createElement("td");
      td9.setAttribute("id", "table_action");
      td9.innerHTML = `
      <img src="./images/delete.png" alt=""class="delete_button"srcset="" style="padding-left:30px; cursor:pointer">
      <img src="./images/edit.png" alt="" class="edit_button"srcset=""style="padding-left:20px;cursor:pointer">
      <img src="./images/file_review.png"data-bs-toggle="modal"id="review_button" class="review_button" data-bs-target="#viewbutton" alt="" width="45px" style="padding-left:20px;cursor:pointer">`;
      tr.appendChild(td9);

      table_body.appendChild(tr);
    });
  } else if (this.value === "This Month") {
    console.log("This Month is selected");
  } else if (this.value === "Last Month") {
    console.log("Last Month is selected");
  } else if (this.value === "Custom") {
    console.log("Custom is selected");
  }
});
// });
