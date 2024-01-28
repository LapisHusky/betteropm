(function() {
    const original = OWOP.chat.recvModifier;

    function install() {
        OWOP.chat.recvModifier = (msg) => {
            try {
                const includesId = msg.includes(OWOP.player.id);
                const includesName = msg.includes(localStorage.nick);
                const highlight = includesId || includesName;
                if (highlight) {
                    setTimeout(() => {
                        const lastMsg = document.querySelector("#chat-messages").children.length;
                        document.querySelector(`#chat-messages > li:nth-child(${lastMsg})`).style.backgroundColor = 'rgba(230, 0, 0, 0.4)';
                    });
                }
            } catch (error) {
                console.log("Could not parse message.");
                console.error(error);
            }
            return msg;
        };
    }

    function uninstall() {
        OWOP.chat.recvModifier = original;
    }

    return {
        install: install,
        uninstall: uninstall
    };
})();
