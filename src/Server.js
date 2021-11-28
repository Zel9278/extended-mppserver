const Client = require("./Client.js");
const banned = require('../banned.json');

class Server extends EventEmitter {
    constructor(config) {
        super();
        EventEmitter.call(this);
        this.app = express();
        this.app.use(express.static("public"));
        this.httpServer = http.createServer(this.app);
        this.wss = new WebSocket.Server({
            server: this.httpServer,
            backlog: 100,
            verifyClient: (info) => !banned.includes((info.req.connection.remoteAddress).replace("::ffff:", ""))
        });
        this.connectionid = 0;
        this.connections = new Map();
        this.roomlisteners = new Map();
        this.rooms = new Map();
        this.wss.on('connection', (ws, req) => {
            this.connections.set(++this.connectionid, new Client(ws, req, this));
        });
        this.legit_m = ["a", "bye", "hi", "ch", "+ls", "-ls", "m", "n", "devices", "t", "chset", "userset", "chown", "kickban", "admin message", "color"]
        this._id_Private_Key = config._id_PrivateKey || "";
        this.defaultUsername = config.defaultUsername || "Anonymous";
        this.defaultRoomColor = config.defaultRoomColor || "#ff7f00";
        this.defaultRoomColor2 = config.defaultRoomColor2 || "#bf3f00";
        this.adminpass = config.adminpass || "";

        this.httpServer.listen(config.port, () => {
            console.log("start");
        });
    };
    updateRoom(data) {
        if (!data.ch.settings.visible) return;
        for (let cl of Array.from(this.roomlisteners.values())) {
            cl.sendArray([{
                "m": "ls",
                "c": false,
                "u": [data.ch]
            }])
        }
    }
}

module.exports = Server;
