---
title: 如何使用Vue3+vite配合Electron搭建桌面应用
date: 2023-3-28
author: 吴立铎
categories:
- Vue
- WebPack
tags:
 - Vue
 - Electron
isTimeLine: true
sidebar: true
isComment: false
---

## **安装步骤**
====

-----------------------------

1.  下载并安装`Electron`：[https://www.electronjs.org/docs/tutorial/installation](https://www.electronjs.org/docs/tutorial/installation)
2.  下载并安装`vite`：[https://github.com/vitejs/vite](https://github.com/vitejs/vite)
3.  配置`package.json`文件：将 `electron-starter.js` 作为启动文件指向 `vite index.js`
4.  拷贝`static`目录
5.  在 `main.js`文件里添加`window.loadURL()`装载 `index.html`
6.  启动应用 `npm start`
7.  构建App：`npm run build`

基本搭建
====

1.  下载安装 [Vite](https://github.com/vitejs/vite) 和 [Electron](https://www.electronjs.org/)：

```command
npm install -g vite electron
```

2.  创建 Vue3 + Vite 项目：

```command
vite init
```

3.  在项目文件夹中创建 electron 目录，并添加 package.json 文件用于管理 Electron：

```json
{
  "name": "my-app",
  "version": "0.0.1",
  "scripts": {
    "start": "vite --cors && electron ."
  }
}
```

4.  在项目文件夹中，添加一个 quick start 示例代码的 `main.js` ：

```javascript
const { app, BrowserWindow } = require('electron');

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
  app.quit();
}

const createWindow = () => { 
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
  });

  // and load the index.html of the app.
  mainWindow.loadURL('http://localhost:3000');
};

app.on('ready', createWindow);
```

5.  启动项目：

```command
npm run start
```

支持打包发布
======

1.  安装 electron-builder：

```command
npm install --save-dev electron-builder
```

2.  为你的应用添加启动参数：

```command
"build": {
  "productName": "My App",
  "directories": {
    "output": "dist",
    "app": ".",
    "buildResources": "assets"
  },
  "files": ["dist/**/*"],
   "dmg": { 
     "contents": [
       {
         "x": 410,
         "y": 150,
         "type": "link",
         "path": "/Applications"
      },
      {
        "x": 130,
        "y": 150,
        "type": "file"
      }
    ]
  },
  "mac": {
    "icon": "icons/icon.icns"
  }
}
```

3.  通过 electron-builder 进行打包构建：

```command
npx electron-builder build
```

4.  安装打包好的Mac / Windows应用，就可以在桌面运行Vue3+Vite配合Electron搭建的应用程序了。