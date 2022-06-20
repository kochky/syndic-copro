"use strict";
exports.__esModule = true;
exports.Admin = void 0;
var react_1 = require("react");
var TextField_1 = require("@mui/material/TextField");
exports.Admin = function () {
    var _a = react_1.useState(), email = _a[0], setEmail = _a[1];
    var _b = react_1.useState(), password = _b[0], setPassword = _b[1];
    var _c = react_1.useState(), name = _c[0], setName = _c[1];
    var _d = react_1.useState(), lot = _d[0], setLot = _d[1];
    var _e = react_1.useState(), millieme = _e[0], setMillieme = _e[1];
    var handleChange = function (props, event) {
        switch (props) {
            case "email":
                setEmail(event.target.value);
                break;
            case "password":
                setPassword(event.target.value);
                break;
            case "name":
                setName(event.target.value);
                break;
            case "lot":
                setLot(event.target.value);
                break;
            case "millieme":
                setMillieme(event.target.value);
                break;
        }
    };
    function submit() {
        var _this = this;
        var requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title: 'React POST Request Example' })
        };
        fetch('https://reqres.in/api/posts', requestOptions)
            .then(function (response) { return response.json(); })
            .then(function (data) { return _this.setState({ postId: data.id }); });
    }
    return (react_1["default"].createElement("div", null,
        react_1["default"].createElement(TextField_1["default"], { id: "outlined-name", label: "Email", value: email, onChange: function (event) { return handleChange("email", event); } }),
        react_1["default"].createElement(TextField_1["default"], { id: "outlined-name", label: "Password", value: password, onChange: function (event) { return handleChange("password", event); } }),
        react_1["default"].createElement(TextField_1["default"], { id: "outlined-name", label: "Name", value: name, onChange: function (event) { return handleChange("name", event); } }),
        react_1["default"].createElement(TextField_1["default"], { id: "outlined-name", label: "Lot", value: lot, onChange: function (event) { return handleChange("lot", event); } }),
        react_1["default"].createElement(TextField_1["default"], { id: "outlined-name", label: "Milli\u00E8me", value: millieme, onChange: function (event) { return handleChange("millieme", event); } }),
        react_1["default"].createElement("button", { onClick: function () { return submit; } }, "Valider")));
};
