const path = require('path');
const koa = require('koa');
// nunjucks koa的模板引擎
// http://npm.taobao.org/package/koa-nunjucks-2
const nunjucks = require('koa-nunjucks-2');
const koaBody = require('koa-body');
const router = require('./routes');

const getUploadFileExt = require('./utils/getUploadFileExt');
const getUploadFileName = require('./utils/getUploadFileName');
const checkDirExist = require('./utils/checkDirExist');
const getUploadDirName = require('./utils/getUploadDirName');

const app = new koa();

app.use(nunjucks({
  ext: 'html',
  // 模板目录
  path: path.join(__dirname, './views'),
  // 自动从块/标记中删除尾随换行符
  nunjucksConfig: {
    trimBlocks: true
  }
}));

app.use(koaBody({
  multipart: true,
  encoding: 'gzip',
  formidable: {
    // 上传的文件目录
    uploadDir: path.join(__dirname, 'public/upload/images'),
    keepExtensions: true,
    maxFieldsSize: 2 * 1024 * 1024,
    // 更改保存文件夹名称和文件名称等
    onFileBegin: (name, file) => {
      console.log("file.name",file.name);
      if(!(file.name)) return;
      // 获取文件后缀
      const ext = getUploadFileExt(file.name);
      // 最终要保存到的文件夹目录
      const dirName = getUploadDirName();
      const dir = path.join(__dirname, `public/upload/images/${dirName}`);
      // 检查文件夹是否存在如果不存在则新建文件夹
      checkDirExist(dir);
      // 获取文件名称
      const fileName = getUploadFileName(file.name,ext);
      // const fileName = file.name + "_" + new Date1().getTime() + "." + ext;
      // 重新覆盖 file.path 属性
      file.path = `${dir}/${fileName}`;
      app.context.uploadpath = app.context.uploadpath ? app.context.uploadpath : {};
      app.context.uploadpath[name] = `${dirName}/${fileName}`;
    },
  }
}));
app.use(router.routes()).use(router.allowedMethods());


app.listen(3001, () => {
  console.log('[ok] Server starts at http://localhost:3001');
});