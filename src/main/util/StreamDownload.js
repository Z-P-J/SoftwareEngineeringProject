import * as path from 'path';
import * as fs from 'fs';

const request = require('request');

// // ---- 下载类 ---- //
// function StreamDownload() {
//     // 声明下载过程回调函数
//     this.downloadCallback = null;
// }

// // 下载进度
// StreamDownload.prototype.showProgress = function (received, total) {
//     const percentage = (received * 100) / total;
//     // 用回调显示到界面上
//     this.downloadCallback('progress', percentage);
// };

// // 下载过程
// StreamDownload.prototype.downloadFile = function (patchUrl, baseDir, callback) {

//     this.downloadCallback = callback; // 注册回调函数

//     const downloadFile = 'update.7z'; // 下载文件名称，也可以从外部传进来

//     let receivedBytes = 0;
//     let totalBytes = 0;

//     const req = request({
//         method: 'GET',
//         uri: patchUrl
//     });

//     const out = fs.createWriteStream(path.join(baseDir, downloadFile));
//     req.pipe(out);

//     req.on('response', (data) => {
//         // 更新总文件字节大小
//         totalBytes = parseInt(data.headers['content-length'], 10);
//     });

//     req.on('data', (chunk) => {
//         // 更新下载的文件块字节大小
//         receivedBytes += chunk.length;
//         this.showProgress(receivedBytes, totalBytes);
//     });

//     req.on('end', () => {
//         console.log('下载已完成，等待处理');
//         // TODO: 检查文件，部署文件，删除文件
//         this.downloadCallback('finished', percentage);
//     });

// }

// let downloader = new StreamDownload();

// export default downloader;


function downloadFile(patchUrl, baseDir, fileName, callback) {
    // this.downloadCallback = callback; // 注册回调函数

    // const fileName = 'update.7z'; // 下载文件名称，也可以从外部传进来

    let receivedBytes = 0;
    let totalBytes = 0;

    const req = request({
        method: 'GET',
        uri: patchUrl
    });

    const out = fs.createWriteStream(path.join(baseDir, fileName));
    req.pipe(out);

    req.on('response', (data) => {
        // 更新总文件字节大小
        totalBytes = parseInt(data.headers['content-length'], 10);
    });

    req.on('data', (chunk) => {
        // 更新下载的文件块字节大小
        receivedBytes += chunk.length;
        // this.showProgress(receivedBytes, totalBytes);
        const percentage = (receivedBytes * 100) / totalBytes;
        // 用回调显示到界面上
        callback('progress', percentage);
    });

    req.on('end', () => {
        console.log('下载已完成，等待处理');
        // TODO: 检查文件，部署文件，删除文件
        callback('finished', percentage);
    });
}

// module.exports.downloadFile = downloadFile;
export default downloadFile;