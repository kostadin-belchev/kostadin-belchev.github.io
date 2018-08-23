(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./src/$$_lazy_route_resource lazy recursive":
/*!**********************************************************!*\
  !*** ./src/$$_lazy_route_resource lazy namespace object ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error('Cannot find module "' + req + '".');
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./src/app/admin-panel/admin-panel.component.css":
/*!*******************************************************!*\
  !*** ./src/app/admin-panel/admin-panel.component.css ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "img {\r\n  max-width: 10%;\r\n  max-height: 10%;\r\n}\r\n\r\nul {\r\n  margin: 1%;\r\n}\r\n\r\nbutton {\r\n  margin: 0.1%;\r\n}"

/***/ }),

/***/ "./src/app/admin-panel/admin-panel.component.html":
/*!********************************************************!*\
  !*** ./src/app/admin-panel/admin-panel.component.html ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"alert alert-success\" role=\"alert\">\n  <h4 class=\"alert-heading\">ADMIN PANEL</h4>\n  <p>You are logged in as admin which means you can browse the data on the website and can edit/delete products.</p>\n  <hr>\n  <p class=\"mb-0\">Don't be evil.</p>\n</div>\n\n<div class=\"card\">\n  <div class=\"card-body\">\n    <h4>Send a password reset email</h4>\n    <div class=\"row\">\n      <div class=\"col-xs-12 col-sm-10 col-md-8 col-sm-offset-1 col-md-offset-2\">\n        <form #f=\"ngForm\" (ngSubmit)=\"sendPasswordResetEmailForm(f)\">\n          <div class=\"form-group\">\n            <label for=\"email\">Email Address</label>\n            <input \n            required\n            type=\"email\" \n            id=\"email\" \n            name=\"email\"\n            class=\"form-control\"\n            ngModel>\n          </div>\n          <button class=\"btn btn-primary\" [disabled]=\"f.invalid\" type=\"submit\">Send</button>\n        </form>\n      </div>\n    </div>\n    <br>\n    <p>\n      <button class=\"btn btn-primary\" type=\"button\" data-toggle=\"collapse\" data-target=\"#collapseExample\" aria-expanded=\"false\" aria-controls=\"collapseExample\">\n        Click to show list of users\n      </button>\n    </p>\n    <div class=\"collapse\" id=\"collapseExample\">\n      <div class=\"card card-body\">\n        <ul>\n          <li *ngFor=\"let user of users\">Username: {{user.displayName}} Email: {{user.email}} \n            <button class=\"btn btn-sm\" (click)=\"sendPasswordResetEmail(user.email)\">Send password reset email</button>\n            <button class=\"btn btn-danger btn-sm\" (click)=\"disableUser(user)\">Disable user</button>\n            <button class=\"btn btn-primary btn-sm\" (click)=\"enableUser(user)\">Enable user</button>\n          </li>\n        </ul>\n      </div>\n    </div>\n  </div>\n</div>\n\n<h4>What are people buying the most? See people's carts:</h4>\n<div *ngIf=\"carts$ | async as carts; else loading\">\n  <ul *ngFor=\"let cart of carts\" class=\"list-group\">\n    <div class=\"card\">\n      <div class=\"card-body\">\n        (anonymous user)\n        <div *ngIf=\"cart.length == 0\">\n          (cart empty)\n        </div>\n        <li *ngFor=\"let cartProduct of cart\" class=\"list-group-item d-flex justify-content-between align-items-center\">\n          <img src=\"{{cartProduct.imagePath}}\" alt=\"{{cartProduct.name}}\">\n          <a class=\"badge badge-light badge-pill\" routerLink=\"../products/details/{{cartProduct.ownerId}}/{{cartProduct.productId}}\">{{cartProduct.name}}</a>\n          <!-- Button trigger modal -->\n          <!-- <button type=\"button\" class=\"btn btn-sm btn-danger\" data-toggle=\"modal\" data-target=\"#exampleModal\">\n              Remove from cart\n          </button> -->\n          \n        </li>\n      </div>\n    </div>\n  </ul>\n</div>\n"

/***/ }),

/***/ "./src/app/admin-panel/admin-panel.component.ts":
/*!******************************************************!*\
  !*** ./src/app/admin-panel/admin-panel.component.ts ***!
  \******************************************************/
/*! exports provided: AdminPanelComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AdminPanelComponent", function() { return AdminPanelComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _services_user_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/user.service */ "./src/app/services/user.service.ts");
/* harmony import */ var firebase__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! firebase */ "./node_modules/firebase/dist/index.cjs.js");
/* harmony import */ var firebase__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(firebase__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_ngx_toastr__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../node_modules/ngx-toastr */ "./node_modules/ngx-toastr/fesm5/ngx-toastr.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var AdminPanelComponent = /** @class */ (function () {
    function AdminPanelComponent(userService, toastrService) {
        this.userService = userService;
        this.toastrService = toastrService;
    }
    AdminPanelComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.carts$ = this.userService.getAllCarts();
        this.userService.getAllUsers().subscribe(function (data) {
            _this.users = data;
        });
    };
    AdminPanelComponent.prototype.sendPasswordResetEmailForm = function (form) {
        var _this = this;
        var auth = firebase__WEBPACK_IMPORTED_MODULE_2__["auth"]();
        var emailAddress = form.value.email;
        // console.log(emailAddress)
        auth.sendPasswordResetEmail(emailAddress).then(function () {
            // Email sent.
            _this.toastrService.success('Email sent', 'Success!');
        }).catch(function (error) {
            // An error happened.
            _this.toastrService.error('An error happened!\n' + error, 'Warning!');
        });
    };
    AdminPanelComponent.prototype.sendPasswordResetEmail = function (emailAddress) {
        var _this = this;
        var auth = firebase__WEBPACK_IMPORTED_MODULE_2__["auth"]();
        auth.sendPasswordResetEmail(emailAddress).then(function () {
            // Email sent.
            _this.toastrService.success('Email sent', 'Success!');
        }).catch(function (error) {
            // An error happened.
            _this.toastrService.error('An error happened!\n' + error, 'Warning!');
        });
    };
    AdminPanelComponent.prototype.disableUser = function (userToBeDisabled) {
        var _this = this;
        // console.log('userToBeDisabled: ')
        // console.log(userToBeDisabled)
        // console.log('TODO disableUser')
        var uid = userToBeDisabled['userId'];
        var obj = {};
        obj[uid] = userToBeDisabled;
        obj['active'] = false;
        firebase__WEBPACK_IMPORTED_MODULE_2__["database"]().ref("users/" + uid).update(obj).then(function () {
            // added correctly
            // console.log('User disabled!')
            _this.toastrService.success('User disabled! He/she will no longer have access write to the database. ', 'Success!');
        }).catch(function (error) { return _this.toastrService.error('An error happened!\n' + error, 'Warning!'); });
    };
    AdminPanelComponent.prototype.enableUser = function (userToBeEnabled) {
        var _this = this;
        // console.log('userToBeEnabled: ')
        // console.log(userToBeEnabled)
        var uid = userToBeEnabled['userId'];
        var obj = {};
        obj[uid] = userToBeEnabled;
        obj['active'] = true;
        firebase__WEBPACK_IMPORTED_MODULE_2__["database"]().ref("users/" + uid).update(obj).then(function () {
            // added correctly
            // console.log('User enabled!')
            _this.toastrService.success('User enabled! He/she will have access to write the database. ', 'Success!');
        }).catch(function (error) { return _this.toastrService.error('An error happened!\n' + error, 'Warning!'); });
    };
    AdminPanelComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-admin-panel',
            template: __webpack_require__(/*! ./admin-panel.component.html */ "./src/app/admin-panel/admin-panel.component.html"),
            styles: [__webpack_require__(/*! ./admin-panel.component.css */ "./src/app/admin-panel/admin-panel.component.css")]
        }),
        __metadata("design:paramtypes", [_services_user_service__WEBPACK_IMPORTED_MODULE_1__["UserService"],
            _node_modules_ngx_toastr__WEBPACK_IMPORTED_MODULE_3__["ToastrService"]])
    ], AdminPanelComponent);
    return AdminPanelComponent;
}());



/***/ }),

/***/ "./src/app/app.component.css":
/*!***********************************!*\
  !*** ./src/app/app.component.css ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/app.component.html":
/*!************************************!*\
  !*** ./src/app/app.component.html ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<app-navigation></app-navigation>\n\n<div class=\"container\">\n  <router-outlet></router-outlet>\n</div>\n\n"

/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var firebase__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! firebase */ "./node_modules/firebase/dist/index.cjs.js");
/* harmony import */ var firebase__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(firebase__WEBPACK_IMPORTED_MODULE_1__);
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


var AppComponent = /** @class */ (function () {
    function AppComponent() {
    }
    AppComponent.prototype.ngOnInit = function () {
        firebase__WEBPACK_IMPORTED_MODULE_1__["initializeApp"]({
            apiKey: "AIzaSyBbe9JAvHrWBLE7Wfa93aQBvHGnPSrNiso",
            authDomain: "ng-e-shop.firebaseapp.com",
            databaseURL: 'https://ng-e-shop.firebaseio.com'
        });
        // admin.initializeApp({
        //   credential: admin.credential.applicationDefault(),
        //   databaseURL: 'https://ng-e-shop.firebaseio.com'
        // });
    };
    AppComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-root',
            template: __webpack_require__(/*! ./app.component.html */ "./src/app/app.component.html"),
            styles: [__webpack_require__(/*! ./app.component.css */ "./src/app/app.component.css")]
        })
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/platform-browser/animations */ "./node_modules/@angular/platform-browser/fesm5/animations.js");
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ngx-toastr */ "./node_modules/ngx-toastr/fesm5/ngx-toastr.js");
/* harmony import */ var _app_routing__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./app.routing */ "./src/app/app.routing.ts");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
/* harmony import */ var _auth_sign_in_sign_in_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./auth/sign-in/sign-in.component */ "./src/app/auth/sign-in/sign-in.component.ts");
/* harmony import */ var _auth_sign_up_sign_up_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./auth/sign-up/sign-up.component */ "./src/app/auth/sign-up/sign-up.component.ts");
/* harmony import */ var _navigation_navigation_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./navigation/navigation.component */ "./src/app/navigation/navigation.component.ts");
/* harmony import */ var _product_product_start_product_start_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./product/product-start/product-start.component */ "./src/app/product/product-start/product-start.component.ts");
/* harmony import */ var _product_product_create_product_create_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./product/product-create/product-create.component */ "./src/app/product/product-create/product-create.component.ts");
/* harmony import */ var _product_product_details_product_details_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./product/product-details/product-details.component */ "./src/app/product/product-details/product-details.component.ts");
/* harmony import */ var _product_product_edit_product_edit_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./product/product-edit/product-edit.component */ "./src/app/product/product-edit/product-edit.component.ts");
/* harmony import */ var _product_product_list_product_list_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./product/product-list/product-list.component */ "./src/app/product/product-list/product-list.component.ts");
/* harmony import */ var _interceptors_token_interceptor__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./interceptors/token.interceptor */ "./src/app/interceptors/token.interceptor.ts");
/* harmony import */ var _product_profile_profile_component__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./product/profile/profile.component */ "./src/app/product/profile/profile.component.ts");
/* harmony import */ var _admin_panel_admin_panel_component__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./admin-panel/admin-panel.component */ "./src/app/admin-panel/admin-panel.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



















var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            declarations: [
                _app_component__WEBPACK_IMPORTED_MODULE_7__["AppComponent"],
                _auth_sign_in_sign_in_component__WEBPACK_IMPORTED_MODULE_8__["SignInComponent"],
                _auth_sign_up_sign_up_component__WEBPACK_IMPORTED_MODULE_9__["SignUpComponent"],
                _navigation_navigation_component__WEBPACK_IMPORTED_MODULE_10__["NavigationComponent"],
                _product_product_start_product_start_component__WEBPACK_IMPORTED_MODULE_11__["ProductStartComponent"],
                _product_product_create_product_create_component__WEBPACK_IMPORTED_MODULE_12__["ProductCreateComponent"],
                _product_product_details_product_details_component__WEBPACK_IMPORTED_MODULE_13__["ProductDetailsComponent"],
                _product_product_edit_product_edit_component__WEBPACK_IMPORTED_MODULE_14__["ProductEditComponent"],
                _product_product_list_product_list_component__WEBPACK_IMPORTED_MODULE_15__["ProductListComponent"],
                _product_profile_profile_component__WEBPACK_IMPORTED_MODULE_17__["ProfileComponent"],
                _admin_panel_admin_panel_component__WEBPACK_IMPORTED_MODULE_18__["AdminPanelComponent"]
            ],
            imports: [
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormsModule"],
                _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_3__["BrowserAnimationsModule"],
                ngx_toastr__WEBPACK_IMPORTED_MODULE_4__["ToastrModule"].forRoot(),
                _app_routing__WEBPACK_IMPORTED_MODULE_5__["AppRoutingModule"],
                _angular_common_http__WEBPACK_IMPORTED_MODULE_6__["HttpClientModule"]
            ],
            providers: [
                {
                    provide: _angular_common_http__WEBPACK_IMPORTED_MODULE_6__["HTTP_INTERCEPTORS"],
                    useClass: _interceptors_token_interceptor__WEBPACK_IMPORTED_MODULE_16__["TokenInterceptor"],
                    multi: true
                }
            ],
            bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_7__["AppComponent"]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./src/app/app.routing.ts":
/*!********************************!*\
  !*** ./src/app/app.routing.ts ***!
  \********************************/
/*! exports provided: AppRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppRoutingModule", function() { return AppRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _auth_sign_in_sign_in_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./auth/sign-in/sign-in.component */ "./src/app/auth/sign-in/sign-in.component.ts");
/* harmony import */ var _auth_sign_up_sign_up_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./auth/sign-up/sign-up.component */ "./src/app/auth/sign-up/sign-up.component.ts");
/* harmony import */ var _product_product_start_product_start_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./product/product-start/product-start.component */ "./src/app/product/product-start/product-start.component.ts");
/* harmony import */ var _product_product_create_product_create_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./product/product-create/product-create.component */ "./src/app/product/product-create/product-create.component.ts");
/* harmony import */ var _product_product_details_product_details_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./product/product-details/product-details.component */ "./src/app/product/product-details/product-details.component.ts");
/* harmony import */ var _product_product_edit_product_edit_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./product/product-edit/product-edit.component */ "./src/app/product/product-edit/product-edit.component.ts");
/* harmony import */ var _product_product_list_product_list_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./product/product-list/product-list.component */ "./src/app/product/product-list/product-list.component.ts");
/* harmony import */ var _auth_auth_guard__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./auth/auth.guard */ "./src/app/auth/auth.guard.ts");
/* harmony import */ var _product_profile_profile_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./product/profile/profile.component */ "./src/app/product/profile/profile.component.ts");
/* harmony import */ var _auth_admin_guard__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./auth/admin.guard */ "./src/app/auth/admin.guard.ts");
/* harmony import */ var _admin_panel_admin_panel_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./admin-panel/admin-panel.component */ "./src/app/admin-panel/admin-panel.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};













// import { RecipeModule } from './recipe/recipe.module';
var routes = [
    { path: 'auth', children: [
            { path: 'signup', component: _auth_sign_up_sign_up_component__WEBPACK_IMPORTED_MODULE_3__["SignUpComponent"] },
            { path: 'signin', component: _auth_sign_in_sign_in_component__WEBPACK_IMPORTED_MODULE_2__["SignInComponent"] }
        ] },
    { path: 'products', children: [
            { path: '', pathMatch: 'full', component: _product_product_start_product_start_component__WEBPACK_IMPORTED_MODULE_4__["ProductStartComponent"] },
            { path: 'create', component: _product_product_create_product_create_component__WEBPACK_IMPORTED_MODULE_5__["ProductCreateComponent"], canActivate: [_auth_auth_guard__WEBPACK_IMPORTED_MODULE_9__["AuthGuard"]] },
            { path: 'details/:ownerId/:productId', component: _product_product_details_product_details_component__WEBPACK_IMPORTED_MODULE_6__["ProductDetailsComponent"], canActivate: [_auth_auth_guard__WEBPACK_IMPORTED_MODULE_9__["AuthGuard"]] },
            { path: 'edit/:ownerId/:productId', component: _product_product_edit_product_edit_component__WEBPACK_IMPORTED_MODULE_7__["ProductEditComponent"], canActivate: [_auth_auth_guard__WEBPACK_IMPORTED_MODULE_9__["AuthGuard"]] },
            { path: 'list', component: _product_product_list_product_list_component__WEBPACK_IMPORTED_MODULE_8__["ProductListComponent"], canActivate: [_auth_auth_guard__WEBPACK_IMPORTED_MODULE_9__["AuthGuard"]] },
            { path: 'profile/:id', component: _product_profile_profile_component__WEBPACK_IMPORTED_MODULE_10__["ProfileComponent"], canActivate: [_auth_auth_guard__WEBPACK_IMPORTED_MODULE_9__["AuthGuard"]] },
        ] },
    { path: 'adminPanel', component: _admin_panel_admin_panel_component__WEBPACK_IMPORTED_MODULE_12__["AdminPanelComponent"], canActivate: [_auth_admin_guard__WEBPACK_IMPORTED_MODULE_11__["AdminGuard"]] },
    // { path: 'products', loadChildren: () => RecipeModule, canActivate: [AuthGuard] },
    { path: '**', redirectTo: '/products' }
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forRoot(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]],
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());



/***/ }),

/***/ "./src/app/auth/admin.guard.ts":
/*!*************************************!*\
  !*** ./src/app/auth/admin.guard.ts ***!
  \*************************************/
/*! exports provided: AdminGuard */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AdminGuard", function() { return AdminGuard; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _auth_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./auth.service */ "./src/app/auth/auth.service.ts");
/* harmony import */ var _node_modules_ngx_toastr__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../node_modules/ngx-toastr */ "./node_modules/ngx-toastr/fesm5/ngx-toastr.js");
/* harmony import */ var _services_user_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../services/user.service */ "./src/app/services/user.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var AdminGuard = /** @class */ (function () {
    function AdminGuard(authService, router, toastrService, userService) {
        this.authService = authService;
        this.router = router;
        this.toastrService = toastrService;
        this.userService = userService;
    }
    AdminGuard.prototype.canActivate = function (next, state) {
        return this.check();
    };
    AdminGuard.prototype.check = function () {
        if (this.userService.isAdmin()) {
            return true;
        }
        this.toastrService.info('You need to be logged in as admin for this action.');
        this.router.navigate(['/auth/signin']);
        return false;
    };
    AdminGuard = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [_auth_service__WEBPACK_IMPORTED_MODULE_2__["AuthService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"],
            _node_modules_ngx_toastr__WEBPACK_IMPORTED_MODULE_3__["ToastrService"],
            _services_user_service__WEBPACK_IMPORTED_MODULE_4__["UserService"]])
    ], AdminGuard);
    return AdminGuard;
}());



/***/ }),

/***/ "./src/app/auth/auth.guard.ts":
/*!************************************!*\
  !*** ./src/app/auth/auth.guard.ts ***!
  \************************************/
/*! exports provided: AuthGuard */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthGuard", function() { return AuthGuard; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _auth_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./auth.service */ "./src/app/auth/auth.service.ts");
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ngx-toastr */ "./node_modules/ngx-toastr/fesm5/ngx-toastr.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var AuthGuard = /** @class */ (function () {
    function AuthGuard(authService, router, toastrService) {
        this.authService = authService;
        this.router = router;
        this.toastrService = toastrService;
    }
    AuthGuard.prototype.canActivate = function (next, state) {
        return this.check();
    };
    AuthGuard.prototype.check = function () {
        if (this.authService.isAuthenticated()) {
            return true;
        }
        this.toastrService.info('You need to login for this action.');
        this.router.navigate(['/auth/signin']);
        return false;
    };
    AuthGuard = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [_auth_service__WEBPACK_IMPORTED_MODULE_2__["AuthService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"],
            ngx_toastr__WEBPACK_IMPORTED_MODULE_3__["ToastrService"]])
    ], AuthGuard);
    return AuthGuard;
}());



/***/ }),

/***/ "./src/app/auth/auth.service.ts":
/*!**************************************!*\
  !*** ./src/app/auth/auth.service.ts ***!
  \**************************************/
/*! exports provided: AuthService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthService", function() { return AuthService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var firebase__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! firebase */ "./node_modules/firebase/dist/index.cjs.js");
/* harmony import */ var firebase__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(firebase__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_ngx_toastr__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../node_modules/ngx-toastr */ "./node_modules/ngx-toastr/fesm5/ngx-toastr.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _services_user_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../services/user.service */ "./src/app/services/user.service.ts");
/* harmony import */ var _services_models_user_create_model__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../services/models/user-create.model */ "./src/app/services/models/user-create.model.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var AuthService = /** @class */ (function () {
    function AuthService(toastrService, router, userService) {
        this.toastrService = toastrService;
        this.router = router;
        this.userService = userService;
    }
    AuthService.prototype.signUp = function (email, password, username) {
        var _this = this;
        firebase__WEBPACK_IMPORTED_MODULE_1__["auth"]().createUserWithEmailAndPassword(email, password).then(function (registeredUser) {
            // console.log(registeredUser)
            _this.toastrService.success('Registered successfully.', 'Success!');
            _this.router.navigate(['/auth/signin']);
            var user = firebase__WEBPACK_IMPORTED_MODULE_1__["auth"]().currentUser;
            user.updateProfile({
                displayName: username,
                photoURL: "https://www.bing.com/images/search?view=detailV2&ccid=GX%2b5VV6G&id=966A8A86B3CE355297371BE4881C9C6445ADF21C&thid=OIP.GX-5VV6GChstVIyY8zzs7gHaJi&mediaurl=https%3a%2f%2fcamo.githubusercontent.com%2f341831200626efe3e0cf83317801fcac2200fbe2%2f68747470733a2f2f662e636c6f75642e6769746875622e636f6d2f6173736574732f323639323831302f323130343036312f34643839316563302d386637362d313165332d393230322d6637333934306431306632302e706e67&exph=358&expw=278&q=default+avatar+image&simid=608022090080914380&selectedIndex=15"
            }).then(function () {
                // console.log('Username and photo of user created.')
                // [new ProductInCartModel('product name cart', 9, 'some image path cart')]
                var body = new _services_models_user_create_model__WEBPACK_IMPORTED_MODULE_5__["UserCreateModel"](registeredUser.user.displayName, {}, true, registeredUser.user.email, registeredUser.user.uid, registeredUser.user.photoURL, ['regularUser']);
                _this.userService.createUser(body, registeredUser.user.uid); //.subscribe()
                // Update successful.
            }).catch(function (error) {
                // An error happened.
                console.log(error);
            });
        }).catch(function (err) { return _this.toastrService.error(err.message, 'Warning!'); });
    };
    AuthService.prototype.signIn = function (email, password) {
        var _this = this;
        firebase__WEBPACK_IMPORTED_MODULE_1__["auth"]().signInWithEmailAndPassword(email, password).then(function (signedInUser) {
            var uid = signedInUser.user.uid;
            _this.userService.getUserByUserId(uid).subscribe(function (user) {
                // console.log('user: ')
                // console.log(user)
                if (user['active']) {
                    firebase__WEBPACK_IMPORTED_MODULE_1__["auth"]().currentUser.getIdToken().then(function (token) {
                        _this.token = token;
                    });
                    _this.toastrService.success('Logged in successfully.', 'Success!');
                    _this.router.navigate(['/products']);
                }
                else {
                    _this.toastrService.error('Your account has been disabled!', 'Warning!');
                    _this.router.navigate(['/products']);
                    _this.signOut();
                }
            });
        }).catch(function (err) {
            _this.toastrService.error(err.message, 'Warning');
        });
    };
    AuthService.prototype.signOut = function () {
        var _this = this;
        firebase__WEBPACK_IMPORTED_MODULE_1__["auth"]().signOut().then(function () {
            _this.toastrService.success('Logged out successfully.', 'Success');
            _this.router.navigate(['/auth/signin']);
            _this.token = null;
        }).catch(function (err) { return _this.toastrService.error(err.message, 'Warning'); });
    };
    AuthService.prototype.getToken = function () {
        var _this = this;
        if (firebase__WEBPACK_IMPORTED_MODULE_1__["auth"]().currentUser) {
            firebase__WEBPACK_IMPORTED_MODULE_1__["auth"]().currentUser.getIdToken().then(function (token) { return _this.token = token; });
        }
        return this.token;
    };
    AuthService.prototype.getUsername = function () {
        if (firebase__WEBPACK_IMPORTED_MODULE_1__["auth"]().currentUser) {
            var username = firebase__WEBPACK_IMPORTED_MODULE_1__["auth"]().currentUser.displayName;
            // console.log(firebase.auth().currentUser)
            return username;
        }
    };
    AuthService.prototype.getCurrLoggedUserId = function () {
        if (firebase__WEBPACK_IMPORTED_MODULE_1__["auth"]().currentUser) {
            var userId = firebase__WEBPACK_IMPORTED_MODULE_1__["auth"]().currentUser.uid;
            return userId;
        }
    };
    AuthService.prototype.isAuthenticated = function () {
        return this.token != null;
    };
    AuthService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [_node_modules_ngx_toastr__WEBPACK_IMPORTED_MODULE_2__["ToastrService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"],
            _services_user_service__WEBPACK_IMPORTED_MODULE_4__["UserService"]])
    ], AuthService);
    return AuthService;
}());



/***/ }),

/***/ "./src/app/auth/models/register-form.model.ts":
/*!****************************************************!*\
  !*** ./src/app/auth/models/register-form.model.ts ***!
  \****************************************************/
/*! exports provided: RegisterFormModel */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RegisterFormModel", function() { return RegisterFormModel; });
var RegisterFormModel = /** @class */ (function () {
    function RegisterFormModel(email, username, password) {
        this.email = email;
        this.username = username;
        this.password = password;
    }
    return RegisterFormModel;
}());



/***/ }),

/***/ "./src/app/auth/sign-in/sign-in.component.css":
/*!****************************************************!*\
  !*** ./src/app/auth/sign-in/sign-in.component.css ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/auth/sign-in/sign-in.component.html":
/*!*****************************************************!*\
  !*** ./src/app/auth/sign-in/sign-in.component.html ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"row\">\n  <div class=\"col-xs-12 col-sm-10 col-md-8 col-sm-offset-1 col-md-offset-2\">\n    <h3>Sign in</h3>\n    <form #f=\"ngForm\" (ngSubmit)=\"login(f)\">\n      <div class=\"form-group\">\n        <label for=\"email\">Mail</label>\n        <input \n        required\n        type=\"email\" \n        id=\"email\" \n        name=\"email\"\n        class=\"form-control\"\n        ngModel>\n      </div>\n      <div class=\"form-group\">\n        <label for=\"password\">Password</label>\n        <input\n          required\n          type=\"password\"\n          id=\"password\"\n          name=\"password\"\n          class=\"form-control\"\n          ngModel>\n      </div>\n      <button class=\"btn btn-primary\" [disabled]=\"f.invalid\" type=\"submit\">Sign In</button>\n    </form>\n  </div>\n</div>"

/***/ }),

/***/ "./src/app/auth/sign-in/sign-in.component.ts":
/*!***************************************************!*\
  !*** ./src/app/auth/sign-in/sign-in.component.ts ***!
  \***************************************************/
/*! exports provided: SignInComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SignInComponent", function() { return SignInComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _auth_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../auth.service */ "./src/app/auth/auth.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var SignInComponent = /** @class */ (function () {
    function SignInComponent(authService) {
        this.authService = authService;
    }
    SignInComponent.prototype.ngOnInit = function () {
    };
    SignInComponent.prototype.login = function (form) {
        var email = form.value.email;
        var password = form.value.password;
        // console.log([email, password])
        this.authService.signIn(email, password);
    };
    SignInComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-sign-in',
            template: __webpack_require__(/*! ./sign-in.component.html */ "./src/app/auth/sign-in/sign-in.component.html"),
            styles: [__webpack_require__(/*! ./sign-in.component.css */ "./src/app/auth/sign-in/sign-in.component.css")]
        }),
        __metadata("design:paramtypes", [_auth_service__WEBPACK_IMPORTED_MODULE_1__["AuthService"]])
    ], SignInComponent);
    return SignInComponent;
}());



/***/ }),

/***/ "./src/app/auth/sign-up/sign-up.component.css":
/*!****************************************************!*\
  !*** ./src/app/auth/sign-up/sign-up.component.css ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/auth/sign-up/sign-up.component.html":
/*!*****************************************************!*\
  !*** ./src/app/auth/sign-up/sign-up.component.html ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"row\">\n  <div class=\"col-xs-12 col-sm-10 col-md-8 col-sm-offset-1 col-md-offset-2\">\n    <h3>Sign up</h3>\n    <form #signUpForm=\"ngForm\" (ngSubmit)=\"register()\">\n      <div class=\"form-group\">\n        <label for=\"email\">E-mail</label>\n        <input \n        required\n        type=\"email\" \n        id=\"email\"\n        name=\"email\"\n        #email=\"ngModel\"\n        [(ngModel)]=\"model.email\"\n        class=\"form-control\"\n        email>\n        <div class=\"alert alert-danger\" [hidden]=\"email.valid || email.pristine\">Incorrect email format.</div>\n      </div>\n      <div class=\"form-group\">\n        <label for=\"username\">Username</label>\n        <input \n        required\n        type=\"text\" \n        id=\"username\"\n        name=\"username\"\n        #username=\"ngModel\"\n        [(ngModel)]=\"model.username\"\n        class=\"form-control\" pattern=\"^\\w{4,32}$\">\n        <div class=\"alert alert-danger\" [hidden]=\"username.valid || username.pristine\">Sorry, that username's invalid. It has to be between 4 and 32 symbols and contain only letters and digits.</div>\n      </div>\n      <div class=\"form-group\">\n        <label for=\"password\">Password</label>\n        <input\n          required\n          type=\"password\"\n          id=\"password\"\n          name=\"password\"\n          #password=\"ngModel\"\n          [(ngModel)]=\"model.password\"\n          class=\"form-control\"\n          pattern=\"^\\w{6,64}$\">\n          <div class=\"alert alert-danger\" [hidden]=\"password.valid || password.pristine\">Password must contain only letters and digits and must be between 6 and 64 symbols.</div>\n      </div>\n      <div class=\"form-group\">\n          <label for=\"confirmPassword\">Confirm Password</label>\n          <input type=\"password\" class=\"form-control\" id=\"confirmPassword\" \n          required name=\"confirmPassword\" [(ngModel)]=\"model.confirmPassword\" #confirmPassword=\"ngModel\">\n          <div class=\"alert alert-danger\" [hidden]=\"(password.value === confirmPassword.value) || confirmPassword.pristine\">Both passwords must match.</div>\n        </div>\n      <button class=\"btn btn-primary\" [disabled]=\"signUpForm.invalid\" type=\"submit\">Sign Up</button>\n    </form>\n    <div class=\"alert alert-danger\" *ngIf=\"registerFailed\">\n      Registration failed! Error: <p>{{errorDescription}}</p>\n    </div>\n  </div>\n</div>"

/***/ }),

/***/ "./src/app/auth/sign-up/sign-up.component.ts":
/*!***************************************************!*\
  !*** ./src/app/auth/sign-up/sign-up.component.ts ***!
  \***************************************************/
/*! exports provided: SignUpComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SignUpComponent", function() { return SignUpComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _models_register_form_model__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../models/register-form.model */ "./src/app/auth/models/register-form.model.ts");
/* harmony import */ var _auth_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../auth.service */ "./src/app/auth/auth.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var SignUpComponent = /** @class */ (function () {
    function SignUpComponent(authService) {
        this.authService = authService;
        this.registerFailed = false;
        this.model = new _models_register_form_model__WEBPACK_IMPORTED_MODULE_1__["RegisterFormModel"]('', '', '');
    }
    SignUpComponent.prototype.ngOnInit = function () {
    };
    SignUpComponent.prototype.register = function () {
        var email = this.model.email;
        var password = this.model.password;
        var username = this.model.username;
        // console.log([email, password])
        this.authService.signUp(email, password, username); // .then(data => console.log(data)).catch(err => console.error(err))
    };
    SignUpComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-sign-up',
            template: __webpack_require__(/*! ./sign-up.component.html */ "./src/app/auth/sign-up/sign-up.component.html"),
            styles: [__webpack_require__(/*! ./sign-up.component.css */ "./src/app/auth/sign-up/sign-up.component.css")]
        }),
        __metadata("design:paramtypes", [_auth_service__WEBPACK_IMPORTED_MODULE_2__["AuthService"]])
    ], SignUpComponent);
    return SignUpComponent;
}());



/***/ }),

/***/ "./src/app/interceptors/token.interceptor.ts":
/*!***************************************************!*\
  !*** ./src/app/interceptors/token.interceptor.ts ***!
  \***************************************************/
/*! exports provided: TokenInterceptor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TokenInterceptor", function() { return TokenInterceptor; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _auth_auth_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../auth/auth.service */ "./src/app/auth/auth.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var TokenInterceptor = /** @class */ (function () {
    function TokenInterceptor(authService) {
        this.authService = authService;
    }
    TokenInterceptor.prototype.intercept = function (req, next) {
        var token = this.authService.getToken();
        if (token) {
            req = req.clone({
                url: req.url + "?auth=" + token
            });
        }
        return next.handle(req);
    };
    TokenInterceptor = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
        __metadata("design:paramtypes", [_auth_auth_service__WEBPACK_IMPORTED_MODULE_1__["AuthService"]])
    ], TokenInterceptor);
    return TokenInterceptor;
}());



/***/ }),

/***/ "./src/app/navigation/navigation.component.css":
/*!*****************************************************!*\
  !*** ./src/app/navigation/navigation.component.css ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/navigation/navigation.component.html":
/*!******************************************************!*\
  !*** ./src/app/navigation/navigation.component.html ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<nav class=\"navbar navbar-expand-lg navbar-light bg-light\">\n    <a class=\"navbar-brand\" routerLink=\"/products\">E-shop</a>\n    <button class=\"navbar-toggler\" type=\"button\" data-toggle=\"collapse\" data-target=\"#navbarSupportedContent\" aria-controls=\"navbarSupportedContent\" aria-expanded=\"false\" aria-label=\"Toggle navigation\">\n      <span class=\"navbar-toggler-icon\"></span>\n    </button>\n  \n    <div class=\"collapse navbar-collapse\" id=\"navbarSupportedContent\">\n      <ul class=\"navbar-nav mr-auto\">\n        <li *ngIf=\"!authService.isAuthenticated()\" class=\"nav-item\">\n          <a class=\"nav-link\" routerLink=\"/auth/signin\">Sign In</a>\n        </li>\n        <li *ngIf=\"!authService.isAuthenticated()\" class=\"nav-item\">\n          <a class=\"nav-link\" routerLink=\"/auth/signup\">Sign Up</a>\n        </li>\n        <li *ngIf=\"authService.isAuthenticated()\" class=\"nav-item dropdown\">\n          <a class=\"nav-link dropdown-toggle\" href=\"#\" id=\"navbarDropdown\" role=\"button\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\">\n            Products\n          </a>\n          <div class=\"dropdown-menu\" aria-labelledby=\"navbarDropdown\">\n            <a class=\"dropdown-item\" routerLink=\"/products/list\">List all Products for purchase</a>\n            <a class=\"dropdown-item\" routerLink=\"/products/create\">Post new product for sale</a>\n            <div class=\"dropdown-divider\"></div>\n            <a class=\"dropdown-item\" routerLink=\"/products\">E-shop welcome page</a>\n          </div>\n        </li>\n      </ul>\n      <ul class=\"navbar-nav navbar-left\">\n        <!-- <li *ngIf=\"authService.isAuthenticated()\" class=\"nav-item\">\n          <a class=\"nav-link\" routerLink>Welcome, {{getUsername()}}</a>\n        </li> -->\n        <li *ngIf=\"authService.isAuthenticated()\" class=\"nav-item dropdown\">\n            <a class=\"nav-link dropdown-toggle\" href=\"#\" id=\"navbarDropdown\" role=\"button\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\">\n                Welcome, {{getUsername()}}\n            </a>\n            <div class=\"dropdown-menu\" aria-labelledby=\"navbarDropdown\">\n              <a class=\"dropdown-item\" routerLink=\"/products/profile/{{getIdOfCurrLoggedUser()}}\"><img src=\"assets/images/shopping-cart.png\" alt=\"shopping cart\"> My cart</a>\n              <a *ngIf=\"userService.isAdmin()\" class=\"dropdown-item\" routerLink=\"/adminPanel\">Admin Panel</a>\n              <div class=\"dropdown-divider\"></div>\n              <a class=\"dropdown-item\" routerLink (click)=\"logout()\">Logout</a>\n            </div>\n          </li>\n      </ul>\n      <!-- <form class=\"form-inline my-2 my-lg-0\">\n        <input class=\"form-control mr-sm-2\" type=\"search\" placeholder=\"Search\" aria-label=\"Search\">\n        <button class=\"btn btn-outline-success my-2 my-sm-0\" type=\"submit\">Search</button>\n      </form> -->\n    </div>\n  </nav>"

/***/ }),

/***/ "./src/app/navigation/navigation.component.ts":
/*!****************************************************!*\
  !*** ./src/app/navigation/navigation.component.ts ***!
  \****************************************************/
/*! exports provided: NavigationComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NavigationComponent", function() { return NavigationComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _auth_auth_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../auth/auth.service */ "./src/app/auth/auth.service.ts");
/* harmony import */ var _services_user_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../services/user.service */ "./src/app/services/user.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var NavigationComponent = /** @class */ (function () {
    function NavigationComponent(authService, userService) {
        this.authService = authService;
        this.userService = userService;
        this.isAdmin = true;
    }
    NavigationComponent.prototype.ngOnInit = function () {
        // this.userService.isAdmin()
        //   .subscribe((data) => {
        //   console.log('data: ')
        //   console.log(data)
        //   this.isAdmin = data
        // })
    };
    NavigationComponent.prototype.ngOnDestroy = function () {
    };
    NavigationComponent.prototype.logout = function () {
        this.authService.signOut();
    };
    NavigationComponent.prototype.getUsername = function () {
        // this.username = this.authService.getUsername()
        return this.authService.getUsername();
    };
    NavigationComponent.prototype.getIdOfCurrLoggedUser = function () {
        return this.authService.getCurrLoggedUserId();
    };
    NavigationComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-navigation',
            template: __webpack_require__(/*! ./navigation.component.html */ "./src/app/navigation/navigation.component.html"),
            styles: [__webpack_require__(/*! ./navigation.component.css */ "./src/app/navigation/navigation.component.css")]
        }),
        __metadata("design:paramtypes", [_auth_auth_service__WEBPACK_IMPORTED_MODULE_1__["AuthService"],
            _services_user_service__WEBPACK_IMPORTED_MODULE_2__["UserService"]])
    ], NavigationComponent);
    return NavigationComponent;
}());



/***/ }),

/***/ "./src/app/product/helperFunctions/calcTime.js":
/*!*****************************************************!*\
  !*** ./src/app/product/helperFunctions/calcTime.js ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return calcTime; });
// HELPER FUNCTION FOR TIME
function calcTime (dateIsoFormat) {
  // let dateIsoFormat = kinveyElement._kmd.ect
  let diff = new Date() - (new Date(dateIsoFormat))
  diff = Math.floor(diff / 60000)
  if (diff < 1) return 'less than a minute'
  if (diff < 60) return diff + ' minute' + pluralize(diff)
  diff = Math.floor(diff / 60)
  if (diff < 24) return diff + ' hour' + pluralize(diff)
  diff = Math.floor(diff / 24)
  if (diff < 30) return diff + ' day' + pluralize(diff)
  diff = Math.floor(diff / 30)
  if (diff < 12) return diff + ' month' + pluralize(diff)
  diff = Math.floor(diff / 12)
  return diff + ' year' + pluralize(diff)

  function pluralize (value) {
    if (value !== 1) return 's'
    else return ''
  }
}

/***/ }),

/***/ "./src/app/product/models/product-create.model.ts":
/*!********************************************************!*\
  !*** ./src/app/product/models/product-create.model.ts ***!
  \********************************************************/
/*! exports provided: ProductCreateModel */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProductCreateModel", function() { return ProductCreateModel; });
var ProductCreateModel = /** @class */ (function () {
    function ProductCreateModel(name, imagePath, description, price, createdOn, ownerId, ownerName) {
        this.name = name;
        this.imagePath = imagePath;
        this.description = description;
        this.price = price;
        this.createdOn = createdOn;
        this.ownerId = ownerId;
        this.ownerName = ownerName;
    }
    return ProductCreateModel;
}());



/***/ }),

/***/ "./src/app/product/models/product-list-item.model.ts":
/*!***********************************************************!*\
  !*** ./src/app/product/models/product-list-item.model.ts ***!
  \***********************************************************/
/*! exports provided: ProductListItemModel */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProductListItemModel", function() { return ProductListItemModel; });
var ProductListItemModel = /** @class */ (function () {
    function ProductListItemModel(id, name, imagePath, description, price, createdOn, ownerId, ownerName) {
        this.id = id;
        this.name = name;
        this.imagePath = imagePath;
        this.description = description;
        this.price = price;
        this.createdOn = createdOn;
        this.ownerId = ownerId;
        this.ownerName = ownerName;
    }
    return ProductListItemModel;
}());



/***/ }),

/***/ "./src/app/product/product-create/product-create.component.css":
/*!*********************************************************************!*\
  !*** ./src/app/product/product-create/product-create.component.css ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "img {\r\n  max-width: 100%;\r\n  max-height: 100%;\r\n  margin: 4%;\r\n}"

/***/ }),

/***/ "./src/app/product/product-create/product-create.component.html":
/*!**********************************************************************!*\
  !*** ./src/app/product/product-create/product-create.component.html ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"row\">\n    <div class=\"col-xs-12\">\n      <form #createForm=\"ngForm\" (ngSubmit)=\"createProduct()\">\n        <div class=\"row\">\n          <div class=\"col-xs-12\">\n            <div class=\"form-group\">\n              <label for=\"name\">Name</label>\n              <input\n                required\n                type=\"text\"\n                id=\"name\"\n                name=\"name\"\n                #name=\"ngModel\"\n                [(ngModel)]=\"model.name\"\n                class=\"form-control\">\n            </div>\n          </div>\n        </div>\n        <div class=\"row\">\n          <div class=\"col-xs-12\">\n            <div class=\"form-group\">\n              <label for=\"imagePath\">Image URL</label>\n              <input\n                required\n                type=\"text\"\n                id=\"imagePath\"\n                name=\"imagePath\"\n                #imagePath=\"ngModel\"\n                [(ngModel)]=\"model.imagePath\"\n                class=\"form-control\">\n            </div>\n          </div>\n        </div>\n        <div class=\"row\">\n            <div class=\"col-xs-12\">\n              <div class=\"form-group\">\n                <label for=\"price\">Price</label>\n                <input\n                  required\n                  type=\"number\"\n                  id=\"price\"\n                  name=\"price\"\n                  #price=\"ngModel\"\n                  [(ngModel)]=\"model.price\"\n                  class=\"form-control\">\n              </div>\n            </div>\n          </div>\n        <div class=\"row\">\n          <div class=\"col-xs-12\">\n            <img src=\"{{model.imagePath}}\" class=\"img-responsive\" style=\"max-height: 300px;\">\n          </div>\n        </div>\n        <div class=\"row\">\n          <div class=\"col-xs-12\">\n            <div class=\"form-group\">\n              <textarea\n                required\n                type=\"text\"\n                id=\"description\"\n                class=\"form-control\"\n                name=\"description\"\n                #description=\"ngModel\"\n                [(ngModel)]=\"model.description\"\n                rows=\"6\"></textarea>\n            </div>\n          </div>\n        </div>\n      <button class=\"btn btn-primary\" [disabled]=\"createForm.invalid\" type=\"submit\">Create</button>\n      </form>\n    </div>\n  </div>\n  "

/***/ }),

/***/ "./src/app/product/product-create/product-create.component.ts":
/*!********************************************************************!*\
  !*** ./src/app/product/product-create/product-create.component.ts ***!
  \********************************************************************/
/*! exports provided: ProductCreateComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProductCreateComponent", function() { return ProductCreateComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _models_product_create_model__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../models/product-create.model */ "./src/app/product/models/product-create.model.ts");
/* harmony import */ var _node_modules_ngx_toastr__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/ngx-toastr */ "./node_modules/ngx-toastr/fesm5/ngx-toastr.js");
/* harmony import */ var _node_modules_angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../node_modules/@angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _product_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../product.service */ "./src/app/product/product.service.ts");
/* harmony import */ var firebase__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! firebase */ "./node_modules/firebase/dist/index.cjs.js");
/* harmony import */ var firebase__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(firebase__WEBPACK_IMPORTED_MODULE_5__);
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var ProductCreateComponent = /** @class */ (function () {
    function ProductCreateComponent(toastrService, router, productService) {
        this.toastrService = toastrService;
        this.router = router;
        this.productService = productService;
        this.model = new _models_product_create_model__WEBPACK_IMPORTED_MODULE_1__["ProductCreateModel"]('', '', '', undefined, Date.now(), '', '');
    }
    ProductCreateComponent.prototype.ngOnInit = function () {
    };
    ProductCreateComponent.prototype.createProduct = function () {
        var _this = this;
        this.model.price = Number(this.model.price.toFixed(2));
        var ownerId = firebase__WEBPACK_IMPORTED_MODULE_5__["auth"]().currentUser.uid;
        this.model.createdOn = Date.now();
        this.model.ownerId = ownerId;
        this.model.ownerName = firebase__WEBPACK_IMPORTED_MODULE_5__["auth"]().currentUser.displayName;
        this.productService.createProduct(this.model, ownerId).subscribe(function () {
            _this.toastrService.success('Product added successfully', 'Success!');
            _this.router.navigate(['/products/list']);
        });
    };
    ProductCreateComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-product-create',
            template: __webpack_require__(/*! ./product-create.component.html */ "./src/app/product/product-create/product-create.component.html"),
            styles: [__webpack_require__(/*! ./product-create.component.css */ "./src/app/product/product-create/product-create.component.css")]
        }),
        __metadata("design:paramtypes", [_node_modules_ngx_toastr__WEBPACK_IMPORTED_MODULE_2__["ToastrService"],
            _node_modules_angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"],
            _product_service__WEBPACK_IMPORTED_MODULE_4__["ProductService"]])
    ], ProductCreateComponent);
    return ProductCreateComponent;
}());



/***/ }),

/***/ "./src/app/product/product-details/product-details.component.css":
/*!***********************************************************************!*\
  !*** ./src/app/product/product-details/product-details.component.css ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "button {\r\n  /* padding: 10%; */\r\n  margin: 3%;\r\n}"

/***/ }),

/***/ "./src/app/product/product-details/product-details.component.html":
/*!************************************************************************!*\
  !*** ./src/app/product/product-details/product-details.component.html ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div *ngIf=\"product$ | async as p; else loading\">\n  <div class=\"row\">\n    <div class=\"col-xs-12\">\n      <img\n        src=\"{{p.imagePath}}\"\n        alt=\"{{p.name}}\"\n        class=\"img-responsive\"\n        style=\"max-height: 300px;\">\n    </div>\n    </div>\n    <div class=\"row\">\n      <div class=\"col-xs-12\">\n        <h1>{{p.name}}</h1>\n        <button class=\"btn btn-outline-secondary\">{{p.price}} $</button>\n        <!-- Button trigger modal -->\n        <button class=\"btn btn-outline-info\" data-toggle=\"modal\" data-target=\"#exampleModal\" (click)=\"addProductToUserCart(productId, p)\">Add to cart</button>\n      </div>\n    </div>\n    <div class=\"row\">\n      <div class=\"col-xs-12\">\n        <button class=\"btn btn-outline-primary btn-sm\" style=\"cursor: pointer;\" routerLink=\"/products/edit/{{ownerId}}/{{productId}}\">Edit Product</button>\n        <button class=\"btn btn-outline-danger btn-sm\" style=\"cursor: pointer;\" routerLink (click)=\"deleteProduct(ownerId, productId)\">Delete Product</button>\n      </div>\n    </div>\n    <div class=\"row\">\n      <div class=\"col-xs-12\">\n          {{p.description}}\n      </div>\n    </div>\n    <div class=\"row\">\n      <div class=\"col-xs-12\">\n        <h6 class=\"text-dark\">submitted {{calcTime(p.createdOn)}} ago</h6>\n        For sale from: <a routerLink=\"../../../profile/{{p.ownerId}}\">{{p.ownerName}}</a>\n      </div>\n    </div>\n</div>\n\n<ng-template #loading>\n    Loading stuff...\n</ng-template>\n\n<!-- Modal -->\n<div class=\"modal fade\" id=\"exampleModal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"exampleModalLabel\" aria-hidden=\"true\">\n    <div class=\"modal-dialog\" role=\"document\">\n      <div class=\"modal-content\">\n        <div class=\"modal-header\">\n          <h5 class=\"modal-title\" id=\"exampleModalLabel\">Item added to your cart</h5>\n          <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">\n            <span aria-hidden=\"true\">&times;</span>\n          </button>\n        </div>\n        <div class=\"modal-body\">\n          Do you want to go to your cart or continue browsing?\n        </div>\n        <div class=\"modal-footer\">\n          <button type=\"button\" class=\"btn btn-secondary\" data-dismiss=\"modal\">Close</button>\n          <button type=\"button\" class=\"btn btn-primary\" data-dismiss=\"modal\" routerLink=\"../../../profile/{{ownerId}}\">Go to cart</button>\n          <button type=\"button\" class=\"btn btn-primary\" data-dismiss=\"modal\" routerLink=\"../../\">Continue browsing</button>\n        </div>\n      </div>\n    </div>\n  </div>"

/***/ }),

/***/ "./src/app/product/product-details/product-details.component.ts":
/*!**********************************************************************!*\
  !*** ./src/app/product/product-details/product-details.component.ts ***!
  \**********************************************************************/
/*! exports provided: ProductDetailsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProductDetailsComponent", function() { return ProductDetailsComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _product_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../product.service */ "./src/app/product/product.service.ts");
/* harmony import */ var _node_modules_angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/@angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _node_modules_ngx_toastr__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../node_modules/ngx-toastr */ "./node_modules/ngx-toastr/fesm5/ngx-toastr.js");
/* harmony import */ var _helperFunctions_calcTime_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../helperFunctions/calcTime.js */ "./src/app/product/helperFunctions/calcTime.js");
/* harmony import */ var _services_user_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../services/user.service */ "./src/app/services/user.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var ProductDetailsComponent = /** @class */ (function () {
    function ProductDetailsComponent(productService, route, toastrService, router, userService) {
        this.productService = productService;
        this.route = route;
        this.toastrService = toastrService;
        this.router = router;
        this.userService = userService;
    }
    ProductDetailsComponent.prototype.ngOnInit = function () {
        this.productId = this.route.snapshot.params['productId'];
        this.ownerId = this.route.snapshot.params['ownerId'];
        // console.log(this.ownerId)
        this.product$ = this.productService.getById(this.productId, this.ownerId);
    };
    ProductDetailsComponent.prototype.deleteProduct = function (owenerIdToDelete, productIdToDelete) {
        var _this = this;
        // console.log('TODO delete')
        this.productService.deleteProductById(owenerIdToDelete, productIdToDelete).subscribe(function () {
            // console.log(data)
            _this.toastrService.success('Item deleted successfully.', 'Success!');
            _this.router.navigate(['/products/list']);
        }, function (error) {
            _this.toastrService.error(error.error.error + '! ' + error.statusText + '! You can delete only products posted by you.', 'Warning!');
            _this.router.navigate(['/products']);
        });
    };
    ProductDetailsComponent.prototype.addProductToUserCart = function (productIdToAdd, productBody) {
        // console.log('Product add to cart TODO')
        // console.log(productIdToAdd)
        this.userService.addProductToUserCartById(productIdToAdd, productBody);
        // .subscribe(() => {
        //   this.toastrService.success('Item added to cart successfully.', 'Success!')
        //   this.router.navigate(['/products/list'])
        // }, error => {
        //   this.toastrService.error(error.error.error + '! ' + error.statusText + '!', 'Warning!')
        //   this.router.navigate(['/products'])
        // })
    };
    ProductDetailsComponent.prototype.calcTime = function (time) {
        return Object(_helperFunctions_calcTime_js__WEBPACK_IMPORTED_MODULE_4__["default"])(time);
    };
    ProductDetailsComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-product-details',
            template: __webpack_require__(/*! ./product-details.component.html */ "./src/app/product/product-details/product-details.component.html"),
            styles: [__webpack_require__(/*! ./product-details.component.css */ "./src/app/product/product-details/product-details.component.css")]
        }),
        __metadata("design:paramtypes", [_product_service__WEBPACK_IMPORTED_MODULE_1__["ProductService"],
            _node_modules_angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"],
            _node_modules_ngx_toastr__WEBPACK_IMPORTED_MODULE_3__["ToastrService"],
            _node_modules_angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"],
            _services_user_service__WEBPACK_IMPORTED_MODULE_5__["UserService"]])
    ], ProductDetailsComponent);
    return ProductDetailsComponent;
}());



/***/ }),

/***/ "./src/app/product/product-edit/product-edit.component.css":
/*!*****************************************************************!*\
  !*** ./src/app/product/product-edit/product-edit.component.css ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "img {\r\n  max-width: 100%;\r\n  max-height: 100%;\r\n  margin: 4%;\r\n}"

/***/ }),

/***/ "./src/app/product/product-edit/product-edit.component.html":
/*!******************************************************************!*\
  !*** ./src/app/product/product-edit/product-edit.component.html ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div *ngIf=\"bindingModel\" class=\"row\">\n    <div class=\"col-xs-12\">\n      <form #editForm=\"ngForm\" (ngSubmit)=\"edit()\">\n        <div class=\"row\">\n          <div class=\"col-xs-12\">\n            <div class=\"form-group\">\n              <label for=\"name\">Name</label>\n              <input required type=\"text\" id=\"name\" name=\"name\" #name=\"ngModel\" [(ngModel)]=\"bindingModel.name\" class=\"form-control\">\n            </div>\n          </div>\n        </div>\n        <div class=\"row\">\n            <div class=\"col-xs-12\">\n              <div class=\"form-group\">\n                <label for=\"name\">Price</label>\n                <input required type=\"number\" id=\"price\" name=\"price\" #price=\"ngModel\" [(ngModel)]=\"bindingModel.price\" class=\"form-control\">\n              </div>\n            </div>\n          </div>\n        <div class=\"row\">\n          <div class=\"col-xs-12\">\n            <div class=\"form-group\">\n              <label for=\"imagePath\">Image URL</label>\n              <input required type=\"text\" id=\"imagePath\" name=\"imagePath\" #imagePath=\"ngModel\" [(ngModel)]=\"bindingModel.imagePath\" class=\"form-control\">\n            </div>\n          </div>\n        </div>\n        <div class=\"row\">\n          <div class=\"col-xs-12\">\n            <img src=\"{{bindingModel.imagePath}}\" class=\"img-responsive\" style=\"max-height: 300px;\">\n          </div>\n        </div>\n        <div class=\"row\">\n          <div class=\"col-xs-12\">\n            <div class=\"form-group\">\n              <textarea required type=\"text\" id=\"description\" class=\"form-control\" name=\"description\" #description=\"ngModel\" [(ngModel)]=\"bindingModel.description\" rows=\"6\"></textarea>\n            </div>\n          </div>\n        </div>\n        <button class=\"btn btn-primary\" [disabled]=\"editForm.invalid\" type=\"submit\">Edit</button>\n      </form>\n    </div>\n  </div>\n  "

/***/ }),

/***/ "./src/app/product/product-edit/product-edit.component.ts":
/*!****************************************************************!*\
  !*** ./src/app/product/product-edit/product-edit.component.ts ***!
  \****************************************************************/
/*! exports provided: ProductEditComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProductEditComponent", function() { return ProductEditComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _node_modules_angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../node_modules/@angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _product_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../product.service */ "./src/app/product/product.service.ts");
/* harmony import */ var _node_modules_ngx_toastr__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../node_modules/ngx-toastr */ "./node_modules/ngx-toastr/fesm5/ngx-toastr.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var ProductEditComponent = /** @class */ (function () {
    function ProductEditComponent(route, productService, toastrService, router) {
        this.route = route;
        this.productService = productService;
        this.toastrService = toastrService;
        this.router = router;
    }
    ProductEditComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.productId = this.route.snapshot.params['productId'];
        this.ownerId = this.route.snapshot.params['ownerId'];
        this.productService.getById(this.productId, this.ownerId).subscribe(function (productToEdit) {
            // console.log('productToEdit: ')
            // console.log(productToEdit)
            _this.bindingModel = productToEdit;
        });
    };
    ProductEditComponent.prototype.edit = function () {
        var _this = this;
        this.bindingModel.price = Number(this.bindingModel.price.toFixed(2));
        var body = (_a = {}, _a[this.productId] = this.bindingModel, _a);
        this.productService.editProduct(body, this.ownerId).subscribe(function () {
            _this.toastrService.success('Product edited successfully.', 'Success!');
            _this.router.navigate(['/products/list']);
        }, function (error) {
            _this.toastrService.error(error.error.error + '! ' + error.statusText + '! You can edit only products posted by you.', 'Warning!');
            _this.router.navigate(['/products/list']);
        });
        var _a;
    };
    ProductEditComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-product-edit',
            template: __webpack_require__(/*! ./product-edit.component.html */ "./src/app/product/product-edit/product-edit.component.html"),
            styles: [__webpack_require__(/*! ./product-edit.component.css */ "./src/app/product/product-edit/product-edit.component.css")]
        }),
        __metadata("design:paramtypes", [_node_modules_angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"],
            _product_service__WEBPACK_IMPORTED_MODULE_2__["ProductService"],
            _node_modules_ngx_toastr__WEBPACK_IMPORTED_MODULE_3__["ToastrService"],
            _node_modules_angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"]])
    ], ProductEditComponent);
    return ProductEditComponent;
}());



/***/ }),

/***/ "./src/app/product/product-list/product-list.component.css":
/*!*****************************************************************!*\
  !*** ./src/app/product/product-list/product-list.component.css ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/product/product-list/product-list.component.html":
/*!******************************************************************!*\
  !*** ./src/app/product/product-list/product-list.component.html ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<hr>\n<div class=\"row\">\n  <div *ngFor=\"let product of products$ | async\" class=\"col-xs-12\">\n      <a style=\"cursor: pointer;\" routerLink=\"../details/{{product.ownerId}}/{{product.id}}\" class=\"list-group-item clearfix\">\n      <div class=\"pull-left\">\n        <h4 class=\"list-group-item-heading\">{{product.name}}</h4>\n        <h2 class=\"btn btn-outline-secondary\">{{product.price}} $</h2>\n        <h6 class=\"text-dark\">submitted {{calcTime(product.createdOn)}} ago</h6>\n        <p class=\"list-group-item-text text-md-left text-black-50\">{{product.description}}</p>\n      </div>\n      <span class=\"pull-right\">\n        <img\n          src=\"{{product.imagePath}}\"\n          alt=\"{{product.name}}\"\n          class=\"img-responsive\"\n          style=\"max-height: 50px;\">\n      </span>\n    </a>      \n  </div>\n</div>\n\n<ng-template #loading>\n    Loading stuff...\n</ng-template>\n"

/***/ }),

/***/ "./src/app/product/product-list/product-list.component.ts":
/*!****************************************************************!*\
  !*** ./src/app/product/product-list/product-list.component.ts ***!
  \****************************************************************/
/*! exports provided: ProductListComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProductListComponent", function() { return ProductListComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _product_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../product.service */ "./src/app/product/product.service.ts");
/* harmony import */ var _helperFunctions_calcTime_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../helperFunctions/calcTime.js */ "./src/app/product/helperFunctions/calcTime.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var ProductListComponent = /** @class */ (function () {
    function ProductListComponent(productService) {
        this.productService = productService;
    }
    ProductListComponent.prototype.ngOnInit = function () {
        this.products$ = this.productService.getAllProducts();
    };
    ProductListComponent.prototype.calcTime = function (time) {
        return Object(_helperFunctions_calcTime_js__WEBPACK_IMPORTED_MODULE_2__["default"])(time);
    };
    ProductListComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-product-list',
            template: __webpack_require__(/*! ./product-list.component.html */ "./src/app/product/product-list/product-list.component.html"),
            styles: [__webpack_require__(/*! ./product-list.component.css */ "./src/app/product/product-list/product-list.component.css")]
        }),
        __metadata("design:paramtypes", [_product_service__WEBPACK_IMPORTED_MODULE_1__["ProductService"]])
    ], ProductListComponent);
    return ProductListComponent;
}());



/***/ }),

/***/ "./src/app/product/product-start/product-start.component.css":
/*!*******************************************************************!*\
  !*** ./src/app/product/product-start/product-start.component.css ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "img {\r\n  max-width: 100%;\r\n  max-height: 100%;\r\n}\r\n\r\n.products {\r\n  max-width: 400px;\r\n  margin: 0.2%;\r\n}\r\n\r\n"

/***/ }),

/***/ "./src/app/product/product-start/product-start.component.html":
/*!********************************************************************!*\
  !*** ./src/app/product/product-start/product-start.component.html ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<h3>Welcome to our e-shop where you can by and sell used or new products.</h3>\n<div *ngIf=\"!authService.isAuthenticated()\" class=\"alert alert-success\" role=\"alert\">\n  <h4 class=\"alert-heading\">If you want to buy or sell please <a routerLink=\"/auth/signin\">login</a>.</h4>\n  <hr>\n  <p class=\"mb-0\">Not registered? <a routerLink=\"/auth/signup\">Sign up now!</a></p>\n</div>\n<!-- {{products | json}} -->\n<div *ngIf=\"products\" id=\"carouselExampleIndicators\" class=\"carousel slide\" data-ride=\"carousel\">\n  <ol class=\"carousel-indicators\">\n    <li data-target=\"#carouselExampleIndicators\" data-slide-to=\"0\" class=\"active\"></li>\n    <li data-target=\"#carouselExampleIndicators\" data-slide-to=\"1\"></li>\n    <li data-target=\"#carouselExampleIndicators\" data-slide-to=\"2\"></li>\n  </ol>\n  <div class=\"carousel-inner\">\n    <div class=\"carousel-item active\">\n      <img class=\"d-block w-100\" src=\"{{productFirstSlide.imagePath}}\" alt=\"First slide\">\n    </div>\n    <div class=\"carousel-item\">\n      <img class=\"d-block w-100\" src=\"{{productSecondSlide.imagePath}}\" alt=\"Second slide\">\n    </div>\n    <div class=\"carousel-item\">\n      <img class=\"d-block w-100\" src=\"{{productThirdSlide.imagePath}}\" alt=\"Third slide\">\n    </div>\n  </div>\n  <a class=\"carousel-control-prev\" href=\"#carouselExampleIndicators\" role=\"button\" data-slide=\"prev\">\n    <span class=\"carousel-control-prev-icon\" aria-hidden=\"true\"></span>\n    <span class=\"sr-only\">Previous</span>\n  </a>\n  <a class=\"carousel-control-next\" href=\"#carouselExampleIndicators\" role=\"button\" data-slide=\"next\">\n    <span class=\"carousel-control-next-icon\" aria-hidden=\"true\"></span>\n    <span class=\"sr-only\">Next</span>\n  </a>\n</div>\n\n<!-- <div *ngIf=\"products\" class=\"row container\">\n    <div *ngFor=\"let product of products\" class=\"card-body col-xs-12\">\n        {{product.name}} - {{product.price}} $\n        <img class=\"d-block w-100\" src=\"{{product.imagePath}}\" alt=\"Slide image\">\n      </div>\n</div> -->\n\n<hr>\n<div *ngIf=\"products\" class=\"row\">\n  <div *ngFor=\"let product of products\" class=\"col-xs-12 products\">\n      <a style=\"cursor: pointer;\" routerLink=\"/products/details/{{product.ownerId}}/{{product.id}}\" class=\"list-group-item clearfix\">\n      <div class=\"pull-left\">\n        <h4 class=\"list-group-item-heading\">{{product.name}}</h4>\n        <h2 class=\"btn btn-outline-secondary\">{{product.price}} $</h2>\n        <h6 class=\"text-dark\">submitted {{product.createdOn}} ago</h6>\n        <p class=\"list-group-item-text text-md-left text-black-50\">{{product.description}}</p>\n      </div>\n      <span class=\"pull-right\">\n        <img\n          src=\"{{product.imagePath}}\"\n          alt=\"{{product.name}}\"\n          class=\"img-responsive\"\n          style=\"max-height: 50px;\">\n      </span>\n    </a>      \n  </div>\n</div>"

/***/ }),

/***/ "./src/app/product/product-start/product-start.component.ts":
/*!******************************************************************!*\
  !*** ./src/app/product/product-start/product-start.component.ts ***!
  \******************************************************************/
/*! exports provided: ProductStartComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProductStartComponent", function() { return ProductStartComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _product_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../product.service */ "./src/app/product/product.service.ts");
/* harmony import */ var _auth_auth_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../auth/auth.service */ "./src/app/auth/auth.service.ts");
/* harmony import */ var _helperFunctions_calcTime_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../helperFunctions/calcTime.js */ "./src/app/product/helperFunctions/calcTime.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var ProductStartComponent = /** @class */ (function () {
    function ProductStartComponent(productService, authService) {
        this.productService = productService;
        this.authService = authService;
    }
    ProductStartComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.productService.getAllStartUpProducts().subscribe(function (data) {
            for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
                var product = data_1[_i];
                product.createdOn = Object(_helperFunctions_calcTime_js__WEBPACK_IMPORTED_MODULE_3__["default"])(product.createdOn);
            }
            _this.products = data;
            // console.log(this.products)
            _this.productFirstSlide = _this.products[0];
            _this.productSecondSlide = _this.products[1];
            _this.productThirdSlide = _this.products[2];
        });
    };
    ProductStartComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-product-start',
            template: __webpack_require__(/*! ./product-start.component.html */ "./src/app/product/product-start/product-start.component.html"),
            styles: [__webpack_require__(/*! ./product-start.component.css */ "./src/app/product/product-start/product-start.component.css")]
        }),
        __metadata("design:paramtypes", [_product_service__WEBPACK_IMPORTED_MODULE_1__["ProductService"],
            _auth_auth_service__WEBPACK_IMPORTED_MODULE_2__["AuthService"]])
    ], ProductStartComponent);
    return ProductStartComponent;
}());



/***/ }),

/***/ "./src/app/product/product.service.ts":
/*!********************************************!*\
  !*** ./src/app/product/product.service.ts ***!
  \********************************************/
/*! exports provided: ProductService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProductService", function() { return ProductService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _models_product_list_item_model__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./models/product-list-item.model */ "./src/app/product/models/product-list-item.model.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var baseUrl = 'https://ng-e-shop.firebaseio.com/products/';
var ProductService = /** @class */ (function () {
    function ProductService(httpClient) {
        this.httpClient = httpClient;
    }
    ProductService.prototype.getAllStartUpProducts = function () {
        return this.httpClient.get(baseUrl + ".json").pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])(function (res) {
            // console.log(res)
            var userIds = Object.keys(res);
            var products = [];
            for (var _i = 0, userIds_1 = userIds; _i < userIds_1.length; _i++) {
                var userId = userIds_1[_i];
                var user = res[userId];
                // console.log(user)
                var ids = Object.keys(user);
                for (var _a = 0, ids_1 = ids; _a < ids_1.length; _a++) {
                    var i = ids_1[_a];
                    products.push(new _models_product_list_item_model__WEBPACK_IMPORTED_MODULE_3__["ProductListItemModel"](i, user[i].name, user[i].imagePath, user[i].description, user[i].price, user[i].createdOn, user[i].ownerId, user[i].ownerName));
                }
            }
            return products;
        }));
    };
    ProductService.prototype.getAllProducts = function () {
        return this.httpClient.get(baseUrl + ".json").pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])(function (res) {
            // console.log(res)
            var userIds = Object.keys(res);
            var products = [];
            for (var _i = 0, userIds_2 = userIds; _i < userIds_2.length; _i++) {
                var userId = userIds_2[_i];
                var user = res[userId];
                // console.log(user)
                var ids = Object.keys(user);
                for (var _a = 0, ids_2 = ids; _a < ids_2.length; _a++) {
                    var i = ids_2[_a];
                    products.push(new _models_product_list_item_model__WEBPACK_IMPORTED_MODULE_3__["ProductListItemModel"](i, user[i].name, user[i].imagePath, user[i].description, user[i].price, user[i].createdOn, user[i].ownerId, user[i].ownerName));
                }
            }
            return products;
        }));
    };
    ProductService.prototype.createProduct = function (body, ownerUid) {
        return this.httpClient.post(baseUrl + ownerUid + '/' + '.json', body);
    };
    ProductService.prototype.getById = function (productId, ownerId) {
        // console.log('productId:')
        // console.log(productId)
        // console.log('ownerId: ')
        // console.log(ownerId)
        return this.httpClient.get(baseUrl + ownerId + '/' + productId + '/.json');
    };
    ProductService.prototype.editProduct = function (body, ownerId) {
        return this.httpClient.patch(baseUrl + ownerId + '/.json', body);
    };
    ProductService.prototype.deleteProductById = function (ownerIdToDelete, productId) {
        return this.httpClient.delete(baseUrl + ownerIdToDelete + '/' + productId + '/.json');
    };
    ProductService.prototype.getAllProductsByUserId = function (userId) {
        return this.httpClient.get(baseUrl + userId + '/.json');
    };
    ProductService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"]])
    ], ProductService);
    return ProductService;
}());



/***/ }),

/***/ "./src/app/product/profile/profile.component.css":
/*!*******************************************************!*\
  !*** ./src/app/product/profile/profile.component.css ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "img {\r\n  max-width: 10%;\r\n  max-height: 10%;\r\n}"

/***/ }),

/***/ "./src/app/product/profile/profile.component.html":
/*!********************************************************!*\
  !*** ./src/app/product/profile/profile.component.html ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<h3>Cart:</h3>\n<ul *ngIf=\"productsInCart$ | async as productsInCart; else loading\" class=\"list-group\">\n  <div *ngIf=\"productsInCart.length == 0\">\n    (no items in cart)\n  </div>\n  <li *ngFor=\"let cartProduct of productsInCart\" class=\"list-group-item d-flex justify-content-between align-items-center\">\n    <img src=\"{{cartProduct.imagePath}}\" alt=\"{{cartProduct.name}}\">\n    <a class=\"badge badge-light badge-pill\">{{cartProduct.price}} $</a>\n    <a class=\"badge badge-light badge-pill\" routerLink=\"../../details/{{cartProduct.ownerId}}/{{cartProduct.productId}}\">{{cartProduct.name}}</a>\n    <button class=\"btn btn-sm btn-danger\" (click)=\"removeItemFromCart(cartProduct.productId)\">Remove from cart</button>\n    <!-- Button trigger modal -->\n    <!-- <button type=\"button\" class=\"btn btn-sm btn-danger\" data-toggle=\"modal\" data-target=\"#exampleModal\">\n        Remove from cart\n    </button> -->\n  </li>\n  <small>Product count: {{productCount}}</small>\n</ul>\n\n<!-- Modal -->\n<div class=\"modal fade\" id=\"exampleModal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"exampleModalLabel\" aria-hidden=\"true\">\n  <div class=\"modal-dialog\" role=\"document\">\n    <div class=\"modal-content\">\n      <div class=\"modal-header\">\n        <h5 class=\"modal-title\" id=\"exampleModalLabel\">Attention!</h5>\n        <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">\n          <span aria-hidden=\"true\">&times;</span>\n        </button>\n      </div>\n      <div class=\"modal-body\">\n        Are you sure you want to remove this item?\n      </div>\n      <div class=\"modal-footer\">\n        <button type=\"button\" class=\"btn btn-secondary\" data-dismiss=\"modal\">Close</button>\n        <button type=\"button\" class=\"btn btn-primary\" (click)=\"removeItemFromCart(cartProduct.productId)\">Yes</button>\n      </div>\n    </div>\n  </div>\n</div>\n\n<ng-template #loading>\n    Loading stuff...\n</ng-template>"

/***/ }),

/***/ "./src/app/product/profile/profile.component.ts":
/*!******************************************************!*\
  !*** ./src/app/product/profile/profile.component.ts ***!
  \******************************************************/
/*! exports provided: ProfileComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProfileComponent", function() { return ProfileComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _services_user_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../services/user.service */ "./src/app/services/user.service.ts");
/* harmony import */ var _node_modules_ngx_toastr__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/ngx-toastr */ "./node_modules/ngx-toastr/fesm5/ngx-toastr.js");
/* harmony import */ var _node_modules_angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../node_modules/@angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var firebase__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! firebase */ "./node_modules/firebase/dist/index.cjs.js");
/* harmony import */ var firebase__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(firebase__WEBPACK_IMPORTED_MODULE_4__);
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var ProfileComponent = /** @class */ (function () {
    function ProfileComponent(userService, toastrService, router, ref) {
        var _this = this;
        this.userService = userService;
        this.toastrService = toastrService;
        this.router = router;
        this.ref = ref;
        this.removeItemFromCart = function (productIdToBeRemoved) {
            // console.log(productIdToBeRemoved)
            var userId = firebase__WEBPACK_IMPORTED_MODULE_4__["auth"]().currentUser.uid;
            _this.userService.removeProductFromCart(productIdToBeRemoved).subscribe(function () {
                // success
                _this.toastrService.success('Item deleted successfully from cart.', 'Success!');
                _this.router.navigate(['/products/list']);
                _this.productCount--;
            }, function (error) {
                // error
                _this.toastrService.error(error.error.error + '! ' + error.statusText + '!', 'Warning!');
                _this.router.navigate(['/products/profile/' + userId]);
            });
        };
    }
    ProfileComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.productsInCart$ = this.userService.getMyCart();
        this.productsInCart$.subscribe(function (data) {
            _this.productCount = data.length;
        });
    };
    ProfileComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-profile',
            template: __webpack_require__(/*! ./profile.component.html */ "./src/app/product/profile/profile.component.html"),
            styles: [__webpack_require__(/*! ./profile.component.css */ "./src/app/product/profile/profile.component.css")]
        }),
        __metadata("design:paramtypes", [_services_user_service__WEBPACK_IMPORTED_MODULE_1__["UserService"],
            _node_modules_ngx_toastr__WEBPACK_IMPORTED_MODULE_2__["ToastrService"],
            _node_modules_angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"],
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ChangeDetectorRef"]])
    ], ProfileComponent);
    return ProfileComponent;
}());



/***/ }),

/***/ "./src/app/services/models/product-in-cart.model.ts":
/*!**********************************************************!*\
  !*** ./src/app/services/models/product-in-cart.model.ts ***!
  \**********************************************************/
/*! exports provided: ProductInCartModel */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProductInCartModel", function() { return ProductInCartModel; });
var ProductInCartModel = /** @class */ (function () {
    function ProductInCartModel(productId, name, imagePath, description, price, createdOn, ownerId, ownerName) {
        this.productId = productId;
        this.name = name;
        this.imagePath = imagePath;
        this.description = description;
        this.price = price;
        this.createdOn = createdOn;
        this.ownerId = ownerId;
        this.ownerName = ownerName;
    }
    return ProductInCartModel;
}());



/***/ }),

/***/ "./src/app/services/models/user-create.model.ts":
/*!******************************************************!*\
  !*** ./src/app/services/models/user-create.model.ts ***!
  \******************************************************/
/*! exports provided: UserCreateModel */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserCreateModel", function() { return UserCreateModel; });
var UserCreateModel = /** @class */ (function () {
    function UserCreateModel(displayName, cart, active, email, userId, photoUrl, roles) {
        this.displayName = displayName;
        this.cart = cart;
        this.active = active;
        this.email = email;
        this.userId = userId;
        this.photoUrl = photoUrl;
        this.roles = roles;
    }
    return UserCreateModel;
}());



/***/ }),

/***/ "./src/app/services/user.service.ts":
/*!******************************************!*\
  !*** ./src/app/services/user.service.ts ***!
  \******************************************/
/*! exports provided: UserService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserService", function() { return UserService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _models_user_create_model__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./models/user-create.model */ "./src/app/services/models/user-create.model.ts");
/* harmony import */ var firebase__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! firebase */ "./node_modules/firebase/dist/index.cjs.js");
/* harmony import */ var firebase__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(firebase__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _models_product_in_cart_model__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./models/product-in-cart.model */ "./src/app/services/models/product-in-cart.model.ts");
/* harmony import */ var _node_modules_ngx_toastr__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../node_modules/ngx-toastr */ "./node_modules/ngx-toastr/fesm5/ngx-toastr.js");
/* harmony import */ var _node_modules_angular_router__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../node_modules/@angular/router */ "./node_modules/@angular/router/fesm5/router.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var baseUrl = 'https://ng-e-shop.firebaseio.com/users/';
var UserService = /** @class */ (function () {
    function UserService(httpClient, toastrService, router) {
        var _this = this;
        this.httpClient = httpClient;
        this.toastrService = toastrService;
        this.router = router;
        this.createUser = function (user, uid) {
            var obj = {};
            obj[uid] = user;
            firebase__WEBPACK_IMPORTED_MODULE_3__["database"]().ref("users").update(obj).then(function () {
                // added correctly
                console.log('User Added correctly!');
            }).catch(function (err) { return console.log(err); });
        };
        this.addProductToUserCartById = function (productId, body) {
            var userId = firebase__WEBPACK_IMPORTED_MODULE_3__["auth"]().currentUser.uid;
            var obj = {};
            obj[productId] = body;
            firebase__WEBPACK_IMPORTED_MODULE_3__["database"]().ref("users/" + userId + '/cart').update(obj).then(function () {
                _this.toastrService.success('Item added to cart successfully.', 'Success!');
                //   this.router.navigate(['/products/list'])
            }).catch(function (error) {
                _this.toastrService.error(error.error.error + '! ' + error.statusText + '!', 'Warning!');
                _this.router.navigate(['/products']);
            });
            // return this.httpClient.post(baseUrl + userId + '/cart/'+ productId + '.json', body)
        };
    }
    UserService.prototype.getAllUsers = function () {
        return this.httpClient.get(baseUrl + ".json").pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(function (res) {
            // console.log(res)
            var userIds = Object.keys(res);
            var users = [];
            for (var _i = 0, userIds_1 = userIds; _i < userIds_1.length; _i++) {
                var userId = userIds_1[_i];
                var user = res[userId];
                // console.log('user: ')
                // console.log(user)
                if (user) {
                    users.push(new _models_user_create_model__WEBPACK_IMPORTED_MODULE_2__["UserCreateModel"](user.displayName, user.cart, user.active, user.email, user.userId, user.photoUrl, user.roles));
                }
            }
            // console.log('HERE carts: ')
            // console.log(carts)
            return users;
        }));
    };
    UserService.prototype.getUserByUserId = function (id) {
        // console.log('to get users you need to be logged in')
        return this.httpClient.get(baseUrl + id + '/.json');
    };
    UserService.prototype.getMyCart = function () {
        var userId = firebase__WEBPACK_IMPORTED_MODULE_3__["auth"]().currentUser.uid;
        return this.httpClient.get("" + baseUrl + userId + "/cart.json").pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(function (res) {
            // console.log(res)
            var cartProducts = [];
            if (res === null) {
                // cart is empty
                return cartProducts;
            }
            var cartKeys = Object.keys(res);
            for (var _i = 0, cartKeys_1 = cartKeys; _i < cartKeys_1.length; _i++) {
                var itemKey = cartKeys_1[_i];
                var item = res[itemKey];
                // console.log(item)
                cartProducts.push(new _models_product_in_cart_model__WEBPACK_IMPORTED_MODULE_5__["ProductInCartModel"](itemKey, item.name, item.imagePath, item.description, item.price, item.createdOn, item.ownerId, item.ownerName));
            }
            return cartProducts;
        }));
    };
    UserService.prototype.getAllCarts = function () {
        return this.httpClient.get(baseUrl + ".json").pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(function (res) {
            // console.log(res)
            var userIds = Object.keys(res);
            var carts = [[]];
            for (var _i = 0, userIds_2 = userIds; _i < userIds_2.length; _i++) {
                var userId = userIds_2[_i];
                var user = res[userId];
                // console.log('user: ')
                // console.log(user)
                if (user['cart']) {
                    var cartKeys = Object.keys(user['cart']);
                    // console.log('cartKeys: ')
                    // console.log(cartKeys)
                    var currCart = [];
                    for (var _a = 0, cartKeys_2 = cartKeys; _a < cartKeys_2.length; _a++) {
                        var itemKey = cartKeys_2[_a];
                        var item = user['cart'][itemKey];
                        // console.log('item: ')
                        // console.log(item)
                        currCart.push(new _models_product_in_cart_model__WEBPACK_IMPORTED_MODULE_5__["ProductInCartModel"](itemKey, item.name, item.imagePath, item.description, item.price, item.createdOn, item.ownerId, item.ownerName));
                    }
                    // console.log('currCart: ')
                    // console.log(currCart)
                    carts.push(currCart);
                }
            }
            // console.log('HERE carts: ')
            // console.log(carts)
            return carts;
        }));
    };
    UserService.prototype.removeProductFromCart = function (productIdToRemove) {
        var userId = firebase__WEBPACK_IMPORTED_MODULE_3__["auth"]().currentUser.uid;
        return this.httpClient.delete(baseUrl + userId + '/cart/' + productIdToRemove + '/.json');
    };
    UserService.prototype.getCurrLoggedInUser = function () {
        var userId = firebase__WEBPACK_IMPORTED_MODULE_3__["auth"]().currentUser.uid;
        return this.httpClient.get("" + baseUrl + userId + "/.json");
    };
    UserService.prototype.isAdmin = function () {
        var isAdmin = false;
        if (firebase__WEBPACK_IMPORTED_MODULE_3__["auth"]().currentUser) {
            var userId = firebase__WEBPACK_IMPORTED_MODULE_3__["auth"]().currentUser.uid;
            firebase__WEBPACK_IMPORTED_MODULE_3__["database"]().ref("admins/" + userId).on("value", function (data) {
                // console.log('checking...')
                // console.log(data)
                if (data['node_']['value_']) {
                    // console.log('should return true')
                    isAdmin = true;
                }
                else {
                    isAdmin = false;
                }
            }, function (errorObject) {
                // console.log('The read failed: ' + errorObject.code)
                isAdmin = false;
            });
        }
        return isAdmin;
    };
    UserService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"],
            _node_modules_ngx_toastr__WEBPACK_IMPORTED_MODULE_6__["ToastrService"],
            _node_modules_angular_router__WEBPACK_IMPORTED_MODULE_7__["Router"]])
    ], UserService);
    return UserService;
}());



/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
var environment = {
    production: false
};
/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "./node_modules/@angular/platform-browser-dynamic/fesm5/platform-browser-dynamic.js");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__["platformBrowserDynamic"])().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(function (err) { return console.log(err); });


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! C:\Users\IBM_ADMIN\Dropbox\SoftUni\e-shop\src\main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map