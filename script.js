// Seleciona elementos do DOM
const operacaoSelecionada = document.getElementById('operacao');
const nivelSelecionado = document.getElementById('nivel');
const botaoIniciar = document.getElementById('botao-iniciar');
const botaoFinalizar = document.getElementById('botao-finalizar');
const botaoProximo = document.getElementById('botao-proximo');
const botaoNovaPagina = document.getElementById('botao-nova-pagina');
const numeroExerciciosInput = document.getElementById('numero-exercicios');
const exerciciosContainer = document.getElementById('exercicios-container');
const mensagemResultado = document.getElementById('mensagem-resultado');
const inputExercicios = document.querySelector('#numero-exercicios');

// Definir variáveis globais
let operacao = 'adicao';
let nivel = 'facil';
let numeroExercicios = 10;
let exercicios = [];

// Função para obter os valores dos inputs
function obterValoresInputs() {
    operacao = operacaoSelecionada.value;
    nivel = nivelSelecionado.value;
    numeroExercicios = parseInt(numeroExerciciosInput.value);
}

// Função para ocultar os exercícios
function ocultarExercicios() {
    exerciciosContainer.style.display = 'none';
}

// Função para exibir a mensagem de resultado
function exibirMensagemResultado(mensagem) {
    mensagemResultado.innerHTML = mensagem;
}

// Função para exibir os exercícios
function exibirExercicios() {
    // Limpa o container de exercícios
    exerciciosContainer.innerHTML = '';
    exercicios = [];

    // Cria os exercícios
    for (let i = 0; i < numeroExercicios; i++) {
        const exercicio = criarExercicio(operacao, nivel);
        exercicios.push(exercicio);
        exerciciosContainer.appendChild(exercicio);
    }

    // Exibe o container de exercícios
    exerciciosContainer.style.display = 'block';
    return exercicios;
}

function criarExercicio(operacao, nivel) {
    // Define os números do exercício baseado no nível escolhido
    let num1, num2;
    switch (nivel) {
        case 'facil':
            num1 = Math.floor(Math.random() * 11);
            num2 = Math.floor(Math.random() * 11);
            break;
        case 'medio':
            num1 = Math.floor(Math.random() * 31);
            num2 = Math.floor(Math.random() * 31);
            break;
        case 'dificil':
            num1 = Math.floor(Math.random() * 101);
            num2 = Math.floor(Math.random() * 101);
            break;
    }

    // Cria o elemento div para o exercício
    let exercicio = document.createElement('div');
    exercicio.classList.add('exercicio');

    // Cria o elemento span para o número 1 do exercício
    let num1Span = document.createElement('span');
    num1Span.textContent = num1 + ' ';
    exercicio.appendChild(num1Span);

    // Cria o elemento span para a operação do exercício
    let operacaoSpan = document.createElement('span');
    operacaoSpan.textContent = operacao === 'adicao' ? '+' : '-';
    exercicio.appendChild(operacaoSpan);

    // Cria o elemento span para o número 2 do exercício
    let num2Span = document.createElement('span');
    num2Span.textContent = ' ' + num2 + ' =';
    exercicio.appendChild(num2Span);

    // Cria o elemento input para a resposta do usuário
    let respostaInput = document.createElement('input');
    respostaInput.type = 'number';
    respostaInput.inputMode = 'numeric';
    exercicio.appendChild(respostaInput);

    // Associa o evento 'keyup' à respostaInput
    respostaInput.addEventListener('keyup', function (event) {
        if (event.key === 'Enter') {
            const index = exercicios.indexOf(exercicio);
            if (index === exercicios.length - 1) {
                botaoFinalizar.click();
            } else {
                exercicios[index + 1].querySelector('input').focus();
            }
        }
    });

    return exercicio;
}

function checarRespostas() {
    let numRespostasCorretas = 0;

    // Loop para verificar cada resposta
    for (let i = 0; i < exercicios.length; i++) {
        const num1 = parseInt(exercicios[i].getElementsByTagName('span')[0].textContent);
        const num2 = parseInt(exercicios[i].getElementsByTagName('span')[2].textContent);
        const operacao = exercicios[i].getElementsByTagName('span')[1].textContent;

        const respostaCorreta = operacao === '+' ? num1 + num2 : num1 - num2;
        const respostaUsuario = parseInt(exercicios[i].getElementsByTagName('input')[0].value);

        // Verifica se a resposta do usuário está correta
        if (respostaUsuario === respostaCorreta) {
            exercicios[i].classList.add('resposta-correta'); // adiciona a classe resposta-correta ao exercício
            numRespostasCorretas++;
        } else {
            exercicios[i].classList.add('resposta-incorreta');
        }
    }

    // Verifica se o número de respostas corretas é igual ao número total de exercícios
    if (numRespostasCorretas === exercicios.length) {
        alert('Parabéns, você acertou todas as respostas!');
    }

    // Exibe a mensagem de resultado
    const mensagem = `Você acertou ${numRespostasCorretas} de ${numeroExercicios} exercícios.`;
    exibirMensagemResultado(mensagem);
}

function iniciarExercicios() {
    obterValoresInputs();
    ocultarExercicios();
    exibirExercicios();
    exibirMensagemResultado('');
    botaoProximo.style.display = 'none';
    botaoFinalizar.style.display = 'block';
    botaoNovaPagina.style.display = 'none';
    exercicios[0].querySelector('input').focus(); // adicionado
    botaoProximo.addEventListener('click', proximoExercicio);
}

botaoIniciar.addEventListener('click', function () {
    if (operacaoSelecionada.value == '') {
        alert('Selecione uma operação');
        return;
    } else if (nivelSelecionado.value == '') {
        alert('Selecione um nível');
        return;
    } else if (inputExercicios.value > 100) {
        alert('O valor máximo permitido para quantidade de exercícios é 100');
        inputExercicios.focus();
        return;
    } else obterValoresInputs();
    exibirExercicios();
});

botaoFinalizar.addEventListener('click', checarRespostas);

botaoProximo.addEventListener('click', function () {
    obterValoresInputs();
    exibirExercicios();
    exibirMensagemResultado('');
});
