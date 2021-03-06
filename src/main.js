const {app, BrowserWindow, ipcMain} = require("electron");
const path = require("path");
const fs = require("fs");
// var data = require("./src/data.json");
var data;

async function readFile(filename) {
	return fs.readFile(filename, (err, fileData) => {
		if (err) {
			console.log("err");
			data = [];
		} else {
			data = JSON.parse(fileData);
		}
	});
}
readFile("./src/data.json");

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) {
	app.quit();
}

const createWindow = () => {
	// Create the browser window.
	const mainWindow = new BrowserWindow({
		width: 1920,
		height: 1080,
		webPreferences: {
			preload: path.join(__dirname, "preload.js"),
			nodeIntegration: false,
			contextIsolation: true,
		},
	});

	// and load the index.html of the app.
	// eslint-disable-next-line no-undef
	mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

	// Open the DevTools.
	mainWindow.webContents.openDevTools();
	mainWindow.maximize();
};

// adds a new section to the data object
function addTitle(title) {
	if ((title === null) | (title === "")) return "failed";
	else if (!data[title]) {
		let newTitle = {
			[title]: {
				"General": {},
				"Gameplay": {},
				"Graphics": {},
				"Audio": {},
				"Bugs & Performance": {},
				"Other": {},
			},
		};
		data.push(newTitle);

		saveData(data);
		return "success";
	} else {
		return "already have that title";
	}
}

function getObject(objKey) {
	for (let obj of data) {
		if (obj[objKey]) {
			return obj;
		}
	}
	return false;
}

function getObjectsKeys() {
	let keys = [];
	for (let obj of data) {
		let objKey = Object.keys(obj);
		keys.push(objKey[0]);
	}
	return keys;
}

// adds a new remark to the data object
function addRemark(title, category, remark, sentiment, episodeNum, timestamp) {
	let dataObj = getObject(title);
	let remarkObj;
	if (dataObj) {
		remarkObj = dataObj[title][category][remark];
	} else return false;

	let epName = "Episode " + episodeNum;
	// if the remark already exists
	if (remarkObj) {
		if (remarkObj.Sentiment != sentiment) return false;
		// if the remark already has the episode listed just add to the timestamp
		else if (remarkObj[epName]) {
			remarkObj[epName].Timestamp.push(timestamp);

			// if the episode doesnt exist create it
		} else {
			let newEpisode = {
				Timestamp: [timestamp],
			};
			data[title][category][remark][epName] = newEpisode;
		}
		// if the remark doesnt exist create it and the rest of the object
	} else {
		let newRemark = {
			Sentiment: sentiment,
			[epName]: {
				Timestamp: [timestamp],
			},
		};
		dataObj[title][category][remark] = newRemark;
	}
	saveData(data);
	return true;
}

// saves the data object to a json file.
function saveData(data) {
	fs.writeFile(
		"./src/data.json",
		JSON.stringify(data, null, 4),
		function (err) {
			if (err) console.log(err);
		}
	);
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
	if (process.platform !== "darwin") {
		app.quit();
	}
});

app.on("activate", () => {
	// On OS X it's common to re-create a window in the app when the
	// dock icon is clicked and there are no other windows open.
	if (BrowserWindow.getAllWindows().length === 0) {
		createWindow();
	}
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
// listeners
ipcMain.handle("addRemark", async (event, data) => {
	if (addRemark(data[0], data[1], data[2], data[3], data[4], data[5])) {
		return "podgie";
	} else {
		return "pungie";
	}
});

ipcMain.handle("addTitle", async (event, data) => {
	let result = await addTitle(data[0]);
	return result;
});

ipcMain.handle("requestTitles", async (event) => {
	return getObjectsKeys();
});

ipcMain.handle("requestTitleData", async (event, title) => {
	let obj = getObject(title[0]);
	if (obj === false) return false;
	else return obj[title[0]];
});

ipcMain.handle("editGameTitle", async (event, title) => {
	let obj = getObject(title[0]);
	let objIndex = data.indexOf(obj);
	let newObj = {[title[1]]: obj[title[0]]};
	data.splice(objIndex, 1, newObj);
	saveData(data);
});

ipcMain.handle("deleteGameTitle", async (event, title) => {
	let obj = getObject(title[0]);
	let objIndex = data.indexOf(obj);
	data.splice(objIndex, 1);
	saveData(data);
});
