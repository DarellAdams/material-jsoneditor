(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@mui/material'), require('@mui/icons-material/DeleteForever'), require('react'), require('@mui/icons-material/Add'), require('@mui/icons-material/Home'), require('@mui/icons-material/ExpandMore')) :
    typeof define === 'function' && define.amd ? define(['exports', '@mui/material', '@mui/icons-material/DeleteForever', 'react', '@mui/icons-material/Add', '@mui/icons-material/Home', '@mui/icons-material/ExpandMore'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global["material-jsoneditor"] = {}, global.material, global.DeleteForeverIcon, global.React, global.AddIcon, global.HomeIcon, global.ExpandMoreIcon));
})(this, (function (exports, material, DeleteForeverIcon, React, AddIcon, HomeIcon, ExpandMoreIcon) { 'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    var DeleteForeverIcon__default = /*#__PURE__*/_interopDefaultLegacy(DeleteForeverIcon);
    var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
    var AddIcon__default = /*#__PURE__*/_interopDefaultLegacy(AddIcon);
    var HomeIcon__default = /*#__PURE__*/_interopDefaultLegacy(HomeIcon);
    var ExpandMoreIcon__default = /*#__PURE__*/_interopDefaultLegacy(ExpandMoreIcon);

    /******************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */

    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m) return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
        }
        catch (error) { e = { error: error }; }
        finally {
            try {
                if (r && !r.done && (m = i["return"])) m.call(i);
            }
            finally { if (e) throw e.error; }
        }
        return ar;
    }

    function __spreadArray(to, from, pack) {
        if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
            if (ar || !(i in from)) {
                if (!ar) ar = Array.prototype.slice.call(from, 0, i);
                ar[i] = from[i];
            }
        }
        return to.concat(ar || Array.prototype.slice.call(from));
    }

    function typeFromValue(value) {
        switch (typeof value) {
            case 'number':
                return 'number';
            case 'string':
                return 'string';
            case 'boolean':
                return 'boolean';
            default:
                if (value === null || value === undefined)
                    return 'null';
                if (Array.isArray(value))
                    return 'array';
                return 'object';
        }
    }

    function valueFromType(type) {
        switch (type) {
            case 'number':
                return 0;
            case 'string':
                return '';
            case 'boolean':
                return false;
            case 'array':
                return [];
            case 'object':
                return {};
            default:
                return null;
        }
    }

    var ArrayActions;
    (function (ArrayActions) {
        ArrayActions["ADD_ITEM"] = "ADD_ITEM";
        ArrayActions["MOVE_ITEM"] = "MOVE_ITEM";
        ArrayActions["CLONE_ITEM"] = "CLONE_ITEM";
        ArrayActions["DELETE_ITEM"] = "DELETE_ITEM";
        ArrayActions["CHANGE_ITEM"] = "CHANGE_ITEM";
        ArrayActions["SET"] = "SET";
    })(ArrayActions || (ArrayActions = {}));
    function arrayReducer(arr, action) {
        switch (action.action) {
            case ArrayActions.ADD_ITEM: {
                return __spreadArray(__spreadArray([], __read(arr), false), [action.value], false);
            }
            case ArrayActions.MOVE_ITEM: {
                var newArr = __spreadArray([], __read(arr), false);
                var existingItems = newArr.splice(action.index, 1);
                newArr.splice(action.targetIndex, 0, existingItems[0]);
                return newArr;
            }
            case ArrayActions.CLONE_ITEM: {
                return __spreadArray(__spreadArray(__spreadArray([], __read(arr.slice(0, action.index)), false), [arr[action.index]], false), __read(arr.slice(action.index)), false);
            }
            case ArrayActions.DELETE_ITEM: {
                return __spreadArray(__spreadArray([], __read(arr.slice(0, action.index)), false), __read(arr.slice(action.index + 1)), false);
            }
            case ArrayActions.CHANGE_ITEM: {
                var newArr = __spreadArray([], __read(arr), false);
                newArr[action.index] = action.value;
                return newArr;
            }
            case ArrayActions.SET: {
                return action.value;
            }
            default: {
                return [];
            }
        }
    }

    function valueToString(value) {
        var result = '';
        switch (typeof value) {
            case 'number': {
                result = value.toString();
                break;
            }
            case 'string': {
                result = value;
                break;
            }
            case 'boolean': {
                result = value ? 'True' : 'False';
                break;
            }
            default: {
                if (value === null || value === undefined) {
                    result = 'None';
                    break;
                }
                if (Array.isArray(value)) {
                    result = value.map(function (item) { return valueToString(item); }).join(', ');
                    break;
                }
                result = "(".concat(Object.keys(value)
                    .map(function (key) { return "".concat(key, ": ").concat(valueToString(value[key])); })
                    .join(', '), ")");
                break;
            }
        }
        // limit the number of chars we print to screen (gets truncated anyway)
        return result.substring(0, 100) || '[Empty]';
    }

    var listWrapStyle$1 = {
        width: '100%',
        flex: 1,
        border: 1,
        borderColor: 'grey.500',
        borderRadius: 1,
        boxSizing: 'border-box',
        overflow: 'auto',
        position: 'relative',
        minHeight: 100,
    };
    var listStyle$1 = {
        position: 'absolute',
        width: '100%',
    };
    var listItemTextTypographyStyle$1 = {
        align: 'left',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
    };
    function ArrayEditor(_a) {
        var onChange = _a.onChange, value = _a.value, newItemValue = _a.newItemValue, onEdit = _a.onEdit;
        var _b = __read(React.useReducer(arrayReducer, value), 2), arr = _b[0], dispatch = _b[1];
        React.useEffect(function () {
            onChange(arr);
        }, [arr, onChange]);
        React.useEffect(function () {
            dispatch({ action: ArrayActions.SET, value: value });
        }, [value]);
        var onAdd = function () {
            dispatch({ action: ArrayActions.ADD_ITEM, value: newItemValue(arr) });
        };
        return (React__default["default"].createElement(material.Stack, { display: "flex", width: "100%", direction: "column", justifyContent: "flex-start", alignItems: "flex-start", spacing: 1, flex: 1 },
            React__default["default"].createElement(material.Box, { sx: listWrapStyle$1 },
                React__default["default"].createElement(material.List, { dense: true, sx: listStyle$1 }, arr.map(function (itemValue, index) { return (
                // we do want to use the index here as the key as the items may not be unique
                // eslint-disable-next-line react/no-array-index-key
                React__default["default"].createElement(material.ListItem, { key: index, disablePadding: true },
                    React__default["default"].createElement(material.ListItemButton, { onClick: function () { return onEdit(index); } },
                        React__default["default"].createElement(material.ListItemText, { primaryTypographyProps: listItemTextTypographyStyle$1, primary: valueToString(itemValue) })))); }))),
            React__default["default"].createElement(material.Button, { endIcon: React__default["default"].createElement(AddIcon__default["default"], null), color: "primary", variant: "outlined", fullWidth: true, onClick: onAdd }, "Add new")));
    }

    function BooleanEditor(_a) {
        var label = _a.label, value = _a.value, onChange = _a.onChange;
        return (React__default["default"].createElement(material.FormControlLabel, { label: label, control: React__default["default"].createElement(material.Switch, { checked: value, onChange: function (_e, checked) { return onChange(checked); } }) }));
    }

    function NumberEditor(_a) {
        var value = _a.value, onChange = _a.onChange, label = _a.label;
        var _b = __read(React.useState(value.toString()), 2), inputValue = _b[0], setInputValue = _b[1];
        React.useEffect(function () {
            setInputValue(value.toString());
        }, [value]);
        var updateValue = function (newInputValue) {
            setInputValue(newInputValue);
            var newValue = parseFloat(newInputValue);
            if (!Number.isNaN(newValue) && Number.isFinite(newValue)) {
                onChange(newValue);
            }
        };
        return (React__default["default"].createElement(material.TextField, { size: "small", label: label, fullWidth: true, inputProps: { inputMode: 'numeric', pattern: '[0-9]*' }, InputLabelProps: { shrink: true }, value: inputValue, onChange: function (e) { return updateValue(e.target.value); } }));
    }

    function cloneValue(value) {
        if (Array.isArray(value)) {
            return __spreadArray([], __read(value), false);
        }
        if (typeof value === 'object' && value !== null) {
            return __assign({}, value);
        }
        return value;
    }

    var ObjectActions;
    (function (ObjectActions) {
        ObjectActions["ADD_ITEM"] = "ADD_ITEM";
        ObjectActions["CLONE_ITEM"] = "CLONE_ITEM";
        ObjectActions["DELETE_ITEM"] = "DELETE_ITEM";
        ObjectActions["UPDATE_ITEM"] = "UPDATE_ITEM";
        ObjectActions["UPDATE_KEY"] = "UPDATE_KEY";
        ObjectActions["SET"] = "SET";
    })(ObjectActions || (ObjectActions = {}));
    function objectReducer(obj, action) {
        var _a, _b, _c;
        switch (action.action) {
            case ObjectActions.ADD_ITEM: {
                return __assign(__assign({}, obj), (_a = {}, _a[action.key] = action.value, _a));
            }
            case ObjectActions.CLONE_ITEM: {
                return __assign(__assign({}, obj), (_b = {}, _b["".concat(action.key, "_copy")] = cloneValue(obj[action.key]), _b));
            }
            case ObjectActions.DELETE_ITEM: {
                var newObj = __assign({}, obj);
                delete newObj[action.key];
                return newObj;
            }
            case ObjectActions.UPDATE_ITEM: {
                return __assign(__assign({}, obj), (_c = {}, _c[action.key] = action.value, _c));
            }
            case ObjectActions.UPDATE_KEY: {
                var newObj2 = __assign({}, obj);
                var existingValue = newObj2[action.key];
                delete newObj2[action.key];
                newObj2[action.newKey] = existingValue;
                return newObj2;
            }
            case ObjectActions.SET: {
                return action.value;
            }
            default: {
                return {};
            }
        }
    }

    var listWrapStyle = {
        width: '100%',
        flex: 1,
        border: 1,
        borderColor: 'grey.500',
        borderRadius: 1,
        boxSizing: 'border-box',
        overflow: 'auto',
        position: 'relative',
        minHeight: 100,
    };
    var listStyle = {
        position: 'absolute',
        width: '100%',
    };
    var listItemButtonStyle = {
        width: '100%',
    };
    var listItemTextStyle = {
        flexBasis: '50%',
    };
    var listItemTextTypographyStyle = {
        align: 'left',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
    };
    function ObjectEditor(_a) {
        var value = _a.value, onChange = _a.onChange, onEdit = _a.onEdit, newItemKey = _a.newItemKey, newItemValue = _a.newItemValue;
        var _b = __read(React.useReducer(objectReducer, value), 2), obj = _b[0], dispatch = _b[1];
        React.useEffect(function () {
            onChange(obj);
            // do not trigger an update when the change func is updated
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [obj]);
        React.useEffect(function () {
            dispatch({ action: ObjectActions.SET, value: value });
        }, [value]);
        var onAdd = function () {
            dispatch({
                action: ObjectActions.ADD_ITEM,
                key: newItemKey(obj),
                value: newItemValue(obj),
            });
        };
        return (React__default["default"].createElement(material.Stack, { display: "flex", width: "100%", direction: "column", justifyContent: "flex-start", alignItems: "flex-start", spacing: 1, flex: 1 },
            React__default["default"].createElement(material.Box, { sx: listWrapStyle },
                React__default["default"].createElement(material.List, { dense: true, sx: listStyle }, Object.keys(obj).map(function (key) { return (React__default["default"].createElement(material.ListItem, { key: key, disablePadding: true },
                    React__default["default"].createElement(material.ListItemButton, { sx: listItemButtonStyle, onClick: function () { return onEdit(key); } },
                        React__default["default"].createElement(material.ListItemText, { sx: listItemTextStyle, primaryTypographyProps: listItemTextTypographyStyle, primary: key }),
                        React__default["default"].createElement(material.ListItemText, { sx: listItemTextStyle, secondaryTypographyProps: listItemTextTypographyStyle, secondary: valueToString(obj[key]) })))); }))),
            React__default["default"].createElement(material.Button, { endIcon: React__default["default"].createElement(AddIcon__default["default"], null), color: "primary", variant: "outlined", fullWidth: true, onClick: onAdd }, "Add new")));
    }

    function StringEditor(_a) {
        var label = _a.label, value = _a.value, onChange = _a.onChange;
        return (React__default["default"].createElement(material.TextField, { sx: {
                '& .MuiInputBase-root': {
                    flex: 1,
                },
            }, label: label, margin: "dense", fullWidth: true, style: { flex: 1 }, InputLabelProps: { shrink: true }, inputProps: { style: { height: '100%', overflow: 'auto' } }, hiddenLabel: true, autoCorrect: "off", spellCheck: "false", autoComplete: "off", multiline: true, variant: "outlined", value: value, onChange: function (e) { return onChange(e.target.value); } }));
    }

    var types = [
        { name: 'Number', value: 'number' },
        { name: 'String', value: 'string' },
        { name: 'Boolean', value: 'boolean' },
        { name: 'Array', value: 'array' },
        { name: 'Object', value: 'object' },
        { name: 'Null', value: 'null' },
    ];
    var typeByValue = types.reduce(function (acc, item) {
        acc[item.value] = item;
        return acc;
    }, {});
    function ValueEditor(_a) {
        var value = _a.value, onChange = _a.onChange, newArrayItemValue = _a.newArrayItemValue, onEdit = _a.onEdit, newObjectItemValue = _a.newObjectItemValue, newObjectItemKey = _a.newObjectItemKey;
        var updateValue = function (type) {
            onChange(valueFromType(type));
        };
        var valueType = typeFromValue(value);
        var valueEditor = (function () {
            switch (valueType) {
                case 'number':
                    return React__default["default"].createElement(NumberEditor, { label: "Value", value: value, onChange: onChange });
                case 'string':
                    return React__default["default"].createElement(StringEditor, { label: "Value", value: value, onChange: onChange });
                case 'boolean':
                    return React__default["default"].createElement(BooleanEditor, { label: "Value", value: value, onChange: onChange });
                case 'array':
                    return (React__default["default"].createElement(material.Stack, { display: "flex", direction: "column", justifyContent: "flex-start", alignItems: "flex-start", width: "100%", flex: "1", spacing: 1 },
                        React__default["default"].createElement(material.InputLabel, null,
                            "Items (",
                            value.length,
                            ")"),
                        React__default["default"].createElement(ArrayEditor, { newItemValue: newArrayItemValue, onEdit: onEdit, value: value, onChange: onChange })));
                case 'object':
                    return (React__default["default"].createElement(material.Stack, { display: "flex", direction: "column", justifyContent: "flex-start", alignItems: "flex-start", width: "100%", flex: "1", spacing: 1 },
                        React__default["default"].createElement(material.InputLabel, null,
                            "Properties (",
                            Object.keys(value).length,
                            ")"),
                        React__default["default"].createElement(ObjectEditor, { newItemValue: newObjectItemValue, newItemKey: newObjectItemKey, value: value, onEdit: onEdit, onChange: onChange })));
                default:
                    return '';
            }
        })();
        return (React__default["default"].createElement(React__default["default"].Fragment, null,
            React__default["default"].createElement(material.TextField, { select: true, label: "Type", size: "small", fullWidth: true, value: typeByValue[valueType].value, onChange: function (e) { return updateValue(e.target.value); } }, types.map(function (typeObj) { return (React__default["default"].createElement(material.MenuItem, { key: typeObj.value, value: typeObj.value }, typeObj.name)); })),
            valueEditor));
    }

    // returns new object for the path given with the leaf reference changed
    function deleteChild(parent, path) {
        var newParent = cloneValue(parent);
        var leaf = newParent;
        for (var i = 0; i < path.length - 1; i += 1) {
            if (leaf === null || typeof leaf !== 'object') {
                leaf = {};
            }
            else {
                leaf = __assign({}, leaf);
            }
            if (Array.isArray(leaf)) {
                leaf = leaf[+path[i]];
            }
            else {
                leaf = leaf[path[i]];
            }
        }
        var lastKey = path[path.length - 1];
        if (Array.isArray(leaf)) {
            leaf.splice(+lastKey, 1);
        }
        else if (typeof leaf === 'object' && leaf !== null) {
            delete leaf[lastKey];
        }
        return newParent;
    }

    function getChild(parent, path) {
        var _a;
        var childObj = parent;
        for (var i = 0; i < path.length; i += 1) {
            var field = path[i];
            if (typeof childObj !== 'object') {
                throw new Error("Could not get child ".concat(field, " of ").concat(childObj));
            }
            if (Array.isArray(childObj)) {
                childObj = childObj[+field];
            }
            else {
                childObj = (_a = childObj === null || childObj === void 0 ? void 0 : childObj[field]) !== null && _a !== void 0 ? _a : null;
            }
        }
        return childObj;
    }

    // returns new object for each parent for the path given with the leaf reference changed
    function setChild(parent, path, value) {
        var leaf = parent;
        for (var i = 0; i < path.length; i += 1) {
            var part = path[i];
            if (typeof leaf !== 'object' || leaf === null) {
                break;
            }
            if (Array.isArray(leaf)) {
                leaf = leaf[+part];
            }
            else {
                leaf = leaf[part];
            }
        }
        if (leaf === value) {
            return parent;
        }
        if (!path.length) {
            return value;
        }
        var newParent = cloneValue(parent);
        leaf = newParent;
        for (var i = 0; i < path.length - 1; i += 1) {
            if (typeof leaf !== 'object' || leaf === null) {
                leaf = {};
            }
            else {
                leaf = __assign({}, leaf);
            }
            if (Array.isArray(leaf)) {
                leaf = leaf[+path[i]];
            }
            else {
                leaf = leaf[path[i]];
            }
        }
        if (typeof leaf !== 'object' || leaf === null) {
            leaf = {};
        }
        var lastKey = path[path.length - 1];
        if (Array.isArray(leaf)) {
            leaf[+lastKey] = value;
        }
        else {
            leaf[lastKey] = value;
        }
        return newParent;
    }

    var ChipBreadcrumb = material.styled(material.Chip)(function (_a) {
        var theme = _a.theme;
        var backgroundColor = theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[800];
        return {
            backgroundColor: backgroundColor,
            height: theme.spacing(3),
            color: theme.palette.text.primary,
            fontWeight: theme.typography.fontWeightRegular,
            '&:hover, &:focus': {
                backgroundColor: material.emphasize(backgroundColor, 0.06),
            },
            '&:active': {
                boxShadow: theme.shadows[1],
                backgroundColor: material.emphasize(backgroundColor, 0.12),
            },
        };
    });

    function LevelBreadcrumb(_a) {
        var items = _a.items, onSelect = _a.onSelect, icon = _a.icon, item = _a.item;
        var _b = __read(React__default["default"].useState(undefined), 2), anchorEl = _b[0], setAnchorEl = _b[1];
        var openMenu = function (e) {
            setAnchorEl(e.target);
        };
        var closeMenu = function () {
            setAnchorEl(undefined);
        };
        var selectMenuItem = function (selectedItem) {
            closeMenu();
            onSelect(selectedItem);
        };
        var handleListKeyDown = function (e) {
            if (e.key === 'Tab') {
                e.preventDefault();
                closeMenu();
            }
            else if (e.key === 'Escape') {
                closeMenu();
            }
        };
        return (items === null || items === void 0 ? void 0 : items.length) ? (React__default["default"].createElement("div", { style: { position: 'relative' } },
            React__default["default"].createElement(ChipBreadcrumb, { icon: icon, label: item, onClick: function () { return onSelect(item); }, deleteIcon: React__default["default"].createElement(ExpandMoreIcon__default["default"], null), onDelete: openMenu, "aria-controls": "basic-menu", "aria-haspopup": "true", "aria-expanded": anchorEl ? 'true' : undefined }),
            React__default["default"].createElement(material.Popper, { open: Boolean(anchorEl), role: undefined, anchorEl: anchorEl, placement: "bottom" },
                React__default["default"].createElement(material.Paper, null,
                    React__default["default"].createElement(material.ClickAwayListener, { onClickAway: closeMenu },
                        React__default["default"].createElement(material.MenuList, { dense: true, autoFocusItem: Boolean(anchorEl), onKeyDown: handleListKeyDown }, items === null || items === void 0 ? void 0 : items.map(function (listItem) { return (React__default["default"].createElement(material.MenuItem, { key: listItem, onClick: function () { return selectMenuItem(listItem); } }, listItem)); }))))))) : (React__default["default"].createElement(ChipBreadcrumb, { icon: icon, label: item, onClick: function () { return onSelect(item); } }));
    }
    LevelBreadcrumb.defaultProps = {
        icon: undefined,
        items: [],
    };

    function LevelSelector(_a) {
        var obj = _a.obj, path = _a.path, setPath = _a.setPath;
        var subobj = obj;
        var paths = path.map(function (pathItem) {
            var items = new Array();
            if (Array.isArray(subobj)) {
                var keys = Array.from(subobj.keys());
                var itemIndex = parseInt(pathItem.toString(), 10);
                items = __spreadArray(__spreadArray([], __read(keys.slice(0, itemIndex)), false), __read(keys.slice(itemIndex + 1)), false);
                subobj = subobj[itemIndex];
            }
            else if (typeof subobj === 'object' && subobj !== null) {
                var keys = new Set(Object.keys(subobj));
                keys.delete(pathItem.toString());
                items = Array.from(keys);
                subobj = subobj[pathItem];
            }
            return {
                items: items,
                pathItem: pathItem,
            };
        });
        return (React__default["default"].createElement(material.Breadcrumbs, { "aria-label": "breadcrumb" },
            React__default["default"].createElement(LevelBreadcrumb, { item: "Root", icon: React__default["default"].createElement(HomeIcon__default["default"], { fontSize: "small" }), onSelect: function () { return setPath([]); } }),
            paths.map(function (pathPart, index) { return (React__default["default"].createElement(LevelBreadcrumb, { key: pathPart.pathItem, item: pathPart.pathItem, onSelect: function (selectedItem) { return setPath(__spreadArray(__spreadArray([], __read(path.slice(0, index)), false), [selectedItem], false)); }, items: pathPart.items })); })));
    }

    var newArrayItemValue = function (subobj) {
        if (subobj.length > 0) {
            var lastItem = subobj[subobj.length - 1];
            return valueFromType(typeFromValue(lastItem));
        }
        return '';
    };
    var newObjectItemValue = function (subobj) {
        var objKeys = Object.keys(subobj);
        if (objKeys.length > 0) {
            var lastItem = subobj[objKeys[objKeys.length - 1]];
            return valueFromType(typeFromValue(lastItem));
        }
        return '';
    };
    var newObjectItemKey = function (subobj) {
        // create a new property name that uses the last property name with new number of the end
        var objKeys = Object.keys(subobj);
        var i = 1;
        var newKey = "item".concat(i);
        while (objKeys.includes(newKey)) {
            i += 1;
            newKey = "item".concat(i);
        }
        return newKey;
    };
    function Editor(_a) {
        var value = _a.value, onChange = _a.onChange;
        var _b = __read(React.useState([]), 2), path = _b[0], setPath = _b[1];
        var _c = __read(React.useState(value), 2), obj = _c[0], setObj = _c[1];
        var _d = __read(React.useState(path[path.length - 1]), 2), propName = _d[0], setPropName = _d[1];
        React.useEffect(function () {
            setPropName(path[path.length - 1]);
        }, [path]);
        React.useEffect(function () {
            setObj(value);
        }, [value]);
        var setNewPropName = function () {
            var newPath = path.slice(0, path.length - 1);
            if (propName !== undefined) {
                newPath.push(propName);
            }
            var existingItem = getChild(obj, path);
            var newObj = setChild(deleteChild(obj, path), newPath, existingItem);
            setObj(newObj);
            setPath(newPath);
            onChange(newObj);
        };
        var updateObj = React.useCallback(function (subobj) {
            var newObj = setChild(obj, path, subobj);
            setObj(newObj);
            onChange(newObj);
        }, [obj, path, onChange]);
        var deleteCurrent = function () {
            var newObj = deleteChild(obj, path);
            setObj(newObj);
            setPath(path.slice(0, path.length - 1));
            onChange(newObj);
        };
        return (React__default["default"].createElement(material.Stack, { width: "100%", direction: "column", justifyContent: "flex-start", alignItems: "flex-start", spacing: 2 },
            React__default["default"].createElement(LevelSelector, { path: path, setPath: setPath, obj: obj }),
            React__default["default"].createElement(material.Stack, { display: "flex", flex: "1", width: "100%", direction: "column", justifyContent: "flex-start", alignItems: "flex-start", spacing: 2 },
                React__default["default"].createElement(material.Stack, { display: "flex", direction: "column", justifyContent: "flex-start", alignItems: "flex-start", width: "100%", flex: "1", spacing: 2 },
                    typeof propName === 'string' ? (React__default["default"].createElement(material.TextField, { size: "small", fullWidth: true, label: "Property Name", value: propName, InputLabelProps: { shrink: true }, onChange: function (e) { return setPropName(e.target.value); }, onBlur: setNewPropName })) : undefined,
                    React__default["default"].createElement(ValueEditor, { newArrayItemValue: newArrayItemValue, newObjectItemValue: newObjectItemValue, newObjectItemKey: newObjectItemKey, value: getChild(obj, path), onEdit: function (index) { return setPath(__spreadArray(__spreadArray([], __read(path), false), [index], false)); }, onChange: updateObj })),
                path.length > 0 ? (React__default["default"].createElement(material.Box, { width: "100%" },
                    React__default["default"].createElement(material.Button, { endIcon: React__default["default"].createElement(DeleteForeverIcon__default["default"], null), color: "error", variant: "outlined", fullWidth: true, onClick: deleteCurrent }, "Delete"))) : undefined)));
    }

    function JSONTextEditor(_a) {
        var value = _a.value, onChange = _a.onChange;
        var _b = __read(React.useState(JSON.stringify(value, null, '    ')), 2), textareaValue = _b[0], setTextareaValue = _b[1];
        var _c = __read(React.useState(true), 2), isValid = _c[0], setIsValid = _c[1];
        var updateValue = function (newValue) {
            setTextareaValue(newValue);
            try {
                var parsedResult = JSON.parse(newValue);
                setIsValid(true);
                onChange(parsedResult);
            }
            catch (err) {
                setIsValid(false);
            }
        };
        React.useEffect(function () {
            setTextareaValue(JSON.stringify(value, null, '    '));
            setIsValid(true);
        }, [value]);
        return (React__default["default"].createElement(material.TextField, { sx: {
                '& .MuiInputBase-root': {
                    flex: 1,
                },
            }, margin: "dense", fullWidth: true, style: { flex: 1, margin: 0 }, inputProps: { style: { height: '100%', overflow: 'auto' } }, error: !isValid, hiddenLabel: true, autoCorrect: "off", spellCheck: "false", autoComplete: "off", multiline: true, variant: "outlined", onChange: function (e) { return updateValue(e.target.value); }, value: textareaValue }));
    }

    exports.Editor = Editor;
    exports.JSONTextEditor = JSONTextEditor;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
