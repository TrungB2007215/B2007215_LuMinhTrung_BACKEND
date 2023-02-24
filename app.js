const expess = require("express");
const cors = require("cors");

const contractsRouter = require("./app/routes/contract.route");
const ApiError = require("./app/api-error");
const app = expess();
const loginRouter = require("./app/routes/login.route");

app.use(cors());
app.use(expess.json());

app.get("/", (req, res) => {
    res.json({message: "Welcome to contact book application."});
});

app.use("/api/contacts", contractsRouter);
app.use("/login", loginRouter);

//handle 404 response
app.use((req, res, next) => {
    //code ở đây sẽ chạy khi không có route được định nghĩa nào
    //khớp với yêu cầu. gọi next() để chuyển sang middleware xử lý lỗi
    return next(new ApiError(404, "Resource not found"));
});

//define error-handling middleware last, ofer other app.use() and routes calls
app.use((err, req, res, next) =>{
    //middleware xử lý lỗi tập trung
    //trong các đoạn code xử lý ở các route, gọi next(error)
    //sẽ chuyển về middleware xử lý lỗi này
    return res.status(err.statusCode || 500).json({
        message: err.message || "Internal Server Error"
    })
})

module.exports = app;