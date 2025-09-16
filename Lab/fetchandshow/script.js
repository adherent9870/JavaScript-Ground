window.onload = () => {
  let data;
  let span = document.querySelector("#message");
  document.getElementById("btn").onclick = async function () {
    let response = await fetch("https://jsonplaceholder.typicode.com/users");
    data = await response.json();
    console.log(data);
    showTable(data);
  };
  let search = document.querySelector("#search");
  search.addEventListener("input", function () {
    let value = search.value.trim();
    searching(value);
  });
  document.querySelector("#clearData").onclick = function () {
    search.value = "";
    showTable(data);
  };
  let select = document.querySelector("#select-list");
  select.addEventListener("change", function () {
    let selectedValue = select.value;
    let sortedData;

    if (selectedValue == 1) {
      sortedData = data.sort((a, b) => a.name.localeCompare(b.name));
    } else if (selectedValue == 2) {
      sortedData = data.sort((a, b) => b.name.localeCompare(a.name));
    } else if (selectedValue == 0) {
      sortedData = data.sort((a, b) => a.id - b.id);
    }

    showTable(sortedData);
  });

  function showTable(data) {
    let table = `<table border="1" cellpadding="5" cellspacing="0">
    <tr>
      <th>ID</th>
      <th>Name</th>
      <th>Username</th>
      <th>Email</th>
      <th>City</th>
      <th>Phone</th>
      <th>Website</th>
      <th>Company Name</th>
    </tr>`;
    data.forEach((user) => {
      table += `<tr>
        <td>${user.id}</td>
        <td>${user.name}</td>
        <td>${user.username}</td>
        <td>${user.email}</td>
        <td>${user.address.city}</td>
        <td>${user.phone}</td>
        <td>${user.website}</td>
        <td>${user.company.name}</td>
      </tr>`;
    });
    table += `</table>`;
    document.getElementById("table-container").innerHTML = table;
  }

  function searching(value) {
    let result;
    if (value === "") {
      result = [...data];
    }
    result = data.filter(
      (item) =>
        item.name?.toLowerCase().startsWith(value.toLowerCase()) ||
        item.city?.toLowerCase().startsWith(value.toLowerCase())
    );
    console.log(result);
    showTable(result);
  }
};
