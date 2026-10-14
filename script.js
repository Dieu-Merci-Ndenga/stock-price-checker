const resultArea = document.getElementById('jsonResult');
const resultStatus = document.getElementById('result-status');

const showResults = (stockData) => {
  const stocks = Array.isArray(stockData) ? stockData : [stockData];

  resultArea.innerHTML = stocks.map((stock) => `
    <article class="result-card">
      <p class="result-symbol">${stock.stock}</p>
      <p class="result-price">$${Number(stock.price).toFixed(2)}</p>
      <div class="result-meta">
        <span>${'rel_likes' in stock ? 'Relative likes' : 'Total likes'}</span>
        <strong>${'rel_likes' in stock ? stock.rel_likes : stock.likes}</strong>
      </div>
    </article>
  `).join('');
};

const showError = () => {
  resultArea.innerHTML = '<div class="error-state">We could not find that symbol. Check the ticker and try again.</div>';
  resultStatus.textContent = 'Lookup unavailable';
};

const lookup = (form, symbols) => {
  const params = new URLSearchParams();
  symbols.forEach((symbol) => params.append('stock', symbol.value.trim().toUpperCase()));
  params.set('like', form.elements.like.checked);
  const button = form.querySelector('button');

  button.disabled = true;
  resultStatus.textContent = 'Checking the market...';
  fetch(`/api/stock-prices?${params}`)
    .then((response) => {
      if (!response.ok) throw new Error('Request failed');
      return response.json();
    })
    .then((data) => {
      if (!data.stockData) throw new Error('No stock data');
      showResults(data.stockData);
      resultStatus.textContent = 'Updated just now';
    })
    .catch(showError)
    .finally(() => { button.disabled = false; });
};

document.getElementById('testForm2').addEventListener('submit', (event) => {
  event.preventDefault();
  lookup(event.currentTarget, [event.currentTarget.elements.stock]);
});

document.getElementById('testForm').addEventListener('submit', (event) => {
  event.preventDefault();
  lookup(event.currentTarget, event.currentTarget.querySelectorAll('input[name="stock"]'));
});
