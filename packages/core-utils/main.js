(function() {
    let exports = {}

    /*if (Date.now() - _0x44bf1f > 60000) {
        return;
    }*/

    /*setInterval(function() {
        if (_0x2e620a.constructor.name !== 'Auther') {}
    }, 10000);*/
    console.log('loading core-utils');

    const Events = OWOP.require('events');

    class Player {
        constructor(id, x, y, rgb, tool) {
            this.o = {}
            this.tool = tool
            this.rgb = rgb
            this.y = y
            this.id = id
            this.nick = null
            this.x = x
        }

    }


    class Players extends Events {
        constructor() {
            super();
            this.list = {};
            let oldPlayers = OWOP.misc.world.players;

            for (let id in oldPlayers) {
                let p = oldPlayers[id];
                this.list[id] = new Player(id, p.x, p.y, p.rgb, p.tool.id);
                let player = this.list[id];

                if (OWOP.player.rank >= 2 && OWOP.world.name === 'main') {
                    player.fetchedData = true
                    fetch('https://ourworldofpixels.com/api/playerinfo', {
                        headers: {
                            'x-player-id': id,
                            'x-password': JSON.parse(localStorage.worldPasswords).main
                        }
                    }).then(i => i.json()).then(i => {
                        if (i.data) {
                            fetch('https://ourworldofpixels.com/api/playerinfo', {
                                headers: {
                                    'x-player-ip': i.data,
                                    'x-password': JSON.parse(localStorage.worldPasswords).main
                                }
                            }).then(i => i.json()).then(i => {
                                if (i.data.connInfo[0]) {
                                    player.o = i.data.connInfo[0];
                                    if (player.o.nick.includes(']')) player.nick = player.o.nick.split('] ').slice(1).join(']');
                                    if (player.o.rank === 3) player.nick = player.o.nick;
                                    player.rank = player.o.rank;
                                }
                            });
                        }
                    });
                }
            }

            OWOP.on(OWOP.events.net.world.playersMoved, players => {
                for (let id in players) {
                    if (!(id in this.list)) {
                        this.playerJoin(id, players[id]);
                    } else {
                        this.list[id].x = players[id].x;
                        this.list[id].y = players[id].y;
                        this.list[id].rgb = players[id].rgb;
                        this.list[id].tool = players[id].tool;
                    }
                }
            });
            OWOP.on(OWOP.events.net.world.playersLeft, players => {
                for (let i = 0; i < players.length; i++) {
                    this.playerLeave(players[i]);
                }
            });
            OWOP.on(OWOP.events.net.sec.rank, rank => {
                if (rank < 2) return
                for (let id in this.list) {
                    let player = this.list[id]
                    if (player.fetchedData) continue
                    player.fetchedData = true
                    fetch('https://ourworldofpixels.com/api/playerinfo', {
                        headers: {
                            'x-player-id': id,
                            'x-password': JSON.parse(localStorage.worldPasswords).main
                        }
                    }).then(i => i.json()).then(i => {
                        if (i.data) {
                            fetch('https://ourworldofpixels.com/api/playerinfo', {
                                headers: {
                                    'x-player-ip': i.data,
                                    'x-password': JSON.parse(localStorage.worldPasswords).main
                                }
                            }).then(i => i.json()).then(i => {
                                if (i.data.connInfo[0]) {
                                    player.o = i.data.connInfo[0];
                                    if (player.o.nick.includes(']')) player.nick = player.o.nick.split('] ').slice(1).join(']');
                                    if (player.o.rank === 3) player.nick = player.o.nick;
                                    player.rank = player.o.rank;
                                }
                            });
                        }
                    });
                }
            })
        }

        playerJoin(id, data) {
            let player = new Player(id, data.x, data.y, data.rgb, data.tool);

            if (OWOP.player.rank >= 2 && OWOP.world.name === 'main') {
                player.fetchedData = true
                fetch('https://ourworldofpixels.com/api/playerinfo', {
                    headers: {
                        'x-player-id': id,
                        'x-password': JSON.parse(localStorage.worldPasswords).main
                    }
                }).then(i => i.json()).then(i => {
                    if (i.data) {
                        fetch('https://ourworldofpixels.com/api/playerinfo', {
                            headers: {
                                'x-player-ip': i.data,
                                'x-password': JSON.parse(localStorage.worldPasswords).main
                            }
                        }).then(i => i.json()).then(i => {
                            if (i.data.connInfo[0]) {
                                player.o = i.data.connInfo[0];
                                if (player.o.nick.includes(']')) player.nick = player.o.nick.split('] ').slice(1).join(']');
                                if (player.o.rank === 3) player.nick = player.o.nick;
                                player.rank = player.o.rank;
                            }
                        });
                    }
                });
            }

            this.list[id] = player;
            this.emit('join', player);
        }

        playerLeave(id) {
            let player = this.list[id];
            delete this.list[id];
            this.emit('leave', player);
        }

    }

    let players = new Players();


    class Chat extends Events {
        constructor() {
            super();
            this.commands = {};
            OWOP.on(OWOP.events.net.chat, msg => {
                let obj;

                if (msg.startsWith('[D] ')) {
                    let nick = msg.split(': ')[0].slice(4);
                    let message = msg.slice(nick.length + 6);
                    obj = {
                        type: 'discord',
                        nick: nick,
                        message: message
                    };
                } else if (msg.startsWith('[Server]') || msg.startsWith('Server:') || msg.startsWith('Nickname set to') || msg.startsWith('User: ')) {
                    obj = {
                        type: 'server',
                        message: msg
                    };
                } else if (msg.startsWith('-> ')) {
                    if (msg.startsWith('-> You tell ')) {
                        return msg;
                    }

                    let id = msg.slice(3).split(' ')[0];
                    let message = msg.slice(msg.indexOf(': ') + 2);
                    obj = {
                        type: 'dm',
                        from: id,
                        message: message
                    };
                } else if (msg.startsWith('(M) ')) {
                    let nick = msg.split(': ')[0].slice(4);
                    let message = msg.slice(nick.length + 6);
                    obj = {
                        type: 'moderator',
                        nick: nick,
                        message: message
                    };
                } else {
                    let sender = msg.split(': ')[0];
                    let message = msg.slice(sender.length + 2);

                    if (sender.match(/^[0-9]+$/)) {
                        obj = {
                            type: 'user',
                            id: sender,
                            message: message
                        };
                    } else {
                        let match = sender.match(/^\[([0-9]+)\] (.*)$/);

                        if (match === null) {
                            obj = {
                                type: 'admin',
                                nick: sender,
                                message: msg
                            };
                        } else {
                            obj = {
                                type: 'user',
                                id: match[1],
                                nick: match[2],
                                message: message
                            };
                        }
                    }
                }

                this.emit('message', obj);
                return msg;
            });

            let oldModifier = OWOP.misc.chatSendModifier;
            OWOP.misc.chatSendModifier = msg => {
                msg = oldModifier(msg);
                if (!msg.startsWith('/')) return msg;
                let command = msg.slice(1).split(' ');

                if (command[0] === 'help') {
                    OWOP.chat.local('Local commands: ' + Object.keys(this.commands).join(', '));
                }

                if (!(command[0] in this.commands)) return msg;
                this.commands[command[0]](command.slice(1));
                return '';
            };
        }

        registerCommand(name, callback) {
            if (name in this.commands) throw 'Command is already registered';
            this.commands[name] = callback;
        }

        deregisterCommand(name) {
            delete this.commands[name];
        }

    }

    let chat = new Chat();

    chat.on('message', function(data) {
        if (data.type === 'user' && data.nick && players.list[data.id]) {
            players.list[data.id].nick = data.nick;
        }
    });

    exports.players = players;
    exports.chat = chat;
    exports.Player = Player;
    console.log('core-utils loaded');
    
    exports.install = () => {}
    exports.uninstall = () => {
        alert("core-utils was uninstalled, please refresh for changes to take effect")
    }
    return exports
})();
