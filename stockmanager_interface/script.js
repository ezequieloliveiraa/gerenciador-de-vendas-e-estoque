[...document.getElementsByClassName("access-menu")].forEach(li => { 

    li.addEventListener("click", e => {
        if (!li.classList.contains("active")) {

            var btn = document.getElementById("switch-btn");
            btn.innerHTML = "";
            var id = li.getAttribute("view-id");

            switch (id) {
                case "dashboard":
                    btn.innerHTML = "Dashboard"
                    break;
                case "clients":
                    btn.innerHTML = "Clientes";
                    break;
                case "sales":
                    btn.innerHTML = "Vendas"
                    break;
                case "stock":
                    btn.innerHTML = "Estoque"
                    break;
                default:
            }

            [...document.getElementsByClassName("access-menu")].forEach(element => {
                if (element.classList.contains("active")) {
                    element.classList.remove("active");
                    element.classList.add("lateral-btn");
                }
            });

            [...document.querySelectorAll("[view-id]")].forEach(element => {
                if (element.getAttribute("view-id") === id) {
                    element.classList.add("active");
                    element.classList.remove("lateral-btn");
                }
            })

            switchView(li)
        }
    })
});

function switchView(element) {
    var id = element.getAttribute("view-id");

    var view = document.getElementById(id);

    if (view.classList.contains("d-none")) {
        [...document.getElementsByClassName("views")].forEach(v => {
            if (!v.classList.contains("d-none")) {
                v.classList.add("d-none");
            }
        })
        view.classList.remove("d-none");

    }

}

//Criar cliente
document.getElementById("form-newCliente").addEventListener("submit", e => {

    e.preventDefault();

    let name = document.getElementById("newName");
    let email = document.getElementById("newEmail");
    let status = "ACTIVE";
    let ddi = document.getElementById("newDDI").value.trim();
    let phone = document.getElementById("newPhone").value.trim();
    let investiment = parseFloat(toFloat(document.getElementById("newInvestiment").value));

    clients.push({ id: Date.now(), name: name.value.trim(), email: email.value.trim(), status, investiment, ddi, phone });

    document.getElementsByClassName("btn-close")[0].click();
    setTimeout(() => {
        name.value = "";
        email.value = "";
        document.getElementById("newDDI").value = "55";
        document.getElementById("newPhone").value = "";
        document.getElementById("newInvestiment").value = "";
    }, 300);

    setNewData("clients", clients);
    renderClients();
    renderOverview();

});

//Criar produto
document.getElementById("form-newProduct").addEventListener("submit", e => {

    e.preventDefault();

    let name = document.getElementById("newProductName");
    let stock = parseInt(document.getElementById("newStock").value);
    let price = parseFloat(toFloat(document.getElementById("newPrice").value));
    let minStock = parseInt(document.getElementById("newMinStock").value.trim());
    let color = document.getElementById("newColor");
    let tag = document.getElementById("nTag");

    products.push({ id: Date.now(), name: name.value.trim(), stock, price, minStock, status: stock > minStock ? "normal" : "critic", color: color.value.trim() });

    name.value = "";
    document.getElementById("newStock").value = "";
    document.getElementById("newPrice").value = ""
    document.getElementById("newMinStock").value = "";
    tag.style = "";
    tag.innerHTML = "";
    color.value = "#2964b3";

    setNewData("products", products);
    renderProducts();
    renderOverview();

});

document.getElementById("newProductName").addEventListener("input", () => {
    var nTag = document.getElementById("nTag");
    nTag.innerHTML = document.getElementById("newProductName").value
    nTag.style = `background-color: ${document.getElementById("newColor").value}`
});
document.getElementById("newColor").addEventListener("input", () => {
    document.getElementById("nTag").style = `background-color: ${document.getElementById("newColor").value}`
});
document.getElementById("updateProductName").addEventListener("input", () => {
    document.getElementById("uTag").innerHTML = document.getElementById("updateProductName").value;
});
document.getElementById("updateColor").addEventListener("input", () => {
    document.getElementById("uTag").style = `background-color: ${document.getElementById("updateColor").value}`
});

//Truncar texto das badge
function truncateBadge(arr, n) {
    arr.forEach(e => {
        var fullContent = e.textContent.trim();
        if (fullContent.length > n) {
            var content = fullContent.slice(0, n);
            content += "...";
            e.textContent = content;
            e.setAttribute("title", fullContent);
        }
    })
}

//Atualizar cliente
document.getElementById("form-updateClient").addEventListener("submit", e => {
    e.preventDefault();

    let name = document.getElementById("updateName");
    let email = document.getElementById("updateEmail");
    let status = document.getElementById("updateStatus").value.trim().toUpperCase();
    let ddi = document.getElementById("updateDDI").value.trim();
    let phone = document.getElementById("updatePhone").value.trim();
    let investiment = parseFloat(toFloat(document.getElementById("updateInvestiment").value));


    var id = document.getElementById("form-updateClient").getAttribute("client-id");
    document.getElementById("form-updateClient").removeAttribute("client-id");

    let index = clients.findIndex(i => i.id == id);
    clients[index] = ({ id, name: name.value.trim(), email: email.value.trim(), status, investiment, ddi, phone });

    document.getElementsByClassName("btn-close")[1].click();
    setTimeout(() => {
        name.value = "";
        email.value = "";
        document.getElementById("updateStatus").value = "ACTIVE";
        document.getElementById("updateDDI").value = "";
        document.getElementById("updatePhone").value = "";
        document.getElementById("updateInvestiment").value = "";
    }, 300);

    setNewData("clients", clients);
    renderClients();
    renderOptions();
    renderClientsDashboard();
    renderOverview();

})
//Atualizar produto
document.getElementById("form-updateProduct").addEventListener("submit", e => {
    e.preventDefault();

    var id = document.getElementById("form-updateProduct").getAttribute("product-id");
    var index = products.findIndex(i => i.id == id);

    let name = document.getElementById("updateProductName").value;
    let stock = parseInt(document.getElementById("updateStock").value);
    let price = parseFloat(toFloat(document.getElementById("updatePrice").value));
    let minStock = parseInt(document.getElementById("updateMinStock").value);
    let color = document.getElementById("updateColor").value;

    products[index] = ({ id, name, stock, minStock, status: `${stock > minStock ? "normal" : "critic"}`, price, color });

    document.getElementsByClassName("btn-close")[3].click();
    setTimeout(() => {
        [...document.querySelectorAll("#form-updateProduct input")].forEach(j => {
            if (j.classList.contains("form-control-color")) {
                j.value = "#2964b3";
            } else {
                j.value = ""
            }
        })

    }, 300);

    setNewData("products", products);
    renderProducts();
    renderOverview();

})

//Filtrar cliente
document.getElementById("filter-client").addEventListener("input", e => {

    renderClients(document.getElementById("filter-client").value);

});

//Adicionar função nas Input para converter em BRL
function toBRL(element) {
    element.forEach(a => {

        a.addEventListener("input", () => {

            var input = a.value.replace(/\D/g, "");
            input = (input / 100).toFixed(2);

            if (input === "NaN") {
                a.value = ""
            } else {

                a.value = new Intl.NumberFormat('pt-BR', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                }).format(input)
            }
        })

    })
}
toBRL([...document.getElementsByClassName("BRL")]);

//Converter valor para BRL
function valueToBRL(element) {
    return new Intl.NumberFormat('pt-BR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(element)
}

//Converter para Float
function toFloat(element) {
    return parseFloat(element.replace(/\./g, "").replace(',', '.'))
}

//Gerencir dados do Cliente
function managerClient() {

    //deletar cliente
    [...document.getElementsByClassName("delete-client-btn")].forEach(e => {

        var id = e.parentElement.getAttribute("client-id");

        e.addEventListener("click", () => {

            var confirmation = confirm("Você deseja realmente excluir o cliente " + clients.find(element => { return element.id == id }).name + " ? O carrinho deste cliente será excluido com exceção da venda em seu nome")

            if (confirmation) {

                clients = clients.filter(e => e.id != id)

                setNewData("clients", clients)
                renderClients();
                renderOverview();

            }
        })
    });

    //editar cliente
    [...document.getElementsByClassName("edit-client-btn")].forEach(e => {

        var id = e.parentElement.getAttribute("client-id");

        var client = clients.find(e => e.id == id)

        e.addEventListener("click", () => {

            document.getElementById("form-updateClient").setAttribute("client-id", id)
            document.getElementById("updateName").value = client.name;
            document.getElementById("updateEmail").value = client.email.toLowerCase();
            document.getElementById("updateStatus").value = client.status.toUpperCase();
            document.getElementById("updateDDI").value = client.ddi;
            document.getElementById("updatePhone").value = client.phone;
            document.getElementById("updateInvestiment").value = valueToBRL(client.investiment);
        })
    })
}

//Gerenciar dados do produto
function managerProduct() {

    //Deletar Produto
    [...document.getElementsByClassName("delete-product-btn")].forEach(e => {

        e.addEventListener("click", () => {

            var id = e.parentElement.getAttribute("product-id");
            var product = products.find(e => e.id == id);

            var confirmation = confirm("Você deseja realmente excluir o produto " + product.name + " de seu estoque? (Todas as vendas feitas com ele não serão excluidas)");

            if (confirmation) {
                products = products.filter(a => a.id != id);
                setNewData("products", products);
                renderProducts();
                renderOverview();
            }
        })
    });



    //Editar Produto
    [...document.getElementsByClassName("edit-product-btn")].forEach(e => {

        e.addEventListener("click", () => {
            var id = e.parentElement.getAttribute("product-id");
            document.getElementById("form-updateProduct").setAttribute("product-id", id);
            var product = products.find(a => a.id == id)

            document.getElementById("updateProductName").value = product.name;
            document.getElementById("updateStock").value = product.stock;
            document.getElementById("updatePrice").value = valueToBRL(product.price)
            document.getElementById("updateMinStock").value = product.minStock;
            document.getElementById("updateColor").value = product.color;
            var tag = document.getElementById("uTag");
            tag.style = `background-color: ${product.color};s`;
            tag.innerHTML = `${product.name} `

        })
    });
}

//Gerenciar dados do carrinho
function managerCart() {

    //Input para alterar quantidade do produto
    [...document.getElementsByClassName("qtt-cart")].forEach(e => {
        var currentValue = parseInt(e.value);

        e.addEventListener("input", () => {
            e.value = e.value.replace(/\D/g, "");

            //Verificação de campo vazio. Se sim, excluirá aquele produto do carrinho.
            if (e.value.length === 0 || e.value < 1) {
                e.addEventListener("change", () => {
                    if (e.value.length === 0 || e.value < 1) {
                        if (confirm("Você deseja remover este produto do carrinho do cliente?")) {
                            var cartId = e.parentElement.getAttribute("cart-id");
                            var pId = e.parentElement.getAttribute("p-id");
                            var index = cart.findIndex(i => i.id == cartId);
                            cart[index].products = cart[index].products.filter(j => j.id != pId);

                            if (cart[index].products.length < 1) {
                                deleteCart(cartId)
                                return
                            }
                        } else {
                            e.value = currentValue;
                        }
                    }
                })
            } else {

            }

        })
    });

    //Botão menos
    [...document.getElementsByClassName("decrease")].forEach(e => {
        e.addEventListener("click", () => {
            var cartId = e.parentElement.getAttribute("cart-id");
            var pId = e.parentElement.getAttribute("p-id");
            var input = e.nextElementSibling;
            var totalPrice = document.querySelector(`.total[cart-id="${cartId}"]`);
            var uPrice = parseFloat((products.find(e => e.id == pId)).price);

            if (input.value <= 1) {
                if (confirm("Você deseja remover este produto vinculado ao carrinho do cliente?")) {

                    var index = cart.findIndex(j => j.id == cartId);
                    cart[index].products = cart[index].products.filter(i => i.id != pId);
                    cart[index].totalPrice = parseFloat(toFloat(totalPrice.value)) - uPrice;

                    if (cart[index].products.length < 1) {
                        deleteCart(cartId)
                        return
                    }

                    setNewData("cart", cart);
                    renderCart();
                    return
                } else return
            }

            if ((toFloat(document.querySelectorAll(`input[cart-id="${cartId}"][p-id="${pId}"]`)[0].value) - uPrice) < 0) { return }

            var qtt = parseInt(input.value) - 1;
            var inputPrice = document.querySelector(`input[p-id="${pId}"][cart-id="${cartId}"]`);
            var newPrice = parseFloat(toFloat(inputPrice.value)) - uPrice;
            var newTotalPrice = parseFloat(toFloat(totalPrice.value)) - uPrice;

            updateCart(cartId, pId, qtt, newPrice, newTotalPrice);
            renderCart();
        })
    });

    //Botão mais
    [...document.getElementsByClassName("increase")].forEach(e => {
        e.addEventListener("click", () => {
            var cartId = e.parentElement.getAttribute("cart-id");
            var pId = e.parentElement.getAttribute("p-id");
            var input = e.previousElementSibling;
            var totalPrice = document.querySelector(`.total[cart-id="${cartId}"]`);
            var uPrice = parseFloat((products.find(e => e.id == pId)).price);


            var qtt = parseInt(input.value) + 1;
            var inputPrice = document.querySelector(`input[p-id="${pId}"][cart-id="${cartId}"]`);
            var newPrice = parseFloat(toFloat(inputPrice.value)) + uPrice;
            var newTotalPrice = parseFloat(toFloat(totalPrice.value)) + uPrice;

            updateCart(cartId, pId, qtt, newPrice, newTotalPrice);
            renderCart();
        })
    });

    //Excluir carrinho
    [...document.getElementsByClassName("rCart")].forEach(e => {
        e.addEventListener("click", () => {

            if (confirm("Você realmente deseja excluir este carrinho de seu cliente?")) {
                var id = e.getAttribute("cart-id");
                var index = cart.findIndex(i => i.id == id);
                cart.splice(index, 1);
                setNewData("cart", cart)
                renderCart();
            }
        })
    });

    //Concluir venda do carrinho
    [...document.getElementsByClassName("cSale")].forEach(e => {
        e.addEventListener("click", () => {
            var id = e.getAttribute("cart-id");
            var cCart = cart.find(f => f.id == id);
            if (confirm("Deseja concluir a venda do cliente " + cCart.client.name + "?")) {
                saveSale(cCart.client, cCart.products, cCart.totalPrice);
                var index = cart.findIndex(i => i.id == id);
                cart.splice(index, 1);
                setNewData("cart", cart);
                renderCart();
            }
        })
    })

}
function updateCart(id, productId, qtt, price, totalPrice) {
    var index = cart.findIndex(i => i.id == id);
    var productIndex = cart[index].products.findIndex(i => i.id == productId);

    cart[index].products[productIndex].quantity = qtt;
    cart[index].products[productIndex].price = price;
    cart[index].totalPrice = totalPrice;

    setNewData("cart", cart);
}
function deleteCart(id) {

    cart = cart.filter(e => e.id != id)

    setNewData("cart", cart);
    renderCart();
}

//Adicionar ao carrinho ou adicionar como venda
document.getElementById("multiForm").addEventListener("submit", e => {
    e.preventDefault();

    var clientId = document.getElementById("clients-options").value;
    var productId = document.getElementById("products-options").value;
    var qtt = parseInt(document.getElementById("qttLc").value);
    var totalPrice = toFloat(document.getElementById("pcLc").value);
    var client = clients.find(n => n.id == clientId);
    var product = products.find(k => k.id == productId);

    if (qtt <= 0) { alert("Digite uma quantia acima de 0 no campo de quantidade"); return }

    if (e.submitter.classList.contains("addCart")) {
        var clientCart = cart.find(c => c.client.id == clientId);
        if (clientCart) {
            var index = cart.findIndex(i => i.id == clientCart.id);
            var pIndex = cart[index].products.findIndex(x => x.id == productId);

            if (pIndex >= 0) {
                cart[index].products[pIndex].quantity += qtt;
                cart[index].products[pIndex].price += totalPrice;
                cart[index].totalPrice += totalPrice;
            } else {
                cart[index].products.push({ id: productId, name: product.name, price: totalPrice, quantity: qtt, tagColor: product.color });
                cart[index].totalPrice += totalPrice;
            }
        } else {
            cart.push({ id: Date.now(), client: { id: clientId, name: client.name }, products: [{ id: productId, name: product.name, quantity: qtt, price: totalPrice, tagColor: product.color }], totalPrice })
        }
        setNewData("cart", cart)
        renderCart();
    } else if (e.submitter.classList.contains("addSale")) {
        saveSale({ id: client.id, name: client.name }, [{ id: productId, name: product.name, quantity: qtt, price: totalPrice, tagColor: product.color }], totalPrice);
    }

    document.getElementById("multiForm").reset();
});
//Adicionar valor ao selecionar o produto
document.getElementById("products-options").addEventListener("click", function () {
    var id = this.value;
    var input = document.getElementById("pcLc");

    if (id) {
        document.getElementById("qttLc").value = "";
        input.value = "";
        input.value = valueToBRL(products.find(i => i.id == id).price);
    } else {
        input.value = "";
    }
});
//Alterar valor ao adicionar quantidade
document.getElementById("qttLc").addEventListener("input", function (e) {

    var id = document.getElementById("products-options").value;
    if (id && this.value) {
        var product = products.find(p => p.id == id);

        var input = document.getElementById("pcLc");
        input.value = "";
        input.value = valueToBRL(parseInt(this.value) * product.price);
    }
});
//Verificação para não disparar dormulário ao clicar em enter 
[...document.querySelectorAll("#qttLc, #pcLc")].forEach(i => {
    i.addEventListener("keypress", event => {
        if (event.key === "Enter") {
            event.preventDefault()
            alert("Escolha uma opção entre adicionar ao carrinho ou salvar como venda");
        }
    });
});

//Gerenciar vendas
function managerSales() {
    //Modal vendas
    [...document.getElementsByClassName("edit-btn-sales")].forEach(e => {
        var saleId = e.getAttribute("sale-id");

        e.addEventListener("click", () => {
            var sale = sales.find(i => i.id == saleId)
            var form = document.getElementById("form-update-sale");
            form.innerHTML = "";

            var html = `<div class="t-s-u">
                                        <table class="table text-center">
                                            <thead >
                                                <tr>
                                                    <th>Produto</th>
                                                    <th>Quantidade</th>
                                                    <th>Valor total</th>
                                                </tr>
                                            </thead>

                                            <tbody class="table-edit-sale">

                                                ${sale.products.map(x => {

                var exists = products.some(p => p.id == x.id);
                if (!exists) {
                    return `<tr class="p-row-disabled">
                                                    <td><span class="badge text-truncate"
                                                            style="background-color: ${x.tagColor};">${x.name}</span>
                                                    </td>
                                                    <td class="btns-disabled">
                                                        <input
                                                            class="d-inline-block form-control qtt-cart" type="text"
                                                            value="${x.quantity}" maxlength="2" disabled>
                                                    </td>
                                                    <td class="total-product-value">
                                                        R$ <input
                                                            class="d-inline-block form-control BRL" type="text"
                                                            value="${parseFloat(x.price).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}" disabled>
                                                    </td>
                                                </tr>`} else {
                    return `<tr class="p-row">
                                                    <td><span class="badge text-truncate"
                                                            style="background-color: ${x.tagColor};">${x.name}</span>
                                                    </td>
                                                    <td p-id="${x.id}" class="btns-control">
                                                        <div><button class="btn btn-outline-secondary decrease-modal"
                                                                type="button">-</button></div><input
                                                            class="d-inline-block form-control qtt-cart qtt-sale" type="text"
                                                            value="${x.quantity}" maxlength="2"><div><button class="btn btn-outline-secondary increase-modal"
                                                                type="button">+</button></div>
                                                    </td>
                                                    <td class="total-product-value">
                                                        R$ <input p-id="${x.id}"
                                                            class="d-inline-block form-control BRL pcSl" type="text"
                                                            value="${parseFloat(x.price).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}">
                                                    </td>
                                                </tr>`}
            }).join("")}
                                            </tbody>
                                        </table>
                                    </div>
                                    <div class="d-flex justify-content-between mb-2">
                                        <span>Total:</span>
                                        <div class="d-flex gap-2 align-items-center">
                                            <div>R$</div><input id="total-price-sale" class="form-control BRL"
                                                type="text" value="${parseFloat(sale.totalPrice).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}" style="text-align: center;">
                                        </div>
                                    </div>

                                    <button id="upSale" type="submit" class="btn btn-primary w-100">Atualizar Venda</button>`
            form.innerHTML = html
            document.getElementById("nameClientSaleUpdate").innerHTML = "Cliente: " + sale.client.name;
            truncateBadge([...form.getElementsByClassName("text-truncate")], 18)
            toBRL([...document.querySelectorAll("#form-update-sale .BRL")]);


            //Diminuir quantidade do produto no modal
            var saleEdit = structuredClone(sales).find(p => p.id == saleId);
            [...document.getElementsByClassName("decrease-modal")].forEach(b => {

                b.addEventListener("click", () => {

                    var inputQtt = b.parentElement.nextElementSibling;
                    var pId = b.parentElement.parentElement.getAttribute("p-id");

                    if ((parseInt(inputQtt.value) - 1) <= 0) {
                        if (confirm('Deseja remover este item da venda deste cliente? As alterações só serão feitas após clicar em "Salvar alterações".')) {
                            var pIndex = saleEdit.products.findIndex(i => i.id == pId);
                            saleEdit.products.splice(pIndex, 1);
                            b.parentElement.parentElement.parentElement.style.display = "none";
                            saleEdit.products = saleEdit.products.filter(p => p.id != pId);
                        }
                    } else {
                        inputQtt.value = parseInt(inputQtt.value) - 1;
                        saleEdit.products.forEach((p, i) => {
                            if (p.id == pId) {
                                saleEdit.products[i].quantity = parseInt(inputQtt.value);
                            }
                        })
                    }

                })
            });
            //Aumentar quantidade do produto no modal
            [...document.getElementsByClassName("increase-modal")].forEach(b => {


                b.addEventListener("click", () => {
                    var inputQtt = b.parentElement.previousElementSibling;
                    var pId = b.parentElement.parentElement.getAttribute("p-id");
                    saleEdit.products.forEach((p, i) => {
                        if (p.id == pId) {
                            saleEdit.products[i].quantity = parseInt(saleEdit.products[i].quantity) + 1;
                        }
                    })
                    inputQtt.value = parseInt(inputQtt.value) + 1;
                })
            })

            //Salvar alterações da venda 
            document.getElementById("form-update-sale").addEventListener("submit", event => {
                event.preventDefault();
                var saleIndex = sales.findIndex(s => s.id == saleId)
                sales[saleIndex].products = structuredClone(saleEdit.products);
                sales[saleIndex].totalPrice = saleEdit.totalPrice;
                setNewData("sales", sales);
                renderSales();
                document.getElementById("grafic").innerHTML = "";
                document.getElementById("grafic").innerHTML = `<canvas id="graficChart" height="127" width="609" style="display: block; box-sizing: border-box; height: 127.1px; width: 609px;"></canvas>`;
                renderGrafic();
                renderOverview();
                document.getElementById("closeSaleModal").click();
                setTimeout(() => document.getElementById("form-update-sale").innerHTML = "", 300);
            });

            //Input de quantidade
            [...document.getElementsByClassName("qtt-sale")].forEach(input => {
                var qtt = parseInt(input.value);

                input.addEventListener("change", () => {
                    var pId = input.parentElement.getAttribute("p-id");

                    if (input.value.length <= 0 || parseInt(input.value) <= 0) {
                        if (confirm('Deseja remover este item da venda deste cliente? As alterações só serão feitas após clicar em "Salvar alterações".')) {
                            saleEdit.products = saleEdit.products.filter(p => p.id == pId);
                            return
                        } else input.value = qtt;
                    }

                    var pIndex = saleEdit.products.findIndex(i => i.id == pId);
                    saleEdit.products[pIndex].quantity = parseInt(input.value);

                })
            });

            //Input do valor do produto
            [...document.getElementsByClassName("pcSl")].forEach(input => {
                input.addEventListener("change", () => {
                    var pId = input.getAttribute("p-id");
                    var pIndex = saleEdit.products.findIndex(i => i.id == pId);
                    saleEdit.products[pIndex].price = toFloat(input.value);
                })
            })

            //Input valor total
            document.getElementById("total-price-sale").addEventListener("change", function () {
                saleEdit.totalPrice = toFloat(this.value);
            })

        })
    });

    //Excluir venda
    [...document.getElementsByClassName("delete-btn-sales")].forEach(e => {
        var id = e.getAttribute("sale-id");
        var sale = sales.find(s => s.id == id);
        e.addEventListener("click", () => {
            if (confirm("Deseja realmente excluir a venda feita ao cliente " + sale.client.name + "? Todo o investimento do cliente não será alterado mesmo excluindo esta venda.")) {
                var index = sales.findIndex(i => i.id == id);
                sales.splice(index, 1);
                setNewData("sales", sales);
                renderSales();
                document.getElementById("grafic").innerHTML = "";
                document.getElementById("grafic").innerHTML = `<canvas id="graficChart" height="127" width="609" style="display: block; box-sizing: border-box; height: 127.1px; width: 609px;"></canvas>`;
                renderGrafic();
                renderOverview();
            }
        })
    })
}
//salvar venda
function saveSale(client, product, totalPrice) {

    product.forEach(p => products.forEach(i => {
        if (i.id == p.id) {
            i.stock = parseInt(i.stock) - parseInt(p.quantity)
            if (i.stock < i.minStock) i.status = "critic";
        }
    }));
    clients.forEach(c => { if (c.id == client.id) c.investiment = parseFloat(c.investiment) + parseFloat(totalPrice) });
    sales.push({ id: Date.now(), date: new Date().toLocaleDateString("en-CA"), client, products: product, totalPrice });
    setNewData("sales", sales);
    setNewData("products", products);
    setNewData("clients", clients);
    renderSales();
    renderProducts();
    renderClientsDashboard();
    renderClients();
}
//Limpar modal da edição de venda
document.getElementById("closeSaleModal").addEventListener("click", () => {
    setTimeout(() => {
        document.getElementById("nameClientSaleUpdate").innerHTML = "";
        document.getElementById("form-update-sale").innerHTML = "";
    }, 300)
})


function setNewData(obj, item) {
    localStorage.setItem(`${obj}`, JSON.stringify(item));
}

function getSavedData(obj) {

    let data = localStorage.getItem(`${obj}`);

    if (`${obj}` === "products") {

        if (!data) {

            data = [
                { id: "900001", name: "Processador Intel Core i7-13700K", stock: 45, minStock: 10, status: "normal", price: 2400.0, color: "#2964b3" },
                { id: "900002", name: "Processador AMD Ryzen 7 7800X3D", stock: 8, minStock: 15, status: "critic", price: 2800.0, color: "#e05326" },
                { id: "900003", name: "Placa de Vídeo RTX 4070 Ti Super", stock: 14, minStock: 5, status: "normal", price: 5600.0, color: "#76b900" },
                { id: "900004", name: "Placa de Vídeo Radeon RX 7800 XT", stock: 3, minStock: 8, status: "critic", price: 3800.0, color: "#ed1c24" },
                { id: "900005", name: "Memória RAM DDR5 32GB (2x16GB) 6000MHz", stock: 80, minStock: 20, status: "normal", price: 950.0, color: "#8029b3" },
                { id: "900006", name: "SSD NVMe M.2 1TB Kingston KC3000", stock: 120, minStock: 25, status: "normal", price: 550.0, color: "#29b39c" },
                { id: "900007", name: "SSD NVMe M.2 2TB Samsung 990 Pro", stock: 4, minStock: 10, status: "critic", price: 1200.0, color: "#4a90e2" },
                { id: "900008", name: "Placa-Mãe ASUS ROG Strix B650-A", stock: 19, minStock: 6, status: "normal", price: 1650.0, color: "#f5a623" },
                { id: "900009", name: "Placa-Mãe MSI MAG B760 Tomahawk", stock: 22, minStock: 6, status: "normal", price: 1400.0, color: "#7ed321" },
                { id: "900010", name: "Fonte Corsair RM850x 850W Gold", stock: 35, minStock: 12, status: "normal", price: 890.0, color: "#4a4a4a" },
                { id: "900011", name: "Water Cooler DeepCool LT720 360mm", stock: 15, minStock: 8, status: "normal", price: 780.0, color: "#12a4b5" },
                { id: "900012", name: "Gabinete Lian Li O11 Dynamic EVO", stock: 11, minStock: 5, status: "normal", price: 1100.0, color: "#d0021b" },
                { id: "900013", name: "Cooler para Processador AK400 Digital", stock: 50, minStock: 15, status: "normal", price: 240.0, color: "#9b9b9b" },
                { id: "900014", name: "Monitor Gamer LG UltraGear 27 144Hz", stock: 28, minStock: 10, status: "normal", price: 1390.0, color: "#b8e986" },
                { id: "900015", name: "Monitor ASUS TUF Gaming 31.5 Curvo", stock: 2, minStock: 5, status: "critic", price: 2100.0, color: "#f8e71c" },
                { id: "900016", name: "Mouse Logitech G Pro X Superlight 2", stock: 42, minStock: 12, status: "normal", price: 850.0, color: "#bd10e0" },
                { id: "900017", name: "Teclado Mecânico Keychron K2 V2", stock: 17, minStock: 8, status: "normal", price: 750.0, color: "#9013fe" },
                { id: "900018", name: "Headset HyperX Cloud III Wireless", stock: 31, minStock: 10, status: "normal", price: 990.0, color: "#4a90e2" },
                { id: "900019", name: "Cadeira Gamer DT3 Sports Elise", stock: 7, minStock: 4, status: "normal", price: 1450.0, color: "#50e3c2" },
                { id: "900020", name: "Microfone HyperX QuadCast S", stock: 14, minStock: 5, status: "normal", price: 1150.0, color: "#ff2d55" },
                { id: "900021", name: "Cabo HDMI 2.1 Baseus 3 Metros", stock: 250, minStock: 40, status: "normal", price: 90.0, color: "#000000" },
                { id: "900022", name: "Cabo DisplayPort 1.4 IronFlex", stock: 180, minStock: 30, status: "normal", price: 85.0, color: "#333333" },
                { id: "900023", name: "Hub USB-C 7 em 1 Baseus Metal", stock: 65, minStock: 15, status: "normal", price: 280.0, color: "#666666" },
                { id: "900024", name: "Pasta Térmica Arctic MX-6 4g", stock: 310, minStock: 50, status: "normal", price: 75.0, color: "#0099ff" },
                { id: "900025", name: "Mousepad Extra Grande Corsair MM350", stock: 48, minStock: 12, status: "normal", price: 190.0, color: "#ffcc00" },
                { id: "900026", name: "Kit Ventoinhas 3x Corsair ICUE AR120", stock: 23, minStock: 8, status: "normal", price: 390.0, color: "#ff6600" },
                { id: "900027", name: "Suporte de Monitor Articulado F80N", stock: 75, minStock: 20, status: "normal", price: 220.0, color: "#222222" },
                { id: "900028", name: "Webcam Logitech C920s Pro HD", stock: 39, minStock: 10, status: "normal", price: 450.0, color: "#111111" },
                { id: "900029", name: "Fita LED RGB Inteligente EKAZA 5m", stock: 90, minStock: 20, status: "normal", price: 130.0, color: "#ff00cc" },
                { id: "900030", name: "Roteador ASUS RT-AX57 Wi-Fi 6", stock: 16, minStock: 6, status: "normal", price: 620.0, color: "#4682b4" },
                { id: "900031", "name": "Switch Gigabit TP-Link 8 Portas", stock: 55, minStock: 15, status: "normal", price: 140.0, color: "#008080" },
                { id: "900032", name: "Placa de Som Externa Creative Sound Blaster", stock: 12, minStock: 5, status: "normal", price: 480.0, color: "#8b0000" },
                { id: "900033", name: "Controle Xbox Wireless Carbon Black", stock: 34, minStock: 10, status: "normal", price: 430.0, color: "#1a1a1a" },
                { id: "900034", name: "Controle PS5 DualSense Branco", stock: 27, minStock: 10, status: "normal", price: 460.0, color: "#ffffff" },
                { id: "900035", name: "Carregador de Pilhas Duracell + 4 Pilhas", stock: 85, minStock: 20, status: "normal", price: 160.0, color: "#b5651d" },
                { id: "900036", name: "Filtro de Linha Clamper Multi Energia 8", stock: 140, minStock: 30, status: "normal", price: 120.0, color: "#555555" },
                { id: "900037", name: "Nobreak Intelbras Attiv 600VA", stock: 18, minStock: 8, status: "normal", price: 490.0, color: "#2f4f4f" },
                { id: "900038", name: "HD Externo Portátil Seagate 2TB", stock: 41, minStock: 12, status: "normal", price: 520.0, color: "#000080" },
                { id: "900039", name: "Pen Drive SanDisk Ultra 128GB USB 3.0", stock: 210, minStock: 40, status: "normal", price: 85.0, color: "#ff0000" },
                { id: "900040", name: "Adaptador Bluetooth 5.3 Baseus USB", stock: 195, minStock: 30, status: "normal", price: 60.0, color: "#0055ff" },
                { id: "900041", name: "Adaptador Wi-Fi 6 TP-Link Archer USB", stock: 64, minStock: 15, status: "normal", price: 190.0, color: "#00a2ed" },
                { id: "900042", name: "Caixa de Som Edifier X100+ 2.1", stock: 13, minStock: 6, status: "normal", price: 380.0, color: "#8e44ad" },
                { id: "900043", name: "Soundbar Redragon Adiemus RGB", stock: 29, minStock: 10, status: "normal", price: 210.0, color: "#e74c3c" },
                { id: "900044", name: "Suporte de Headset RGB Redragon", stock: 42, minStock: 10, status: "normal", price: 120.0, color: "#2ecc71" },
                { id: "900045", name: "Organizador de Cabos Orico Velcro 5m", stock: 340, minStock: 50, status: "normal", price: 35.0, color: "#34495e" },
                { id: "900046", name: "Limpa Telas Implastec 120ml + Pano", stock: 410, minStock: 50, status: "normal", price: 25.0, color: "#1abc9c" },
                { id: "900047", name: "Ar Comprimido Implastec Aerossol", stock: 88, minStock: 20, status: "normal", price: 45.0, color: "#7f8c8d" },
                { id: "900048", name: "Kit de Ferramentas de Precisão iFixit", stock: 9, minStock: 5, status: "normal", price: 320.0, color: "#2c3e50" },
                { id: "900049", name: "Abraçadeira de Nylon Preta 100 un", stock: 600, minStock: 100, status: "normal", price: 15.0, color: "#050505" },
                { id: "900050", name: "Estabilizador NHS Active II 1000VA", stock: 14, minStock: 5, status: "normal", price: 340.0, color: "#d35400" },
                { id: "900051", name: "Placa de Captura Elgato Cam Link 4K", stock: 6, minStock: 4, status: "normal", price: 890.0, color: "#16a085" },
                { id: "900052", name: "Stream Deck Elgato MK.2 15 Teclas", stock: 11, minStock: 5, status: "normal", price: 1190.0, color: "#27ae60" },
                { id: "900053", name: "Anel de Luz LED Ring Light Desk 10 polegadas", stock: 52, minStock: 15, status: "normal", price: 110.0, color: "#f1c40f" },
                { id: "900054", name: "Braço Articulado para Microfone Elgin", stock: 26, minStock: 8, status: "normal", price: 180.0, color: "#2980b9" },
                { id: "900055", name: "Filtro Anti-Pop para Microfone Shure", stock: 44, minStock: 10, status: "normal", price: 95.0, color: "#c0392b" },
                { id: "900056", name: "Espuma Acústica Isolante 50x50 Kit 10", stock: 18, minStock: 5, status: "normal", price: 160.0, color: "#34495e" },
                { id: "900057", name: "Gabinete Corsair 4000D Airflow", stock: 15, minStock: 6, status: "normal", price: 650.0, color: "#7f8c8d" },
                { id: "900058", name: "Gabinete Nzxt H9 Flow Mid Tower", stock: 5, minStock: 4, status: "normal", price: 1250.0, color: "#ffffff" },
                { id: "900059", name: "Kit Parafusos PC Embalagem 50 un", stock: 280, minStock: 40, status: "normal", price: 30.0, color: "#95a5a6" },
                { id: "900060", name: "Placa de Rede PCI-e Gigabit TP-Link", stock: 42, minStock: 10, status: "normal", price: 95.0, color: "#2980b9" },
                { id: "900061", name: "Cooler Fan Noctua NF-A12x25 PWM", stock: 24, minStock: 8, status: "normal", price: 280.0, color: "#6e473b" },
                { id: "900062", name: "Placa de Vídeo GTX 1650 Speedster", stock: 16, minStock: 8, status: "normal", price: 920.0, color: "#76b900" },
                { id: "900063", name: "SSD SATA III 480GB Crucial BX500", stock: 85, minStock: 20, status: "normal", price: 270.0, color: "#004488" },
                { id: "900064", name: "HD Interno 1TB Western Digital Blue", stock: 38, minStock: 12, status: "normal", price: 340.0, color: "#0066cc" },
                { id: "900065", name: "HD Interno 4TB Seagate IronWolf NAS", stock: 12, minStock: 5, status: "normal", price: 850.0, color: "#cc0000" },
                { id: "900066", name: "Controladora de Fans Razer Chroma RGB", stock: 14, minStock: 5, status: "normal", price: 390.0, color: "#00ff00" },
                { id: "900067", name: "Suporte Vertical para Placa de Vídeo Cooler Master", stock: 21, minStock: 6, status: "normal", price: 290.0, color: "#5d3f8a" },
                { id: "900068", name: "Cabo Extensor Sleeved Kit Liketec", stock: 47, minStock: 12, status: "normal", price: 150.0, color: "#ff0055" },
                { id: "900069", name: "Placa-Mãe Gigabyte B550M AORUS Elite", stock: 33, minStock: 10, status: "normal", price: 850.0, color: "#ff5500" },
                { id: "900070", name: "Memória RAM DDR4 16GB (2x8GB) Kingston Fury", stock: 110, minStock: 25, status: "normal", price: 380.0, color: "#dd2222" },
                { id: "900071", name: "Fonte MSI MAG A650BN 650W Bronze", stock: 62, minStock: 15, status: "normal", price: 360.0, color: "#111111" },
                { id: "900072", name: "Placa M.2 Wi-Fi + Bluetooth Intel AX210", stock: 78, minStock: 15, status: "normal", price: 130.0, color: "#0066ff" },
                { id: "900073", name: "Mini Caixa de Som Multilaser 2.0 SP091", stock: 150, minStock: 20, status: "normal", price: 45.0, color: "#ff3333" },
                { id: "900074", name: "Headphone AKG K92 Estúdio", stock: 19, minStock: 6, status: "normal", price: 490.0, color: "#ccaa00" },
                { id: "900075", name: "Mouse Gamer Razer DeathAdder Essential", stock: 67, minStock: 20, status: "normal", price: 160.0, color: "#00ff00" },
                { id: "900076", name: "Teclado Mecânico Redragon Kumara RGB", stock: 41, minStock: 15, status: "normal", price: 250.0, color: "#ff0000" },
                { id: "900077", name: "Grip Tape para Mouse Logitech G Pro", stock: 95, minStock: 10, status: "normal", price: 50.0, color: "#333333" },
                { id: "900078", name: "Fealts p/ Mouse (Mouse Skates) Hotline Games", stock: 130, minStock: 15, status: "normal", price: 40.0, color: "#ffffff" },
                { id: "900079", name: "Bungee para Mouse Redragon Chroma", stock: 36, minStock: 8, status: "normal", price: 85.0, color: "#ff007f" },
                { id: "900080", name: "Keycaps PBT Double Shot Rainbow Kit", stock: 22, minStock: 5, status: "normal", price: 180.0, color: "#ff00ff" },
                { id: "900081", name: "Switch Mecânico Outemu Blue Box com 24 un", stock: 54, minStock: 10, status: "normal", price: 65.0, color: "#00aaff" },
                { id: "900082", name: "Extrator de Switch e Keycap Keychron", stock: 110, minStock: 15, status: "normal", price: 30.0, color: "#999999" },
                { id: "900083", name: "Alcool Isopropilico Implastec 250ml", stock: 160, minStock: 30, status: "normal", price: 25.0, color: "#00bcd4" },
                { id: "900084", name: "Pincel Anti-Estatica ESD Kit com 4", stock: 93, minStock: 15, status: "normal", price: 40.0, color: "#212121" },
                { id: "900085", name: "Pulseira Anti-Estatica com Cabo de Aterramento", stock: 74, minStock: 15, status: "normal", price: 35.0, color: "#0000ff" },
                { id: "900086", name: "Testador de Fonte Digital ATX LCD", stock: 15, minStock: 5, status: "normal", price: 150.0, color: "#ffeb3b" },
                { id: "900087", name: "Placa de Diagnóstico PC Analyzer PCI-e", stock: 8, minStock: 4, status: "normal", price: 190.0, color: "#4caf50" },
                { id: "900088", name: "Gravador de Bios Eprom USB CH341A", stock: 27, minStock: 6, status: "normal", price: 80.0, color: "#3f51b5" },
                { id: "900089", name: "Estação de Solda Hikari HK-936B", stock: 5, minStock: 3, status: "normal", price: 480.0, color: "#ff5722" },
                { id: "900090", name: "Fio de Solda Estanho Cobix 500g", stock: 33, minStock: 8, status: "normal", price: 110.0, color: "#607d8b" },
                { id: "900091", name: "Fluxo de Solda Amtech NC-559 10g", stock: 89, minStock: 15, status: "normal", price: 65.0, color: "#ff9800" },
                { id: "900092", name: "Malha Dessoldadora Hikari 2.0mm", stock: 140, minStock: 25, status: "normal", price: 20.0, color: "#795548" },
                { id: "900093", name: "Fita Isolante Térmica Kapton 20mm", stock: 112, minStock: 20, status: "normal", price: 45.0, color: "#ffc107" },
                { id: "900094", name: "Manta Magnetica para Bancada 45x30cm", stock: 41, minStock: 10, status: "normal", price: 130.0, color: "#009688" },
                { id: "900095", name: "Lupa de Bancada com Luminaria LED", stock: 14, minStock: 5, status: "normal", price: 260.0, color: "#9e9e9e" },
                { id: "900096", name: "Multímetro Digital Minipa ET-1002", stock: 29, minStock: 8, status: "normal", price: 110.0, color: "#ff5722" },
                { id: "900097", name: "Alicate Crimpador de Cabo de Rede RJ45", stock: 46, minStock: 10, status: "normal", price: 85.0, color: "#111111" },
                { id: "900098", name: "Testador de Cabo de Rede RJ45/RJ11", stock: 68, minStock: 15, status: "normal", price: 45.0, color: "#ffeb3b" },
                { id: "900099", name: "Conector RJ45 Cat6 Sohoplus Pacote 50 un", stock: 125, minStock: 25, status: "normal", price: 75.0, color: "#e91e63" },
                { id: "900100", name: "Cabo de Rede Cat6 Nexans Azul Metro", stock: 900, minStock: 200, status: "normal", price: 4.5, color: "#03a9f4" }
            ];;

            setNewData("products", data)
            return data
        }
        return JSON.parse(data);
    }
    if (`${obj}` === "clients") {

        if (!data) {

            data = [
                { id: "8100123", name: "Lioran Vesco Alben", email: "lioran.alben@gmail.com", status: "ACTIVE", investiment: 4520.75, ddi: 55, phone: "11984561237" },
                { id: "8100124", name: "Narev Solkin", email: "narev.solkin@gmail.com", status: "INACTIVE", investiment: 980.40, ddi: 351, phone: "912648531" },
                { id: "8100125", name: "Velka Oriden", email: "velka.oriden@gmail.com", status: "ACTIVE", investiment: 12380.10, ddi: 1, phone: "4156382491" },
                { id: "8100126", name: "Darek Vilmon", email: "darek.vilmon@gmail.com", status: "ACTIVE", investiment: 2870.90, ddi: 55, phone: "21987894561" },
                { id: "8100127", name: "Selvor Nikan", email: "selvor.nikan@gmail.com", status: "ACTIVE", investiment: 7680.30, ddi: 34, phone: "612548973" },
                { id: "8100128", name: "Mirena Volkar", email: "mirena.volkar@gmail.com", status: "INACTIVE", investiment: 350.80, ddi: 49, phone: "1523489765" },
                { id: "8100129", name: "Korvin Talek", email: "korvin.talek@gmail.com", status: "ACTIVE", investiment: 19650.00, ddi: 55, phone: "31991234567" },
                { id: "8100130", name: "Yelka Ronis", email: "yelka.ronis@gmail.com", status: "ACTIVE", investiment: 5410.20, ddi: 39, phone: "3345987210" },
                { id: "8100131", name: "Rovian Delmar", email: "rovian.delmar@gmail.com", status: "ACTIVE", investiment: 1120.60, ddi: 55, phone: "41988765432" },
                { id: "8100132", name: "Fenara Golven", email: "fenara.golven@gmail.com", status: "INACTIVE", investiment: 740.00, ddi: 52, phone: "5512349876" },
                { id: "8100133", name: "Zerik Montal", email: "zerik.montal@gmail.com", status: "ACTIVE", investiment: 8540.90, ddi: 55, phone: "11993456781" },
                { id: "8100134", name: "Nolvia Keran", email: "nolvia.keran@gmail.com", status: "ACTIVE", investiment: 6200.15, ddi: 33, phone: "614587923" },
                { id: "8100135", name: "Trevon Salik", email: "trevon.salik@gmail.com", status: "INACTIVE", investiment: 120.90, ddi: 54, phone: "1134678921" },
                { id: "8100136", name: "Calen Drivor", email: "calen.drivor@gmail.com", status: "ACTIVE", investiment: 3240.80, ddi: 55, phone: "85991239871" },
                { id: "8100137", name: "Voren Alvik", email: "voren.alvik@gmail.com", status: "ACTIVE", investiment: 15490.50, ddi: 44, phone: "7423456789" },
                { id: "8100138", name: "Lunek Sarion", email: "lunek.sarion@gmail.com", status: "ACTIVE", investiment: 9780.00, ddi: 81, phone: "9012345678" },
                { id: "8100139", name: "Merian Kovel", email: "merian.kovel@gmail.com", status: "INACTIVE", investiment: 680.20, ddi: 55, phone: "71984567812" },
                { id: "8100140", name: "Jorek Valsen", email: "jorek.valsen@gmail.com", status: "ACTIVE", investiment: 4320.65, ddi: 351, phone: "938451267" },
                { id: "8100141", name: "Selian Norvek", email: "selian.norvek@gmail.com", status: "ACTIVE", investiment: 2850.10, ddi: 56, phone: "987654321" },
                { id: "8100142", name: "Torvik Larem", email: "torvik.larem@gmail.com", status: "INACTIVE", investiment: 410.75, ddi: 55, phone: "61993456127" },
                { id: "8100143", name: "Arelon Divar", email: "arelon.divar@gmail.com", status: "ACTIVE", investiment: 13900.00, ddi: 1, phone: "6174589320" },
                { id: "8100144", name: "Kelvia Rovan", email: "kelvia.rovan@gmail.com", status: "ACTIVE", investiment: 7645.30, ddi: 55, phone: "27991234678" },
                { id: "8100145", name: "Darian Velkor", email: "darian.velkor@gmail.com", status: "ACTIVE", investiment: 2150.55, ddi: 34, phone: "678912345" },
                { id: "8100146", name: "Velen Orvik", email: "velen.orvik@gmail.com", status: "INACTIVE", investiment: 920.90, ddi: 49, phone: "1765432981" },
                { id: "8100147", name: "Nerik Volsen", email: "nerik.volsen@gmail.com", status: "ACTIVE", investiment: 8300.45, ddi: 55, phone: "11987891234" },
                { id: "8100148", name: "Korlen Savik", email: "korlen.savik@gmail.com", status: "ACTIVE", investiment: 5890.20, ddi: 39, phone: "3487651234" },
                { id: "8100149", name: "Yarven Delik", email: "yarven.delik@gmail.com", status: "ACTIVE", investiment: 1640.00, ddi: 55, phone: "47993456128" },
                { id: "8100150", name: "Belnor Kirev", email: "belnor.kirev@gmail.com", status: "INACTIVE", investiment: 295.80, ddi: 52, phone: "5589761234" },
                { id: "8100151", name: "Tarel Monvik", email: "tarel.monvik@gmail.com", status: "ACTIVE", investiment: 14750.30, ddi: 55, phone: "31998761234" },
                { id: "8100152", name: "Rovek Salnor", email: "rovek.salnor@gmail.com", status: "ACTIVE", investiment: 2580.60, ddi: 33, phone: "645678912" },
                { id: "8100153", name: "Denvor Kalen", email: "denvor.kalen@gmail.com", status: "ACTIVE", investiment: 6980.10, ddi: 55, phone: "83993456123" },
                { id: "8100154", name: "Variel Norsen", email: "variel.norsen@gmail.com", status: "INACTIVE", investiment: 510.00, ddi: 54, phone: "1123459876" },
                { id: "8100155", name: "Lorvik Menar", email: "lorvik.menar@gmail.com", status: "ACTIVE", investiment: 9350.45, ddi: 44, phone: "7912345680" },
                { id: "8100156", name: "Kelnor Vadian", email: "kelnor.vadian@gmail.com", status: "ACTIVE", investiment: 3120.90, ddi: 55, phone: "51994567812" },
                { id: "8100157", name: "Seron Tilvek", email: "seron.tilvek@gmail.com", status: "ACTIVE", investiment: 24180.50, ddi: 81, phone: "8034567891" },
                { id: "8100158", name: "Malven Orkan", email: "malven.orkan@gmail.com", status: "INACTIVE", investiment: 880.40, ddi: 55, phone: "62995678123" },
                { id: "8100159", name: "Norian Selvek", email: "norian.selvek@gmail.com", status: "ACTIVE", investiment: 5710.70, ddi: 351, phone: "917564328" },
                { id: "8100160", name: "Ferik Jorven", email: "ferik.jorven@gmail.com", status: "ACTIVE", investiment: 3925.15, ddi: 56, phone: "934567812" },
                { id: "8100161", name: "Virel Dorsan", email: "virel.dorsan@gmail.com", status: "ACTIVE", investiment: 10980.00, ddi: 55, phone: "71992345618" },
                { id: "8100162", name: "Orelk Tavin", email: "orelk.tavin@gmail.com", status: "INACTIVE", investiment: 770.35, ddi: 1, phone: "5034567892" },
                { id: "1238833", name: "Frederico Henrique Albuquerque", email: "fredericohenri@gmail.com", status: "ACTIVE", investiment: 4500, ddi: 55, phone: "19123456789" },
                { id: "4564566", name: "Maria Arruda", email: "arrudamaria@gmail.com", status: "ACTIVE", investiment: 7888.89, ddi: 55, phone: "19123456789" },
                { id: "4566777", name: "Rebeca Castro", email: "rebecacastro@gmail.com", status: "INACTIVE", investiment: 500, ddi: 55, phone: "19123456789" },
                { id: "4566767", name: "Mateus Arruda", email: "mateusarruda@gmail.com", status: "ACTIVE", investiment: 1900.70, ddi: 55, phone: "19123456789" }];

            setNewData("clients", data);
            return data
        }
        return JSON.parse(data);
    }
    if (`${obj}` === "sales") {

        if (!data) {

            data = [
                {
                    id: "10001",
                    date: "2026-01-04",
                    client: { id: "8100123", name: "Lioran Vesco Alben" },
                    totalPrice: 3955.0,
                    products: [
                        { id: 900001, name: "Processador Intel Core i7-13700K", quantity: 1, price: 2400.0, tagColor: "#2964b3" },
                        { id: "900009", name: "Placa-Mãe MSI MAG B760 Tomahawk", quantity: 1, price: 1400.0, tagColor: "#7ed321" },
                        { id: "900024", name: "Pasta Térmica Arctic MX-6 4g", quantity: 2, price: 75.0, tagColor: "#0099ff" },
                        { id: "900049", name: "Abraçadeira de Nylon Preta 100 un", quantity: 1, price: 15.0, tagColor: "#050505" }
                    ]
                },
                {
                    id: "10002",
                    date: "2026-01-05",
                    client: { id: "8100125", name: "Velka Oriden" },
                    totalPrice: 7430.0,
                    products: [
                        { id: 900003, name: "Placa de Vídeo RTX 4070 Ti Super", quantity: 1, price: 5600.0, tagColor: "#76b900" },
                        { id: 900008, name: "Placa-Mãe ASUS ROG Strix B650-A", quantity: 1, price: 1650.0, tagColor: "#f5a623" },
                        { id: 900021, name: "Cabo HDMI 2.1 Baseus 3 Metros", quantity: 2, price: 90.0, tagColor: "#000000" }
                    ]
                },
                {
                    id: "10003",
                    date: "2026-01-07",
                    client: { id: "8100129", name: "Korvin Talek" },
                    totalPrice: 1475.0,
                    products: [
                        { id: 900016, name: "Mouse Logitech G Pro X Superlight 2", quantity: 1, price: 850.0, tagColor: "#bd10e0" },
                        { id: 900030, name: "Roteador ASUS RT-AX57 Wi-Fi 6", quantity: 1, price: 620.0, tagColor: "#4682b4" },
                        { id: 900046, name: "Limpa Telas Implastec 120ml + Pano", quantity: 1, price: 25.0, tagColor: "#1abc9c" }
                    ]
                },
                {
                    id: "10004",
                    date: "2026-01-10",
                    client: { id: "8100137", name: "Voren Alvik" },
                    totalPrice: 2420.0,
                    products: [
                        { id: 900014, name: "Monitor Gamer LG UltraGear 27 144Hz", quantity: 1, price: 1390.0, tagColor: "#b8e986" },
                        { id: 900018, name: "Headset HyperX Cloud III Wireless", quantity: 1, price: 990.0, tagColor: "#4a90e2" },
                        { id: 900044, name: "Suporte de Headset RGB Redragon", quantity: 1, price: 120.0, tagColor: "#2ecc71" }
                    ]
                },
                {
                    id: "10005",
                    date: "2026-01-12",
                    client: { id: "8100143", name: "Arelon Divar" },
                    totalPrice: 1110.0,
                    products: [
                        { id: 900010, name: "Fonte Corsair RM850x 850W Gold", quantity: 35, price: 890.0, tagColor: "#4a4a4a" },
                        { id: 900027, name: "Suporte de Monitor Articulado F80N", quantity: 1, price: 220.0, tagColor: "#222222" }
                    ]
                },
                {
                    id: "10006",
                    date: "2026-01-15",
                    client: { id: "8100151", name: "Tarel Monvik" },
                    totalPrice: 3940.0,
                    products: [
                        { id: 900004, name: "Placa de Vídeo Radeon RX 7800 XT", quantity: 1, price: 3800.0, tagColor: "#ed1c24" },
                        { id: 900031, name: "Switch Gigabit TP-Link 8 Portas", quantity: 1, price: 140.0, tagColor: "#008080" }
                    ]
                },
                {
                    id: "10007",
                    date: "2026-01-16",
                    client: { id: "8100157", name: "Seron Tilvek" },
                    totalPrice: 1205.0,
                    products: [
                        { id: 900017, name: "Teclado Mecânico Keychron K2 V2", quantity: 1, price: 750.0, tagColor: "#9013fe" },
                        { id: 900028, name: "Webcam Logitech C920s Pro HD", quantity: 1, price: 450.0, tagColor: "#111111" },
                        { id: 900092, name: "Malha Dessoldadora Hikari 2.0mm", quantity: 1, price: 20.0, tagColor: "#795548" }
                    ]
                },
                {
                    id: "10008",
                    date: "2026-01-19",
                    client: { id: "8100161", name: "Virel Dorsan" },
                    totalPrice: 3390.0,
                    products: [
                        { id: 900002, name: "Processador AMD Ryzen 7 7800X3D", quantity: 1, price: 2800.0, tagColor: "#e05326" },
                        { id: 900006, name: "SSD NVMe M.2 1TB Kingston KC3000", quantity: 1, price: 550.0, tagColor: "#29b39c" },
                        { id: 900040, name: "Adaptador Bluetooth 5.3 Baseus USB", quantity: 2, price: 60.0, tagColor: "#0055ff" }
                    ]
                },
                {
                    id: "10009",
                    date: "2026-01-22",
                    client: { id: "8100124", name: "Narev Solkin" },
                    totalPrice: 620.0,
                    products: [
                        { id: 900032, name: "Placa de Som Externa Creative Sound Blaster", quantity: 1, price: 480.0, tagColor: "#8b0000" },
                        { id: 900031, name: "Switch Gigabit TP-Link 8 Portas", quantity: 1, price: 140.0, tagColor: "#008080" }
                    ]
                },
                {
                    id: "10010",
                    date: "2026-01-24",
                    client: { id: "8100127", name: "Selvor Nikan" },
                    totalPrice: 1820.0,
                    products: [
                        { id: 900019, name: "Cadeira Gamer DT3 Sports Elise", quantity: 1, price: 1450.0, tagColor: "#50e3c2" },
                        { id: 900050, name: "Estabilizador NHS Active II 1000VA", quantity: 1, price: 340.0, tagColor: "#d35400" },
                        { id: 900059, name: "Kit Parafusos PC Embalagem 50 un", quantity: 1, price: 30.0, tagColor: "#95a5a6" }
                    ]
                },
                {
                    id: "10011",
                    date: "2026-01-26",
                    client: { id: "8100133", name: "Zerik Montal" },
                    totalPrice: 1750.0,
                    products: [
                        { id: 900005, name: "Memória RAM DDR5 32GB (2x16GB) 6000MHz", quantity: 1, price: 950.0, tagColor: "#8029b3" },
                        { id: 900011, name: "Water Cooler DeepCool LT720 360mm", quantity: 1, price: 780.0, tagColor: "#12a4b5" },
                        { id: 900041, name: "Adaptador Wi-Fi 6 TP-Link Archer USB", quantity: 1, price: 190.0, tagColor: "#00a2ed" }
                    ]
                },
                {
                    id: "10012",
                    date: "2026-01-28",
                    client: { id: "8100138", name: "Lunek Sarion" },
                    totalPrice: 1405.0,
                    products: [
                        { id: 900012, name: "Gabinete Lian Li O11 Dynamic EVO", quantity: 1, price: 1100.0, tagColor: "#d0021b" },
                        { id: 900043, name: "Soundbar Redragon Adiemus RGB", quantity: 1, price: 210.0, tagColor: "#e74c3c" },
                        { id: 900091, name: "Fluxo de Solda Amtech NC-559 10g", quantity: 1, price: 65.0, tagColor: "#ff9800" },
                        { id: 900093, name: "Fita Isolante Térmica Kapton 20mm", quantity: 1, price: 45.0, tagColor: "#ffc107" }
                    ]
                },
                {
                    id: "10013",
                    date: "2026-01-29",
                    client: { id: "8100144", name: "Kelvia Rovan" },
                    totalPrice: 1820.0,
                    products: [
                        { id: 900020, name: "Microfone HyperX QuadCast S", quantity: 1, price: 1150.0, tagColor: "#ff2d55" },
                        { id: 900030, name: "Roteador ASUS RT-AX57 Wi-Fi 6", quantity: 1, price: 620.0, tagColor: "#4682b4" },
                        { id: 900041, name: "Adaptador Wi-Fi 6 TP-Link Archer USB", quantity: 1, price: 190.0, tagColor: "#00a2ed" }
                    ]
                },
                {
                    id: "10014",
                    date: "2026-01-31",
                    client: { id: "8100147", name: "Nerik Volsen" },
                    totalPrice: 2225.0,
                    products: [
                        { id: 900007, name: "SSD NVMe M.2 2TB Samsung 990 Pro", quantity: 1, price: 1200.0, tagColor: "#4a90e2" },
                        { id: 900018, name: "Headset HyperX Cloud III Wireless", quantity: 1, price: 990.0, tagColor: "#4a90e2" },
                        { id: 900045, name: "Organizador de Cabos Orico Velcro 5m", quantity: 1, price: 35.0, tagColor: "#34495e" }
                    ]
                },
                {
                    id: "10015",
                    date: "2026-02-01",
                    client: { id: "8100153", name: "Denvor Kalen" },
                    totalPrice: 1540.0,
                    products: [
                        { id: 900009, name: "Placa-Mãe MSI MAG B760 Tomahawk", quantity: 1, price: 1400.0, tagColor: "#7ed321" },
                        { id: 900031, name: "Switch Gigabit TP-Link 8 Portas", quantity: 1, price: 140.0, tagColor: "#008080" }
                    ]
                },
                {
                    id: "10016",
                    date: "2026-02-03",
                    client: { id: "8100155", name: "Lorvik Menar" },
                    totalPrice: 3615.0,
                    products: [
                        { id: 900002, name: "Processador AMD Ryzen 7 7800X3D", quantity: 1, price: 2800.0, tagColor: "#e05326" },
                        { id: 900011, name: "Water Cooler DeepCool LT720 360mm", quantity: 1, price: 780.0, tagColor: "#12a4b5" },
                        { id: 900045, name: "Organizador de Cabos Orico Velcro 5m", quantity: 1, price: 35.0, tagColor: "#34495e" }
                    ]
                },
                {
                    id: "10017",
                    date: "2026-02-05",
                    client: { id: "8100126", name: "Darek Vilmon" },
                    totalPrice: 530.0,
                    products: [
                        { id: 900033, name: "Controle Xbox Wireless Carbon Black", quantity: 1, price: 430.0, tagColor: "#1a1a1a" },
                        { id: 900060, name: "Placa de Rede PCI-e Gigabit TP-Link", quantity: 1, price: 95.0, tagColor: "#2980b9" },
                        { id: 900047, name: "Ar Comprimido Implastec Aerossol", quantity: 1, price: 45.0, tagColor: "#7f8c8d" }
                    ]
                },
                {
                    id: "10018",
                    date: "2026-02-07",
                    client: { id: "8100130", name: "Yelka Ronis" },
                    totalPrice: 1285.0,
                    products: [
                        { id: 900010, name: "Fonte Corsair RM850x 850W Gold", quantity: 1, price: 890.0, tagColor: "#4a4a4a" },
                        { id: 900042, name: "Caixa de Som Edifier X100+ 2.1", quantity: 1, price: 380.0, tagColor: "#8e44ad" },
                        { id: 900046, name: "Limpa Telas Implastec 120ml + Pano", quantity: 1, price: 25.0, tagColor: "#1abc9c" }
                    ]
                },
                {
                    id: "10019",
                    date: "2026-02-10",
                    client: { id: "8100134", name: "Nolvia Keran" },
                    totalPrice: 2220.0,
                    products: [
                        { id: 900013, name: "Cooler para Processador AK400 Digital", quantity: 1, price: 240.0, tagColor: "#9b9b9b" },
                        { id: 900015, name: "Monitor ASUS TUF Gaming 31.5 Curvo", quantity: 1, price: 2100.0, tagColor: "#f8e71c" }
                    ]
                },
                {
                    id: "10020",
                    date: "2026-02-12",
                    client: { id: "8100140", name: "Jorek Valsen" },
                    totalPrice: 1050.0,
                    products: [
                        { id: 900016, name: "Mouse Logitech G Pro X Superlight 2", quantity: 1, price: 850.0, tagColor: "#bd10e0" },
                        { id: 900025, name: "Mousepad Extra Grande Corsair MM350", quantity: 1, price: 190.0, tagColor: "#ffcc00" },
                        { id: 900077, name: "Grip Tape para Mouse Logitech G Pro", quantity: 1, price: 50.0, tagColor: "#333333" }
                    ]
                },
                {
                    id: "10021",
                    date: "2026-02-14",
                    client: { id: "8100141", name: "Selian Norvek" },
                    totalPrice: 1390.0,
                    products: [
                        { id: 900017, name: "Teclado Mecânico Keychron K2 V2", quantity: 1, price: 750.0, tagColor: "#9013fe" },
                        { id: 900030, name: "Roteador ASUS RT-AX57 Wi-Fi 6", quantity: 1, price: 620.0, tagColor: "#4682b4" },
                        { id: 900041, name: "Adaptador Wi-Fi 6 TP-Link Archer USB", quantity: 1, price: 190.0, tagColor: "#00a2ed" }
                    ]
                },
                {
                    id: "10022",
                    date: "2026-02-17",
                    client: { id: "8100145", name: "Darian Velkor" },
                    totalPrice: 1475.0,
                    products: [
                        { id: 900018, name: "Headset HyperX Cloud III Wireless", quantity: 1, price: 990.0, tagColor: "#4a90e2" },
                        { id: 900032, name: "Placa de Som Externa Creative Sound Blaster", quantity: 1, price: 480.0, tagColor: "#8b0000" }
                    ]
                },
                {
                    id: "10023",
                    date: "2026-02-19",
                    client: { id: "8100149", name: "Yarven Delik" },
                    totalPrice: 2220.0,
                    products: [
                        { id: 900019, name: "Cadeira Gamer DT3 Sports Elise", quantity: 1, price: 1450.0, tagColor: "#50e3c2" },
                        { id: 900026, name: "Kit Ventoinhas 3x Corsair ICUE AR120", quantity: 2, price: 390.0, tagColor: "#ff6600" }
                    ]
                },
                {
                    id: "10024",
                    date: "2026-02-21",
                    client: { id: "8100156", name: "Kelnor Vadian" },
                    totalPrice: 1820.0,
                    products: [
                        { id: 900020, name: "Microfone HyperX QuadCast S", quantity: 1, price: 1150.0, tagColor: "#ff2d55" },
                        { id: 900030, name: "Roteador ASUS RT-AX57 Wi-Fi 6", quantity: 1, price: 620.0, tagColor: "#4682b4" },
                        { id: 900041, name: "Adaptador Wi-Fi 6 TP-Link Archer USB", quantity: 1, price: 190.0, tagColor: "#00a2ed" }
                    ]
                },
                {
                    id: "10025",
                    date: "2026-02-23",
                    client: { id: "8100159", name: "Norian Selvek" },
                    totalPrice: 355.0,
                    products: [
                        { id: 900023, name: "Hub USB-C 7 em 1 Baseus Metal", quantity: 1, price: 280.0, tagColor: "#666666" },
                        { id: 900024, name: "Pasta Térmica Arctic MX-6 4g", quantity: 1, price: 75.0, tagColor: "#0099ff" }
                    ]
                },
                {
                    id: "10026",
                    date: "2026-02-25",
                    client: { id: "8100160", name: "Ferik Jorven" },
                    totalPrice: 830.0,
                    products: [
                        { id: 900028, name: "Webcam Logitech C920s Pro HD", quantity: 1, price: 450.0, tagColor: "#111111" },
                        { id: 900042, name: "Caixa de Som Edifier X100+ 2.1", quantity: 1, price: 380.0, tagColor: "#8e44ad" }
                    ]
                },
                {
                    id: "10027",
                    date: "2026-02-26",
                    client: { id: "8100123", name: "Lioran Vesco Alben" },
                    totalPrice: 350.0,
                    products: [
                        { id: 900025, name: "Mousepad Extra Grande Corsair MM350", quantity: 1, price: 190.0, tagColor: "#ffcc00" },
                        { id: 900056, name: "Espuma Acústica Isolante 50x50 Kit 10", quantity: 1, price: 160.0, tagColor: "#34495e" }
                    ]
                },
                {
                    id: "10028",
                    date: "2026-02-28",
                    client: { id: "8100125", name: "Velka Oriden" },
                    totalPrice: 610.0,
                    products: [
                        { id: 900026, name: "Kit Ventoinhas 3x Corsair ICUE AR120", quantity: 1, price: 390.0, tagColor: "#ff6600" },
                        { id: 900027, name: "Suporte de Monitor Articulado F80N", quantity: 1, price: 220.0, tagColor: "#222222" }
                    ]
                },
                {
                    id: "10029",
                    date: "2026-03-02",
                    client: { id: "8100128", name: "Mirena Volkar" },
                    totalPrice: 570.0,
                    products: [
                        { id: 900028, name: "Webcam Logitech C920s Pro HD", quantity: 1, price: 450.0, tagColor: "#111111" },
                        { id: 900036, name: "Filtro de Linha Clamper Multi Energia 8", quantity: 1, price: 120.0, tagColor: "#555555" }
                    ]
                },
                {
                    id: "10030",
                    date: "2026-03-04",
                    client: { id: "8100129", name: "Korvin Talek" },
                    totalPrice: 620.0,
                    products: [
                        { id: 900037, name: "Nobreak Intelbras Attiv 600VA", quantity: 1, price: 490.0, tagColor: "#2f4f4f" },
                        { id: 900029, name: "Fita LED RGB Inteligente EKAZA 5m", quantity: 1, price: 130.0, tagColor: "#ff00cc" }
                    ]
                },
                {
                    id: "10031",
                    date: "2026-03-06",
                    client: { id: "8100131", name: "Rovian Delmar" },
                    totalPrice: 605.0,
                    products: [
                        { id: 900038, name: "HD Externo Portátil Seagate 2TB", quantity: 1, price: 520.0, tagColor: "#000080" },
                        { id: 900039, name: "Pen Drive SanDisk Ultra 128GB USB 3.0", quantity: 1, price: 85.0, tagColor: "#ff0000" }
                    ]
                },
                {
                    id: "10032",
                    date: "2026-03-08",
                    client: { id: "8100132", name: "Fenara Golven" },
                    totalPrice: 200.0,
                    products: [
                        { id: 900039, name: "Pen Drive SanDisk Ultra 128GB USB 3.0", quantity: 1, price: 85.0, tagColor: "#ff0000" },
                        { id: 900053, name: "Anel de Luz LED Ring Light Desk 10 polegadas", quantity: 1, price: 110.0, tagColor: "#f1c40f" }
                    ]
                },
                {
                    id: "10033",
                    date: "2026-03-10",
                    client: { id: "8100135", name: "Trevon Salik" },
                    totalPrice: 240.0,
                    products: [
                        { id: 900040, name: "Adaptador Bluetooth 5.3 Baseus USB", quantity: 1, price: 60.0, tagColor: "#0055ff" },
                        { id: 900054, name: "Braço Articulado para Microfone Elgin", quantity: 1, price: 180.0, tagColor: "#2980b9" }
                    ]
                },
                {
                    id: "10034",
                    date: "2026-03-12",
                    client: { id: "8100136", name: "Calen Drivor" },
                    totalPrice: 285.0,
                    products: [
                        { id: 900041, name: "Adaptador Wi-Fi 6 TP-Link Archer USB", quantity: 1, price: 190.0, tagColor: "#00a2ed" },
                        { id: 900055, name: "Filtro Anti-Pop para Microfone Shure", quantity: 1, price: 95.0, tagColor: "#c0392b" }
                    ]
                },
                {
                    id: "10035",
                    date: "2026-03-15",
                    client: { id: "8100137", name: "Voren Alvik" },
                    totalPrice: 540.0,
                    products: [
                        { id: 900042, name: "Caixa de Som Edifier X100+ 2.1", quantity: 1, price: 380.0, tagColor: "#8e44ad" },
                        { id: 900056, name: "Espuma Acústica Isolante 50x50 Kit 10", quantity: 1, price: 160.0, tagColor: "#34495e" }
                    ]
                },
                {
                    id: "10036",
                    date: "2026-03-17",
                    client: { id: "8100138", name: "Lunek Sarion" },
                    totalPrice: 860.0,
                    products: [
                        { id: 900043, name: "Soundbar Redragon Adiemus RGB", quantity: 1, price: 210.0, tagColor: "#e74c3c" },
                        { id: 900057, name: "Gabinete Corsair 4000D Airflow", quantity: 1, price: 650.0, tagColor: "#7f8c8d" }
                    ]
                },
                {
                    id: "10037",
                    date: "2026-03-19",
                    client: { id: "8100139", name: "Merian Kovel" },
                    totalPrice: 1370.0,
                    products: [
                        { id: 900044, name: "Suporte de Headset RGB Redragon", quantity: 1, price: 120.0, tagColor: "#2ecc71" },
                        { id: 900058, name: "Gabinete Nzxt H9 Flow Mid Tower", quantity: 1, price: 1250.0, tagColor: "#ffffff" }
                    ]
                },
                {
                    id: "10038",
                    date: "2026-03-21",
                    client: { id: "8100142", name: "Torvik Larem" },
                    totalPrice: 130.0,
                    products: [
                        { id: 900045, name: "Organizador de Cabos Orico Velcro 5m", quantity: 1, price: 35.0, tagColor: "#34495e" },
                        { id: 900060, name: "Placa de Rede PCI-e Gigabit TP-Link", quantity: 1, price: 95.0, tagColor: "#2980b9" }
                    ]
                },
                {
                    id: "10039",
                    date: "2026-03-23",
                    client: { id: "8100143", name: "Arelon Divar" },
                    totalPrice: 305.0,
                    products: [
                        { id: 900046, name: "Limpa Telas Implastec 120ml + Pano", quantity: 1, price: 25.0, tagColor: "#1abc9c" },
                        { id: 900061, name: "Cooler Fan Noctua NF-A12x25 PWM", quantity: 1, price: 280.0, tagColor: "#6e473b" }
                    ]
                },
                {
                    id: "10040",
                    date: "2026-03-25",
                    client: { id: "8100144", name: "Kelvia Rovan" },
                    totalPrice: 965.0,
                    products: [
                        { id: 900047, name: "Ar Comprimido Implastec Aerossol", quantity: 1, price: 45.0, tagColor: "#7f8c8d" },
                        { id: 900062, name: "Placa de Vídeo GTX 1650 Speedster", quantity: 1, price: 920.0, tagColor: "#76b900" }
                    ]
                },
                {
                    id: "10041",
                    date: "2026-03-26",
                    client: { id: "8100146", name: "Velen Orvik" },
                    totalPrice: 590.0,
                    products: [
                        { id: 900048, name: "Kit de Ferramentas de Precisão iFixit", quantity: 1, price: 320.0, tagColor: "#2c3e50" },
                        { id: 900063, name: "SSD SATA III 480GB Crucial BX500", quantity: 1, price: 270.0, tagColor: "#004488" }
                    ]
                },
                {
                    id: "10042",
                    date: "2026-03-28",
                    client: { id: "8100147", name: "Nerik Volsen" },
                    totalPrice: 355.0,
                    products: [
                        { id: 900049, name: "Abraçadeira de Nylon Preta 100 un", quantity: 1, price: 15.0, tagColor: "#050505" },
                        { id: 900064, name: "HD Interno 1TB Western Digital Blue", quantity: 1, price: 340.0, tagColor: "#0066cc" }
                    ]
                },
                {
                    id: "10043",
                    date: "2026-03-30",
                    client: { id: "8100148", name: "Korlen Savik" },
                    totalPrice: 1190.0,
                    products: [
                        { id: 900050, name: "Estabilizador NHS Active II 1000VA", quantity: 1, price: 340.0, tagColor: "#d35400" },
                        { id: 900065, name: "HD Interno 4TB Seagate IronWolf NAS", quantity: 1, price: 850.0, tagColor: "#cc0000" }
                    ]
                },
                {
                    id: "10044",
                    date: "2026-04-01",
                    client: { id: "8100150", name: "Belnor Kirev" },
                    totalPrice: 1280.0,
                    products: [
                        { id: 900051, name: "Placa de Captura Elgato Cam Link 4K", quantity: 1, price: 890.0, tagColor: "#16a085" },
                        { id: 900066, name: "Controladora de Fans Razer Chroma RGB", quantity: 1, price: 390.0, tagColor: "#00ff00" }
                    ]
                },
                {
                    id: "10045",
                    date: "2026-04-03",
                    client: { id: "8100151", name: "Tarel Monvik" },
                    totalPrice: 1480.0,
                    products: [
                        { id: 900052, name: "Stream Deck Elgato MK.2 15 Teclas", quantity: 1, price: 1190.0, tagColor: "#27ae60" },
                        { id: 900067, name: "Suporte Vertical para Placa de Vídeo", quantity: 1, price: 290.0, tagColor: "#5d3f8a" }
                    ]
                },
                {
                    id: "10046",
                    date: "2026-04-05",
                    client: { id: "8100152", name: "Rovek Salnor" },
                    totalPrice: 260.0,
                    products: [
                        { id: 900053, name: "Anel de Luz LED Ring Light Desk 10", quantity: 1, price: 110.0, tagColor: "#f1c40f" },
                        { id: 900068, name: "Cabo Extensor Sleeved Kit Liketec", quantity: 1, price: 150.0, tagColor: "#ff0055" }
                    ]
                },
                {
                    id: "10047",
                    date: "2026-04-07",
                    client: { id: "8100153", name: "Denvor Kalen" },
                    totalPrice: 1030.0,
                    products: [
                        { id: 900054, name: "Braço Articulado para Microfone Elgin", quantity: 1, price: 180.0, tagColor: "#2980b9" },
                        { id: 900069, name: "Placa-Mãe Gigabyte B550M AORUS Elite", quantity: 1, price: 850.0, tagColor: "#ff5500" }
                    ]
                },
                {
                    id: "10048",
                    date: "2026-04-09",
                    client: { id: "8100154", name: "Variel Norsen" },
                    totalPrice: 475.0,
                    products: [
                        { id: 900055, name: "Filtro Anti-Pop para Microfone Shure", quantity: 1, price: 95.0, tagColor: "#c0392b" },
                        { id: 900070, name: "Memória RAM DDR4 16GB Kingston Fury", quantity: 1, price: 380.0, tagColor: "#dd2222" }
                    ]
                },
                {
                    id: "10042",
                    date: "2026-04-12",
                    client: { id: "8100157", name: "Seron Tilvek" },
                    totalPrice: 520.0,
                    products: [
                        { id: 900056, name: "Espuma Acústica Isolante Kit 10", quantity: 1, price: 160.0, tagColor: "#34495e" },
                        { id: 900071, name: "Fonte MSI MAG A650BN 650W Bronze", quantity: 1, price: 360.0, tagColor: "#111111" }
                    ]
                },
                {
                    id: "10050",
                    date: "2026-04-14",
                    client: { id: "8100158", name: "Malven Orkan" },
                    totalPrice: 780.0,
                    products: [
                        { id: 900057, name: "Gabinete Corsair 4000D Airflow", quantity: 1, price: 650.0, tagColor: "#7f8c8d" },
                        { id: 900072, name: "Placa M.2 Wi-Fi + Bluetooth Intel", quantity: 1, price: 130.0, tagColor: "#0066ff" }
                    ]
                },
                {
                    id: "10051",
                    date: "2026-04-16",
                    client: { id: "8100161", name: "Virel Dorsan" },
                    totalPrice: 1295.0,
                    products: [
                        { id: 900058, name: "Gabinete Nzxt H9 Flow Mid Tower", quantity: 1, price: 1250.0, tagColor: "#ffffff" },
                        { id: 900073, name: "Mini Caixa de Som Multilaser 2.0", quantity: 1, price: 45.0, tagColor: "#ff3333" }
                    ]
                },
                {
                    id: "10052",
                    date: "2026-04-18",
                    client: { id: "8100162", name: "Orelk Tavin" },
                    totalPrice: 520.0,
                    products: [
                        { id: 900059, name: "Kit Parafusos PC Embalagem 50 un", quantity: 1, price: 30.0, tagColor: "#95a5a6" },
                        { id: 900074, name: "Headphone AKG K92 Estúdio", quantity: 1, price: 490.0, tagColor: "#ccaa00" }
                    ]
                },
                {
                    id: "10053",
                    date: "2026-04-20",
                    client: { id: "8100123", name: "Lioran Vesco Alben" },
                    totalPrice: 255.0,
                    products: [
                        { id: 900060, name: "Placa de Rede PCI-e Gigabit TP-Link", quantity: 1, price: 95.0, tagColor: "#2980b9" },
                        { id: 900075, name: "Mouse Gamer Razer DeathAdder Essential", quantity: 1, price: 160.0, tagColor: "#00ff00" }
                    ]
                },
                {
                    id: "10054",
                    date: "2026-04-22",
                    client: { id: "8100125", name: "Velka Oriden" },
                    totalPrice: 530.0,
                    products: [
                        { id: 900061, name: "Cooler Fan Noctua NF-A12x25 PWM", quantity: 1, price: 280.0, tagColor: "#6e473b" },
                        { id: 900076, name: "Teclado Mecânico Redragon Kumara", quantity: 1, price: 250.0, tagColor: "#ff0000" }
                    ]
                },
                {
                    id: "10055",
                    date: "2026-04-24",
                    client: { id: "8100126", name: "Darek Vilmon" },
                    totalPrice: 970.0,
                    products: [
                        { id: 900062, name: "Placa de Vídeo GTX 1650 Speedster", quantity: 1, price: 920.0, tagColor: "#76b900" },
                        { id: 900077, name: "Grip Tape para Mouse Logitech G Pro", quantity: 1, price: 50.0, tagColor: "#333333" }
                    ]
                },
                {
                    id: "10056",
                    date: "2026-04-26",
                    client: { id: "8100127", name: "Selvor Nikan" },
                    totalPrice: 310.0,
                    products: [
                        { id: 900063, name: "SSD SATA III 480GB Crucial BX500", quantity: 1, price: 270.0, tagColor: "#004488" },
                        { id: 900078, name: "Fealts p/ Mouse Hotline Games", quantity: 1, price: 40.0, tagColor: "#ffffff" }
                    ]
                },
                {
                    id: "10057",
                    date: "2026-04-28",
                    client: { id: "8100129", name: "Korvin Talek" },
                    totalPrice: 425.0,
                    products: [
                        { id: 900064, name: "HD Interno 1TB Western Digital Blue", quantity: 1, price: 340.0, tagColor: "#0066cc" },
                        { id: 900079, name: "Bungee para Mouse Redragon Chroma", quantity: 1, price: 85.0, tagColor: "#ff007f" }
                    ]
                },
                {
                    id: "10058",
                    date: "2026-04-30",
                    client: { id: "8100130", name: "Yelka Ronis" },
                    totalPrice: 1030.0,
                    products: [
                        { id: 900065, name: "HD Interno 4TB Seagate IronWolf NAS", quantity: 1, price: 850.0, tagColor: "#cc0000" },
                        { id: 900080, name: "Keycaps PBT Double Shot Rainbow Kit", quantity: 1, price: 180.0, tagColor: "#ff00ff" }
                    ]
                },
                {
                    id: "10059",
                    date: "2026-05-02",
                    client: { id: "8100133", name: "Zerik Montal" },
                    totalPrice: 455.0,
                    products: [
                        { id: 900066, name: "Controladora de Fans Razer Chroma RGB", quantity: 1, price: 390.0, tagColor: "#00ff00" },
                        { id: 900081, name: "Switch Mecânico Outemu Blue Box 24 un", quantity: 1, price: 65.0, tagColor: "#00aaff" }
                    ]
                },
                {
                    id: "10060",
                    date: "2026-05-04",
                    client: { id: "8100134", name: "Nolvia Keran" },
                    totalPrice: 320.0,
                    products: [
                        { id: 900067, name: "Suporte Vertical para Placa de Vídeo", quantity: 1, price: 290.0, tagColor: "#5d3f8a" },
                        { id: 900082, name: "Extrator de Switch e Keycap Keychron", quantity: 1, price: 30.0, tagColor: "#999999" }
                    ]
                },
                {
                    id: "10061",
                    date: "2026-05-06",
                    client: { id: "8100136", name: "Calen Drivor" },
                    totalPrice: 175.0,
                    products: [
                        { id: 900068, name: "Cabo Extensor Sleeved Kit Liketec", quantity: 1, price: 150.0, tagColor: "#ff0055" },
                        { id: 900083, name: "Alcool Isopropilico Implastec 250ml", quantity: 1, price: 25.0, tagColor: "#00bcd4" }
                    ]
                },
                {
                    id: "10062",
                    date: "2026-05-08",
                    client: { id: "8100137", name: "Voren Alvik" },
                    totalPrice: 890.0,
                    products: [
                        { id: 900069, name: "Placa-Mãe Gigabyte B550M AORUS Elite", quantity: 1, price: 850.0, tagColor: "#ff5500" },
                        { id: 900084, name: "Pincel Anti-Estatica ESD Kit com 4", quantity: 1, price: 40.0, tagColor: "#212121" }
                    ]
                },
                {
                    id: "10063",
                    date: "2026-05-11",
                    client: { id: "8100138", name: "Lunek Sarion" },
                    totalPrice: 415.0,
                    products: [
                        { id: 900070, name: "Memória RAM DDR4 16GB Kingston Fury", quantity: 1, price: 380.0, tagColor: "#dd2222" },
                        { id: 900085, name: "Pulseira Anti-Estatica com Cabo", quantity: 1, price: 35.0, tagColor: "#0000ff" }
                    ]
                },
                {
                    id: "10064",
                    date: "2026-05-13",
                    client: { id: "8100140", name: "Jorek Valsen" },
                    totalPrice: 510.0,
                    products: [
                        { id: 900071, name: "Fonte MSI MAG A650BN 650W Bronze", quantity: 1, price: 360.0, tagColor: "#111111" },
                        { id: 900086, name: "Testador de Fonte Digital ATX LCD", quantity: 1, price: 150.0, tagColor: "#ffeb3b" }
                    ]
                },
                {
                    id: "10065",
                    date: "2026-05-15",
                    client: { id: "8100141", name: "Selian Norvek" },
                    totalPrice: 320.0,
                    products: [
                        { id: 900072, name: "Placa M.2 Wi-Fi + Bluetooth Intel", quantity: 1, price: 130.0, tagColor: "#0066ff" },
                        { id: 900087, name: "Placa de Diagnóstico PC Analyzer", quantity: 1, price: 190.0, tagColor: "#4caf50" }
                    ]
                },
                {
                    id: "10066",
                    date: "2026-05-17",
                    client: { id: "8100143", name: "Arelon Divar" },
                    totalPrice: 125.0,
                    products: [
                        { id: 900073, name: "Mini Caixa de Som Multilaser 2.0", quantity: 1, price: 45.0, tagColor: "#ff3333" },
                        { id: 900088, name: "Gravador de Bios Eprom USB CH341A", quantity: 1, price: 80.0, tagColor: "#3f51b5" }
                    ]
                },
                {
                    id: "10067",
                    date: "2026-05-19",
                    client: { id: "8100144", name: "Kelvia Rovan" },
                    totalPrice: 970.0,
                    products: [
                        { id: 900074, name: "Headphone AKG K92 Estúdio", quantity: 1, price: 490.0, tagColor: "#ccaa00" },
                        { id: 900089, name: "Estação de Solda Hikari HK-936B", quantity: 1, price: 480.0, tagColor: "#ff5722" }
                    ]
                },
                {
                    id: "10068",
                    date: "2026-05-23",
                    client: { id: "8100145", name: "Darian Velkor" },
                    totalPrice: 270.0,
                    products: [
                        { id: 900075, name: "Mouse Gamer Razer DeathAdder Essential", quantity: 1, price: 160.0, tagColor: "#00ff00" },
                        { id: 900090, name: "Fio de Solda Estanho Cobix 500g", quantity: 1, price: 110.0, tagColor: "#607d8b" }
                    ]
                },
                {
                    id: "10069",
                    date: "2026-05-23",
                    client: { id: "8100147", name: "Nerik Volsen" },
                    totalPrice: 315.0,
                    products: [
                        { id: 900076, name: "Teclado Mecânico Redragon Kumara", quantity: 1, price: 250.0, tagColor: "#ff0000" },
                        { id: 900091, name: "Fluxo de Solda Amtech NC-559 10g", quantity: 1, price: 65.0, tagColor: "#ff9800" }
                    ]
                },
                {
                    id: "10070",
                    date: "2026-05-25",
                    client: { id: "8100148", name: "Korlen Savik" },
                    totalPrice: 70.0,
                    products: [
                        { id: 900077, name: "Grip Tape para Mouse Logitech G Pro", quantity: 1, price: 50.0, tagColor: "#333333" },
                        { id: 900092, name: "Malha Dessoldadora Hikari 2.0mm", quantity: 1, price: 20.0, tagColor: "#795548" }
                    ]
                },
                {
                    id: "10071",
                    date: "2026-05-27",
                    client: { id: "8100149", name: "Yarven Delik" },
                    totalPrice: 85.0,
                    products: [
                        { id: 900078, name: "Fealts p/ Mouse Hotline Games", quantity: 1, price: 40.0, tagColor: "#ffffff" },
                        { id: 900093, name: "Fita Isolante Térmica Kapton 20mm", quantity: 1, price: 45.0, tagColor: "#ffc107" }
                    ]
                },
                {
                    id: "10072",
                    date: "2026-05-29",
                    client: { id: "8100151", name: "Tarel Monvik" },
                    totalPrice: 215.0,
                    products: [
                        { id: 900079, name: "Bungee para Mouse Redragon Chroma", quantity: 1, price: 85.0, tagColor: "#ff007f" },
                        { id: 900094, name: "Manta Magnetica para Bancada", quantity: 1, price: 130.0, tagColor: "#009688" }
                    ]
                },
                {
                    id: "10073",
                    date: "2026-05-31",
                    client: { id: "8100153", name: "Denvor Kalen" },
                    totalPrice: 440.0,
                    products: [
                        { id: 900080, name: "Keycaps PBT Double Shot Rainbow Kit", quantity: 1, price: 180.0, tagColor: "#ff00ff" },
                        { id: 900095, name: "Lupa de Bancada com Luminaria LED", quantity: 1, price: 260.0, tagColor: "#9e9e9e" }
                    ]
                },
                {
                    id: "10074",
                    date: "2026-06-01",
                    client: { id: "8100155", name: "Lorvik Menar" },
                    totalPrice: 175.0,
                    products: [
                        { id: 900081, name: "Switch Mecânico Outemu Blue Box 24 un", quantity: 1, price: 65.0, tagColor: "#00aaff" },
                        { id: 900096, name: "Multímetro Digital Minipa ET-1002", quantity: 1, price: 110.0, tagColor: "#ff5722" }
                    ]
                },
                {
                    id: "10075",
                    date: "2026-06-03",
                    client: { id: "8100156", name: "Kelnor Vadian" },
                    totalPrice: 115.0,
                    products: [
                        { id: 900082, name: "Extrator de Switch e Keycap Keychron", quantity: 1, price: 30.0, tagColor: "#999999" },
                        { id: 900097, name: "Alicate Crimpador de Cabo de Rede", quantity: 1, price: 85.0, tagColor: "#111111" }
                    ]
                },
                {
                    id: "10076",
                    date: "2026-06-05",
                    client: { id: "8100157", name: "Seron Tilvek" },
                    totalPrice: 70.0,
                    products: [
                        { id: 900083, name: "Alcool Isopropilico Implastec 250ml", quantity: 1, price: 25.0, tagColor: "#00bcd4" },
                        { id: 900098, name: "Testador de Cabo de Rede RJ45/RJ11", quantity: 1, price: 45.0, tagColor: "#ffeb3b" }
                    ]
                },
                {
                    id: "10077",
                    date: "2026-06-06",
                    client: { id: "8100159", name: "Norian Selvek" },
                    totalPrice: 115.0,
                    products: [
                        { id: 900084, name: "Pincel Anti-Estatica ESD Kit com 4", quantity: 1, price: 40.0, tagColor: "#212121" },
                        { id: 900099, name: "Conector RJ45 Cat6 Pacote 50 un", quantity: 1, price: 75.0, tagColor: "#e91e63" }
                    ]
                },
                {
                    id: "10078",
                    date: "2026-06-08",
                    client: { id: "8100160", name: "Ferik Jorven" },
                    totalPrice: 80.0,
                    products: [
                        { id: 900085, name: "Pulseira Anti-Estatica com Cabo", quantity: 1, price: 35.0, tagColor: "#0000ff" },
                        { id: 900100, name: "Cabo de Rede Cat6 Nexans Metro", quantity: 10, price: 4.5, tagColor: "#03a9f4" }
                    ]
                },
                {
                    id: "10079",
                    date: "2026-06-10",
                    client: { id: "8100161", name: "Virel Dorsan" },
                    totalPrice: 390.0,
                    products: [
                        { id: 900086, name: "Testador de Fonte Digital ATX LCD", quantity: 1, price: 150.0, tagColor: "#ffeb3b" },
                        { id: 900013, name: "Cooler para Processador AK400 Digital", quantity: 1, price: 240.0, tagColor: "#9b9b9b" }
                    ]
                },
                {
                    id: "10080",
                    date: "2026-06-12",
                    client: { id: "8100123", name: "Lioran Vesco Alben" },
                    totalPrice: 275.0,
                    products: [
                        { id: 900087, name: "Placa de Diagnóstico PC Analyzer", quantity: 1, price: 190.0, tagColor: "#4caf50" },
                        { id: 900039, name: "Pen Drive SanDisk Ultra 128GB USB 3.0", quantity: 1, price: 85.0, tagColor: "#ff0000" }
                    ]
                },
                {
                    id: "10081",
                    date: "2026-06-14",
                    client: { id: "8100125", name: "Velka Oriden" },
                    totalPrice: 560.0,
                    products: [
                        { id: 900088, name: "Gravador de Bios Eprom USB CH341A", quantity: 1, price: 80.0, tagColor: "#3f51b5" },
                        { id: 900032, name: "Placa de Som Externa Creative Sound Blaster", quantity: 1, price: 480.0, tagColor: "#8b0000" }
                    ]
                },
                {
                    id: "10082",
                    date: "2026-06-15",
                    client: { id: "8100126", name: "Darek Vilmon" },
                    totalPrice: 590.0,
                    products: [
                        { id: 900089, name: "Estação de Solda Hikari HK-936B", quantity: 1, price: 480.0, tagColor: "#ff5722" },
                        { id: 900096, name: "Multímetro Digital Minipa ET-1002", quantity: 1, price: 110.0, tagColor: "#ff5722" }
                    ]
                },
                {
                    id: "10083",
                    date: "2026-06-17",
                    client: { id: "8100127", name: "Selvor Nikan" },
                    totalPrice: 200.0,
                    products: [
                        { id: 900090, name: "Fio de Solda Estanho Cobix 500g", quantity: 1, price: 110.0, tagColor: "#607d8b" },
                        { id: 900021, name: "Cabo HDMI 2.1 Baseus 3 Metros", quantity: 1, price: 90.0, tagColor: "#000000" }
                    ]
                },
                {
                    id: "10084",
                    date: "2026-06-19",
                    client: { id: "8100129", name: "Korvin Talek" },
                    totalPrice: 140.0,
                    products: [
                        { id: 900091, name: "Fluxo de Solda Amtech NC-559 10g", quantity: 1, price: 65.0, tagColor: "#ff9800" },
                        { id: 900024, name: "Pasta Térmica Arctic MX-6 4g", quantity: 1, price: 75.0, tagColor: "#0099ff" }
                    ]
                },
                {
                    id: "10085",
                    date: "2026-06-20",
                    client: { id: "8100130", name: "Yelka Ronis" },
                    totalPrice: 140.0,
                    products: [
                        { id: 900092, name: "Malha Dessoldadora Hikari 2.0mm", quantity: 1, price: 20.0, tagColor: "#795548" },
                        { id: 900036, name: "Filtro de Linha Clamper Multi Energia 8", quantity: 1, price: 120.0, tagColor: "#555555" }
                    ]
                },
                {
                    id: "10086",
                    date: "2026-06-22",
                    client: { id: "8100131", name: "Rovian Delmar" },
                    totalPrice: 130.0,
                    products: [
                        { id: 900093, name: "Fita Isolante Térmica Kapton 20mm", quantity: 1, price: 45.0, tagColor: "#ffc107" },
                        { id: 900039, name: "Pen Drive SanDisk Ultra 128GB USB 3.0", quantity: 1, price: 85.0, tagColor: "#ff0000" }
                    ]
                },
                {
                    id: "10087",
                    date: "2026-06-23",
                    client: { id: "8100133", name: "Zerik Montal" },
                    totalPrice: 260.0,
                    products: [
                        { id: 900094, name: "Manta Magnetica para Bancada", quantity: 2, price: 130.0, tagColor: "#009688" }
                    ]
                },
                {
                    id: "10088",
                    date: "2026-06-24",
                    client: { id: "8100134", name: "Nolvia Keran" },
                    totalPrice: 320.0,
                    products: [
                        { id: 900095, name: "Lupa de Bancada com Luminaria LED", quantity: 1, price: 260.0, tagColor: "#9e9e9e" },
                        { id: 900040, name: "Adaptador Bluetooth 5.3 Baseus USB", quantity: 1, price: 60.0, tagColor: "#0055ff" }
                    ]
                },
                {
                    id: "10089",
                    date: "2026-06-25",
                    client: { id: "8100136", name: "Calen Drivor" },
                    totalPrice: 200.0,
                    products: [
                        { id: 900096, name: "Multímetro Digital Minipa ET-1002", quantity: 1, price: 110.0, tagColor: "#ff5722" },
                        { id: 900021, name: "Cabo HDMI 2.1 Baseus 3 Metros", quantity: 1, price: 90.0, tagColor: "#000000" }
                    ]
                },
                {
                    id: "10090",
                    date: "2026-06-26",
                    client: { id: "8100137", name: "Voren Alvik" },
                    totalPrice: 120.0,
                    products: [
                        { id: 900097, name: "Alicate Crimpador de Cabo de Rede", quantity: 1, price: 85.0, tagColor: "#111111" },
                        { id: 900045, name: "Organizador de Cabos Orico Velcro 5m", quantity: 1, price: 35.0, tagColor: "#34495e" }
                    ]
                },
                {
                    id: "10091",
                    date: "2026-06-27",
                    client: { id: "8100138", name: "Lunek Sarion" },
                    totalPrice: 70.0,
                    products: [
                        { id: 900098, name: "Testador de Cabo de Rede RJ45/RJ11", quantity: 1, price: 45.0, tagColor: "#ffeb3b" },
                        { id: 900046, name: "Limpa Telas Implastec 120ml + Pano", quantity: 1, price: 25.0, tagColor: "#1abc9c" }
                    ]
                },
                {
                    id: "10092",
                    date: "2026-06-27",
                    client: { id: "8100143", name: "Arelon Divar" },
                    totalPrice: 150.0,
                    products: [
                        { id: 900099, name: "Conector RJ45 Cat6 Pacote 50 un", quantity: 2, price: 75.0, tagColor: "#e91e63" }
                    ]
                },
                {
                    id: "10093",
                    date: "2026-06-28",
                    client: { id: "8100144", name: "Kelvia Rovan" },
                    totalPrice: 135.0,
                    products: [
                        { id: 900100, name: "Cabo de Rede Cat6 Nexans Metro", quantity: 30, price: 4.5, tagColor: "#03a9f4" }
                    ]
                },
                {
                    id: "10094",
                    date: "2026-06-28",
                    client: { id: "8100147", name: "Nerik Volsen" },
                    totalPrice: 2425.0,
                    products: [
                        { id: 900001, name: "Processador Intel Core i7-13700K", quantity: 1, price: 2400.0, tagColor: "#2964b3" },
                        { id: 900046, name: "Limpa Telas Implastec 120ml + Pano", quantity: 1, price: 25.0, tagColor: "#1abc9c" }
                    ]
                },
                {
                    id: "10095",
                    date: "2026-06-29",
                    client: { id: "8100148", name: "Korlen Savik" },
                    totalPrice: 2885.0,
                    products: [
                        { id: 900002, name: "Processador AMD Ryzen 7 7800X3D", quantity: 1, price: 2800.0, tagColor: "#e05326" },
                        { id: 900022, name: "Cabo DisplayPort 1.4 IronFlex", quantity: 1, price: 85.0, tagColor: "#333333" }
                    ]
                },
                {
                    id: "10096",
                    date: "2026-06-29",
                    client: { id: "8100151", name: "Tarel Monvik" },
                    totalPrice: 5675.0,
                    products: [
                        { id: 900003, name: "Placa de Vídeo RTX 4070 Ti Super", quantity: 1, price: 5600.0, tagColor: "#76b900" },
                        { id: 900024, name: "Pasta Térmica Arctic MX-6 4g", quantity: 1, price: 75.0, tagColor: "#0099ff" }
                    ]
                },
                {
                    id: "10097",
                    date: "2026-06-30",
                    client: { id: "8100153", name: "Denvor Kalen" },
                    totalPrice: 3835.0,
                    products: [
                        { id: 900004, name: "Placa de Vídeo Radeon RX 7800 XT", quantity: 1, price: 3800.0, tagColor: "#ed1c24" },
                        { id: 900045, name: "Organizador de Cabos Orico Velcro 5m", quantity: 1, price: 35.0, tagColor: "#34495e" }
                    ]
                },
                {
                    id: "10100",
                    date: "2026-06-30",
                    client: { id: "8100155", name: "Lorvik Menar" },
                    totalPrice: 1040.0,
                    products: [
                        { id: 900005, name: "Memória RAM DDR5 32GB 6000MHz", quantity: 1, price: 950.0, tagColor: "#8029b3" },
                        { id: 900021, name: "Cabo HDMI 2.1 Baseus 3 Metros", quantity: 1, price: 90.0, tagColor: "#000000" }
                    ]
                },
                {
                    id: "10099",
                    date: "2026-06-30",
                    client: { id: "8100156", name: "Kelnor Vadian" },
                    totalPrice: 635.0,
                    products: [
                        { id: 900006, name: "SSD NVMe M.2 1TB Kingston KC3000", quantity: 1, price: 550.0, tagColor: "#29b39c" },
                        { id: 900022, name: "Cabo DisplayPort 1.4 IronFlex", quantity: 1, price: 85.0, tagColor: "#333333" }
                    ]
                },
                {
                    id: "10100",
                    date: "2026-06-30",
                    client: { id: "8100157", name: "Seron Tilvek" },
                    totalPrice: 1275.0,
                    products: [
                        { id: 900007, name: "SSD NVMe M.2 2TB Samsung 990 Pro", quantity: 1, price: 1200.0, tagColor: "#4a90e2" },
                        { id: 900024, name: "Pasta Térmica Arctic MX-6 4g", quantity: 1, price: 75.0, tagColor: "#0099ff" }
                    ]
                }
            ];

            setNewData("sales", data);
            return data
        }
        return JSON.parse(data)
    }
    if (`${obj}` === "cart") {
        if (!data) {
            data = [
                {
                    id: "743289",
                    client: { id: "8100123", name: "Lioran Vesco Alben" },
                    products: [
                        { id: "900001", name: "Processador Intel Core i7-13700K", quantity: 1, price: 2400.0, tagColor: "#2964b3" },
                        { id: "900005", name: "Memória RAM DDR5 32GB (2x16GB) 6000MHz", quantity: 2, price: 950.0, tagColor: "#8029b3" },
                        { id: "900006", name: "SSD NVMe M.2 1TB Kingston KC3000", quantity: 1, price: 550.0, tagColor: "#29b39c" }
                    ],
                    totalPrice: 4850.0
                },
                {
                    id: "159234",
                    client: { id: "8100125", name: "Velka Oriden" },
                    products: [
                        { id: "900003", name: "Placa de Vídeo RTX 4070 Ti Super", quantity: 1, price: 5600.0, tagColor: "#76b900" },
                        { id: "900010", name: "Fonte Corsair RM850x 850W Gold", quantity: 1, price: 890.0, tagColor: "#4a4a4a" },
                        { id: "900012", name: "Gabinete Lian Li O11 Dynamic EVO", quantity: 1, price: 1100.0, tagColor: "#d0021b" },
                        { id: "900016", name: "Mouse Logitech G Pro X Superlight 2", quantity: 1, price: 850.0, tagColor: "#bd10e0" }
                    ],
                    totalPrice: 8440.0
                },
                {
                    id: "884321",
                    client: { id: "8100126", name: "Darek Vilmon" },
                    products: [
                        { id: "900017", name: "Teclado Mecânico Keychron K2 V2", quantity: 1, price: 750.0, tagColor: "#9013fe" },
                        { id: "900018", name: "Headset HyperX Cloud III Wireless", quantity: 1, price: 990.0, tagColor: "#4a90e2" }
                    ],
                    totalPrice: 1740.0
                },
                {
                    id: "349012",
                    client: { id: "8100129", name: "Korvin Talek" },
                    products: [
                        { id: "900002", name: "Processador AMD Ryzen 7 7800X3D", quantity: 1, price: 2800.0, tagColor: "#e05326" },
                        { id: "900008", name: "Placa-Mãe ASUS ROG Strix B650-A", quantity: 1, price: 1650.0, tagColor: "#f5a623" },
                        { id: "900026", name: "Kit Ventoinhas 3x Corsair ICUE AR120", quantity: 3, price: 390.0, tagColor: "#ff6600" },
                        { id: "900057", name: "Gabinete Corsair 4000D Airflow", quantity: 1, price: 650.0, tagColor: "#7f8c8d" }
                    ],
                    totalPrice: 6270.0
                },
                {
                    id: "621984",
                    client: { id: "8100133", name: "Zerik Montal" },
                    products: [
                        { id: "900021", name: "Cabo HDMI 2.1 Baseus 3 Metros", quantity: 5, price: 90.0, tagColor: "#000000" },
                        { id: "900024", name: "Pasta Térmica Arctic MX-6 4g", quantity: 2, price: 75.0, tagColor: "#0099ff" },
                        { id: "900045", name: "Organizador de Cabos Orico Velcro 5m", quantity: 3, price: 35.0, tagColor: "#34495e" },
                        { id: "900046", name: "Limpa Telas Implastec 120ml + Pano", quantity: 2, price: 25.0, tagColor: "#1abc9c" },
                        { id: "900049", name: "Abraçadeira de Nylon Preta 100 un", quantity: 10, price: 15.0, tagColor: "#050505" }
                    ],
                    totalPrice: 905.0
                },
                {
                    id: "512789",
                    client: { id: "8100143", name: "Arelon Divar" },
                    products: [
                        { id: "900014", name: "Monitor Gamer LG UltraGear 27 144Hz", quantity: 2, price: 1390.0, tagColor: "#b8e986" },
                        { id: "900033", name: "Controle Xbox Wireless Carbon Black", quantity: 2, price: 430.0, tagColor: "#1a1a1a" },
                        { id: "900035", name: "Carregador de Pilhas Duracell + 4 Pilhas", quantity: 1, price: 160.0, tagColor: "#b5651d" }
                    ],
                    totalPrice: 3800.0
                },
                {
                    id: "904312",
                    client: { id: "8100147", name: "Nerik Volsen" },
                    products: [
                        { id: "900051", name: "Placa de Captura Elgato Cam Link 4K", quantity: 1, price: 890.0, tagColor: "#16a085" },
                        { id: "900052", name: "Stream Deck Elgato MK.2 15 Teclas", quantity: 1, price: 1190.0, tagColor: "#27ae60" },
                        { id: "900053", name: "Anel de Luz LED Ring Light Desk 10 polegadas", quantity: 1, price: 110.0, tagColor: "#f1c40f" },
                        { id: "900054", name: "Braço Articulado para Microfone Elgin", quantity: 1, price: 180.0, tagColor: "#2980b9" },
                        { id: "900020", name: "Microfone HyperX QuadCast S", quantity: 1, price: 1150.0, tagColor: "#ff2d55" },
                        { id: "900029", name: "Fita LED RGB Inteligente EKAZA 5m", quantity: 2, price: 130.0, tagColor: "#ff00cc" }
                    ],
                    totalPrice: 3780.0
                },
                {
                    id: "228941",
                    client: { id: "8100157", name: "Seron Tilvek" },
                    products: [
                        { id: "900004", name: "Placa de Vídeo Radeon RX 7800 XT", quantity: 1, price: 3800.0, tagColor: "#ed1c24" },
                        { id: "900009", name: "Placa-Mãe MSI MAG B760 Tomahawk", quantity: 1, price: 1400.0, tagColor: "#7ed321" },
                        { id: "900011", name: "Water Cooler DeepCool LT720 360mm", quantity: 1, price: 780.0, tagColor: "#12a4b5" }
                    ],
                    totalPrice: 5980.0
                },
                {
                    id: "410932",
                    client: { id: "4564566", name: "Maria Arruda" },
                    products: [
                        { id: "900019", name: "Cadeira Gamer DT3 Sports Elise", quantity: 1, price: 1450.0, tagColor: "#50e3c2" },
                        { id: "900025", name: "Mousepad Extra Grande Corsair MM350", quantity: 1, price: 190.0, tagColor: "#ffcc00" }
                    ],
                    totalPrice: 1640.0
                },
                {
                    id: "338219",
                    client: { id: "4566767", name: "Mateus Arruda" },
                    products: [
                        { id: "900094", name: "Manta Magnetica para Bancada 45x30cm", quantity: 1, price: 130.0, tagColor: "#009688" },
                        { id: "900096", name: "Multímetro Digital Minipa ET-1002", quantity: 1, price: 110.0, tagColor: "#ff5722" },
                        { id: "900048", name: "Kit de Ferramentas de Precisão iFixit", quantity: 1, price: 320.0, tagColor: "#2c3e50" }
                    ],
                    totalPrice: 560.0
                }
            ]

            setNewData("cart", data);
            return data
        }
        return JSON.parse(data)
    }
}

function renderClients(filter) {

    if (filter) {
        filter = filter.trim();

        var filtered;

        if (filter.length === 1) {
            filtered = clients.filter(l => l.name[0].toLowerCase() === filter.toLowerCase())
        } else {
            filtered = clients.filter(l => l.name.toLowerCase().includes(filter.toLowerCase()) || l.email.split("@")[0].toLowerCase().includes(filter.toLowerCase()))
        }

        if (filtered.length) {

            filtered.sort((a, b) => a.name.localeCompare(b.name))
            filtered.forEach(e => {
                const tableBody = document.getElementById("table-clients");
                tableBody.innerHTML = "";
                let html = "";

                filtered.forEach(e => {
                    let l;
                    l = `<tr class="table-clients-row">  
        <td> <div>${e.name}</div>
                            <p class="text-muted">${e.email.toLowerCase()}</p>
                        </td>
                        <td><span class="badge ${e.status.toUpperCase() === "ACTIVE" ? 'bg-success-subtle text-success ">Ativo' : 'bg-warning-subtle text-warning">Inativo'}</span></td >
                        <td class="text-primary fw-semibold">${e.investiment ? e.investiment.toLocaleString("pt-BR", { style: "currency", currency: "BRL" }) : "R$ 0,00"}</td>
                        <td class="manager-btn" client-id="${e.id}"><span class="text-primary edit-btn edit-client-btn" data-bs-toggle="modal"
                    data-bs-target="#modalUpdateClient"><i
                                    class="bi bi-pencil-fill"></i></span><span class="text-danger delete-btn delete-client-btn"><i
                                    class="bi bi-trash-fill"></i></span></td>
        </tr> `;
                    html += l;
                })
                tableBody.innerHTML = html;
            })
        } else {
            const tableBody = document.getElementById("table-clients");
            tableBody.innerHTML = "";
        }
    }

    if (filter === "" || !filter) {
        const tableBody = document.getElementById("table-clients");
        tableBody.innerHTML = "";
        let html = "";

        clients.sort((a, b) => a.name.localeCompare(b.name)).forEach(e => {
            let l;
            l = `<tr class="table-clients-row">  
        <td> <div>${e.name}</div>
                            <p class="text-muted">${e.email.toLowerCase()}</p>
                        </td>
                        <td><span class="badge ${e.status.toUpperCase() === "ACTIVE" ? 'bg-success-subtle text-success ">Ativo' : 'bg-warning-subtle text-warning">Inativo'}</span></td >
                        <td class="text-primary fw-semibold">${e.investiment ? parseFloat(e.investiment).toLocaleString("pt-BR", { style: "currency", currency: "BRL" }) : "R$ 0,00"}</td>
                        <td class="manager-btn" client-id="${e.id}"><span class="text-primary edit-btn edit-client-btn" data-bs-toggle="modal"
                    data-bs-target="#modalUpdateClient"><i
                                    class="bi bi-pencil-fill"></i></span><span class="text-danger delete-btn delete-client-btn"><i
                                    class="bi bi-trash-fill"></i></span></td>
        </tr> `;
            html += l;
        })
        tableBody.innerHTML = html;
    }
    managerClient()
}

function renderProducts() {
    const tableBody = document.getElementById("table-stock");
    tableBody.innerHTML = "";
    let html = "";

    products.sort((a, b) => a.name.localeCompare(b.name)).forEach(e => {
        let l
        l = `<tr>
                                <td>${e.name}</td>
                                <td>${e.stock}</td>
                                <td>${e.minStock}</td>
                                <td><span class="badge ${e.status.toLowerCase() === "normal" ? 'bg-success-subtle text-success">Normal' : 'bg-danger-subtle text-danger">Crítico'}</span></td >
                                <td>${parseFloat(e.price).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</td>
                                <td class="manager-btn" product-id="${e.id}"><span class="text-primary edit-btn edit-product-btn" data-bs-toggle="modal" data-bs-target="#modalUpdateProduct"><i
                                            class="bi bi-pencil-fill"></i></span><span class="text-danger delete-btn delete-product-btn"><i
                                            class="bi bi-trash-fill"></i></span></td>
                            </tr> `
        html += l;
    })
    tableBody.innerHTML = html;
    managerProduct()
    renderOptions();
}

function renderClientsDashboard() {

    const tableBody = document.getElementById("table-dashbord");
    tableBody.innerHTML = "";
    let html = "";

    clients.sort((a, b) => a.name.localeCompare(b.name)).forEach(e => {
        let l;
        l = `<tr>
                            <td class="info">#${e.id}</td>
                            <td class="info">${e.name}</td>
                            <td><span class="badge ${e.status.toUpperCase() === "ACTIVE" ? 'text-bg-success">Ativo' : 'text-bg-warning">Inativo'}</span></td >
                            <td class="info">${e.investiment ? parseFloat(e.investiment).toLocaleString("pt-BR", { style: "currency", currency: "BRL" }) : "R$ 0,00"}</td>
                            <td><a href="https://wa.me/${e.ddi + e.phone}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary">Chamar cliente</a></td>
                        </tr> `;
        html += l;
    })
    tableBody.innerHTML = html;
}

function renderCart() {
    const cartTable = document.getElementById("cartView");
    cartTable.innerHTML = "";
    let html = "";

    cart.forEach(e => {
        var l = `<div class="card shadow-sm mb-4">
                                <h5 class="card-header">Cliente: ${e.client.name}</h5>
                                <div class="card-body">
                                    <div class="table-body-cart overflow-y-auto">
                                        <table class="table">
                                            <thead>
                                                <th>Produto</th>
                                                <th>Quantidade</th>
                                                <th>Valor total</th>
                                            </thead>

                                            <tbody>

                                                ${e.products.map(i => `<tr>
                                                    <td><span id="cTag" class="badge text-truncate"
                                                            style="background-color: ${i.tagColor};">${i.name}</span>
                                                    </td>
                                                    <td p-id="${i.id}" cart-id="${e.id}"><button class="btn btn-outline-secondary decrease">-</button> <input
                                                            class="d-inline-block form-control qtt-cart" type="text"
                                                            value="${i.quantity}" maxlength="2"> <button
                                                            class="btn btn-outline-secondary increase">+</button></td>
                                                    <td><input cart-id="${e.id}" p-id="${i.id}" class="d-inline-block form-control BRL" type="text"
                                                            value="${parseFloat(i.price).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}"></td>
                                                </tr>`).join("")}
                                                        </tbody>
                                        </table>
                                    </div>
                                    <div class="d-flex justify-content-between mb-2 pt-2">
                                        <span>Total:</span>
                                        <div class="d-inline-block">
                                            R$ <input cart-id="${e.id}" class="d-inline-block form-control BRL total" type="text"
                                                value="${parseFloat(e.totalPrice).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}"></div>
                                    </div>
                                    <div class="d-flex gap-2">
                                        <button class="btn btn-danger w-100 rCart" cart-id="${e.id}">Excluir
                                            carrinho</button>
                                        <button class="btn btn-success w-100 cSale" cart-id="${e.id}">Concluir
                                            venda</button>
                                    </div>
                                </div>
                            </div>`
        html += l;
    })

    cartTable.innerHTML = html;
    toBRL([...document.querySelectorAll("#cartView .BRL")]);
    truncateBadge([...document.getElementById("cartView").getElementsByClassName("text-truncate")], 17);
    managerCart();

}

function renderSales() {

    var table = document.getElementById("table-sales");
    table.innerHTML = "";
    var html = "";

    sales.forEach(e => {

        var date = new Date(e.date);
        var date = date.toLocaleDateString();
        var l = `<tr>
                                <td>${date}</td>
                                <td>${e.client.name}</td>
                                <td class="text-success fw-semibold">${parseFloat(e.totalPrice).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</td>
                                <td class="manager-btn"><span class="text-primary edit-btn edit-btn-sales" data-bs-toggle="modal" data-bs-target="#modalUpdateSale" sale-id="${e.id}"><i
                                            class="bi bi-pencil-fill"></i></span><span class="text-danger delete-btn delete-btn-sales" sale-id="${e.id}"><i
                                            class="bi bi-trash-fill"></i></span></td>
                            </tr>`;


        html += l;
    })

    table.innerHTML = html;

    let semester = structuredClone(sales);
    semester = semester.filter(e => {
        var date = new Date(e.date);
        if (date.getMonth() < 6 && date.getFullYear() == 2026) {
            return e
        }
    })

    var ticket = document.getElementById("medium-ticket");
    ticket.innerHTML = "";
    ticket.innerHTML = "Ticket Médio: " + (parseFloat(months.january + months.february + months.march + months.april + months.may + months.june) / semester.length).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })



    managerSales()
}

function renderOptions() {

    let clientOption = document.getElementById("clients-options");
    let productOption = document.getElementById("products-options");

    clientOption.innerHTML = `<option selected value="">Selecione um cliente</option>`;
    productOption.innerHTML = `<option selected value="">Selecione um produto</option>`;

    var html = "";

    clients.forEach(e => {
        html += `<option value="${e.id}">${e.name}</option>`
    })

    clientOption.innerHTML += html;
    html = "";

    products.forEach(e => {
        html += `<option value="${e.id}">${e.name}</option>`
    })

    productOption.innerHTML += html
}

function adjustGrafic() {
    var criticList = document.getElementById("critic-list")
    var graficHeigth = document.getElementById("graficChart").style.height;
    var edit = `max-height: ${graficHeigth}`;
    criticList.style = edit;
}


let products = getSavedData("products")
let clients = getSavedData("clients");
let sales = getSavedData("sales");
let cart = getSavedData("cart");

renderClients();
renderProducts();
renderClientsDashboard();
renderCart();

let months = { january: 0, february: 0, march: 0, april: 0, may: 0, june: 0 };
function renderGrafic() {
    months = { january: 0, february: 0, march: 0, april: 0, may: 0, june: 0 };

    let semester = structuredClone(sales);
    semester = semester.filter(e => {
        var date = new Date(e.date);
        if (date.getMonth() < 6 && date.getFullYear() == 2026) {
            return e
        }
    })
    semester.forEach(e => {

        var date = new Date(e.date).getMonth();

        switch (date) {
            case 0:
                months.january += e.totalPrice;
                break;
            case 1:
                months.february += e.totalPrice;
                break;
            case 2:
                months.march += e.totalPrice;
                break;
            case 3:
                months.april += e.totalPrice;
                break;
            case 4:
                months.may += e.totalPrice;
                break;
            case 5:
                months.june += e.totalPrice;
                break;
            default:
        }


    });
    var dataMonths = [months.january, months.february, months.march, months.april, months.may, months.june,]

    const ctx = document.getElementById('graficChart');
    const labels = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho"];
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Vendas do mês',
                data: dataMonths,
                borderWidth: 1.5,
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            },
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });
}

function renderOverview() {
    var totalRevenue = document.getElementById("total-revenue").getElementsByTagName("h2")[0];
    var totalClients = document.getElementById("total-clients").getElementsByTagName("h2")[0];
    var totalStock = document.getElementById("total-stock").getElementsByTagName("h2")[0];
    var criticItems = document.getElementById("critic-items").getElementsByTagName("h2")[0];

    totalRevenue.innerHTML = ""
    totalRevenue.innerHTML = parseFloat(months.january + months.february + months.march + months.april + months.may + months.june).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

    totalClients.innerHTML = "";
    totalClients.innerHTML = clients.length

    totalStock.innerHTML = "";
    totalStock.innerHTML = products.filter(p => p.status.toLowerCase() !== "critic").length

    criticItems.innerHTML = "";
    var critics = products.filter(p => p.status.toLowerCase().trim() === "critic")
    criticItems.innerHTML = critics.length

    var ul = document.getElementById("critic-list").getElementsByTagName("ul")[0];

    ul.innerHTML = "";
    var html = ""
    critics.forEach(c => html += `<li class="shadow-sm" style="justify-content: space-between;">${c.name}<span
                                        class="badge bg-danger-subtle text-danger rounded-pill text-lowercase">${c.stock}
                                        un</span>
                                </li>`);

    ul.innerHTML = html;

}

renderGrafic()
renderSales();
renderOverview()
adjustGrafic();

window.addEventListener("resize", adjustGrafic)