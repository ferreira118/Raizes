/* =========================================================

   TELA INICIAL

========================================================= */

const telaInicial = document.getElementById("telaInicial");

const botaoEntrar = document.getElementById("botaoEntrar");

const site = document.getElementById("site");


function entrarNoSite() {

    telaInicial.classList.add("esconder");

    site.classList.add("mostrar");

    setTimeout(() => {

        telaInicial.style.display = "none";

    }, 600);

}


botaoEntrar.addEventListener(

    "click",

    entrarNoSite

);


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

const paginas = [

    "home",

    "livros",

    "sobre",

    "contatos"

];


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

    const paginaSelecionada =

        document.getElementById(nomePagina);


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

            if (

                link.dataset.pagina === nomePagina

            ) {

                link.classList.add("ativo");

            }

        });


    /*

       Volta para o topo

    */

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

}


/* =========================================================

   CLIQUES NOS MENUS

========================================================= */

document

    .querySelectorAll("[data-pagina]")

    .forEach((link) => {

        link.addEventListener(

            "click",

            function () {

                const pagina =

                    this.dataset.pagina;


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

        const pagina =

            location.hash.replace("#", "");


        mostrarPagina(

            pagina || "home"

        );

    }

);


/* =========================================================

   PESQUISA

========================================================= */

const campoPesquisa =

    document.getElementById("pesquisa");


campoPesquisa.addEventListener(

    "input",

    function () {

        const pesquisa =

            this.value

                .toLowerCase()

                .trim();


        const livros =

            document.querySelectorAll(".livro");


        /*

           Se estiver pesquisando,

           vai para a página Livros.

        */

        if (pesquisa !== "") {

            history.pushState(

                null,

                "",

                "#livros"

            );

            mostrarPagina("livros");

        }


        /*

           Filtra os livros

        */

        livros.forEach((livro) => {

            const texto =

                livro.innerText

                    .toLowerCase();


            if (

                texto.includes(pesquisa)

            ) {

                livro.style.display = "";

            } else {

                livro.style.display = "none";

            }

        });

    }

);


/* =========================================================

   MODAL DOS LIVROS

========================================================= */

const modal =

    document.getElementById("modal");


const tituloModal =

    document.getElementById("tituloModal");


const fecharModal =

    document.getElementById("fecharModal");


document

    .querySelectorAll("[data-livro]")

    .forEach((botao) => {

        botao.addEventListener(

            "click",

            function () {

                const livro =

                    this.dataset.livro;


                tituloModal.textContent =

                    livro;


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

        if (

            evento.target === modal

        ) {

            modal.classList.remove(

                "aberto"

            );

        }

    }

);


/* =========================================================

   FORMULÁRIO

========================================================= */

const formulario =

    document.getElementById("formulario");


formulario.addEventListener(

    "submit",

    function (evento) {

        evento.preventDefault();


        alert(

            "Mensagem enviada! Obrigado por entrar em contato com a Raízes. 💜"

        );


        formulario.reset();

    }

);


/* =========================================================

   PÁGINA INICIAL

========================================================= */

const paginaInicial =

    location.hash.replace("#", "");


mostrarPagina(

    paginaInicial || "home"

);
 
 