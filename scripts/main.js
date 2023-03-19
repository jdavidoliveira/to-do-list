const main_input = document.querySelector("#main_input");
const to_do_list = document.querySelector(".to-do-list");
const item_list = document.querySelectorAll(".list_item");


document.addEventListener("keypress", (e) => {
    if (e.keyCode === 13) {
        insert_item();
    }
});
//percorre o elemento padrão (remover o forEach se n precisar do elemento padrão)
item_list.forEach((item) => {
    item.addEventListener("mouseenter", () => {
        generate_list_buttons(item)
    });
    item.addEventListener("mouseleave", () => {
        const delete_button = document.querySelector(".delete_button");
        delete_button.remove();
    });
});

//gera o botão de deletar
function generate_list_buttons(item) {
    //prepara o elemento deletar
    const delete_button = document.createElement("button");
    delete_button.setAttribute("class", "delete_button");
    //icone de lixeira
    const garbage_icon = document.createElement("img");
    garbage_icon.setAttribute("src", "./assets/trash.svg");
    delete_button.appendChild(garbage_icon);
    //adiciona o botão deletar ao elemento
    item.appendChild(delete_button);    

    //adiciona o EventListener de remover o delete button, ao elemento
    delete_button.addEventListener("click", () => {
        item.remove();
    })
}

function insert_item() {
    if (main_input.value == "") {
        alert("Não é possivel inserir um item vazio");
    } else {
        //preparação do elemento a ser inserido
        const item_list = document.createElement("div");
        item_list.setAttribute("class", "list_item");
        const h1 = document.createElement("h1");
        h1.textContent = main_input.value;
        item_list.appendChild(h1);

        //adiciona o elemento na lista
        to_do_list.appendChild(item_list);
        main_input.value = "";

        item_list.addEventListener("mouseenter", () => {
            generate_list_buttons(item_list)
        });
        item_list.addEventListener("mouseleave", () => {
            const delete_button = document.querySelector(".delete_button");
            delete_button.remove();
        });

    }
}