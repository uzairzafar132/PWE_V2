const {createProxyMiddleware}= require("http-proxy-middleware");

module.exports = app =>{

    
    app.use(
        createProxyMiddleware("/connect/token",{
            target:"https://auth.flexbooker.com",
            changeOrigin: true
        })
    )

    app.use(
        createProxyMiddleware("/api/CustomerHistory",{
            target:"https://merchant-api.flexbooker.com",
            changeOrigin: true
        })
    )


    app.use(
        createProxyMiddleware("/Appointment",{
            target:"https://merchant-api.flexbooker.com",
            changeOrigin: true
        })
    )

    app.use(
        createProxyMiddleware("/api/Customers",{
            target:"https://merchant-api.flexbooker.com",
            changeOrigin: true
        }))
    app.use(
        createProxyMiddleware("/Account",{
                target:"https://merchant-api.flexbooker.com",
                changeOrigin: true
        }))

    app.use(
            createProxyMiddleware("/zipdata/add",{
                target:"http://platinummedapp.com/",
                changeOrigin: true
            })
    )


    app.use(
        createProxyMiddleware("/zipdata/",{
            target:"http://platinummedapp.com/",
            changeOrigin: true
        })
)


app.use(
    createProxyMiddleware("/zipdata/update/",{
        target:"http://platinummedapp.com/",
        changeOrigin: true
    })
)


app.use(
    createProxyMiddleware("/zipdata/all",{
        target:"http://platinummedapp.com/",
        changeOrigin: true
    })
)



   
}