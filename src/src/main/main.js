const {
  Menu,
  Tray,
  app,
  BrowserWindow,
  shell,
  nativeImage,
  dialog,
  nativeTheme
} = require("electron");
const electron = require("electron");
const ipc = require("electron").ipcMain;
const cps = require("child_process");
const process = require("process");
const {
  spawn
} = require("child_process");
const fs = require("fs");
const path = require("path");
const os = require("os");

let fse = null;
const http = require("http");
const https = require("https");
let request = null;
var qs = require("querystring");
let sudo = null;
const {
  autoUpdater
} = require("electron-updater");
const {
  isMac,
  isWin,
  isLinux,
  isDev,
  isNoPack
} = require("./env.js");
const {
  net
} = require("electron");
const util = require("util");
let tracer = null;
function loadEmbeddedModules() {
  const v = {
    qvzqX: "应用正在退出，取消启动TUN进程",
    CJnFe: function (g, A) {
      return g(A);
    },
    hgJrz: "embedded:request",
    wLqfY: function (g, A) {
      return g === A;
    },
    TaiDe: function (g, A) {
      return g !== A;
    },
    CJEuS: "KOPUw",
    qDCWP: "cskpN",
    yxvTG: function (g, A) {
      return g === A;
    },
    fazCv: "Afwaw",
    IPhZP: function (g, A) {
      return g(A);
    }
  };
  if (!fse) {
    try {
      fse = require("fs-extra");
    } catch (g) {}
  }
  if (!request) {
    try {
      request = v.CJnFe(require, "request");
    } catch (A) {
      if (process.env.NODE_ENV === "development") {
        console.error("[ERROR] Failed to load request module:", A.message);
      }
      try {
        request = v.CJnFe(require, v.hgJrz);
      } catch (D) {
        if (v.wLqfY(process.env.NODE_ENV, "development")) {
          console.error("[ERROR] Failed to load embedded request module:", D.message);
        }
      }
    }
  }
  if (!sudo) {
    try {
      sudo = require("sudo-prompt");
    } catch (x) {}
  }
  if (!tracer) {
    if (v.TaiDe(v.CJEuS, v.qDCWP)) {
      try {
        if (v.yxvTG(v.fazCv, v.fazCv)) {
          tracer = v.IPhZP(require, "tracer");
        } else {
          A = null;
          if (!D) {
            webContentsSend("statusJS", "false");
          }
        }
      } catch (s) {}
    } else {
      A.info(v.qvzqX);
      D = false;
      return;
    }
  }
}
let apiHostsCache = null;
let lastCacheTime = 0;
let isUpdating = false;
const CACHE_DURATION = 20000;
const MIN_REQUEST_INTERVAL = 3000;
let secureHostLoaded = false;
let secureHostModule = null;
function loadSecureHost() {
  const g = {
    kxZUr: function (D, S) {
      return D === S;
    },
    jrekk: "jeGHh"
  };
  const A = g;
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
        } catch (D) {
          secureHostLoaded = false;
          secureHostModule = null;
          if (A.kxZUr(process.env.NODE_ENV, "development")) {
            if (A.jrekk !== "jeGHh") {
              g = false;
            } else {
              console.error("[ERROR] Failed to load secure-host module:", D.message);
            }
          }
        }
      }, 1000);
    } catch (D) {}
  }
}
let assetServerSetup = false;
try {
  const {
    setupAssetProtocol,
    interceptFileProtocol
  } = require("./asset-server");
  const setupAssetServer = () => {
    const g = {
      UncYP: function (D, S) {
        return D && S;
      }
    };
    const A = g;
    if (A.UncYP(!assetServerSetup, !isDev)) {
      setupAssetProtocol();
      interceptFileProtocol();
      assetServerSetup = true;
    } else if (isDev) {}
  };
  app.whenReady().then(setupAssetServer);
  if (app.isReady()) {
    setupAssetServer();
  }
} catch (W) {}
let _isQuiting = false;
let mainWindow;
let coreServer;
let coreServerPID;
let tray;
let forceUpdate = false;
autoUpdater.autoDownload = false;
let message = {
  error: "检查更新失败",
  checking: "正在检查更新",
  updateAva: "检测到新版本，系统将自动下载并更新",
  updateNotAva: "当前已是最新版，无需更新",
  updateEnd: "应用已完成更新，下次启动将加载最新版本",
  updateLocal: "开发环境,不支持更新"
};
let __libname = path.dirname(path.dirname(path.dirname(__dirname)));
if (isDev) {
  __libname = path.dirname(path.dirname(__dirname));
} else {}
if (isNoPack) {
  __libname = path.dirname(path.dirname(__dirname));
}
var __static = path.join(__libname, "extra", "static");
const USER_DATA_PATH = app.getPath("userData");
const BIN_PATH = isDev ? path.join(__libname, "extra") : path.join(process.resourcesPath, "extra");
const _appname = 'Skynet',
  appConfigDir = path.join(app.getPath('appData'), _appname),
  logPath = path.join(appConfigDir, 'app_client.log'),
  confPath = path.join(os.homedir(), '.config'),
  dirPath = path.join(confPath, _appname),
  geoipPath = path.join(appConfigDir, 'geoip.db'),
  geositePath = path.join(appConfigDir, 'geosite.db'),
  geoipDatPath = path.join(appConfigDir, 'geoip.dat'),
  geositeDatPath = path.join(appConfigDir, 'geosite.dat'),
  countryMmdbPath = path.join(appConfigDir, 'Country.mmdb'),
  configPath = path.join(appConfigDir, 'config.yaml'),
  configPath2 = path.join(__libname, 'extra/config.json'),
  libcorePath = path.join(appConfigDir, 'libcore.exe'),
  sysproxyPath = path.join(appConfigDir, 'sysproxy.exe'),
  userConfigDir = app.getPath('userData')
var tun2socksPath = path.join(__libname, "extra/mihomo.exe");
var tun2socksToolPath = path.resolve(userConfigDir, "mihomo.exe");
let winToolPath;
if (isWin) {
  winToolPath = path.join(__libname, "extra", "sysproxy.exe");
}
var userKey = "";
var serverLoad = "";
var serverConnected = "";
var serverMode = "";
var isModeBeforeSleep;
var isRouteBeforeSleep;
var isTunBeforeSleep;
var noHelper = null;
var closeFlag = false;
var intervalId = null;
var isTun = false;
var isRestarting = false;
var restartTimer = null;
function init() {
  const U = {
    SKLYa: function (P, C) {
      return P === C;
    },
    IHgSl: "重启Clash进程失败:",
    QkqTC: "qZdAp",
    huaBA: function (P) {
      return P();
    },
    mkDtP: "已就绪",
    VLtjK: "initProxyHelper",
    YuUjQ: function (P, C) {
      return P || C;
    },
    yyiTw: "Meta Tunnel",
    GOWKM: "Dttxp",
    OVsMu: function (P, C) {
      return P + C;
    },
    wzsKp: function (P, C, j) {
      return P(C, j);
    },
    SqUet: function (P, C, j) {
      return P(C, j);
    },
    qLwrI: function (P, C, j) {
      return P(C, j);
    },
    CpiWe: "orderFrontStandardAboutPanel:",
    cibEi: "separator",
    ZpKCe: "Cut",
    lfzRP: "CmdOrCtrl+X",
    iAsmx: "cut:",
    Jhypb: "Copy",
    DHgxx: "CmdOrCtrl+C",
    QiOjq: "copy:",
    mCcTu: "Paste",
    qnoeZ: "paste:",
    lvwOE: "SelectAll"
  };
  createWindow();
  renderTray();
  U.wzsKp(setTimeout, () => {
    if (U.SKLYa("ZXpLO", "uUsvK")) {
      B = null;
      app.exit();
    } else if (mainWindow) {
      mainWindow.setTitle("正在初始化...");
    }
  }, 50);

  U.qLwrI(setTimeout, () => {
    if (U.QkqTC !== "diPbf") {
      U.huaBA(loadEmbeddedModules);
      if (mainWindow) {
        mainWindow.setTitle(U.mkDtP);
      }
    } else {
      I.error(U.IHgSl, m);
      l = null;
      p = false;
    }
  }, 2000);
  const w = {
    label: "About",
    selector: U.CpiWe
  };
  const B = {
    type: U.cibEi
  };
  const V = {
    label: "Application",
    submenu: [w, B]
  };
  const Y = {
    label: U.ZpKCe,
    accelerator: U.lfzRP,
    selector: U.iAsmx
  };
  const I = {
    label: U.Jhypb,
    accelerator: U.DHgxx,
    selector: U.QiOjq
  };
  const m = {
    label: U.mCcTu,
    accelerator: "CmdOrCtrl+V",
    selector: U.qnoeZ
  };
  const l = {
    label: U.lvwOE,
    accelerator: "CmdOrCtrl+A",
    selector: "selectAll:"
  };
  const p = {
    label: "edit",
    submenu: [Y, I, m, l]
  };
  const M = [V, p];
  setTimeout(() => {
    const P = {
      QXYZj: function (C, j) {
        return U.YuUjQ(C, j);
      },
      GgEcj: U.yyiTw,
      mVhpH: U.GOWKM,
      ITtpN: function (C, j) {
        return U.OVsMu(C, j);
      },
      ogEwY: "initConfig"
    };
    initProxyHelper().then(function () {
      initConfig().then(function () {
        const C = {
          IdaIH: function (j, T) {
            return P.QXYZj(j, T);
          },
          avfFf: P.GgEcj,
          zyaws: function (j, T) {
            return j(T);
          }
        };
        if (P.mVhpH === "wkCNK") {
          if (C.IdaIH(l, !p)) {
            Y(false);
          } else {
            const ready = I.includes(C.avfFf) && m.includes("2");
            C.zyaws(l, ready);
          }
        } else if (isMac) {
          Menu.setApplicationMenu(Menu.buildFromTemplate(M));
        } else {
          Menu.setApplicationMenu(null);
        }
      }).catch(function (C) {
        if (logger) {
          logger.info(P.ITtpN(P.ogEwY, C));
        }
        if (mainWindow) {
          mainWindow.webContents.executeJavaScript("\n                        ");
        }
      });
      initPowerMonitor();
    }).catch(function (C) {
      if (logger) {
        logger.info(U.VLtjK + C);
      }
      if (mainWindow) {
        mainWindow.webContents.executeJavaScript("\n                    ");
      }
    });
  }, 150);
}
function createWindow() {
  const x = {
    XlWdM: function (S, s) {
      return S === s;
    },
    BVnLM: "F12",
    srFBQ: function (S, s) {
      return S === s;
    },
    zVbzx: function (S, s) {
      return S === s;
    },
    ESTpH: function (S) {
      return S();
    },
    Phrwb: function (S, s) {
      return S === s;
    },
    tPxwU: "zsSjl",
    MCXlL: "3|4|5|0|2|1",
    asgaS: "hiddenInset",
    Wgvkz: "windows.v2board.app 2.0",
    NnGJK: "context-menu",
    pdamh: "ready-to-show",
    qQdZq: "close"
  };
  if (isMac) {
    app.dock.show();
  }
  if (isDev) {
    const S = x.MCXlL.split("|");
    let s = 0;
    while (true) {
      switch (S[s++]) {
        case "0":
          mainWindow.webContents.on("context-menu", (w, B) => {
            w.preventDefault();
          });
          continue;
        case "1":
          mainWindow.loadFile("app.html");
          continue;
        case "2":
          mainWindow.webContents.openDevTools();
          continue;
        case "3":
          const U = {
            width: 720,
            height: 700,
            closable: true,
            resizable: false,
            maximizable: false,
            skipTaskbar: false,
            useContentSize: true,
            frame: false,
            icon: undefined,
            titleBarStyle: x.asgaS,
            show: true,
            center: true,
            alwaysOnTop: false,
            webPreferences: {
              nodeIntegration: true,
              nodeIntegrationInWorker: true,
              webSecurity: false,
              webviewTag: true,
              contextIsolation: false,
              enableRemoteModule: true,
              devTools: false
            }
          };
          mainWindow = new BrowserWindow(U);
          continue;
        case "4":
          mainWindow.webContents.setUserAgent(x.Wgvkz);
          continue;
        case "5":
          mainWindow.webContents.on("before-input-event", (w, B) => {
            if (B.key === "F12" || B.control && B.shift && (B.key === "I" || x.XlWdM(B.key, "J")) || B.control && x.XlWdM(B.key, "U")) {
              w.preventDefault();
            }
          });
          continue;
      }
      break;
    }
  } else {
    const Y = {
      width: 720,
      height: 700,
      closable: true,
      resizable: false,
      maximizable: false,
      skipTaskbar: false,
      useContentSize: true,
      frame: false,
      icon: undefined,
      titleBarStyle: "hiddenInset",
      show: false,
      center: true,
      alwaysOnTop: false,
      webPreferences: {
        nodeIntegration: true,
        nodeIntegrationInWorker: true,
        webSecurity: false,
        webviewTag: true,
        contextIsolation: false,
        enableRemoteModule: true,
        devTools: false
      }
    };
    mainWindow = new BrowserWindow(Y);
    mainWindow.webContents.setUserAgent(x.Wgvkz);
    mainWindow.webContents.on("before-input-event", (I, m) => {
      if (m.key === x.BVnLM || m.control && m.shift && (x.srFBQ(m.key, "I") || x.XlWdM(m.key, "J")) || m.control && x.zVbzx(m.key, "U")) {
        I.preventDefault();
      }
    });
    mainWindow.webContents.on(x.NnGJK, (I, m) => {
      I.preventDefault();
    });
    mainWindow.webContents.openDevTools();
    mainWindow.loadFile("app.html");
    mainWindow.once(x.pdamh, () => {
      mainWindow.show();
      mainWindow.focus();
    });
  }
  mainWindow.on(x.qQdZq, I => {
    if (!isQuiting()) {
      I.preventDefault();
      mainWindow.hide();
    }
  });
  mainWindow.on("closed", function () {
    mainWindow = null;
    if (isMac) {
      app.dock.hide();
    }
  });
  mainWindow.webContents.on("did-finish-load", () => {
    const I = {
      ZHfUY: function (m) {
        return x.ESTpH(m);
      }
    };
    if (x.Phrwb(x.tPxwU, "zsSjl")) {
      mainWindow.webContents.send("theme-changed", nativeTheme.shouldUseDarkColors);
    } else if (s) {
      Y.warn("拷贝 geosite.dat 失败:", I);
      m();
    } else {
      l.info("geosite.dat copy done");
      I.ZHfUY(p);
    }
  });
}
function getWindow() {
  return mainWindow;
}
nativeTheme.on("updated", () => {
  const A = {
    YhAaT: "system-theme-changed"
  };
  if (mainWindow) {
    mainWindow.webContents.send(A.YhAaT, nativeTheme.shouldUseDarkColors);
  }
});
function isQuiting(v) {
  if (v !== undefined) {
    _isQuiting = v;
  } else {
    return _isQuiting;
  }
}
function reloadWindow() {
  const v = {
    jAOqA: function (g) {
      return g();
    },
    AeROF: function (g, A) {
      return g !== A;
    },
    YvxyT: "LGSiY"
  };
  if (mainWindow == null) {
    if (v.AeROF(v.YvxyT, v.YvxyT)) {
      A.unlinkSync(D);
    } else {
      createWindow();
    }
  } else {
    mainWindow.close();
    setTimeout(function () {
      reopenWindow();
      v.jAOqA(updateTray);
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
if (isDev) {}
ipc.on("checkForUpdate", () => {});
autoUpdater.on("error", g => {
  const A = {
    GaKjO: function (S, s) {
      return S + s;
    }
  };
  const D = A;
  sendUpdateMessage("error", g ? g.stack || g : D.GaKjO("unknown", message.error));
}).on("checking-for-update", v => {
  sendUpdateMessage("checking-for-update", message.checking);
}).on("update-available", v => {
  const g = {
    uvvUv: function (A, D, x) {
      return A(D, x);
    },
    aOXhL: function (A, D, x) {
      return A(D, x);
    }
  };
  g.uvvUv(sendUpdateMessage, "update-available", message.updateAva);
  g.aOXhL(sendUpdateMessage, "update-available", v);
}).on("download-progress", ({
  percent: g
}) => {
  const D = {
    hnmYs: "downloadProgress"
  };
  sendUpdateMessage(D.hnmYs, g);
}).on("update-not-available", g => {
  const D = {
    WJNqn: "update-not-available"
  };
  sendUpdateMessage(D.WJNqn, message.updateNotAva);
}).on("update-downloaded", () => {
  const v = {
    zIyob: function (g, A, D) {
      return g(A, D);
    },
    PwZIY: "update-success"
  };
  v.zIyob(sendUpdateMessage, v.PwZIY, message.updateEnd);
});
ipc.on("isUpdateNow", (g, A) => {
  const x = {
    dCofX: "update-isnow"
  };
  sendUpdateMessage(x.dCofX, "开始更新");
  autoUpdater.quitAndInstall();
  if (mainWindow) {
    mainWindow.destroy();
  }
});
ipc.on("downloadUpdate", () => {
  const v = {
    jWSzs: function (g, A, D) {
      return g(A, D);
    },
    VJSrH: "update-path"
  };
  autoUpdater.downloadUpdate().then(g => {
    v.jWSzs(sendUpdateMessage, v.VJSrH, "download path " + g);
  }).catch(g => {
    sendUpdateMessage("update-path-error", "download error " + g);
  });
});
function sendUpdateMessage(g, A) {
  if (mainWindow) {
    const D = {
      message: g,
      data: A
    };
    mainWindow.webContents.send("message", D);
  }
}
function checkUpdate(v = false) {
  forceUpdate = v;
  autoUpdater.checkForUpdates();
}
function windowAlert(g) {
  const A = {
    YKDtJ: function (S) {
      return S();
    },
    lOMic: "info",
    vsATa: function (S, s) {
      return S === s;
    },
    iwiYk: "ZoVcq",
    FUDLQ: function (S, s) {
      return S(s);
    },
    nnbwa: "ico.png"
  };
  const D = {
    type: A.lOMic,
    title: global.SiteName || "",
    message: g,
    buttons: ["done"],
    defaultId: 0
  };
  var x = D;
  try {
    if (A.vsATa("Xiakd", A.iwiYk)) {
      A.YKDtJ(g);
    } else {
      const s = A.FUDLQ(require, "fs");
      const J = path.join(__static, "ico", A.nnbwa);
      if (s.existsSync(J)) {
        x.icon = J;
      }
    }
  } catch (U) {}
  dialog.showMessageBox(x, function (w) {});
}
function exit() {
  const v = {
    gfTat: function (g, A) {
      return g === A;
    },
    oXLai: "appExit",
    DVDno: function (g, A) {
      return g === A;
    },
    GMfcC: function (g) {
      return g();
    },
    lSptd: function (g) {
      return g();
    }
  };
  webContentsSend(v.oXLai, "true");
  if (v.DVDno(isTun, 1)) {
    v.GMfcC(killCoreProcess).then(function () {
      serverConnected = null;
      app.exit();
    }).catch(g => {
      serverConnected = null;
    });
  } else {
    v.lSptd(killCoreProcess).then(function () {
      if (v.gfTat("pkxGZ", "pkxGZ")) {
        serverConnected = null;
        app.exit();
      } else {
        g.info("当前平台不支持 lock-screen/unlock-screen 事件");
      }
    }).catch(g => {
      serverConnected = null;
    });
  }
}
function webContentsSend(g, A, D = false) {
  const x = {
    NIyUg: function (s, J) {
      return s != J;
    }
  };
  const S = x;
  if (S.NIyUg(mainWindow, null)) {
    mainWindow.webContents.send(g, A);
  } else if (!D) {}
}
function webContentsSendAction(v, g, A, D = false) {
  const x = {
    WVfGj: function (S) {
      return S();
    },
    EgByE: function (S, s) {
      return S != s;
    },
    FCuOf: function (S, s) {
      return S !== s;
    },
    FClRo: "IcKzn"
  };
  mainWindow = x.WVfGj(getWindow);
  if (x.EgByE(mainWindow, null)) {
    if (x.FCuOf(x.FClRo, x.FClRo)) {
      Menu.setApplicationMenu(Menu.buildFromTemplate(g));
    } else {
      mainWindow.webContents.send(v, g, A);
    }
  } else if (!D) {}
}
const gotTheLock = app.requestSingleInstanceLock();
if (!gotTheLock) {
  app.quit();
} else {
  app.on("second-instance", (v, g, A) => {
    if (mainWindow) {
      if (mainWindow.isMinimized()) {
        mainWindow.restore();
      }
      mainWindow.focus();
    }
  });
  app.on("ready", init);
}
app.on("window-all-closed", () => {});
app.on("before-quit", () => {
  const v = {
    lkqVp: function (g, A) {
      return g == A;
    },
    PGpgk: function (g) {
      return g();
    }
  };
  isQuiting(true);
  if (restartTimer) {
    clearTimeout(restartTimer);
    restartTimer = null;
  }
  (async () => {
    try {
      setSystemProxy(false);
      try {
        await setTun(false);
      } catch (g) {}
      if (v.lkqVp(noHelper, null)) {
        v.PGpgk(closeServer);
      }
    } catch (A) {}
  })();
});
app.on("quit", function () {
  const v = {
    pSAty: function (g) {
      return g();
    },
    Ydqde: function (g, A) {
      return g(A);
    }
  };
  try {
    setSystemProxy(false);
    if (noHelper == null) {
      v.pSAty(closeServer);
    }
    if (restartTimer) {
      v.Ydqde(clearTimeout, restartTimer);
      restartTimer = null;
    }
  } catch (g) {}
});
app.on("activate", () => {
  const v = {
    OAQWk: function (g, A) {
      return g === A;
    },
    uxqpb: function (g) {
      return g();
    }
  };
  if (v.OAQWk(v.uxqpb(getWindow), null)) {
    createWindow();
  } else {
    reopenWindow();
  }
});
dialog.showErrorBox = (v, g) => {};
ipc.on("set-theme", (g, A) => {
  const x = {
    bLAum: "auto",
    AvPMa: "system"
  };
  const mapped = A === x.bLAum ? x.AvPMa : A;
  if (["light", "dark", x.AvPMa].includes(mapped)) {
    nativeTheme.themeSource = mapped;
  } else {
    nativeTheme.themeSource = x.AvPMa;
  }
  g.returnValue = nativeTheme.shouldUseDarkColors;
});
ipc.on("onClickControl", async function (v, g, A) {
  const D = {
    aORum: "系统正在关闭",
    fYVgj: function (S, s) {
      return S !== s;
    },
    oYUFg: "qdrvU",
    uxTms: "rHBkL",
    KWXIq: function (x, S) {
      return x(S);
    },
    ECnWT: function (x, S) {
      return x(S);
    },
    XmsVS: "内核未启动，正在启动内核...",
    oXLKy: function (x) {
      return x();
    },
    QeHYL: function (S, s) {
      return S === s;
    },
    kvDKK: "TUN 模式：通过 API 启用 TUN",
    oblfo: "mkIpe",
    DCOQd: function (x, S, s) {
      return x(S, s);
    },
    VOApp: "⚠ TUN 网卡未就绪，但继续执行",
    EQlIW: function (x, S, s) {
      return x(S, s);
    },
    WxSCA: "true",
    heFrm: "内核进程已终止",
    vruGN: "Stop 处理失败:",
    eqxFb: "1|2|3|4|0",
    cVVXz: "coreStatus",
    QUIRf: function (x, S, s) {
      return x(S, s);
    },
    gLaGr: "false",
    KMvCH: function (x, S) {
      return x(S);
    },
    rgfSi: "odJUu",
    OgQeb: function (x, S, s) {
      return x(S, s);
    },
    UWSko: "aRrvk",
    cKgiq: "deviceSystem",
    vGPXs: "FFRhB",
    tFFoL: function (x, S, s) {
      return x(S, s);
    },
    gwoyH: "winHide",
    rpuTk: "winMini",
    YIqVQ: function (S, s) {
      return S != s;
    },
    tPfVZ: function (x, S, s) {
      return x(S, s);
    },
    RdyWr: "tunStatus",
    xlJGz: "enabled",
    QhNCS: "Connect",
    bGEzv: "KillCore",
    ZzsvW: "非 TUN 模式：禁用系统代理",
    KbpZN: "hjGXb",
    BFSVC: function (x, S) {
      return x(S);
    },
    FfsyF: function (x, S) {
      return x(S);
    },
    eZhJr: "quit",
    hLmrT: "V2Ray-log",
    JnzNa: "IllegalAccess"
  };
  switch (g) {
    case D.gwoyH:
      if (!D.oXLKy(isQuiting)) {
        mainWindow.hide();
      }
      break;
    case D.rpuTk:
      if (D.YIqVQ(mainWindow, null)) {
        mainWindow.minimize();
      }
      break;
    case "InitCore":
      isTun = A;
      startClashProcess();
      break;
    case "TUNState":
      const x = A && A.enabled;
      if (x) {
        isTun = 1;
        console.log("启用 TUN 模式");
        D.tPfVZ(webContentsSend, D.RdyWr, D.xlJGz);
      } else {
        isTun = 0;
        console.log("禁用 TUN 模式");
        D.DCOQd(webContentsSend, "tunStatus", "disabled");
      }
    case D.QhNCS:
      const S = A && A.isTunMode;
      isTun = S ? 1 : 0;
      const s = () => {
        const U = {
          QTgBl: function (w, B) {
            return D.fYVgj(w, B);
          }
        };
        if (D.oYUFg !== D.uxTms) {
          return new Promise(w => {
            cps.exec("tasklist /NH /FI \"IMAGENAME eq mihomo.exe\" /FO CSV", (B, V) => {
              if (U.QTgBl("Igypd", "zVtWw")) {
                const Y = !B && V.includes("mihomo.exe");
                w(Y);
              } else {
                g.preventDefault();
              }
            });
          });
        } else {
          g.info(D.aORum);
          setTimeout(() => {
            app.quit();
          }, 500);
        }
      };
      (async () => {
        const U = {
          TCWJe: function (w, B) {
            return D.KWXIq(w, B);
          },
          FjVgO: "ico.png",
          dNhJW: "Meta Tunnel",
          KWByh: function (w, B) {
            return D.ECnWT(w, B);
          }
        };
        try {
          const w = await s();
          if (!w) {
            console.log(D.XmsVS);
            await D.oXLKy(startClashProcess);
          } else {
            console.log("内核已在运行中");
          }
          if (D.QeHYL(isTun, 0)) {
            console.log("非 TUN 模式：启用系统代理");
            setSystemProxy(true);
            webContentsSend("statusJS", "true");
          } else {
            D.KWXIq(setSystemProxy, false);
            console.log(D.kvDKK);
            try {
              if (D.QeHYL("TPZkO", D.oblfo)) {
                const V = U.TCWJe(require, "fs");
                const Y = D.join(x, "ico", U.FjVgO);
                if (V.existsSync(Y)) {
                  S.icon = Y;
                }
              } else {
                await setTun(true);
                await new Promise(Y => setTimeout(Y, 1000));
                const V = await new Promise(Y => {
                  cps.exec("wmic nic where \"NetConnectionID='Meta'\" get Name,NetConnectionStatus", (I, m) => {
                    if (I || !m) {
                      Y(false);
                    } else {
                      const ready = m.includes(U.dNhJW) && m.includes("2");
                      U.KWByh(Y, ready);
                    }
                  });
                });
                if (V) {
                  console.log("✓ TUN 网卡已就绪");
                  D.DCOQd(webContentsSend, "statusJS", "true");
                } else {
                  console.log(D.VOApp);
                  D.EQlIW(webContentsSend, "statusJS", D.WxSCA);
                }
              }
            } catch (Y) {
              console.error("启用 TUN 失败:", Y.message);
            }
          }
        } catch (I) {
          console.error("Connect 处理失败:", I);
        }
      })();
      break;
    case D.bGEzv:
      killCoreProcess().then(function () {
        console.log(D.heFrm);
      });
      break;
    case "Stop":
      isTun = A;
      logger.info("Stop 请求: TUN=" + isTun);
      if (isTun === 0) {
        logger.info(D.ZzsvW);
        setSystemProxy(false);
        webContentsSend("statusJS", "false");
      } else {
        logger.info("TUN 模式：禁用 TUN 并终止内核进程");
        D.QUIRf(webContentsSend, "statusJS", "disconnecting");
        (async () => {
          try {
            logger.info("步骤1: 通过 API 禁用 TUN");
            await setTun(false);
            logger.info("✓ TUN 已通过 API 禁用");
            await new Promise(U => setTimeout(U, 500));
            webContentsSend("statusJS", "false");
            serverConnected = null;
          } catch (U) {
            logger.error(D.vruGN, U.message);
            webContentsSend("statusJS", "false");
            serverConnected = null;
          }
        })();
      }
      break;
    case "setSystemProxy":
      const J = A;
      logger.info("setSystemProxy 请求: " + (J ? "启用" : "禁用") + "系统代理");
      try {
        if (D.KbpZN !== "AaXAf") {
          D.BFSVC(setSystemProxy, J);
          logger.info("✓ 系统代理已" + (J ? "启用" : "禁用"));
        } else {
          A = null;
          if (D) {
            app.dock.hide();
          }
        }
      } catch (w) {
        logger.error("设置系统代理失败:", w.message);
      }
      break;
    case "getSystem":
      isWindows7((B, V) => {
        const Y = {
          zBdgw: function (I, m) {
            return D.KMvCH(I, m);
          }
        };
        if (D.rgfSi !== "odJUu") {
          const m = D.eqxFb.split("|");
          let l = 0;
          while (true) {
            switch (m[l++]) {
              case "0":
                V = null;
                continue;
              case "1":
                console.log("[core exit] code=" + s + ", signal=" + J);
                continue;
              case "2":
                U.info("内核进程关闭 - 退出码: " + w + ", 信号: " + B);
                continue;
              case "3":
                webContentsSend(D.cVVXz, "false");
                continue;
              case "4":
                D.QUIRf(webContentsSend, "statusJS", D.gLaGr);
                continue;
            }
            break;
          }
        } else {
          if (B) {
            D.OgQeb(webContentsSend, "deviceSystem", false);
            return;
          }
          if (V) {
            if (D.fYVgj("WvWCc", D.UWSko)) {
              webContentsSend(D.cKgiq, true);
            } else {
              J.copyFile(U.join(w, "extra/sysproxy.exe"), B.join(appConfigDir, "sysproxy.exe"), j => {
                if (j) {
                  Y.zBdgw(m, j);
                } else {
                  M.info("sysproxy.exe copy done");
                  P();
                }
              });
            }
          } else if (D.vGPXs !== "zZSnt") {
            D.tFFoL(webContentsSend, D.cKgiq, false);
          } else {
            g = null;
            app.exit();
          }
        }
      });
      break;
    case "saveSysConfig":
      D.FfsyF(saveSysConfig, A).then(function (B) {}).catch(function (B) {});
      break;
    case D.eZhJr:
      userKey = "";
      serverLoad = "";
      closeServer();
      reloadWindow();
      break;
    default:
      webContentsSend(D.hLmrT, D.JnzNa);
      break;
  }
});
function setSystemProxy(g) {
  const D = {
    PUBCC: "Connect 处理失败:",
    ZPrXm: "behvt",
    ZVIMD: "系统代理服务器已设置: 127.0.0.1:10090",
    nblre: "设置系统代理失败:"
  };
  if (!isWin) {
    if (D.ZPrXm !== "dVEsS") {
      return;
    } else {
      console.error(D.PUBCC, g);
    }
  }
  try {
    const S = g ? 1 : 0;
    const s = "reg add \"HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Internet Settings\" /v ProxyEnable /t REG_DWORD /d " + S + " /f";
    cps.execSync(s);
    logger.info("系统代理已" + (g ? "启用" : "禁用") + ": ProxyEnable=" + S);
    if (g) {
      const U = "reg add \"HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Internet Settings\" /v ProxyServer /d \"127.0.0.1:10090\" /f";
      cps.execSync(U);
      logger.info(D.ZVIMD);
    }
  } catch (w) {
    logger.error(D.nblre, w.message);
  }
}
function setTun(v) {
  const g = {
    EOCEE: "data",
    IIpqZ: "end",
    MXIWE: "应用正在退出，取消 API 请求",
    tWDuU: "LIwrQ",
    PVwWh: function (A, D) {
      return A === D;
    },
    eCOYk: function (A, D) {
      return A !== D;
    },
    NQZJc: function (A, D) {
      return A(D);
    },
    kpydl: "127.0.0.1"
  };
  return new Promise((A, D) => {
    const x = {
      RkRQH: g.MXIWE,
      pCZqZ: "RSbOR",
      LJLZH: g.tWDuU,
      mqunD: function (B, V) {
        return g.PVwWh(B, V);
      },
      hVDbQ: function (B, V) {
        return g.eCOYk(B, V);
      },
      nhJMG: function (B, V) {
        return B(V);
      },
      FtPwk: function (B, V) {
        return g.NQZJc(B, V);
      }
    };
    const S = {
      enable: v
    };
    const s = {
      tun: S
    };
    const J = JSON.stringify(s);
    const U = {
      hostname: g.kpydl,
      port: 9790,
      path: "/configs",
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Content-Length": Buffer.byteLength(J)
      }
    };
    logger.info("设置 TUN 模式: " + (v ? "启用" : "禁用"));
    const w = http.request(U, B => {
      const V = {
        wSQMK: function (I) {
          return I();
        }
      };
      let Y = "";
      B.on(g.EOCEE, I => {
        Y += I;
      });
      B.on(g.IIpqZ, () => {
        const I = {
          JLTgN: function (m, l) {
            return m(l);
          },
          PKkqS: x.RkRQH
        };
        if (x.pCZqZ === x.LJLZH) {
          I.JLTgN(A, new D(I.PKkqS));
          return;
        } else if (B.statusCode === 204 || x.mqunD(B.statusCode, 200)) {
          if (x.hVDbQ("UbNNY", "JDlqJ")) {
            logger.info("TUN 模式已" + (v ? "启用" : "禁用") + " (状态码: " + B.statusCode + ")");
            const l = {
              success: true,
              statusCode: B.statusCode,
              data: Y
            };
            A(l);
          } else {
            A.info("geosite.dat copy done");
            V.wSQMK(D);
          }
        } else {
          logger.error("设置 TUN 模式失败 (状态码: " + B.statusCode + ")");
          x.nhJMG(D, new Error("API 返回错误状态码: " + B.statusCode));
        }
      });
    });
    w.on("error", B => {
      logger.error("设置 TUN 模式失败:", B.message);
      x.FtPwk(D, B);
    });
    w.write(J);
    w.end();
  });
}
let logger = console;
function isWindows7(A) {
  const D = {
    PBFYz: function (J, U) {
      return J === U;
    },
    qrhED: "for /f \"tokens=4-5 delims=[.] \" %i in ('ver') do @if \"%i.%j\"==\"6.1\" (echo Windows7) else (echo NotWindows7)",
    kRFPz: "cmd.exe"
  };
  const x = D;
  const S = x.qrhED;
  const s = {
    shell: x.kRFPz
  };
  cps.exec(S, s, (J, U, w) => {
    if (J) {
      A(J, null);
      return;
    }
    const B = U.trim();
    A(null, x.PBFYz(B, "Windows7"));
  });
}
async function initConfig() {
  const v = {
    xDvGn: function (g, A) {
      return g === A;
    },
    vygOr: "Gtgda",
    BDjdH: "mihomo.exe",
    mfTrq: function (g) {
      return g();
    },
    SVuHx: "update-path-error",
    wBFah: function (g, A) {
      return g !== A;
    },
    IOhul: "rlJHX",
    dwnSG: function (g, A) {
      return g + A;
    },
    nblub: "extra/sysproxy.exe",
    kPyCG: "sysproxy.exe",
    ucISg: "mihomo.exe copy done",
    ysiAe: "拷贝 geoip.dat 失败:",
    DReqQ: "应用正在退出，取消 API 请求",
    FxOoF: "gLxLO",
    DkiON: "FaGmW",
    UYznl: "fAXWB",
    dJILe: "WfuPX",
    WDtVw: "extra/libcore",
    jBJjP: "libcore",
    cuGcp: "ctUhv",
    UgkTU: "SystemFolderCreated",
    JNlJQ: "SystemFolderCreated (fallback)",
    jmuvv: "File copy failed:",
    ERaHJ: "init Done.",
    xvlDo: function (g) {
      return g();
    }
  };
  return new Promise(async function (g) {
    const A = {
      sftHO: "应用正在退出，取消启动Clash进程",
      QriBr: function (J, U) {
        return J(U);
      },
      ZVEfy: function (J, U) {
        return v.dwnSG(J, U);
      },
      pLPvA: "help init err 授權失敗.",
      neDpP: v.nblub,
      uKUkz: v.kPyCG,
      Ajhra: v.ucISg,
      bvasR: function (J) {
        return v.mfTrq(J);
      },
      QNoER: "JZmIV",
      xhBWW: v.ysiAe,
      RdvNa: v.DReqQ,
      RRbLE: v.FxOoF,
      eXKdA: "message",
      aBLZp: "TnWvs"
    };
    if (fse && fse.ensureFile) {
      if (v.DkiON !== v.DkiON) {
        if (s()) {
          Y.info(A.sftHO);
          I = false;
          return;
        }
        w(B);
        V = false;
      } else {
        await fse.ensureFile(logPath);
      }
    }
    if (os.platform() == "darwin") {
      if (v.UYznl !== v.dJILe) {
        tun2socksPath = path.join(__libname, v.WDtVw);
        tun2socksToolPath = path.resolve(userConfigDir, v.jBJjP);
      } else {
        return this.extraPath;
      }
    } else {
      tun2socksPath = path.join(__libname, "extra/mihomo.exe");
      tun2socksToolPath = path.resolve(userConfigDir, "mihomo.exe");
    }
    if (!fs.existsSync(appConfigDir)) {
      if (v.cuGcp === "LsdHT") {
        A.QriBr(x, S);
        s.info("✓ 系统代理已" + (J ? "启用" : "禁用"));
      } else if (fse && fse.ensureDir) {
        await fse.ensureDir(appConfigDir);
        logger.info(v.UgkTU);
      } else {
        fs.mkdirSync(appConfigDir, {
          recursive: true
        });
        logger.info(v.JNlJQ);
      }
    }
    const D = [];
    if (!fs.existsSync(sysproxyPath)) {
      D.push(new Promise((V, Y) => {
        const I = {
          bNJpP: function (m) {
            return m();
          },
          MRwCT: function (m, l) {
            return A.ZVEfy(m, l);
          },
          tZyVw: A.pLPvA
        };
        fs.copyFile(path.join(__libname, A.neDpP), path.join(appConfigDir, A.uKUkz), m => {
          if (m) {
            Y(m);
          } else {
            logger.info("sysproxy.exe copy done");
            I.bNJpP(V);
          }
        });
      }));
    }
    D.push(new Promise((V, Y) => {
      if (v.xDvGn(v.vygOr, "Gtgda")) {
        fs.copyFile(path.join(__libname, "extra/mihomo.exe"), path.join(appConfigDir, v.BDjdH), I => {
          if (I) {
            A.QriBr(Y, I);
          } else {
            logger.info(A.Ajhra);
            A.bvasR(V);
          }
        });
      } else {
        A = null;
        D = false;
      }
    }));
    const x = path.join(__libname, "extra/geoip.dat");
    if (fs.existsSync(x)) {
      D.push(new Promise((V, Y) => {
        const I = {
          VZqDK: function (l, p) {
            return l === p;
          },
          hQSVu: A.QNoER,
          VXvea: A.xhBWW
        };
        const m = I;
        fs.copyFile(x, geoipDatPath, l => {
          if (l) {
            if (m.VZqDK("xYsan", m.hQSVu)) {
              I = false;
            } else {
              logger.warn(m.VXvea, l);
              V();
            }
          } else {
            logger.info("geoip.dat copy done");
            V();
          }
        });
      }));
    } else {
      logger.warn("geoip.dat 源文件不存在，跳过拷贝");
    }
    const S = path.join(__libname, "extra/Country.mmdb");
    if (fs.existsSync(S)) {
      D.push(new Promise((V, Y) => {
        const I = {
          EfAEq: A.eXKdA
        };
        const m = I;
        if (A.aBLZp === "TnWvs") {
          fs.copyFile(S, countryMmdbPath, l => {
            const p = {
              hesDE: A.RdvNa
            };
            const M = p;
            if (l) {
              logger.warn("拷贝 Country.mmdb 失败:", l);
              V();
            } else if (A.RRbLE !== A.RRbLE) {
              D.destroy();
              x(new S(M.hesDE));
              return;
            } else {
              logger.info("Country.mmdb copy done");
              V();
            }
          });
        } else {
          const p = {
            message: x,
            data: S
          };
          D.webContents.send(m.EfAEq, p);
        }
      }));
    } else {
      logger.warn("Country.mmdb 源文件不存在，跳过拷贝");
    }
    const s = path.join(__libname, "extra/geosite.dat");
    if (fs.existsSync(s)) {
      D.push(new Promise((V, Y) => {
        const I = {
          RGajd: "拷贝 geosite.dat 失败:",
          vKCZX: function (m) {
            return v.mfTrq(m);
          },
          XYLBk: v.SVuHx
        };
        if (v.wBFah("aokhS", v.IOhul)) {
          fs.copyFile(s, geositeDatPath, m => {
            if (m) {
              logger.warn(I.RGajd, m);
              I.vKCZX(V);
            } else {
              logger.info("geosite.dat copy done");
              V();
            }
          });
        } else {
          A(I.XYLBk, "download error " + D);
        }
      }));
    } else {
      logger.warn("geosite.dat 源文件不存在，跳过拷贝");
    }
    try {
      await Promise.all(D);
    } catch (V) {
      logger.error(v.jmuvv, V);
    }
    logger.info(v.ERaHJ);
    return v.xvlDo(g);
  });
}
function saveSysConfig(v) {
  const g = {
    uXkDN: function (A, D, x) {
      return A(D, x);
    },
    jvIQN: "update-isnow",
    lVvGz: "开始更新",
    pNsdi: "配置文件已保存:",
    uLPIJ: "网络模块已就绪",
    lMJxD: "OufQn",
    yHUNM: function (A, D) {
      return A === D;
    },
    RVgMU: "TfZKw",
    oDGcj: function (A, D) {
      return A + D;
    },
    MEpPs: function (A, D) {
      return A === D;
    },
    aKXav: "utf-8",
    CTRRK: "处理配置文件失败:"
  };
  return new Promise((D, x) => {
    const S = {
      ZvmaA: g.uLPIJ
    };
    const s = S;
    if (!fs.existsSync(appConfigDir)) {
      fs.mkdirSync(appConfigDir, {
        recursive: true
      });
    }
    try {
      let fileData = v;
      const U = /external-controller\s*:\s*['"]?[^\n'"]*['"]?/gi;
      const w = "external-controller: '127.0.0.1:9790'";
      if (U.test(fileData)) {
        if (g.lMJxD === "nRKZr") {
          g.uXkDN(x, g.jvIQN, g.lVvGz);
          S.quitAndInstall();
          if (s) {
            U.destroy();
          }
        } else {
          fileData = fileData.replace(U, w);
        }
      } else {
        let m = fileData.trim();
        if (!m.endsWith("\n")) {
          if (g.yHUNM(g.RVgMU, "TfZKw")) {
            m += "\n";
          } else {
            x = require("./secure-host");
            S = true;
            setTimeout(() => {
              if (U) {
                B.setTitle(s.ZvmaA);
              }
            }, 100);
          }
        }
        m += w + "\n";
        fileData = m;
      }
      const B = /mixed-port\s*:\s*['"]?\d+['"]?/gi;
      const V = "mixed-port: 10090";
      if (B.test(fileData)) {
        fileData = fileData.replace(B, V);
      } else {
        let p = fileData.trim();
        if (!p.endsWith("\n")) {
          p += "\n";
        }
        p += g.oDGcj(V, "\n");
        fileData = p;
      }
      let Y = true;
      if (fs.existsSync(configPath)) {
        try {
          const M = fs.readFileSync(configPath, "utf-8");
          const P = M.trim();
          const C = fileData.trim();
          if (g.MEpPs(P, C)) {
            Y = false;
          }
        } catch (j) {}
      }
      if (Y) {
        const T = {
          flag: "w",
          encoding: g.aKXav,
          mode: "0666"
        };
        fs.writeFile(configPath, fileData, T, function (L) {
          if (L) {
            logger.error("保存配置文件失败:", L);
            return x(L);
          } else {
            logger.info(g.pNsdi, configPath);
          }
        });
      } else {
        return D(true);
      }
    } catch (L) {
      logger.error(g.CTRRK, L);
      return x(L);
    }
  });
}
function reloadConfigViaAPI() {
  const v = {
    MFyDg: "API 重新加载配置请求失败:",
    awEVk: function (g) {
      return g();
    },
    kVLJJ: function (g, A) {
      return g(A);
    },
    IIlJs: function (g, A) {
      return g(A);
    },
    lRZhI: "127.0.0.1",
    PjUOS: "/configs?force=true"
  };
  return new Promise((g, A) => {
    const D = {
      mZHJN: function (Y) {
        return v.awEVk(Y);
      },
      fHbjF: function (Y, I) {
        return Y === I;
      },
      HlOdU: function (Y, I) {
        return v.kVLJJ(Y, I);
      },
      WTsEJ: "应用正在退出，取消 API 请求",
      behcA: "API 重新加载配置请求超时",
      wAyOd: "API 请求超时"
    };
    if (isQuiting()) {
      v.IIlJs(A, new Error("应用正在退出，取消 API 请求"));
      return;
    }
    const x = v.lRZhI;
    const S = 9790;
    const s = v.PjUOS;
    const J = configPath;
    const U = {
      path: J,
      payload: ""
    };
    const w = JSON.stringify(U);
    const B = {
      hostname: x,
      port: S,
      path: s,
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Content-Length": Buffer.byteLength(w)
      }
    };
    const V = http.request(B, Y => {
      const I = {
        yHKZV: function (l) {
          return D.mZHJN(l);
        },
        atgiw: "应用正在退出，取消 API 请求",
        DcRbv: function (l, p) {
          return D.fHbjF(l, p);
        },
        VdkxH: "API 重新加载配置成功，状态码:",
        EzCZN: "API 重新加载配置返回非成功状态码:",
        EUlKz: function (l, p) {
          return D.HlOdU(l, p);
        }
      };
      if (D.mZHJN(isQuiting)) {
        V.destroy();
        A(new Error(D.WTsEJ));
        return;
      }
      let m = "";
      Y.on("data", l => {
        m += l;
      });
      Y.on("end", () => {
        if (I.yHKZV(isQuiting)) {
          A(new Error(I.atgiw));
          return;
        }
        if (Y.statusCode === 200 || I.DcRbv(Y.statusCode, 204)) {
          logger.info(I.VdkxH, Y.statusCode);
          g(m);
        } else {
          logger.warn(I.EzCZN, Y.statusCode, m);
          I.EUlKz(A, new Error("API 返回状态码: " + Y.statusCode));
        }
      });
    });
    V.setTimeout(5000, () => {
      V.destroy();
      logger.error(D.behcA);
      D.HlOdU(A, new Error(D.wAyOd));
    });
    V.on("error", Y => {
      if (Y.code === "ECONNREFUSED") {
        logger.warn("无法连接到 mihomo API，内核可能未启动:", Y.message);
      } else {
        logger.error(v.MFyDg, Y.message);
      }
      A(Y);
    });
    V.write(w);
    V.end();
  });
}
function callRestartCore() {
  const v = {
    wxqKb: function (g, A) {
      return g === A;
    },
    oYHfE: function (g, A) {
      return g(A);
    },
    WZYsN: "resources",
    sncKT: "extra",
    kCuyp: "extra/mihomo.exe",
    JMezl: function (g, A) {
      return g !== A;
    },
    bPbni: "pGCUv",
    EpMDV: "应用正在退出，取消重启",
    ABUkb: function (g, A) {
      return g !== A;
    },
    cehTm: "rHnlW",
    FxqHK: function (g) {
      return g();
    },
    VEjRt: function (g, A) {
      return g(A);
    },
    LDvwH: function (g, A, D) {
      return g(A, D);
    }
  };
  if (isQuiting()) {
    logger.info("应用正在退出，跳过重启");
    return;
  }
  if (restartTimer) {
    v.VEjRt(clearTimeout, restartTimer);
  }
  restartTimer = v.LDvwH(setTimeout, () => {
    const g = {
      dHPqT: v.WZYsN,
      HgxYA: v.sncKT,
      AywiW: v.kCuyp
    };
    const A = g;
    if (v.JMezl(v.bPbni, "pGCUv")) {
      A = D.join(process.cwd(), A.dHPqT, A.HgxYA);
    } else {
      restartTimer = null;
      if (isQuiting()) {
        logger.info(v.EpMDV);
        return;
      }
      if (isTun === 1) {
        if (v.ABUkb("akisG", "akisG")) {
          if (v.wxqKb(I.statusCode, 204) || m.statusCode === 200) {
            k.info("TUN 模式已" + (N ? "启用" : "禁用") + " (状态码: " + u.statusCode + ")");
            const S = {
              success: true,
              statusCode: O.statusCode,
              data: h
            };
            v.oYHfE(Q, S);
          } else {
            y.error("设置 TUN 模式失败 (状态码: " + d.statusCode + ")");
            r(new G("API 返回错误状态码: " + F.statusCode));
          }
        } else {
          rebootServer();
        }
      } else if (coreServer != null) {
        if (v.JMezl(v.cehTm, "rHnlW")) {
          s = J.join(U, A.AywiW);
          w = B.resolve(V, "mihomo.exe");
        } else {
          let s = coreServer.pid;
          v.FxqHK(rebootServer);
        }
      } else {}
    }
  }, 500);
}
function getExeParams() {
  const A = {
    fzECD: "run"
  };
  let D;
  D = [A.fzECD, "-D", "" + getResource()];
  return D;
}
const getResource = g => {
  const D = {
    OvTYO: "resources",
    MveFg: "extra"
  };
  let x = "";
  if (isWin) {
    if (app.isPackaged) {
      x = path.join(process.cwd(), D.OvTYO, D.MveFg);
    } else {
      x = path.join(process.cwd(), "extra");
    }
  }
  if (g) {
    x = path.join(x, g);
  }
  return x;
};
async function startClashProcess(v) {
  const g = {
    TtjoX: "重启已在进行中，跳过本次请求",
    hBfSj: "Start initial compatible provider",
    vsLny: "coreStatus",
    sxbbb: "1|2|4|0|3",
    mdcYD: "false",
    FpuIb: function (D, x, S) {
      return D(x, S);
    },
    GEYFP: function (D) {
      return D();
    },
    BeMIP: "mihomo.exe",
    eWUrt: function (D, x, S, s) {
      return D(x, S, s);
    },
    sqHwW: "ignore",
    ePZtV: "pipe",
    pbjLA: "data",
    oCGyZ: "error",
    FyhXa: "close",
    ZYhkq: "hgdFZ",
    Ejojz: function (D, S) {
      return D === S;
    },
    hSVIS: "TKGQQ",
    AcjfB: "qaOsK",
    hCtyt: "ucnKZ",
    xHgwx: function (D) {
      return D();
    }
  };
  if (g.GEYFP(isQuiting)) {
    return;
  }
  if (isRestarting) {
    if (g.AcjfB !== g.hCtyt) {
      return;
    } else {
      g.info(g.TtjoX);
      return;
    }
  }
  isRestarting = true;
  const A = path.join(appConfigDir, "mihomo.exe");
  g.xHgwx(killCoreProcess).then(function () {
    const x = {
      tklCq: function (S, s, J) {
        return g.FpuIb(S, s, J);
      },
      QtbrA: g.mdcYD
    };
    if (g.ZYhkq !== "UkVvB") {
      if (g.GEYFP(isQuiting)) {
        isRestarting = false;
        return;
      }
      g.FpuIb(setTimeout, () => {
        const S = {
          KnjwJ: g.hBfSj,
          CNTFl: function (U, w, B) {
            return U(w, B);
          },
          Wuvdd: g.vsLny,
          erOkm: g.sxbbb,
          zoJpD: g.mdcYD,
          XSNaY: function (U, w, B) {
            return g.FpuIb(U, w, B);
          }
        };
        if (g.GEYFP(isQuiting)) {
          isRestarting = false;
          return;
        }
        const s = path.join(BIN_PATH, g.BeMIP);
        const J = g.eWUrt(spawn, s, ["-d", USER_DATA_PATH], {
          cwd: USER_DATA_PATH,
          stdio: [g.sqHwW, g.ePZtV, "pipe"],
          windowsHide: true
        });
        J.stdout.on("data", U => {
          const w = U.toString();
          if (w.includes("RESTful API listening at") || w.includes("proxy listening at") || w.includes(S.KnjwJ)) {
            console.log("✓ 内核启动成功");
            isRestarting = false;
            S.CNTFl(webContentsSend, S.Wuvdd, "true");
          }
        });
        J.stderr.on(g.pbjLA, U => {
          const w = U.toString();
          logger.error("[内核错误输出] " + w.trim());
        });
        J.on(g.oCGyZ, U => {
          const w = S.erOkm.split("|");
          let B = 0;
          while (true) {
            switch (w[B++]) {
              case "0":
                webContentsSend("statusJS", S.zoJpD);
                continue;
              case "1":
                console.error("[core error]", U);
                continue;
              case "2":
                logger.error("内核进程错误: " + U.message);
                continue;
              case "3":
                S.XSNaY(webContentsSend, S.Wuvdd, "false");
                continue;
              case "4":
                isRestarting = false;
                continue;
            }
            break;
          }
        });
        J.on(g.FyhXa, (U, w) => {
          console.log("[core exit] code=" + U + ", signal=" + w);
          logger.info("内核进程关闭 - 退出码: " + U + ", 信号: " + w);
          x.tklCq(webContentsSend, "coreStatus", x.QtbrA);
          webContentsSend("statusJS", x.QtbrA);
          J = null;
        });
      }, 500);
    } else {
      g.warn("配置文件不存在，无法恢复服务器连接");
      webContentsSend("statusJS", x.QtbrA);
    }
  }).catch(x => {
    if (g.Ejojz(g.hSVIS, g.hSVIS)) {
      serverConnected = null;
      isRestarting = false;
    } else {
      createWindow();
    }
  });
}
function killCoreProcess() {
  const v = {
    PFjsx: "inbnF",
    ZVxYM: "WkPDI",
    Wtpfz: "未找到",
    PEGRL: function (g) {
      return g();
    },
    TBZAP: function (g, A) {
      return g + A;
    },
    iwPEC: "false",
    ZGwHj: "libcore.exe",
    TJIWz: "clash.exe",
    hrBom: "QtNKf",
    wfXyh: "huLAp"
  };
  return new Promise(g => {
    try {
      webContentsSend("coreStatus", v.iwPEC);
      if (coreServer != null) {
        try {
          coreServer.kill();
          coreServer = null;
        } catch (x) {}
      }
      const processNames = [v.ZGwHj, "mihomo.exe", v.TJIWz];
      const A = processNames.map(S => "/IM " + S).join(" ");
      const D = "taskkill /F " + A + " /T";
      cps.exec(D, (S, s, J) => {
        if (v.PFjsx !== v.ZVxYM) {
          if (S) {
            const U = S.toString();
            if (U.includes("not found") || U.includes(v.Wtpfz) || U.includes("ERROR: The process")) {
              v.PEGRL(g);
            } else {
              v.PEGRL(g);
            }
          } else {
            v.PEGRL(g);
          }
        } else {
          const B = A.autoSelectArchitecture();
          if (!B) {
            const V = x.getMainNodePath();
          } else {}
        }
      });
    } catch (S) {
      if (v.hrBom === v.wfXyh) {
        if (S) {
          s.info(v.TBZAP("initProxyHelper", J));
        }
        if (U) {
          B.webContents.executeJavaScript("\n                    ");
        }
      } else {
        g();
      }
    }
  });
}
function initPowerMonitor() {
  const v = {
    dkiSx: function (g, A) {
      return g !== A;
    },
    xicoH: "配置文件不存在，无法恢复服务器连接",
    GLZDb: "恢复前服务器状态: 未连接，无需重启",
    BjqMK: "系统从休眠/待机恢复",
    yGnGj: function (g, A, D) {
      return g(A, D);
    },
    pHjxL: "zaNRf",
    YCdOK: function (g, A) {
      return g != A;
    },
    ILtFu: function (g, A) {
      return g !== A;
    },
    damUa: function (g, A) {
      return g !== A;
    },
    qJjrC: "休眠前关闭服务器连接",
    zEhGw: "suspend",
    LugUX: "shutdown"
  };
  electron.powerMonitor.on("resume", () => {
    logger.info(v.BjqMK);
    v.yGnGj(setTimeout, () => {
      if (isRouteBeforeSleep && isRouteBeforeSleep !== "" && v.dkiSx(isRouteBeforeSleep, null)) {
        logger.info("恢复前服务器状态: 已连接，准备重启服务器");
        if (isTunBeforeSleep !== undefined && isTunBeforeSleep !== null) {
          isTun = isTunBeforeSleep;
        }
        if (fs.existsSync(configPath)) {} else {
          logger.warn(v.xicoH);
          webContentsSend("statusJS", "false");
        }
      } else {
        logger.info(v.GLZDb);
      }
      isModeBeforeSleep = null;
      isRouteBeforeSleep = null;
      isTunBeforeSleep = null;
    }, 2000);
  });
  electron.powerMonitor.on(v.zEhGw, () => {
    if (v.pHjxL !== "uPkui") {
      logger.info("系统进入休眠/待机状态");
      isRouteBeforeSleep = serverConnected;
      isTunBeforeSleep = isTun;
      isModeBeforeSleep = serverMode;
      if (v.YCdOK(coreServer, null) || serverConnected && v.ILtFu(serverConnected, "") && v.damUa(serverConnected, null)) {
        logger.info(v.qJjrC);
      }
    } else {
      clearTimeout(g);
    }
  });
  electron.powerMonitor.on(v.LugUX, () => {
    logger.info("系统正在关闭");
    setTimeout(() => {
      app.quit();
    }, 500);
  });
  try {
    if (isWin) {
      electron.powerMonitor.on("lock-screen", () => {
        logger.info("系统屏幕已锁定");
      });
      electron.powerMonitor.on("unlock-screen", () => {
        logger.info("系统屏幕已解锁");
      });
    }
  } catch (g) {
    logger.info("当前平台不支持 lock-screen/unlock-screen 事件");
  }
}
function initProxyHelper() {
  const v = {
    kcZnN: function (g, A) {
      return g || A;
    },
    flzXv: function (g, A) {
      return g + A;
    },
    cLSPn: function (g) {
      return g();
    }
  };
  return new Promise(function (g, A) {
    const D = {
      iaLuV: function (S, s) {
        return v.kcZnN(S, s);
      },
      iYRGm: function (S, s) {
        return v.flzXv(S, s);
      },
      bbFYf: function (x, S, s) {
        return x(S, s);
      },
      hOUby: "授權失敗",
      bhxAQ: function (x, S) {
        return x(S);
      },
      DsfAf: function (x) {
        return v.cLSPn(x);
      },
      gBFFn: "APP"
    };
    if (isMac) {
      logger.info("help init.");
      fs.readFile(tun2socksToolPath, {
        encoding: "utf-8"
      }, function (S, s) {
        if (S) {
          var J = " cp " + tun2socksPath + " \"" + tun2socksToolPath + "\" && chown root:admin \"" + tun2socksToolPath + "\" && chmod a+rx \"" + tun2socksToolPath + "\" && chmod +s \"" + tun2socksToolPath + "\"";
          const U = {
            name: D.gBFFn
          };
          sudo.exec(J, U, (w, B, V) => {
            if (D.iaLuV(w, V)) {
              logger.info(D.iYRGm("help init err 授權失敗.", w));
              D.bbFYf(ProxyHelperAlert, D.hOUby, 1);
              return D.bhxAQ(A, w);
            } else {
              logger.info("help init success.");
              return D.DsfAf(g);
            }
          });
        } else {
          logger.info("help done.");
          return g();
        }
      });
    } else {
      return g();
    }
  });
}
function ProxyHelperAlert(g, A) {
  const D = {
    aBeEz: "done",
    lrRsX: function (s, J) {
      return s(J);
    },
    vzPJf: "ico",
    jvKLq: "ico.png"
  };
  const x = {
    type: "info",
    title: global.SiteName || "SkyNetwork",
    message: g,
    buttons: [D.aBeEz]
  };
  var S = x;
  try {
    const s = D.lrRsX(require, "fs");
    const J = path.join(__static, D.vzPJf, D.jvKLq);
    if (s.existsSync(J)) {
      S.icon = J;
    }
  } catch (U) {}
  dialog.showMessageBox(S, function (w) {});
}
function rebootServer(v) {
  const g = {
    atBpS: "应用正在退出，取消启动TUN进程",
    JidYP: function (A) {
      return A();
    },
    FYrOO: "lTkLl",
    dQMNA: "VckyS",
    vFRwQ: "LrZGo",
    ODvay: "重启Clash进程失败:",
    NjlhJ: "重启已在进行中，跳过本次请求",
    QRMal: function (A, D) {
      return A === D;
    },
    uFPIy: function (A) {
      return A();
    },
    LbBfS: function (A) {
      return A();
    }
  };
  if (isQuiting()) {
    logger.info("应用正在退出，跳过重启服务器");
    return;
  }
  if (isRestarting) {
    logger.info(g.NjlhJ);
    return;
  }
  isRestarting = true;
  logger.info("开始重启内核...");
  if (g.QRMal(isTun, 1)) {
    g.uFPIy(killCoreProcess).then(function () {
      if (isQuiting()) {
        logger.info("应用正在退出，取消启动TUN进程");
        isRestarting = false;
        return;
      }
      setTimeout(() => {
        if (isQuiting()) {
          logger.info(g.atBpS);
          isRestarting = false;
          return;
        }
        webContentsSend("statusJS", "ing");
        startTunProcess();
        isRestarting = false;
      }, 500);
    }).catch(A => {
      logger.error("重启TUN进程失败:", A);
      serverConnected = null;
      isRestarting = false;
    });
  } else {
    g.LbBfS(killCoreProcess).then(function () {
      const A = {
        nPveW: function (D, S) {
          return D === S;
        },
        fhDoQ: function (D) {
          return g.JidYP(D);
        },
        pxIFe: function (D, x) {
          return D(x);
        }
      };
      if (isQuiting()) {
        if (g.FYrOO === g.dQMNA) {
          if (this.mainNodePath) {
            return this.mainNodePath;
          }
          let x;
          if (A.nPveW(process.env.NODE_ENV, "development") || !process.resourcesPath) {
            x = x.join(__dirname, "..", "..", "main.node");
          } else {
            x = S.join(process.resourcesPath, "app.asar.unpacked", "main.node");
          }
          this.mainNodePath = x;
          return x;
        } else {
          logger.info("应用正在退出，取消启动Clash进程");
          isRestarting = false;
          return;
        }
      }
      setTimeout(() => {
        if (A.fhDoQ(isQuiting)) {
          logger.info("应用正在退出，取消启动Clash进程");
          isRestarting = false;
          return;
        }
        A.pxIFe(startClashProcess, v);
        isRestarting = false;
      }, 500);
    }).catch(A => {
      if (g.vFRwQ === "DczNS") {
        try {
          x.kill();
          S = null;
        } catch (x) {}
      } else {
        logger.error(g.ODvay, A);
        serverConnected = null;
        isRestarting = false;
      }
    });
  }
}
function closeServer() {
  const v = {
    VfjBP: function (A, D, x) {
      return A(D, x);
    },
    SuCBw: "false",
    MwpHo: "PQTIh",
    FTewl: "TgQgL",
    axfZC: function (A, D) {
      return A === D;
    },
    CBxze: "tXyUN",
    XPTeW: function (A, D, x) {
      return A(D, x);
    },
    jLAsw: function (A) {
      return A();
    }
  };
  const g = isQuiting();
  if (v.axfZC(isTun, 1)) {
    v.jLAsw(killCoreProcess).then(function () {
      serverConnected = null;
      if (!g) {
        v.VfjBP(webContentsSend, "statusJS", v.SuCBw);
      }
    }).catch(A => {
      serverConnected = null;
    });
  } else {
    v.jLAsw(killCoreProcess).then(function () {
      const A = {
        JFvmI: "系统代理服务器已设置: 127.0.0.1:10090"
      };
      const D = A;
      if (v.MwpHo !== v.FTewl) {
        serverConnected = null;
        if (!g) {
          if (v.axfZC("tXyUN", v.CBxze)) {
            v.XPTeW(webContentsSend, "statusJS", v.SuCBw);
          } else {
            const S = "reg add \"HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Internet Settings\" /v ProxyServer /d \"127.0.0.1:10090\" /f";
            A.execSync(S);
            D.info(D.JFvmI);
          }
        }
      } else {
        g = null;
      }
    }).catch(A => {
      serverConnected = null;
    });
  }
}
function generateMenus() {
  const v = {
    Rjcmw: function (A) {
      return A();
    },
    KWThA: "开启App"
  };
  let g = [{
    label: v.KWThA,
    click: function () {
      v.Rjcmw(reopenWindow);
    }
  }, {
    label: "退出",
    click: function () {
      exit();
    }
  }];
  return g;
}
function updateTray() {
  const v = generateMenus();
  const contextMenu = Menu.buildFromTemplate(v);
  tray.setContextMenu(contextMenu);
  setTrayIcon();
}
function getTrayIcon() {
  const A = {
    Fkxqj: "icons",
    jFyJm: "enabledTemplate@2x.png"
  };
  return path.join(__static, A.Fkxqj, isMac ? A.jFyJm : "enabledTemplate@2x.png");
}
function setTrayIcon() {
  const v = {
    SGBKA: function (g) {
      return g();
    },
    ZjJEc: "icons"
  };
  tray.setImage(nativeImage.createFromPath(v.SGBKA(getTrayIcon)));
  if (isMac) {
    tray.setPressedImage(nativeImage.createFromPath(path.join(__static, v.ZjJEc, "enabledTemplate@2x.png")));
  }
}
function renderTray() {
  const v = {
    oeCNb: "extra",
    seVDQ: "tUVBR",
    hIAVH: "ujiTj",
    CwaMR: function (g) {
      return g();
    }
  };
  tray = new Tray(nativeImage.createEmpty());
  v.CwaMR(updateTray);
  tray.on("click", function () {
    const g = {
      oleuA: v.oeCNb
    };
    const A = g;
    if (v.seVDQ === "tUVBR") {
      if (mainWindow != null) {
        if (mainWindow.isVisible()) {
          if (v.hIAVH !== v.hIAVH) {
            return g;
          } else {
            mainWindow.hide();
          }
        } else {
          mainWindow.show();
        }
      }
    } else {
      A = D.join(process.resourcesPath, A.oleuA);
    }
  });
}
async function getApiHostsSmart(v = false) {
  const g = {
    raPNN: function (D) {
      return D();
    },
    htKWX: function (D, S) {
      return D === S;
    },
    vDrFG: function (D, x) {
      return D(x);
    },
    rydJD: "API 重新加载配置返回非成功状态码:",
    ElKsZ: function (D, x, S) {
      return D(x, S);
    },
    uIxjR: "false",
    PGahx: function (D, S) {
      return D && S;
    },
    INrbe: function (D, S) {
      return D - S;
    },
    knscU: function (D, S) {
      return D === S;
    },
    gEDUg: "EUWzi",
    HQePj: function (D, S) {
      return D - S;
    },
    BBgcw: function (D, S) {
      return D === S;
    },
    HTCVh: "XSpmz"
  };
  const A = Date.now();
  if (g.PGahx(!v, apiHostsCache) && A - lastCacheTime < CACHE_DURATION) {
    return apiHostsCache;
  }
  if (!v && g.INrbe(A, lastCacheTime) < MIN_REQUEST_INTERVAL) {
    if (apiHostsCache) {
      return apiHostsCache;
    }
    v = true;
  }
  if (!secureHostLoaded) {
    if (g.knscU(g.gEDUg, "EUWzi")) {
      g.raPNN(loadSecureHost);
      const x = 5000;
      const S = Date.now();
      while (!secureHostLoaded && g.HQePj(Date.now(), S) < x) {
        if (g.BBgcw(g.HTCVh, "XSpmz")) {
          await new Promise(s => setTimeout(s, 100));
        } else {
          const J = this.getMainNodePath();
          if (!A.existsSync(J)) {
            return false;
          }
          const U = D.statSync(J);
          return true;
        }
      }
      if (!secureHostLoaded) {
        return [];
      }
    } else {
      A = null;
      if (!D) {
        g.ElKsZ(webContentsSend, "statusJS", g.uIxjR);
      }
    }
  }
  try {
    isUpdating = true;
    lastCacheTime = A;
    const U = await new Promise(w => {
      const B = {
        ohEho: function (V, Y) {
          return g.vDrFG(V, Y);
        },
        NaJDB: "./secure-host",
        MOpch: function (V, Y) {
          return V === Y;
        },
        yMtpN: function (V, Y) {
          return g.htKWX(V, Y);
        },
        seStc: "tkihX"
      };
      setImmediate(async () => {
        const V = {
          HGGYf: "Meta Tunnel",
          jKIqI: function (Y, I) {
            return B.ohEho(Y, I);
          }
        };
        try {
          if (!secureHostModule) {
            secureHostModule = require(B.NaJDB);
          }
          const I = await secureHostModule.getApiHostsFromSecureHost(v);
          B.ohEho(w, I);
        } catch (m) {
          if (B.MOpch(process.env.NODE_ENV, "development")) {
            if (B.yMtpN("tkihX", B.seStc)) {
              console.error("[ERROR] Failed to get API hosts:", m.message);
            } else {
              const ready = D.includes(V.HGGYf) && x.includes("2");
              V.jKIqI(S, ready);
            }
          }
          w([]);
        }
      });
    });
    apiHostsCache = U;
    return U;
  } catch (w) {
    if (apiHostsCache) {
      return apiHostsCache;
    }
    return [];
  } finally {
    isUpdating = false;
  }
}
async function updateApiHostsInBackground() {
  if (isUpdating) {
    return;
  }
  try {
    const v = await getApiHostsSmart(true);
  } catch (g) {}
}
ipc.handle("secure:getApiHosts", async (v, g = false) => {
  const A = {
    CPicH: function (D, x) {
      return D(x);
    }
  };
  return await A.CPicH(getApiHostsSmart, g);
});
ipc.handle("secure:refreshApiHosts", async () => {
  return await getApiHostsSmart(true);
});
ipc.handle("secure:getCacheStatus", () => {
  const g = {
    caFjC: function (S, s) {
      return S - s;
    }
  };
  const A = g;
  const D = Date.now();
  return {
    hasCache: !!apiHostsCache,
    cacheAge: apiHostsCache ? A.caFjC(D, lastCacheTime) : 0,
    lastRequestTime: lastCacheTime,
    isUpdating: isUpdating,
    cacheDuration: CACHE_DURATION,
    minRequestInterval: MIN_REQUEST_INTERVAL
  };
});
setTimeout(() => {
  const v = {
    fLLHW: function (g, A) {
      return g === A;
    },
    VTRlS: "nKJjz",
    JUrKK: function (g, A, D) {
      return g(A, D);
    },
    DyIEU: function (g, A) {
      return g * A;
    },
    VsjdG: function (g, A) {
      return g * A;
    }
  };
  v.JUrKK(setInterval, () => {
    if (v.VTRlS !== "nKJjz") {
      try {
        const A = s.readFileSync(J, "utf-8");
        const D = A.trim();
        const x = fileData.trim();
        if (v.fLLHW(D, x)) {
          w = false;
        }
      } catch (S) {}
    } else {
      updateApiHostsInBackground();
    }
  }, v.DyIEU(v.VsjdG(3, 60), 1000));
  updateApiHostsInBackground();
}, 10000);
