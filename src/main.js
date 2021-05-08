const {app, BrowserWindow, ipcMain} = require("electron");
const path = require("path");
const data = require("./data.json");
const fs = require("fs");

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
	console.log(title);
	if ((title === null) | (title === "")) return "failed";
	else if (!data[title]) {
		let newTitle = {
			"General": {},
			"Gameplay": {},
			"Graphics": {},
			"Audio": {},
			"Bugs & Performance": {},
			"Other": {},
		};
		data[title] = newTitle;

		saveData(data);
		return "success";
	} else {
		return "already have that title";
	}
}

// adds a new remark to the data object
function addRemark(title, category, remark, sentiment, episodeNum, timestamp) {
	let remarkObj = data[title][category][remark];
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
		data[title][category][remark] = newRemark;
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
	return Object.keys(data);
});

ipcMain.handle("requestTitleData", async (event, title) => {
	return data[title[0]];
});
