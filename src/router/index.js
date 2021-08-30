const fs=require("fs");

const useRoutes=(app)=>{//function()
	fs.readdirSync(__dirname).forEach(file=>{
		if (file ==='index.js') return;
		const router=require(`./${file}`)
		// this.use(router.routes())
		app.use(router.routes())
		// this.use(router.allowedMethods())
		app.use(router.allowedMethods())
	})
}

module.exports =useRoutes;
