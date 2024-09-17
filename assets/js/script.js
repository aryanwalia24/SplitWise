document.addEventListener("DOMContentLoaded", () => {
  const groupForm = document.getElementById("groupForm");
  const groupCardsContainer = document.getElementById("groupCardsContainer");

  // web-storage
  let groups = JSON.parse(localStorage.getItem("groups")) || [];
  groups.forEach(group => addGroupToDOM(group));

  // Adding new group
  groupForm.addEventListener("submit", function(e) {
    e.preventDefault();
    const groupName = document.getElementById("groupName").value.trim();
    if (!groupName) {
      alert("Please enter a group name");
      return;
    } else {
      const newGroup = {
        id: Date.now(),
        name: groupName,
        members: [],
        transactions: [],
        image: getRandomImage()
      };
      groups.push(newGroup);
      saveGroupsToLocalStorage();
      addGroupToDOM(newGroup);
      groupForm.reset();
    }
  });

  function getRandomImage() {
    const images = [
      "assets/images/1.jpg",
      "assets/images/2.jpg",
      "assets/images/3.jpg",
      "assets/images/4.jpg",
      "assets/images/5.jpg",
      "assets/images/6.jpg",
      "assets/images/7.jpg",
      "assets/images/8.jpg",
      "assets/images/9.jpg",
      "assets/images/10.jpg"
    ];
    const randomIndex = Math.floor(Math.random() * images.length);
    return images[randomIndex];
  }

  function addGroupToDOM(group) {
    const groupCard = document.createElement("div");
    groupCard.className = "group-card";
    groupCard.innerHTML = `
        <div class="group-header" style="background-image: url('${group.image}'); background-size: cover; background-position: center;">
            <h3>${group.name}</h3>
        </div>
        <ul class="member-list">
            ${group.members
              .map(
                (member, index) => `
                    <li>
                        <span class="member-name">${member.name}</span>
                        <span class="member-expense">Rs.${member.expense.toFixed(
                          2
                        )}</span>
                        <div class="member-buttons">
                            <button class="add-expense" data-member-index="${index}"><img src="assets/images/spending.png" alt="Add"></button>
                            <button class="edit-member" data-member-index="${index}"><img src="assets/images/edit.png" alt="Edit"></button>
                            <button class="delete-member" data-member-index="${index}"><img src="assets/images/delete.png" alt="Delete"></button>
                        </div>
                    </li>
                `
              )
              .join("")}
        </ul>
        <div class="card-footer">
            <button class="card-btn view-graph">View Graph</button>
            <div class="group-footer-buttons">
                <button class="edit-name"><img src="assets/images/edit.png" alt="Edit"></button>
                <button class="add-member"><img src="assets/images/add-user.png" alt="Add"></button>
                <button class="delete-group"><img src="assets/images/delete.png" alt="Delete"></button>
            </div>
        </div>
    `;
    groupCardsContainer.appendChild(groupCard);

    /*Group Card */
    // 1. Query Selectors
    const editNameBtn = groupCard.querySelector(".edit-name");
    const viewGraphBtn = groupCard.querySelector(".view-graph");
    const addMemberBtn = groupCard.querySelector(".add-member");
    const deleteGroupBtn = groupCard.querySelector(".delete-group");

    // 2. Event Listeners
    editNameBtn.addEventListener("click", () =>
      editGroupName(group, groupCard)
    );
    viewGraphBtn.addEventListener("click", () => viewGraph(group.id));
    addMemberBtn.addEventListener("click", () => addMember(group, groupCard));
    deleteGroupBtn.addEventListener("click", () =>
      deleteGroup(group.id, groupCard)
    );

    // 3. Event Listeners for Group Members
    groupCard.querySelectorAll(".add-expense").forEach(btn => {
      btn.addEventListener("click", function() {
        addExpense(group, this.getAttribute("data-member-index"), groupCard);
      });
    });

    groupCard.querySelectorAll(".edit-member").forEach(btn => {
      btn.addEventListener("click", function() {
        editMember(group, this.getAttribute("data-member-index"), groupCard);
      });
    });

    groupCard.querySelectorAll(".delete-member").forEach(btn => {
      btn.addEventListener("click", function() {
        deleteMember(group, this.getAttribute("data-member-index"), groupCard);
      });
    });
  }

  // Group Card Functions
  function editGroupName(group, groupCard) {
    const newName = prompt("Enter new group name:", group.name);
    if (newName) {
      group.name = newName;
      saveGroupsToLocalStorage();
      groupCard.querySelector("h3").textContent = newName;
    }
  }

  function viewGraph(groupId) {
    localStorage.setItem("selectedGroup", groupId);
    window.location.href = "expense.html";
  }

  function deleteGroup(groupId, groupCard) {
    if (confirm("Are you sure you want to delete this group?")) {
      groups = groups.filter(group => group.id !== groupId);
      saveGroupsToLocalStorage();
      groupCard.remove();
    }
  }

  /* Group Members Functions */
  function addMember(group, groupCard) {
    const memberName = prompt("Enter member name:");
    const memberExpense = parseFloat(prompt("Enter initial expense:", 0));

    if (memberName && !isNaN(memberExpense)) {
      const newMember = { name: memberName, expense: memberExpense };
      group.members.push(newMember);
      saveGroupsToLocalStorage();

      const memberList = groupCard.querySelector(".member-list");
      const listItem = document.createElement("li");
      listItem.innerHTML = `
                <span class="member-name">${memberName}</span>
                <span class="member-expense">Rs.${memberExpense.toFixed(
                  2
                )}</span>
                <div class="member-buttons">
                    <button class="add-expense" data-member-index="${group
                      .members.length -
                      1}"><img src="/assets/images/add-user.png" alt="Add"></button>
                    <button class="edit-member" data-member-index="${group
                      .members.length -
                      1}"><img src="/assets/images/edit.png" alt="Edit"></button>
                    <button class="delete-member" data-member-index="${group
                      .members.length -
                      1}"><img src="/assets/images/delete.png" alt="Delete"></button>
                </div>
            `;
      memberList.appendChild(listItem);

      groupCard.classList.add("expanded");

      listItem
        .querySelector(".add-expense")
        .addEventListener("click", function() {
          addExpense(group, this.getAttribute("data-member-index"), groupCard);
        });

      listItem
        .querySelector(".edit-member")
        .addEventListener("click", function() {
          editMember(group, this.getAttribute("data-member-index"), groupCard);
        });

      listItem
        .querySelector(".delete-member")
        .addEventListener("click", function() {
          deleteMember(
            group,
            this.getAttribute("data-member-index"),
            groupCard
          );
        });
    }
  }

  // Member Functions
  function editMember(group, memberIndex, groupCard) {
    const member = group.members[memberIndex];
    const newName = prompt("Enter new name:", member.name);
    const newExpense = parseFloat(prompt("Enter new expense:", member.expense));

    if (newName && !isNaN(newExpense)) {
      member.name = newName;
      member.expense = newExpense;
      saveGroupsToLocalStorage();
      const listItem = groupCard.querySelectorAll(".member-list li")[
        memberIndex
      ];
      listItem.querySelector(".member-name").textContent = newName;
      listItem.querySelector(
        ".member-expense"
      ).textContent = `Rs.${newExpense.toFixed(2)}`;
    }
  }

  function addExpense(group, memberIndex, groupCard) {
    const member = group.members[memberIndex];
    const expenseInput = prompt("Enter expense amount:", 0);
    const expenseAmount = parseFloat(expenseInput);
    const note = prompt("Add a note for this expense:");

    // Error handling: check if the input is a valid number
    if (
      expenseInput === "" ||
      isNaN(expenseInput) ||
      expenseInput.trim() === ""
    ) {
      alert("Please enter a valid numeric expense amount.");
      return;
    }

    const newTotal = member.expense + expenseAmount;
    if (newTotal < 0) {
      alert(
        "Expense cannot result in a negative total. Please enter a valid amount."
      );
      return;
    }

    member.expense = newTotal;

    const memberListItems = groupCard.querySelectorAll(".member-list li");
    const listItem = memberListItems[memberIndex];

    listItem.querySelector(
      ".member-expense"
    ).textContent = `Rs.${member.expense.toFixed(2)}`;

    const transaction = {
      memberName: member.name,
      amount: expenseAmount,
      note: note,
      time: new Date().toLocaleString()
    };
    group.transactions.push(transaction);

    const groupIndex = groups.findIndex(g => g.id === group.id);
    groups[groupIndex] = group;
    saveGroupsToLocalStorage();

    updateTransactionHistory(group);

    if (window.location.href.includes("expense.html")) {
      updateTransactionHistory(group);
    }
  }

  function updateTransactionHistory(group) {
    const transactionList = document.getElementById("transactionList");
    if (transactionList) {
      transactionList.innerHTML = group.transactions
        .map(
          transaction => `
            <li>
              <span>${transaction.time}</span>
              <span>${transaction.memberName}</span>
              <span>Rs.${transaction.amount.toFixed(2)}</span>
              <span>${transaction.note}</span>
            </li>
          `
        )
        .join("");
    }
  }

  function deleteMember(group, memberIndex, groupCard) {
    if (confirm("Are you sure you want to delete this member?")) {
      group.members.splice(memberIndex, 1);
      saveGroupsToLocalStorage();
      const memberList = groupCard.querySelector(".member-list");
      memberList.children[memberIndex].remove();
    }
  }

  // saving groups to local storage
  function saveGroupsToLocalStorage() {
    localStorage.setItem("groups", JSON.stringify(groups));
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const prevButton = document.querySelector(".carousel-button.prev");
  const nextButton = document.querySelector(".carousel-button.next");
  const carouselContainer = document.querySelector(".carousel-container");

  prevButton.addEventListener("click", () => {
    carouselContainer.scrollBy({
      left: -carouselContainer.clientWidth,
      behavior: "smooth"
    });
  });

  nextButton.addEventListener("click", () => {
    carouselContainer.scrollBy({
      left: carouselContainer.clientWidth,
      behavior: "smooth"
    });
  });
});

// Reload page2 on visit
window.addEventListener("pageshow", event => {
  if (event.persisted) {
    window.location.reload();
  }
});
