<<<<<<< HEAD
const connect = require('./APIHelper');
const apis = require('./APIs');
=======

const connect = require('../helpers/APIHelper');
const apis = require('../helpers/APIs');
>>>>>>> remotes/origin/Tuan

module.exports = async (req, res, next) => {
    if (req.signedCookies.token) {
        req.token = req.signedCookies.token;
        //kiểm tra xem đa lưu thông tin người dùng chưa nếu chưa lưu thì gọi lấy
        if (!req.signedCookies.v1_pf) {
            var response = await connect(apis.POST_PROFILE, {}, req.token);

            if (response == null) {
                res.clearCookie("token")
                res.send('<script>alert("token exprire");window.location.replace("/login")</script>');
                return;
            }

            if (response.is_success) {
<<<<<<< HEAD
                res.locals.data = response.data_response.fullname;
                res.cookie("v1_pf", response.data_response.username, { signed: true, maxAge: 50000 });
=======
                res.locals.data = response.data_response.username;
                res.cookie("v1_pf", response.data_response.username, { signed: true, maxAge: 12000 });
>>>>>>> remotes/origin/Tuan
                next();
            } else {
                res.clearCookie("token")
                res.send('<script>alert("token exprire");window.location.replace("/login")</script>');
            }
        } else {
            res.locals.data = req.signedCookies.v1_pf;
            next();
        }
    } else {
        res.clearCookie("token")
        res.redirect("/login");
    }
}