const {
	Menu,
	Tray,
	app,
	BrowserWindow,
	shell,
	nativeImage,
	dialog,
	nativeTheme,
	ipcMain: ipc,
	net
} = require("electron");
const electron = require("electron");
const cps = require("child_process");
const process = require("process");
const {
	spawn
} = require("child_process");
const fs = require("fs");
const path = require("path");
const os = require("os");
const http = require("http");
const https = require("https");
const util = require("util");
const {
	autoUpdater
} = require("electron-updater");

// 引入环境变量配置
const {
	App_File,
	isMac,
	isWin,
	isLinux,
	isDev,
	isNoPack
} = require("./env.js");

// 变量定义
let fse = null;
let request = null;
let sudo = null;
let tracer = null;
let apiHostsCache = null;
let lastCacheTime = 0;
let isUpdating = false;
const CACHE_DURATION = 20000;
const MIN_REQUEST_INTERVAL = 3000;
let secureHostLoaded = false;
let secureHostModule = null;
let assetServerSetup = false;
let _isQuiting = false;
let mainWindow;
let coreServer;
let tray;
let forceUpdate = false;
let winToolPath;

// 自动更新配置
autoUpdater.autoDownload = false;
let message = {
	error: "检查更新失败",
	checking: "正在检查更新",
	updateAva: "检测到新版本，系统将自动下载并更新",
	updateNotAva: "当前已是最新版，无需更新",
	updateEnd: "应用已完成更新，下次启动将加载最新版本",
	updateLocal: "开发环境,不支持更新"
};

// 路径配置
let __libname = path.dirname(path.dirname(path.dirname(__dirname)));
if (isDev || isNoPack) {
	__libname = path.dirname(path.dirname(__dirname));
}

var __static = path.join(__libname, "extra", "static");
const _appname = 'Gudao',
	appConfigDir = path.join(app.getPath('appData'), _appname),
	logPath = path.join(appConfigDir, 'app_client.log'),
	confPath = path.join(os.homedir(), '.config'),
	dirPath = path.join(confPath, _appname),
	geoipPath = path.join(appConfigDir, 'geoip.db'),
	geositePath = path.join(appConfigDir, 'geosite.db'),
	configPath = path.join(appConfigDir, 'config.json'),
	configPath2 = path.join(__libname, 'extra/config.json'),
	libcorePath = path.join(appConfigDir, 'libcore.exe'),
	sysproxyPath = path.join(appConfigDir, 'sysproxy.exe'),
	userConfigDir = app.getPath('userData')

var tun2socksPath = path.join(__libname, "extra/libcore.exe");
var tun2socksToolPath = path.resolve(userConfigDir, "libcore.exe");

if (isWin) {
	winToolPath = path.join(__libname, "extra", "sysproxy.exe");
}

// 状态变量
var userKey = "";
var serverLoad = "";
var serverConnected = "";
var serverMode = "";
var isModeBeforeSleep;
var isRouteBeforeSleep;
var noHelper = null;
var closeFlag = false;
var intervalId = null;
var isTun = false;
let logger = console;

// --- 加载 Secure Host ---
function loadSecureHost() {
	if (!secureHostLoaded) {
		try {
			setTimeout(() => {
				try {
					secureHostModule = require("./secure-host");
					secureHostLoaded = true;
					setTimeout(() => {
						if (mainWindow) {
							mainWindow.setTitle("网络模块已就绪");
						}
					}, 100);
				} catch (i) {
					secureHostLoaded = false;
					secureHostModule = null;
					console.error("[ERROR] Failed to load secure-host module:", i.message);
				}
			}, 1000);
		} catch (B) {}
	}
}

// --- 加载嵌入模块 ---
function loadEmbeddedModules() {
	if (!fse) {
		try {
			fse = require("fs-extra");
		} catch (B) {}
	}
	if (!request) {
		try {
			request = require("request");
		} catch (o) {
			console.error("[ERROR] Failed to load request module:", o.message);
		}
	}
	if (!sudo) {
		try {
			sudo = require("sudo-prompt");
		} catch (Z) {}
	}
	if (!tracer) {
		try {
			tracer = require("tracer");
		} catch (I) {}
	}
}

// --- Asset Server 设置 ---
try {
	const {
		setupAssetProtocol,
		interceptFileProtocol
	} = require("./asset-server");
	const setupAssetServer = () => {
		if (!assetServerSetup && !isDev) {
			setupAssetProtocol();
			interceptFileProtocol();
			assetServerSetup = true;
		}
	};
	app.whenReady().then(setupAssetServer);
	if (app.isReady()) {
		setupAssetServer();
	}
} catch (t) {}

// --- 主初始化函数 (已简化) ---
function init() {
	createWindow();
	renderTray();

	// 设置初始标题
	setTimeout(() => {
		if (mainWindow) {
			mainWindow.setTitle("正在初始化...");
		}
	}, 50);

	// 加载模块
	setTimeout(() => {
		loadEmbeddedModules();
		if (mainWindow) {
			mainWindow.setTitle("已就绪");
		}
	}, 2000);

	// 菜单模板
	const aboutMenu = {
		label: "About",
		selector: "orderFrontStandardAboutPanel:"
	};
	const separator = {
		type: "separator"
	};
	const appMenu = {
		label: "Application",
		submenu: [aboutMenu, separator]
	};
	const editMenu = {
		label: "Edit",
		submenu: [{
				label: "Cut",
				accelerator: "CmdOrCtrl+X",
				selector: "cut:"
			},
			{
				label: "Copy",
				accelerator: "CmdOrCtrl+C",
				selector: "copy:"
			},
			{
				label: "Paste",
				accelerator: "CmdOrCtrl+V",
				selector: "paste:"
			},
			{
				label: "SelectAll",
				accelerator: "CmdOrCtrl+A",
				selector: "selectAll:"
			}
		]
	};
	const menuTemplate = [appMenu, editMenu];

	// 初始化核心服务与配置
	setTimeout(() => {
		initProxyHelper().then(function() {
			initConfig().then(function() {
				if (isMac) {
					Menu.setApplicationMenu(Menu.buildFromTemplate(menuTemplate));
				} else {
					Menu.setApplicationMenu(null);
				}
			}).catch(function(err) {
				if (logger) logger.info("initConfig Error: " + err);
				// 发送错误日志给前端
				if (mainWindow) {
					webContentsSend("applog", "data:" + err);
				}
			});
			initPowerMonitor();
		}).catch(function(err) {
			if (logger) logger.info("initProxyHelper Error: " + err);
		});
	}, 150);
}

// --- 窗口创建 ---
function createWindow() {
	if (isMac) {
		app.dock.show();
	}

	const commonWebPreferences = {
		nodeIntegration: true,
		nodeIntegrationInWorker: true,
		webSecurity: false,
		webviewTag: true,
		contextIsolation: false,
		enableRemoteModule: true,
		devTools: true
	};

	const winOptions = {
		width: 720,
		height: 700,
		closable: true,
		resizable: false,
		maximizable: false,
		skipTaskbar: false,
		useContentSize: true,
		frame: false,
		titleBarStyle: "hiddenInset",
		center: true,
		alwaysOnTop: false,
		webPreferences: commonWebPreferences,
		show: isDev // 开发模式直接显示，否则等待加载
	};

	mainWindow = new BrowserWindow(winOptions);
	mainWindow.webContents.setUserAgent("windows.v2board.app 2.0");

	// 禁用 F12 和刷新等快捷键
	mainWindow.webContents.on("before-input-event", (event, input) => {
		if (input.key === "F12" ||
			(input.control && input.shift && (input.key === "I" || input.key === "J")) ||
			(input.control && input.key === "U")) {
			event.preventDefault();
		}
	});

	mainWindow.webContents.on("context-menu", (event) => {
		event.preventDefault();
	});

	const loadFile = isDev ? "app.html" : "app.html";
	mainWindow.loadFile(loadFile);

	if (!isDev) {
		mainWindow.once("ready-to-show", () => {
			mainWindow.show();
			mainWindow.focus();
		});
	}

	mainWindow.on("close", (e) => {
		if (!isQuiting()) {
			e.preventDefault();
			mainWindow.hide();
		}
	});
	
	mainWindow.on("closed", () => {
		if (isQuiting()) {
			mainWindow = null;
			if (isMac) {
				app.dock.hide();
			}
		} else {}
	});

	mainWindow.webContents.on("did-finish-load", () => {
		mainWindow.webContents.send("theme-changed", nativeTheme.shouldUseDarkColors);
	});
}

function getWindow() {
	return mainWindow;
}

nativeTheme.on("updated", () => {
	if (mainWindow) {
		mainWindow.webContents.send("system-theme-changed", nativeTheme.shouldUseDarkColors);
	}
});

function isQuiting(z) {
	if (z !== undefined) {
		_isQuiting = z;
	} else {
		return _isQuiting;
	}
}

function reloadWindow() {
	if (mainWindow == null) {
		createWindow();
	} else {
		mainWindow.close();
		setTimeout(function() {
			reopenWindow();
			updateTray();
		}, 1000);
	}
}

function reopenWindow() {
	if (mainWindow == null) {
		createWindow();
	} else {
		mainWindow.show();
		if (isMac) {
			app.dock.show();
		}
	}
}

// --- IPC 和 更新逻辑 ---
if (isDev) {}
ipc.on("checkForUpdate", () => {});

autoUpdater.on("error", (err) => {
	sendUpdateMessage("error", err ? err.stack || err : "unknown error");
}).on("checking-for-update", () => {
	sendUpdateMessage("checking-for-update", message.checking);
}).on("update-available", (info) => {
	sendUpdateMessage("update-available", message.updateAva);
}).on("download-progress", ({
	percent
}) => {
	sendUpdateMessage("downloadProgress", percent);
}).on("update-not-available", () => {
	sendUpdateMessage("update-not-available", message.updateNotAva);
}).on("update-downloaded", () => {
	sendUpdateMessage("update-success", message.updateEnd);
});

ipc.on("isUpdateNow", (event, arg) => {
	sendUpdateMessage("update-isnow", "开始更新");
	autoUpdater.quitAndInstall();
	if (mainWindow) mainWindow.destroy();
});

ipc.on("downloadUpdate", () => {
	autoUpdater.downloadUpdate().then(path => {
		sendUpdateMessage("update-path", "download path " + path);
	}).catch(err => {
		sendUpdateMessage("update-path-error", "download error " + err);
	});
});

function sendUpdateMessage(channel, data) {
	if (mainWindow) {
		mainWindow.webContents.send("message", {
			message: channel,
			data: data
		});
	}
}

function exit() {
	webContentsSend("appExit", "true");
	killCoreProcess().then(() => {
		serverConnected = null;
		app.exit();
	}).catch(() => {
		serverConnected = null;
		app.exit(); // 即使失败也退出
	});
}

function webContentsSend(channel, arg, ignore = false) {
	if (mainWindow != null) {
		mainWindow.webContents.send(channel, arg);
	}
}

// --- App 生命周期管理 ---
const gotTheLock = app.requestSingleInstanceLock();
if (!gotTheLock) {
	app.quit();
} else {
	app.on("second-instance", () => {
		if (mainWindow) {
			if (mainWindow.isMinimized()) mainWindow.restore();
			mainWindow.show();
			mainWindow.focus();
		} else {
			createWindow();
		}
	});
	app.on("ready", init);
}

app.on("before-quit", () => {
	isQuiting(true);
});

app.on("quit", function() {
	if (noHelper == null) {
		closeServer();
	}
});

app.on("activate", () => {
	if (getWindow() === null) {
		createWindow();
	} else {
		reopenWindow();
	}
});

// --- 主题与控制 IPC ---
ipc.on("set-theme", (event, theme) => {
	const mapped = theme === "auto" ? "system" : theme;
	if (["light", "dark", "system"].includes(mapped)) {
		nativeTheme.themeSource = mapped;
	} else {
		nativeTheme.themeSource = "system";
	}
	event.returnValue = nativeTheme.shouldUseDarkColors;
});

ipc.on("onClickControl", async function(event, action, data) {
	switch (action) {
		case "winHide":
			if (!isQuiting()) mainWindow.hide();
			break;
		case "winMini":
			if (mainWindow) mainWindow.minimize();
			break;
		case "InitCore":
			isTun = data;
			rebootServer();
			break;
		case "TUNState":
			isTun = data[0];
			let needReboot = data[1];
			if (needReboot) {
				setProxy();
				rebootServer();
			}
			break;
		case "Connect":
			isTun = data[0];
			if (isTun === 0) {
				if (coreServer == null) {
					rebootServer(true);
				} else {
					setProxy(true);
					webContentsSend("statusJS", "true");
				}
			} else {
				setProxy();
				rebootServer();
			}
			break;
		case "Stop":
			isTun = data;
			// 如果不是 Tun 模式
			if (isTun === 0) {
				setProxy(); // 关闭代理设置
				webContentsSend("statusJS", "false");
			} else {
				webContentsSend("statusJS", "disconnecting");
				killCoreProcess().then(function() {
					webContentsSend("statusJS", "false");
					serverConnected = null;
				});
			}
			break;
		case "getSystem":
			isWindows7((isWin7, isNotWin7) => {
				if (isWin7) {
					webContentsSend("deviceSystem", false);
				} else {
					webContentsSend("deviceSystem", true);
				}
			});
			break;
		case "saveSysConfig":
			saveSysConfig(data).then(() => {});
			break;
		case "quit":
			userKey = "";
			serverLoad = "";
			closeServer();
			reloadWindow(); // 这里可能是重启界面
			break;
		default:
			webContentsSend("V2Ray-log", "IllegalAccess");
			break;
	}
});

// --- 系统辅助功能 ---
function isWindows7(callback) {
	const cmd = "for /f \"tokens=4-5 delims=[.] \" %i in ('ver') do @if \"%i.%j\"==\"6.1\" (echo Windows7) else (echo NotWindows7)";
	cps.exec(cmd, {
		shell: "cmd.exe"
	}, (err, stdout) => {
		if (err) {
			callback(err, null);
			return;
		}
		callback(null, stdout.trim() === "Windows7");
	});
}

function setProxy(enable) {
	let sysproxyTool = path.join(appConfigDir, "sysproxy.exe");
	var cmd = "";
	if (enable) {
		cmd = `"${sysproxyTool}" global 127.0.0.1:10090 ""`;
	} else {
		cmd = `"${sysproxyTool}" pac ""`;
	}
	try {
		cps.execSync(cmd);
	} catch (e) {
		console.error("Set proxy failed:", e);
	}
}

// --- 初始化配置与核心文件 ---
async function initConfig() {
	return new Promise(async function(resolve) {
		if (fse && fse.ensureFile) {
			await fse.ensureFile(logPath);
		}

		// 路径修正
		if (os.platform() == "darwin") {
			tun2socksPath = path.join(__libname, "extra/libcore");
			tun2socksToolPath = path.resolve(userConfigDir, "libcore");
		} else {
			tun2socksPath = path.join(__libname, "extra/libcore.exe");
			tun2socksToolPath = path.resolve(userConfigDir, "libcore.exe");
		}

		// 确保配置目录存在
		if (!fs.existsSync(appConfigDir)) {
			if (fse && fse.ensureDir) {
				await fse.ensureDir(appConfigDir);
			} else {
				fs.mkdirSync(appConfigDir, {
					recursive: true
				});
			}
		}

		const tasks = [];

		// 复制 sysproxy.exe
		if (!fs.existsSync(sysproxyPath) && isWin) {
			tasks.push(new Promise((res, rej) => {
				fs.copyFile(path.join(__libname, "extra/sysproxy.exe"), path.join(appConfigDir, "sysproxy.exe"), err => {
					if (err) console.error("Copy sysproxy error", err);
					res();
				});
			}));
		}

		// 复制 libcore.exe
		tasks.push(new Promise((res, rej) => {
			let coreSrc = path.join(__libname, isWin ? "extra/libcore.exe" : "extra/libcore");
			let coreDest = path.join(appConfigDir, isWin ? "libcore.exe" : "libcore");

			fs.copyFile(coreSrc, coreDest, err => {
				if (err) console.error("Copy libcore error", err);
				res();
			});
		}));

		try {
			await Promise.all(tasks);
		} catch (e) {}

		return resolve();
	});
}

function saveSysConfig(data) {
	return new Promise((resolve, reject) => {
		fs.writeFile(configPath, data, {
			flag: "w",
			encoding: "utf-8",
			mode: "0666"
		}, function(err) {
			if (err) {
				return reject(err);
			} else {
				if (coreServer != null) {
					callRestartCore();
				}
				return resolve(true);
			}
		});
	});
}

function callRestartCore() {
	if (isTun === 1) {
		rebootServer();
	} else if (coreServer != null) {
		rebootServer();
	}
}

// --- 进程管理 (Clash / Tun) ---
const getResource = (filename) => {
	let p = "";
	if (isWin) {
		if (app.isPackaged) {
			p = path.join(process.cwd(), "resources", "extra");
		} else {
			p = path.join(process.cwd(), "extra");
		}
	}
	if (filename) {
		p = path.join(p, filename);
	}
	return p;
};

async function startTunProcess() {
	let libPath = path.join(appConfigDir, "libcore.exe");
	// 构造 Tun 模式命令，这里需要注意路径引用
	const cmd = `"${libPath}" run -D "${appConfigDir}"`;
	const options = {
		name: "My App"
	};

	// 使用 sudo 执行
	sudo.exec(cmd, options, (error, stdout) => {
		// Sudo 执行回调
	});

	const processName = "libcore.exe";
	const checkCmd = "tasklist /FI \"IMAGENAME eq " + processName + "\"";

	// 轮询检查进程是否启动
	const timer = setInterval(() => {
		cps.exec(checkCmd, (err, stdout) => {
			if (!err && stdout.includes(processName)) {
				clearInterval(timer);
				webContentsSend("statusJS", "true");
			}
		});
	}, 1000);
}

async function startClashProcess(enableProxy = false) {
	let libName = isWin ? "libcore.exe" : "libcore";
	let binPath = path.join(appConfigDir, libName);
	// 核心启动参数: run -D [configDir]
	const cmd = `"${binPath}" run -D "${appConfigDir}"`;

	// 发送配置内容到前端 (UI同步)
	try {
		const fileData = fs.readFileSync(configPath, "utf-8");
		webContentsSend("syncConfig", fileData);
	} catch (e) {}

	// 启动子进程
	coreServer = cps.exec(cmd);

	coreServer.stdout.on("data", data => {
		webContentsSend("applog", "data:" + data);
		// 监听启动成功标志
		if (data.indexOf("sing-box started") > -1) {
			webContentsSend("coreStatus", "true");
			if (enableProxy) {
				setProxy(true);
				webContentsSend("statusJS", "true");
			}
		}
	});

	coreServer.stderr.on("data", data => {
		webContentsSend("applog", "data2:" + data);
		// 部分内核可能输出到 stderr
		if (data.indexOf("sing-box started") > -1) {
			webContentsSend("coreStatus", "true");
			if (enableProxy) {
				setProxy(true);
				webContentsSend("statusJS", "true");
			}
		}
	});

	coreServer.on("exit", code => {
		webContentsSend("applog", "exit:" + code);
		coreServer = null;
	});
}

function killCoreProcess() {
	return new Promise((resolve, reject) => {
		const processName = "libcore.exe";

		// 如果是 Mac/Linux，逻辑会有所不同，这里主要保留了 Win 逻辑的框架
		if (!isWin) {
			if (coreServer) {
				coreServer.kill();
				coreServer = null;
			}
			setProxy(false);
			resolve();
			return;
		}

		const checkCmd = "tasklist /FI \"IMAGENAME eq " + processName + "\"";
		cps.exec(checkCmd, (err, stdout) => {
			if (!err && stdout.includes(processName)) {
				setProxy(false); // 关闭代理
				// 强制杀进程
				sudo.exec("taskkill /F /IM libcore.exe", {
					name: "App"
				}, (err, stdout) => {
					resolve(stdout);
				});
			} else {
				setProxy(false);
				resolve(stdout);
			}
		});
	}).catch(e => {
		return e;
	});
}

function initPowerMonitor() {
	electron.powerMonitor.on("resume", () => {
		isModeBeforeSleep = null;
	});
	electron.powerMonitor.on("suspend", () => {
		isRouteBeforeSleep = serverConnected;
	});
	electron.powerMonitor.on("shutdown", () => {
		app.quit();
	});
}

function initProxyHelper() {
	return new Promise(function(resolve, reject) {
		if (isMac) {
			// Mac 权限提升逻辑 (简化保留)
			resolve();
		} else {
			resolve();
		}
	});
}

function rebootServer(enableProxy) {
	if (isTun === 1) {
		killCoreProcess().then(function() {
			webContentsSend("statusJS", "ing");
			startTunProcess();
		}).catch(() => {
			serverConnected = null;
		});
	} else {
		killCoreProcess().then(function() {
			startClashProcess(enableProxy);
		}).catch(() => {
			serverConnected = null;
		});
	}
}

function closeServer() {
	if (isTun === 1) {
		killCoreProcess().then(function() {
			serverConnected = null;
			webContentsSend("statusJS", "false");
		});
	} else {
		killCoreProcess().then(function() {
			serverConnected = null;
			webContentsSend("statusJS", "false");
		});
	}
}

// --- Tray (托盘) ---
function generateMenus() {
	return [{
		label: "开启App",
		click: function() {
			reopenWindow();
		}
	}, {
		label: "退出",
		click: function() {
			exit();
		}
	}];
}

function updateTray() {
	const contextMenu = Menu.buildFromTemplate(generateMenus());
	tray.setContextMenu(contextMenu);
	setTrayIcon();
}

function getTrayIcon() {
	return path.join(__static, "icons", "enabledTemplate@2x.png");
}

function setTrayIcon() {
	tray.setImage(nativeImage.createFromPath(getTrayIcon()));
	if (isMac) {
		tray.setPressedImage(nativeImage.createFromPath(getTrayIcon()));
	}
}

function renderTray() {
	tray = new Tray(nativeImage.createEmpty());
	updateTray();
	tray.on("click", function() {
		if (mainWindow != null) {
			if (mainWindow.isVisible()) {
				mainWindow.hide();
			} else {
				mainWindow.show();
			}
		}
	});
}