(function() {
    const socket = io();

    const fromMessage = document.getElementById('from-message');
    const inputMessage = document.getElementById('input-message');
    const logMessages = document.getElementById('log-messages');
    let username;
    
    fromMessage.addEventListener('submit', (event) => {
        event.preventDefault();

        const text = inputMessage.value;
        socket.emit('new-message', {username, text});
        console.log('Nuevo mensaje enviado',  {username, text});
        inputMessage.value = '';
        inputMessage.focus();
    });

    function updateLogMessages(messages) {
        logMessages.innerText ='';
        messages.forEach((msg) => {
            const P = document.createElement('p');
            P.innerText =`${msg.username}: ${msg.text}`;
            logMessages.appendChild(P);
        });
    };

    socket.on('notification', ({messages}) => {
        updateLogMessages(messages);
    });


    socket.on('new-client', () => {
        Swal.fire({
            text: 'Nuevo usuario conectado 🤩',
            toast: true,
            position: "top-right",
        });
    });

    Swal.fire({
        title: 'Identificate por favor 👮‍♂️',
        input: 'text',
        inputLabel: 'Ingresa tu username',
        allowOutsideClick: false,
        inputValidator: (value) =>{
            if (!value) {
                return 'Necesitamos que ingreses un username para contnuar!'
            };
        },
    })
    .then((result) => {
        username = result.value.trim();
        console.log(`Hoal ${username}, bienvenido 👋`);
    });
})();