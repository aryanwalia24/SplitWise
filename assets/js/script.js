document.addEventListener("DOMContentLoaded", () => {
  const groupForm = document.getElementById("groupForm");
  const groupCardsContainer = document.getElementById("groupCardsContainer");

  let groups = [];
  groups.forEach(group => addGroupToDOM(group));
  
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
});
