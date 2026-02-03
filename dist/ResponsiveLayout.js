"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _ResponsiveLayout_instances, _ResponsiveLayout_isMobile_get;
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
// import HorizontalDivider from "../../Divider/UI/HorizontalDivider";
const ResponsiveLayout_module_css_1 = __importDefault(require("../Styles/ResponsiveLayout.module.css"));
class ResponsiveLayout extends react_1.PureComponent {
    constructor() {
        // Removed #getPixelsFromRem as it's no longer needed without Allotment
        super(...arguments);
        _ResponsiveLayout_instances.add(this);
    }
    render() {
        const { sidePane, detailPane } = this.props;
        const isSidePaneVisible = sidePane.visible;
        const isMobile = __classPrivateFieldGet(this, _ResponsiveLayout_instances, "a", _ResponsiveLayout_isMobile_get);
        // Determine classes for main container and panes
        let containerClasses = ResponsiveLayout_module_css_1.default.container;
        let sidePaneClasses = ResponsiveLayout_module_css_1.default.sidePane;
        let detailPaneClasses = ResponsiveLayout_module_css_1.default.detailPane;
        if (isMobile) {
            if (isSidePaneVisible) {
                sidePaneClasses += ` ${ResponsiveLayout_module_css_1.default.sidePaneOpenMobile}`;
                // On mobile, detail pane is obscured, not shrunk
                detailPaneClasses += ` ${ResponsiveLayout_module_css_1.default.detailPaneHiddenMobile}`;
            }
            else {
                sidePaneClasses += ` ${ResponsiveLayout_module_css_1.default.sidePaneClosedMobile}`;
            }
        }
        else {
            // Desktop
            if (isSidePaneVisible) {
                sidePaneClasses += ` ${ResponsiveLayout_module_css_1.default.sidePaneOpenDesktop}`;
                detailPaneClasses += ` ${ResponsiveLayout_module_css_1.default.detailPaneShrunkDesktop}`;
            }
            else {
                sidePaneClasses += ` ${ResponsiveLayout_module_css_1.default.sidePaneClosedDesktop}`;
            }
        }
        return (react_1.default.createElement("div", { className: containerClasses },
            react_1.default.createElement("div", { className: sidePaneClasses }, isSidePaneVisible && (react_1.default.createElement(react_1.default.Fragment, null,
                react_1.default.createElement("div", { className: ResponsiveLayout_module_css_1.default.title },
                    react_1.default.createElement("div", null, sidePane.title),
                    sidePane.onClose && (react_1.default.createElement("div", { className: ResponsiveLayout_module_css_1.default.closer, onClick: () => { var _a; return (_a = sidePane.onClose) === null || _a === void 0 ? void 0 : _a.call(sidePane); } }, "X"))),
                sidePane.pane))),
            react_1.default.createElement("div", { className: detailPaneClasses }, detailPane)));
    }
}
_ResponsiveLayout_instances = new WeakSet(), _ResponsiveLayout_isMobile_get = function _ResponsiveLayout_isMobile_get() {
    return window.innerWidth < 768;
};
exports.default = ResponsiveLayout;
