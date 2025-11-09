function validarCPF(cpf) {

    const cpfLimpo = cpf.replace(/\D/g, ''); 
    
    if (cpfLimpo.length !== 11) {
        return "O CPF deve conter exatamente 11 dígitos.";
    }
    
    return ""; 
}

function validarDataNascimento(dataString) {
    
    if (!dataString) {
        return "O campo Data de Nascimento é obrigatório.";
    }

    const dataNascimento = new Date(dataString);
    const hoje = new Date();
    const IDADE_MINIMA = 18;
    const IDADE_MAXIMA = 145; 
    const dataLimiteInferior = new Date(hoje);
    dataLimiteInferior.setFullYear(hoje.getFullYear() - IDADE_MAXIMA); 
    
    if (dataNascimento < dataLimiteInferior) {
        return `Data muito antiga. A idade máxima permitida é de ${IDADE_MAXIMA} anos.`;
    }
    
    if (dataNascimento > hoje) {
         return "A data de nascimento não pode ser no futuro.";
    }
    
    const anoNascimento = dataNascimento.getFullYear();
    const anoAtual = hoje.getFullYear();
    let idade = anoAtual - anoNascimento;
 
    if (hoje.getMonth() < dataNascimento.getMonth() || 
        (hoje.getMonth() === dataNascimento.getMonth() && hoje.getDate() < dataNascimento.getDate())) {
        idade--;
    } 

    if (idade < IDADE_MINIMA) {
         return `É necessário ter no mínimo ${IDADE_MINIMA} anos para abrir a conta.`;
    }

    return "";
}

function validarTelefone(telefone) {

    const telLimpo = telefone.replace(/\D/g, ''); 

    const regexTelefone = /^\d{10,11}$/;

    if (!regexTelefone.test(telLimpo)) {
        return "O telefone deve ter 10 ou 11 dígitos (incluindo o DDD).";
    }

    if (telLimpo.startsWith('0')) {
        return "O código DDD não pode ser zero (0).";
    }
    
    return "";
}

function validarFormulario(event) {

    const nascimentoInput = document.getElementById('nascimento').value;
    const cpfInput = document.getElementById('cpf').value;
    const telefoneInput = document.getElementById('telefone').value;

    let formValido = true;

    const erroCPF = validarCPF(cpfInput);
    if (erroCPF) {
        exibirErro('erroCPF', erroCPF);
        formValido = false;
    } else {
        exibirErro('erroCPF', '');
    }

    const erroNascimento = validarDataNascimento(nascimentoInput);
    if (erroNascimento) {
        exibirErro('erroNascimento', erroNascimento);
        formValido = false;
    } else {
        exibirErro('erroNascimento', '');
    }

    const erroTelefone = validarTelefone(telefoneInput);
    if (erroTelefone) {
        exibirErro('erroTelefone', erroTelefone);
        formValido = false;
    } else {
        exibirErro('erroTelefone', '');
    }

    if (!formValido) {
        event.preventDefault(); 
        console.log("Validação falhou.");
    } else {
        alert("Cadastro validado com sucesso! Próxima etapa...");
    }

    return formValido;
}


function exibirErro(idElemento, mensagem) {
 
    const elemento = document.getElementById(idElemento);
    elemento.textContent = mensagem;
    elemento.parentNode.classList.toggle('erro-ativo', !!mensagem);

}