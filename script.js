const search = () => {
  const number = parseInt(document.getElementById("search").value);
  window.location.href = '/v4/single.html?id=' + number
}
