document.addEventListener("DOMContentLoaded", () => {
  const expenseGraph = document.getElementById("expenseGraph").getContext("2d");
  const transactionList = document.getElementById("transactionList");
  const reverseOrderBtn = document.getElementById("reverseOrder");

  // Getting selected group from local storage
  const selectedGroupId = localStorage.getItem("selectedGroup");
  const groups = JSON.parse(localStorage.getItem("groups")) || [];
  const group = groups.find(g => g.id == selectedGroupId);

  if (group) {
    renderGraph(group);
    renderTransactionHistory(group, true);
    reverseOrderBtn.textContent = "Latest ⬆️";
  } else {
    alert("No group data found!");

    // Redirect to home page
    window.location.href = "index.html";
  }

  //  Reverse order of transaction history
  let isLatestFirst = true;

  reverseOrderBtn.addEventListener("click", () => {
    isLatestFirst = !isLatestFirst;
    reverseOrderBtn.textContent = isLatestFirst ? "Latest ⬆️" : "Oldest ⬆️";
    renderTransactionHistory(group, isLatestFirst);
  });

  // update Chart
  function renderGraph(group) {
    const labels = group.members.map(member => member.name);
    const data = group.members.map(member => member.expense);

    // Chart from chart.js
    new Chart(expenseGraph, {
      type: "pie",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Expenses",
            data: data,
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)"
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)"
            ],
            borderWidth: 1
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: "top"
          },
          title: {
            display: true,
            text: "Expense Distribution"
          }
        }
      }
    });
  }
  function renderTransactionHistory(group, latestFirst) {
    const sortedTransactions = group.transactions.sort(
      (a, b) =>
        latestFirst
          ? new Date(b.time) - new Date(a.time)
          : new Date(a.time) - new Date(b.time)
    );

    const transactions = sortedTransactions
      .map(
        transaction => `
              <li>
                <p>${transaction.note}</p>
                <span class="amount ${transaction.amount > 0
                  ? "positive"
                  : "negative"}">
                  ${transaction.amount > 0
                    ? "+"
                    : ""}Rs.${transaction.amount.toFixed(2)}
                </span>
                <span>${transaction.memberName}</span>
                <span>${transaction.time}</span>
              </li>`
      )
      .join("");

    transactionList.innerHTML = transactions;
  }
});
