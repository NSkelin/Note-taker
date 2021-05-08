const {ipcRenderer, contextBridge} = require("electron");

contextBridge.exposeInMainWorld("api", {
    send: (channel, data) => {
        // whitelist channels
        let validChannels = [];
        if (validChannels.includes(channel)) {
            ipcRenderer.send(channel, data);
        }
    },
    receive: (channel, func) => {
        let validChannels = [];
        if (validChannels.includes(channel)) {
            // Deliberately strip event as it includes `sender`
            ipcRenderer.on(channel, (event, ...args) => func(...args));
        }
    },
    invoke: async (channel, ...args) => {
        let validChannels = [
            "addRemark",
            "addTitle",
            "requestTitles",
            "requestTitleData",
        ];
        if (validChannels.includes(channel)) {
            let result = await ipcRenderer.invoke(channel, args);
            return result;
        } else {
            console.log("Invalid channel, add to whitelist if needed.");
        }
    },
});
