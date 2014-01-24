var near = near || {};
near.index = function () {
    // =================================================
    // = Private variables (example: var _foo = bar; ) =
    // =================================================
    var adapter = new MemoryAdapter();
        adapter.initialize().done(function () {
        console.log("Data adapter initialized");
    }); 
    var app;
    
    // =================================================
    // = public functions                              =
    // =================================================
    var self = {
        
        init : function () {
            document.addEventListener('deviceready', _onDeviceReady, false);
        }

        
    };
    
    return self;

    
    
    // ================================================
    // = Private functionse (function _private () {}) =
    // ================================================

    function _onDeviceReady (argument) {
        
        _setup_notifyoverride();
        _setup_events();
        
        App.start();

        console.log(App);

        window.alert('device is ready');
    }

    function _setup_events () {

        $('.search-key').on('keyup', findByName);
        $('.help-btn').on('click', function() {
            window.alert("Some help here...")
        });
        
    }

    function findByName() {
        adapter.findByName($('.search-key').val()).done(function (employees) {
            var l = employees.length;
            var e;
            $('.employee-list').empty();
            for (var i = 0; i < l; i++) {
                e = employees[i];
                $('.employee-list').append('<li><a href="#employees/' + e.id + '">' + e.firstName + ' ' + e.lastName + '</a></li>');
            }
        });
    }

    function _setup_notifyoverride () {
        if (navigator.notification) { // Override default HTML alert with native dialog
            window.alert = function (message) {
                navigator.notification.alert(
                    message,    // message
                    null,       // callback
                    "Workshop", // title
                    'HIDE ME'        // buttonName
                );
            };
        }
    }


    
    
}();