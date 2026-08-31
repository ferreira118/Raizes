/* =========================================================
   TELA INICIAL
========================================================= */

const telaInicial = document.getElementById("telaInicial");
const botaoEntrar = document.getElementById("botaoEntrar");
const site = document.getElementById("site");

function entrarNoSite() {
    const carrinhoContainer = document.querySelector(".carrinho-container");
    if (carrinhoContainer) {
        carrinhoContainer.style.display = "block";
    }

    telaInicial.classList.add("esconder");
    site.classList.add("mostrar");

    setTimeout(() => {
        telaInicial.style.display = "none";
    }, 600);
}

if (botaoEntrar) {
    botaoEntrar.addEventListener("click", entrarNoSite);
}

/* =========================================================

   ABAS DE IMAGENS

========================================================= */

const botoesAbas = document.querySelectorAll(".aba");

botoesAbas.forEach((botao) => {
    botao.addEventListener("click", () => {
        const aba = botao.dataset.aba;

        botoesAbas.forEach((item) => {
            item.classList.toggle("ativa", item === botao);
        });

        document.querySelectorAll(".aba-conteudo").forEach((painel) => {
            painel.classList.toggle(
                "ativa",

                painel.id === `conteudo-${aba}`
            );
        });
    });
});

/* =========================================================

   NAVEGAÇÃO

========================================================= */

const paginas = ["home", "livros", "sobre", "contatos"];

function mostrarPagina(nomePagina) {
    if (!paginas.includes(nomePagina)) {
        nomePagina = "home";
    }

    /*

       Esconde todas as páginas

    */

    document

        .querySelectorAll(".pagina")

        .forEach((pagina) => {
            pagina.classList.remove("ativa");
        });

    /*

       Mostra a página escolhida

    */

    const paginaSelecionada = document.getElementById(nomePagina);

    if (paginaSelecionada) {
        paginaSelecionada.classList.add("ativa");
    }

    /*

       Atualiza o menu

    */

    document

        .querySelectorAll("[data-pagina]")

        .forEach((link) => {
            link.classList.remove("ativo");

            if (link.dataset.pagina === nomePagina) {
                link.classList.add("ativo");
            }
        });
}

/* =========================================================

   MENU LATERAL / SCROLL

========================================================= */

const linksPagina = document.querySelectorAll("[data-pagina]");
const secoesPagina = document.querySelectorAll(".pagina");

function atualizarMenuPorScroll() {
    const topoAtual = window.scrollY + 180;
    let paginaAtiva = "home";

    secoesPagina.forEach((secao) => {
        if (topoAtual >= secao.offsetTop) {
            paginaAtiva = secao.id;
        }
    });

    linksPagina.forEach((link) => {
        const estaAtivo = link.dataset.pagina === paginaAtiva;
        link.classList.toggle("ativo", estaAtivo);
    });
}

window.addEventListener("scroll", atualizarMenuPorScroll, { passive: true });
window.addEventListener("load", atualizarMenuPorScroll);

/* =========================================================

   CLIQUES NOS MENUS

========================================================= */

document

    .querySelectorAll("[data-pagina]")

    .forEach((link) => {
        link.addEventListener(
            "click",

            function () {
                const pagina = this.dataset.pagina;

                /*

                   Atualiza o endereço

                */

                history.pushState(
                    null,

                    "",

                    "#" + pagina
                );

                mostrarPagina(pagina);
            }
        );
    });

/* =========================================================

   VOLTAR / AVANÇAR DO NAVEGADOR

========================================================= */

window.addEventListener(
    "popstate",

    function () {
        const pagina = location.hash.replace("#", "");

        mostrarPagina(pagina || "home");
    }
);

/* =========================================================

   PESQUISA

========================================================= */

function normalizarTexto(texto = "") {
    return texto
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
}

function aplicarPesquisa() {
    const campo = document.getElementById("pesquisa");
    if (!campo) return;

    const pesquisa = normalizarTexto(campo.value.trim());
    const livros = document.querySelectorAll(".livro");

    if (pesquisa !== "") {
        history.pushState(null, "", "#livros");
        mostrarPagina("livros");
    }

    livros.forEach((livro) => {
        const botaoLivro = livro.querySelector("[data-livro]");
        const botaoAdicionar = livro.querySelector(".botao-adicionar");
        const nomeLivro = normalizarTexto(
            botaoLivro?.dataset.livro ||
            botaoAdicionar?.dataset.name ||
            livro.innerText || ""
        );
        const textoLivro = normalizarTexto(livro.innerText || "");

        const encontrou = pesquisa === "" || nomeLivro.includes(pesquisa) || textoLivro.includes(pesquisa);
        livro.style.display = encontrou ? "" : "none";
    });
}

const campoPesquisa = document.getElementById("pesquisa");

if (campoPesquisa) {
    campoPesquisa.addEventListener("input", aplicarPesquisa);
}

/* =========================================================

   MODAL DOS LIVROS

========================================================= */

const modal = document.getElementById("modal");

const tituloModal = document.getElementById("tituloModal");

const descricaoModal = document.getElementById("descricaoModal");

const fecharModal = document.getElementById("fecharModal");

const livrosJSON = {
    "Raiz da Vida":
        "Raiz da Vida, nosso primeiro livro gastronômico, reúne receitas incríveis de massas saudáveis e saborosas, criadas para transformar ingredientes simples em refeições nutritivas e cheias de personalidade. Uma obra que celebra o equilíbrio entre bem-estar e prazer à mesa. ",
    "Caminhos do Sabor":
        "Caminhos do Sabor é o nosso segundo livro gastronômico e uma verdadeira celebração da arte de fazer pães. Reunindo receitas deliciosas e acessíveis, é perfeito para quem deseja se familiarizar com a panificação e encher a casa com aromas irresistíveis que despertam o apetite e o prazer de cozinhar.",
    "Vida em Receitas":
        "Vida em Receitas, um dos nossos primeiros e mais especiais livros, reúne uma seleção de bolos, doces e sobremesas nutritivas que combinam sabor, tradição e carinho. Cada receita foi criada para transformar ingredientes simples em momentos inesquecíveis de prazer à mesa.",
    "Sabores da Natureza":
        "Sabores da Natureza reúne receitas criativas à base de vegetais e ovos, transformando ingredientes simples em pratos refinados e cheios de sabor. Cada preparação foi cuidadosamente elaborada para oferecer variedade, leveza e sofisticação, tornando a alimentação saudável uma experiência prazerosa, memorável e além disso colorida.",
    "A Essência da Mesa":
        " A Essência da Mesa é perfeita para quem aprecia a gastronomia sofisticada. Com receitas inspiradas na alta culinária e na apresentação moderna dos pratos, este livro transforma cada refeição em uma experiência requintada, trazendo elegância e charme à sua mesa.",
    "Doce Tentação":
        "Doce Tentação oferece doces irresistíveis que unem sabor e saúde em cada receita. Elaborados com ingredientes simples e nutritivos, nossos doces são a escolha perfeita para satisfazer a vontade de comer algo doce sem abrir mão do bem-estar. Uma forma deliciosa de aproveitar cada momento com equilíbrio e prazer.",
    "Alma e Sabor":
        "Alma & Sabor é um livro repleto de receitas incríveis à base de batata, criadas para transformar um ingrediente simples em pratos surpreendentes e cheios de sabor. Descubra combinações criativas que tornam cada refeição mais prazerosa, evitando a monotonia e trazendo variedade ao seu dia a dia.",
    "Energia em Cada Gole":
        "Energia em Cada Gole reúne receitas incríveis que combinam sabor e nutrição em cada gole. Com sucos revigorantes e cheios de nutrientes, este livro é o guia perfeito para quem deseja mais energia, leveza e entusiasmo ao longo do dia.",
    "Nutrição em Copos":
        "Nutrição em Copos é mais do que uma tendência saudável, as bebidas verdes são uma explosão de sabor e bem-estar. Com a presença marcante dos vegetais verdes, este livro revela todos os segredos para criar receitas nutritivas, refrescantes e surpreendentemente deliciosas. ",
};

document

    .querySelectorAll("[data-livro]")

    .forEach((botao) => {
        botao.addEventListener(
            "click",

            function () {
                const livro = this.dataset.livro;

                const descricao = livrosJSON[livro] || "Sinopse não disponível no momento.";

                tituloModal.textContent = livro;

                descricaoModal.textContent = descricao;

                modal.classList.add("aberto");
            }
        );
    });

/*

   Fechar

*/

fecharModal.addEventListener(
    "click",

    function () {
        modal.classList.remove("aberto");
    }
);

/*

   Fechar clicando fora

*/

modal.addEventListener(
    "click",

    function (evento) {
        if (evento.target === modal) {
            modal.classList.remove("aberto");
        }
    }
);

/* =========================================================

   FORMULÁRIO

========================================================= */

const formulario = document.getElementById("formulario");

formulario.addEventListener(
    "submit",

    function (evento) {
        evento.preventDefault();

        alert("Mensagem enviada! Obrigado por entrar em contato com a Raízes. 💜");

        formulario.reset();
    }
);

/* =========================================================

   PÁGINA INICIAL

========================================================= */

const paginaInicial = location.hash.replace("#", "");

mostrarPagina(paginaInicial || "home");

let carrinho = [];

function formatarMoeda(valor) {
    return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
    }).format(valor);
}

function atualizarCarrinho() {
    const cartItems = document.getElementById("cartItems");
    const cartCount = document.getElementById("cartCount");
    const cartTotal = document.getElementById("cartTotal");

    if (!cartItems || !cartCount || !cartTotal) {
        return;
    }

    const quantidadeTotal = carrinho.reduce((total, item) => total + item.quantidade, 0);
    cartCount.textContent = quantidadeTotal;

    if (carrinho.length === 0) {
        cartItems.innerHTML = '<li class="item-carrinho">Seu carrinho está vazio.</li>';
        cartTotal.textContent = formatarMoeda(0);
        return;
    }

    let total = 0;
    cartItems.innerHTML = "";

    carrinho.forEach((item, index) => {
        const itemTotal = item.preco * item.quantidade;
        total += itemTotal;

        const li = document.createElement("li");
        li.className = "item-carrinho";
        li.innerHTML =
            "<div><strong>" +
            item.nome +
            "</strong><span>x" +
            item.quantidade +
            "</span></div><div><strong>" +
            formatarMoeda(itemTotal) +
            '</strong><button class="remover-item" data-index="' +
            index +
            '" type="button">Remover</button></div>';
        cartItems.appendChild(li);
    });

    cartTotal.textContent = formatarMoeda(total);

    document.querySelectorAll(".remover-item").forEach((botao) => {
        botao.addEventListener("click", function () {
            const index = Number(this.getAttribute("data-index"));
            carrinho.splice(index, 1);
            atualizarCarrinho();
        });
    });
}

function adicionarAoCarrinho(evento) {
    const botao = evento.currentTarget;
    const nome = botao.getAttribute("data-name");
    const preco = parseFloat(botao.getAttribute("data-price"));

    const itemExistente = carrinho.find((item) => item.nome === nome);

    if (itemExistente) {
        itemExistente.quantidade += 1;
    } else {
        carrinho.push({ nome, preco, quantidade: 1 });
    }

    const painel = document.getElementById("cartPanel");
    if (painel) {
        painel.classList.add("aberto");
    }

    atualizarCarrinho();
}

function pesquisar() {
    var query = document.getElementById("searchInput").value.trim().toLowerCase();
    var sections = document.querySelectorAll("section.secao-beleza");
    var anyVisible = false;

    sections.forEach(function (section) {
        var sectionName = section.id.toLowerCase();
        var cards = section.querySelectorAll(".card-produto");
        var sectionVisible = false;

        cards.forEach(function (card) {
            var productText = card.textContent.toLowerCase();
            var cardMatches = query === "" || productText.includes(query) || sectionName.includes(query);
            card.style.display = cardMatches ? "" : "none";
            if (cardMatches) {
                sectionVisible = true;
            }
        });

        section.style.display = sectionVisible ? "" : "none";
        if (sectionVisible) {
            anyVisible = true;
        }
    });

    var noResults = document.getElementById("noResults");
    if (noResults) {
        noResults.style.display = anyVisible ? "none" : "block";
    }
}

function mostrarMensagem(elementoId, texto) {
    var elemento = document.getElementById(elementoId);
    if (elemento) {
        elemento.textContent = texto;
    }
}

document.addEventListener("DOMContentLoaded", function () {
    const input = document.getElementById("pesquisa");
    if (input) {
        input.addEventListener("input", aplicarPesquisa);
    }

    document.querySelectorAll(".botao-adicionar").forEach((botao) => {
        botao.addEventListener("click", adicionarAoCarrinho);
    });

    const toggleCart = document.getElementById("toggleCart");
    const closeCart = document.getElementById("closeCart");
    const cartPanel = document.getElementById("cartPanel");
    const finalizarCompraBtn = document.getElementById("finalizarCompraBtn");
    const formulario = document.getElementById("formulario");

    if (toggleCart && cartPanel) {
        toggleCart.addEventListener("click", function () {
            cartPanel.classList.toggle("aberto");
        });
    }

    if (closeCart && cartPanel) {
        closeCart.addEventListener("click", function () {
            cartPanel.classList.remove("aberto");
        });
    }

    if (finalizarCompraBtn) {
        finalizarCompraBtn.addEventListener("click", function () {
            if (carrinho.length === 0) {
                mostrarMensagem("cartFeedback", "Seu carrinho está vazio.");
                return;
            }

            carrinho = [];
            atualizarCarrinho();
            mostrarMensagem("cartFeedback", "Compra finalizada com sucesso!");
            cartPanel.classList.add("aberto");
        });
    }

    if (formulario) {
        formulario.addEventListener("submit", function (evento) {
            evento.preventDefault();
            mostrarMensagem("contatoMensagem", "Mensagem enviada com sucesso!");
            formulario.reset();
        });
    }

    atualizarCarrinho();
});
