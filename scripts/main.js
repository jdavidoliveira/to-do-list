const main_input = document.querySelector("#main_input");
const to_do_list = document.querySelector(".to-do-list");
const item_list = document.querySelectorAll(".list_item");

document.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        insertItem();
    }
});

item_list.forEach((item) => {
    item.addEventListener("mouseenter", () => {
        generateListButtons(item);
    });
    item.addEventListener("mouseleave", () => {
        removeDeleteButton(item);
    });
});

function generateListButtons(item) {
    if (!item.querySelector(".delete_button")) {
        const delete_button = document.createElement("button");
        delete_button.setAttribute("class", "delete_button");
        
        const garbage_icon = document.createElement("img");
        garbage_icon.setAttribute("src", "./assets/trash.svg");
        delete_button.appendChild(garbage_icon);
        
        delete_button.addEventListener("click", () => {
            removeItem(item);
        });

        item.appendChild(delete_button);
    }
}

function removeDeleteButton(item) {
    const delete_button = item.querySelector(".delete_button");
    if (delete_button) {
        delete_button.remove();
    }
}

function insertItem() {
    const value = main_input.value.trim();
    if (value === "") {
        alert("Não é possível inserir um item vazio");
    } else {
        const item_list = document.createElement("div");
        item_list.setAttribute("class", "list_item");
        
        const h1 = document.createElement("h1");
        h1.textContent = value;
        item_list.appendChild(h1);

        generateListButtons(item_list);

        to_do_list.appendChild(item_list);
        main_input.value = "";

        saveToLocalStorage(value);
    }
}

function removeItem(item) {
    const value = item.querySelector("h1").textContent;
    item.remove();
    removeFromLocalStorage(value);
}

function saveToLocalStorage(value) {
    const items = getItemsFromLocalStorage();
    items.push(value);
    localStorage.setItem("to_do_items", JSON.stringify(items));
}

function removeFromLocalStorage(value) {
    const items = getItemsFromLocalStorage();
    const index = items.indexOf(value);
    if (index !== -1) {
        items.splice(index, 1);
        localStorage.setItem("to_do_items", JSON.stringify(items));
    }
}

function getItemsFromLocalStorage() {
    const items = JSON.parse(localStorage.getItem("to_do_items")) || [];
    return items;
}

// Carregar os itens do localStorage ao carregar a página
window.addEventListener("DOMContentLoaded", () => {
    const items = getItemsFromLocalStorage();
    items.forEach((item) => {
        const itemElement = document.createElement("div");
        itemElement.setAttribute("class", "list_item");
        
        const h1 = document.createElement("h1");
        h1.textContent = item;
        itemElement.appendChild(h1);

        generateListButtons(itemElement);

        to_do_list.appendChild(itemElement);
    });
});
