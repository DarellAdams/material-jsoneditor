(function (factory) {
	typeof define === 'function' && define.amd ? define(factory) :
	factory();
})((function () { 'use strict';

	Object.defineProperty(exports, "__esModule", { value: true });
	exports.JSONTextEditor = exports.Editor = void 0;
	var Editor_1 = require("./components/Editor");
	Object.defineProperty(exports, "Editor", { enumerable: true, get: function () { return Editor_1.Editor; } });
	var JSONTextEditor_1 = require("./components/editors/JSONTextEditor");
	Object.defineProperty(exports, "JSONTextEditor", { enumerable: true, get: function () { return JSONTextEditor_1.JSONTextEditor; } });

}));
