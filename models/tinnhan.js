var db = require('../lib/db');
var tinnhanSchema = new db.Schema({
    maxacnhan: Number,
    sdtkhachhang: Number,
    thoigianhethan: { type: Date, expires: 5*60, default: Date.now }
});

var tinnhanDB = db.mongoose.model('tinnhanxacnhan', tinnhanSchema);

//ham random ma xac nhan
function taoMaXacNhan(){
    var min = 10000;
    var max = 99999;
    var random = Math.floor(Math.random() * (max - min + 1)) + min;
    return random;
}
function luuXacNhan(sdtkhachhang, callback){
    var xacnhan = new tinnhanDB();
    //xacnhan.maxacnhan = taoMaXacNhan();
    xacnhan.maxacnhan='1111';
    xacnhan.sdtkhachhang = sdtkhachhang;
    console.log('tin nhan luu : ', sdtkhachhang)
    xacnhan.save()
    .then(()=>{callback(null, xacnhan);})
    .catch(err=>console.error(err))
}
function timXacNhan(sdtkhachhang, callback){
    var query = tinnhanDB.findOne({'sdtkhachhang':sdtkhachhang});
    query.exec()
    .then(function(xacnhan){
        callback(null, xacnhan);
    })
    .catch(function(err){
        callback(err);
    });
}
function xoaXacNhan(sdtkhachhang){
    var query = tinnhanDB.findOne({'sdtkhachhang':sdtkhachhang}).deleteOne();
    console.log('remove otp')
    query.exec()
    .then(res=>res)
    .catch(err=>console.error(err))
}
// Exports
module.exports.luuXacNhan = luuXacNhan;
module.exports.timXacNhan = timXacNhan;
module.exports.xoaXacNhan = xoaXacNhan;
