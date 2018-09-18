const router = require('koa-router')();
const koaBody = require('koa-body');


router.get('/', async (ctx) => {
  await ctx.render('index');
});

router.post('/upload',async (ctx)=>{
  ctx.body = JSON.stringify(ctx.request.files);
});

module.exports = router;
