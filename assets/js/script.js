document.addEventListener("DOMContentLoaded", () => {
  const groupForm = document.getElementById("groupForm");
  const groupCardsContainer = document.getElementById("groupCardsContainer");

  let groups = JSON.parse(localStorage.getItem("groups")) || [];
  groups.forEach(group => addGroupToDOM(group));

  groupForm.addEventListener("submit", function(e) {
    e.preventDefault();
    const groupName = document.getElementById("groupName").value.trim();

    if (!groupName) {
      alert("Please enter a group name");
      return;
    } else {
      const newGroup = {
        name: groupName,
        members: []
      };
      groups.push(newGroup);
      saveGroupsToLocalStorage();
      addGroupToDOM(newGroup);
      groupForm.reset();
    }
  });

  function addGroupToDOM(group) {
    const groupCard = document.createElement("div");
    groupCard.className = "group-card";
    groupCard.innerHTML = `
        <div class="group-header">
            <h3>${group.name}</h3>
            <div class="group-header-buttons">
                <button class="edit-name">✏️</button>
                <button class="view-graph">📊</button>
                <button class="add-member">➕</button>
                <button class="delete-group">🗑️</button>
            </div>
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
                            <button class="add-expense" data-member-index="${index}">➕</button>
                            <button class="edit-member" data-member-index="${index}">✏️</button>
                            <button class="delete-member" data-member-index="${index}">❌</button>
                        </div>
                    </li>
                `
              )
              .join("")}
        </ul>
    `;
    groupCardsContainer.appendChild(groupCard);
  }

  /*Group Card */
  // 1. Query Selectors
  const editNameBtn = groupCard.querySelector(".edit-name");
  const viewGraphBtn = groupCard.querySelector(".view-graph");
  const addMemberBtn = groupCard.querySelector(".add-member");
  const deleteGroupBtn = groupCard.querySelector(".delete-group");

  // 2. Event Listeners
  editNameBtn.addEventListener("click", () => editGroupName(group, groupCard));
  viewGraphBtn.addEventListener("click", () => viewGraph(group.id));
  addMemberBtn.addEventListener("click", () => addMember(group, groupCard));
  deleteGroupBtn.addEventListener("click", () =>
    deleteGroup(group.id, groupCard)
  );

  // 3. Functions
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
    window.location.href = "graph.html";
  }

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
                      .members.length - 1}">➕</button>
                    <button class="edit-member" data-member-index="${group
                      .members.length - 1}">✏️</button>
                    <button class="delete-member" data-member-index="${group
                      .members.length - 1}">❌</button>
                </div>
            `;
      memberList.appendChild(listItem);
      groupCard.classList.add("expanded");
    }
  }

  function deleteGroup(groupId, groupCard) {
    if (confirm("Are you sure you want to delete this group?")) {
      groups = groups.filter(group => group.id !== groupId);
      saveGroupsToLocalStorage();
      groupCard.remove();
    }
  }

  /* Group Members */
  // added later

  function saveGroupsToLocalStorage() {
    localStorage.setItem("groups", JSON.stringify(groups));
  }
});
