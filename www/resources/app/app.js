
document.addEventListener("deviceready", onDeviceReady, false ); 
document.addEventListener("backbutton", backFix, false); 

// Dom7
var $$ = Dom7;

// Framework7 App main instance
var app  = new Framework7({
    root: '#app', // App root element
    id: 'com.ubs.barcodescanner', // App bundle ID
    name: 'BarCode Scanner', // App name
    theme: 'auto', // Automatic theme detection
    // App root data
    data: function () {
        return {
            user: {
                firstName: 'John',
                lastName: 'Doe',
            },
        };
    },
      // App root methods
    methods: {
        helloWorld: function () {
            app.dialog.alert('Hello World!');
        },
    },
      // App routes
    routes: routes,
});

// Init/Create main view
var mainView = app.views.create('.view-main', {
    url: '/'
});







// Login Screen Demo
$$('body').on('submit', '#login-form', function (e) {
    e.preventDefault();      
    login();
    return false;
});

$$('body').on('click', '.openBarCodeReader', function(){
    let input = $$(this).siblings('input'); 
    openBarCodeReader(input);
});

$$('body').on('submit', '#my-form', function (e) {    
    e.preventDefault();  

    let code = $$('#my-form input[name="code"]').val();
    loadPageDetails(code);
 
    return false;
});

$$('body').on('click', '.tab-link', function(){
    let link = $$(this);

    if (link.hasClass('logout')) {
        logout();
    }
});

$$('body').on('click', '.block-title', function(){
    console.log('click');
    window.plugins.phonenumber.get(success, failed);

    function success(phonenumber) {
        alert("My number is " + phonenumber);
    }
    function failed(){
        alert('failed');
    }
});



/*$$('.panel_menu').on('click', '.item-link', function(){
    let id = this.getAttribute('id');

    switch (id){
        case 'logout':
            logout();
            break;
    }
});*/




if (app.device.desktop) {
    login();
}













function onDeviceReady(){ 
    //fix app images and text size
    if (window.MobileAccessibility) {
        window.MobileAccessibility.usePreferredTextZoom(false);    
    }

    login();
}

function backFix(event){
    var page = mainView.router.currentRoute;  
    if( page.name == "home"){         
        app.dialog.confirm('Close App?', function () { 
            navigator.app.exitApp();
        });
    }else{
        mainView.router.back();
    } 
}


function clearUserInfo(){

    localStorage.clear(); 
}

function logout(){  
    clearUserInfo();
    app.loginScreen.open('#my-login-screen');
}

function login(){
    var usernameInput = $$('#my-login-screen [name="username"]');
    var passwordInput = $$('#my-login-screen [name="password"]');

    var username = !usernameInput.val() ? localStorage.USERNAME : usernameInput.val();
    var password = !passwordInput.val() ? localStorage.PASSWORD : passwordInput.val();

    if (username && password) { 
        if(!!password) {
            localStorage.USERNAME = username;
            localStorage.PASSWORD = password;
        }
        app.loginScreen.close('#my-login-screen');
    }else{
        logout();        
    }
}

function loadPageDetails(code){  
    if (code) {
        mainView.router.navigate({
            name: 'datails',
            params: { code: 1 },
        });
    }else{
        app.dialog.alert('Fill in code field, please');
    }    
}


function openBarCodeReader(input){
    //console.log(input);
    if(window.device && cordova.plugins && cordova.plugins.barcodeScanner) {
        cordova.plugins.barcodeScanner.scan(
            function (result) {
                  /*alert("We got a barcode\n" +
                        "Result: " + result.text + "\n" +
                        "Format: " + result.format + "\n" +
                        "Cancelled: " + result.cancelled);*/
                input.val(result.text);
            },
            function (error) {
                alert("Scanning failed: " + error);
            },
            {
                  //preferFrontCamera : true, // iOS and Android
                  showFlipCameraButton : true, // iOS and Android
                  showTorchButton : true, // iOS and Android
                  torchOn: true, // Android, launch with the torch switched on (if available)
                  //saveHistory: true, // Android, save scan history (default false)
                  prompt : "Place a barcode inside the scan area", // Android
                  resultDisplayDuration: 0, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
                  //formats : "QR_CODE,PDF_417", // default: all but PDF_417 and RSS_EXPANDED
                  //orientation : "landscape", // Android only (portrait|landscape), default unset so it rotates with the device
                  //disableAnimations : true, // iOS
                  //disableSuccessBeep: false // iOS and Android
            }
        );
    }else{
        app.dialog.alert('Your device does not support this function');
    }
}