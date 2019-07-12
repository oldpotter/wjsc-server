const Koa = require('koa')
const router = require('koa-router')()
const koaBody = require('koa-body')({multipart:true})
var cors = require('koa2-cors')
var Jimp = require('jimp')
var Send = require('koa-send')


const app = new Koa()

app.use(cors())

router.post('/jimp', koaBody, async(ctx) => {
	const {brightness, contrast} = ctx.request.body
	await Jimp.read(ctx.request.files.file.path)
			.then(img => {
			  img.brightness(parseFloat(brightness))
					.contrast(parseFloat(contrast))
					.normalize()
					.quality(20)
                  	// .getBase64Async(Jimp.MIME_JPEG)
                  	.writeAsync('2.jpg')
                  	.then(()=>{
                  		// console.log('ok:\n', img)
                  		ctx.body = '2.jpg'
                  	})
			})
})

router.get('/download', async (ctx) => {
    await Send(ctx, '2.jpg');
});

app.use(router.routes())

app.listen(3001, () => {
  console.log('server is running at http://localhost:3001')
})