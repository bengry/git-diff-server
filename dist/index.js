"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var app_1 = require("./app");
var PORT = process.env.PORT || 3000;
app_1.app.listen(PORT, function () {
    console.log("PORT Listen At ".concat(PORT));
});
//# sourceMappingURL=index.js.map