let transactions = JSON.parse(localStorage.getItem("transactions")) || [];
updateUI();

function addTransaction() {
  const desc = document.getElementById("description").value.trim();
  const amount = parseFloat(document.getElementById("amount").value);
  const type = document.getElementById("type").value;

  if (!desc || isNaN(amount) || !type) {
    alert("Please fill all fields.");
    return;
  }

  const id = Date.now();
  transactions.push({ id, desc, amount, type });
  saveAndUpdate();
  clearInputs();
}

function deleteTransaction(id) {
  transactions = transactions.filter(t => t.id !== id);
  saveAndUpdate();
}

function resetTransactions() {
  clearInputs(); 
}

function saveAndUpdate() {
  localStorage.setItem("transactions", JSON.stringify(transactions));
  updateUI();
}

function updateUI() {
  const list = document.getElementById("transactionList");
  list.innerHTML = "";

  let income = 0, expense = 0;

  transactions.forEach(t => {
    const li = document.createElement("li");
    li.className = t.type;
    li.innerHTML = `
      ${t.desc}: $${t.amount.toFixed(2)}
      <button class="delete-btn" onclick="deleteTransaction(${t.id})">
        <i class="fas fa-trash"></i>
      </button>
    `;
    list.appendChild(li);

    if (t.type === "income") income += t.amount;
    else expense += t.amount;
  });

  document.getElementById("totalIncome").textContent = `$${income.toFixed(2)}`;
  document.getElementById("totalExpenses").textContent = `$${expense.toFixed(2)}`;
  document.getElementById("balance").textContent = `$${(income - expense).toFixed(2)}`;
}

function clearInputs() {
  document.getElementById("description").value = "";
  document.getElementById("amount").value = "";
  document.getElementById("type").value = "";
}
