const tBody = document.getElementById('tBody');
const priceFilter = document.getElementById('priceFilter'); //priceFilter

let allData =[];

async function fetchCryptoData() {
  const res = await fetch(
    'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc'
  );
  const data = await res.json();
  allData = data;
  displayData(data);
}

function displayData(data){
    tBody.innerHTML ='';
    data.forEach(coin => {
    const lastUpdated = new Date(coin.last_updated).toLocaleString();

    const row = 
    `<tr>
        <td>${coin.name}</td>
        <td>${coin.symbol.toUpperCase()}</td>
        <td><img src="${coin.image}" alt="${coin.name}" width="32"/></td>
        <td>$${coin.current_price.toLocaleString()}</td>
        <td style="color: ${coin.price_change_percentage_24h >= 0 ? 'green' : 'red'};">
          ${coin.price_change_percentage_24h.toFixed(2)}%
        </td>
        <td>$${coin.market_cap.toLocaleString()}</td>
        <td>$${coin.total_volume.toLocaleString()}</td>
        <td>${lastUpdated}</td>
    </tr>`;
      
    tBody.innerHTML += row;
  });
}

//Filter Function

function filterByPrice() {
  const value = priceFilter.value;
  let filteredCoins = [];

  if (value === "all") {
    filteredCoins = allData;
  } else if (value === "below1") {
    filteredCoins = allData.filter(c => c.current_price < 1);
  } else if (value === "below5") {
    filteredCoins = allData.filter(c => c.current_price >= 1 && c.current_price < 10);
  } else if (value === "below10") {
    filteredCoins = allData.filter(c => c.current_price >= 10 && c.current_price < 100);
  }

  displayData(filteredCoins);
}
priceFilter.addEventListener("change", filterByPrice);

fetchCryptoData();
