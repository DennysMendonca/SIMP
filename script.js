document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('simpForm');
    
    // 1. Lista de Comarcas do Maranhão (Exemplos principais)
    const comarcas = [
        "Açailândia", "Bacabal", "Balsas", "Barra do Corda", "Caxias", "Chapadinha", 
        "Codó", "Grajaú", "Imperatriz", "Itapecuru-Mirim", "Paço do Lumiar", 
        "Pinheiro", "Presidente Dutra", "Santa Inês", "São José de Ribamar", 
        "São Luís", "Timon", "Viana", "Zé Doca"
    ];

    const selectLotacao = document.getElementById('lotacao');
    comarcas.sort().forEach(c => {
        const option = new Option(c, c);
        selectLotacao.add(option);
    });

    // 2. Máscara de CPF (999.999.999-99)
    const inputCpf = document.getElementById('cpf');
    inputCpf.addEventListener('input', (e) => {
        let v = e.target.value.replace(/\D/g, "");
        if (v.length <= 11) {
            v = v.replace(/(\d{3})(\d)/, "$1.$2");
            v = v.replace(/(\d{3})(\d)/, "$1.$2");
            v = v.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
        }
        e.target.value = v;
    });

    // 3. Validação de Nome (Apenas texto)
    document.getElementById('nome').addEventListener('input', (e) => {
        e.target.value = e.target.value.replace(/[0-9]/g, "");
    });

    // 4. Validação de Login (Apenas minúsculas)
    document.getElementById('login').addEventListener('input', (e) => {
        e.target.value = e.target.value.toLowerCase().replace(/[^a-z]/g, "");
    });

    // 5. Validação ao Enviar (Submit)
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        let formValido = true;

        const campos = [
            { id: 'nome', msg: "O nome é obrigatório." },
            { id: 'cpf', msg: "CPF incompleto." },
            { id: 'login', msg: "Login obrigatório." },
            { id: 'email', msg: "E-mail inválido." },
            { id: 'cargo', msg: "Selecione um cargo." },
            { id: 'lotacao', msg: "Selecione uma comarca." }
        ];

        campos.forEach(campo => {
            const input = document.getElementById(campo.id);
            const errorSpan = input.nextElementSibling;

            // Verifica se está vazio ou se CPF está incompleto
            if (!input.value.trim() || (campo.id === 'cpf' && input.value.length < 14)) {
                input.classList.add('field-error');
                errorSpan.style.display = 'block';
                formValido = false;
            } else {
                input.classList.remove('field-error');
                errorSpan.style.display = 'none';
            }
        });

        if (formValido) {
            alert("Sucesso! Usuário cadastrado no sistema SIMP.");
            form.reset();
        }
    });
});
