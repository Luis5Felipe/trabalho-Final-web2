document.getElementById('loginFormulario').addEventListener('submit', function(event) {
    event.preventDefault();

    var email = document.getElementById('email').value;
    var senha = document.getElementById('senha').value;

    var emailEspelho = 'vanguard@gmail.com';
    var senhaEspelho = 'vanguard123';

    // Verifica se o email e a senha correspondem
    if (email === emailEspelho && senha === senhaEspelho) {
        alert('Login bem-sucedido!');
        window.location.href = 'index.html'; 
    } else {
        alert('Email ou senha inválidos!');
    }
});
