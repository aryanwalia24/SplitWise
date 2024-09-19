# **💸 SplitWise - Expense Tracker**

## **📋 Project Overview**

This project is an implementation of a **Split-Wise**-like expense management application developed using **HTML**, **CSS**, and **JavaScript**. The primary goal of this project is to allow users to manage and split expenses among a group of people, with functionalities for adding groups, managing members within those groups, adding expenses, and viewing expense summaries through graphs.

### **✨ Key Features:**

- **👥 Group Management**: Create and manage multiple groups.
- **👤 Member Management**: Add, edit, or remove members within each group.
- **💰 Expense Tracking**: Track expenses and automatically split them among group members.
- **📊 Graphical Summary**: Visualize expense distribution within each group.
- **📱 Responsive Design**: Fully responsive across laptops, tablets, and mobile devices.
- **💾 Local Storage**: Persist data using the browser's local storage.

## **💡 Project Idea**

The idea for this project originated from the need to manage shared expenses among groups, such as friends on a trip or roommates. The goal was to create a user-friendly platform where users could easily add expenses and have them automatically split among group members. The addition of graphical summaries and transaction histories makes it easier for users to track and manage their expenses over time.

## **📂 Project Structure**

```
SplitWise/
├── assets/
│ ├── css/
│ │ └── style.css # Main stylesheet
│ │ └── graph.css # page2 stylesheet
│ └── images/ # Images/icons used in the project
│ ├── js/
│ │ └── expense.js # expense page
│ │ └── script.js # Main JavaScript file
├── index.html # Homepage with groups and members management
├── expense.html # Page for viewing group expense graph and transaction history
├── .gitignore # Git ignore file
└── README.md # Project documentation
```

## **🔧 Page 1: Group & Member Management**

### **🔍 Layout Overview:**

- **🏷️ Header**: Displays the name of the app and navigation options.
- **📦 Group Section**: Displays all groups as cards in a grid layout.
  - **🗂️ Group Card**: Each card contains the group name, member list, and buttons for adding expenses or members.
  - **👥 Member List**: Expandable section under each group card to display all group members. Each member has options to add/edit expenses and edit their name.
  - **➕ Add Group Button**: Located at the bottom, it allows adding new groups.

### **🎯 Interactivity:**

- **👁️‍🗨️ Hover Options**: Hovering over a group reveals a button to view the group's expense graph and transaction history.
- **➕ Add Member**: Option to add new members within a group.
- **🛠️ CRUD Operations**: Edit or delete members and groups dynamically.

## **📈 Page 2: Graph & Transaction History**

### **🔍 Layout Overview:**

- **📊 Graph Section**: Displays an interactive graph showing the expense distribution among members of the selected group.
- **📜 Transaction History Button**: Allows viewing detailed transaction history for the selected group.
- **🔄 Toggle Display**: Only one group's data is displayed at a time. Clicking on a different group will refresh the content.

## **📱 Responsive Design**

- **💻 Laptop**: Full grid layout for group cards, with expanded views for members and hover effects.
- **📱 Tablet**: Compact grid layout, collapsible group cards, touch-friendly buttons.
- **📱 Mobile**: Single column layout, easy-to-click buttons, collapsible sections for group members.

## **💾 Data Persistence**

The application uses **local storage** to persist group and expense data across sessions. When a user revisits the application, their data is retained without needing a backend server.

### **🗄️ Web Storage Implementation:**

- **💾 Local Storage**: Used to store group, member, and expense data. Data is retrieved and updated dynamically via JavaScript.

## **🚀 Getting Started**

### **🛠️ Running the Project:**

1. Clone the repository: `git clone https://github.com/aryanwalia24/SplitWise.git`
2. Navigate to the project folder: `cd SplitWise`
3. Open `index.html` in your browser to start the application.

### **💡 Usage:**

- Add a group, then add members to the group.
- Add expenses under members, and view the summary in the graph section.
- Use the application on any device; its fully responsive.
