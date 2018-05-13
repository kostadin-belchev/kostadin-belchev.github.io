// constants of the application
const BASE_URL = `https://baas.kinvey.com/`;
const APP_KEY = 'kid_rJwc6a0pf';
const APP_SECRET = '1afea2a3dc564444a666514670c180f6';
const AUTH_HEADERS = {
    'Authorization': 'Basic ' + btoa(APP_KEY + ':' + APP_SECRET)
};

// Session functionality (logout, login, register, etc.)
// Session operations --- START -----------------------------------------------
function registerUser(event) {
    $('#errorBox').hide();
    event.preventDefault(); // not sure if needed, just in case
    let usernameBox = $('#formRegister input[name=username]');
    let passwordBox = $('#formRegister input[name=pass]');
    let repeatPassBox = $('#formRegister input[name=checkPass]');

    //•	You need to validate the input.  
    // A username should be a string with at least 5 characters long.
    // Passwords input fields shouldn’t be empty. 
    // Both passwords should match. 
    // TO DO
    if (usernameBox.val() === '' || passwordBox.val() === '' || repeatPassBox.val() === '') {
        showError("Username and passwords cannot be empty. Please fill out all fields.");
        return;
    }

    if (!validCredentials(usernameBox.val(), passwordBox.val())) {
        showError(`Invalid username or password format. 
        A username should be at least 5 characters long.
        Password fields cannot be empty.`);
        return;
    }

    if (passwordBox.val() !== repeatPassBox.val()) {
        showError("Passwords should match.");
        return;
    }

    let userData = {
        username: escapeHtml(usernameBox.val()),
        password: passwordBox.val(),
        subscriptions: []
    }

    let request = {
        method: 'POST',
        url: BASE_URL + 'user/' + APP_KEY + '/',
        headers: AUTH_HEADERS,
        data: userData,
        success: registerUserSuccess,
        error: handleAjaxError
    }

    $.ajax(request);

    function registerUserSuccess(userInfo) { // the response from registering a user
        // is the user itself that we just registered
        $('#errorBox').hide();
        saveAuthInSession(userInfo);
        showInfo('User registration successful.');
        loadHome();
        // clear form for next user
        $('#formRegister').trigger('reset');
    }
}


function logoutUser() {
    //The “logout” REST service at the back-end should be obligatory called at logout.
    $.ajax({
        method: 'POST',
        url: BASE_URL + 'user/' + APP_KEY + '/_logout',
        headers: {
            'Authorization': 'Kinvey ' + sessionStorage.getItem('authToken')
        },
        success: logoutUserSuccess,
        error: handleAjaxError
    });

    function logoutUserSuccess() {
        sessionStorage.clear();
        showInfo('Logout successful.');
        loadWelcome();
    }
}

function loginUser(event) {
    $('#errorBox').hide();
    event.preventDefault(); // not needed just in case
    let username = $('#formLogin input[name=username]');
    let password = $('#formLogin input[name=pass]');

    // validation
    if (username.val() === '' || password.val() === '') {
        showError("Username and password cannot be empty. Please fill out both fields.");
        return;
    }

    if (!validCredentials(username.val(), password.val())) {
        showError(`Invalid username or password format. 
        A username should be at least 5 characters long.
        Password fields cannot be empty.`);
        return;
    }

    let userData = {
        username: username.val(),
        password: password.val()
    }

    let request = {
        method: 'POST',
        url: BASE_URL + 'user/' + APP_KEY + '/login',
        headers: AUTH_HEADERS,
        data: userData,
        success: loginUserSuccess,
        error: handleAjaxError
    }

    $.ajax(request);

    function loginUserSuccess(userInfo) { // the response from loggin in a user
        // is the user itself that we just logged in with
        $('#errorBox').hide();
        saveAuthInSession(userInfo);
        loadHome();
        showInfo('Login successful.');
        // clear form for next user
        $('#formLogin').trigger('reset');
    }
}
// Session operations --- END -----------------------------------------------

// GRUD operations --- START ----------------------------------
function loadHome() {
    // console.log('loadHome To Do');
    // GET https://baas.kinvey.com/appdata/app_key/flights?query={"isPublished":true}
    $.ajax({
        method: 'GET',
        url: `https://baas.kinvey.com/appdata/${APP_KEY}/flights?query={"isPublished":true}`,
        headers: {
            'Authorization': 'Kinvey ' + sessionStorage.getItem('authToken'),
        },
        success: getPublishedFlightsSuccess,
        error: handleAjaxError
    });

    async function getPublishedFlightsSuccess(flights) {
        // public flights by all users
        // console.log(flights);
        for (const flight of flights) {
            flight.destination = flight.destination.toUpperCase();
            flight.departure = formatDate(flight.departure);
        }
        let context = {
            user: {
                isAuthenticated: sessionStorage.getItem('authToken') !== null,
                username: sessionStorage.getItem('username')
            },
            flights
        };
        let sourceFlight = await $.get('./templates/flight-partial.hbs');
        Handlebars.registerPartial('flight', sourceFlight);
        await containerFiller(context, './templates/catalog.hbs', '#container');
    }
}

function createFlight(event) {
    event.preventDefault();
    //console.log('create Flight to Do');
    let destinationBox = $('#formAddFlight').find('input[name=destination]');
    let originBox = $('#formAddFlight').find('input[name=origin]');
    let departureDateBox = $('#formAddFlight').find('input[name=departureDate]');
    let departureTimeBox = $('#formAddFlight').find('input[name=departureTime]');
    let seatsBox = $('#formAddFlight').find('input[name=seats]');
    let costBox = $('#formAddFlight').find('input[name=cost]');
    let imgBox = $('#formAddFlight').find('input[name=img]');
    let isPublicCheckBox = $('#formAddFlight').find('input[name=public]');
    
    // Destination and origin station should be non-empty strings.
    if (destinationBox.val() === '' || originBox.val() === '') {
        showError('Cannot add flight with empty destination and/or origin.');
        return;
    }

    // seats per flight, cost per seat (both should be validated that they are valid numbers)
    if (!seatsBox.val() || !costBox.val()) {
        showError('Cannot add flight without number of seats and/or cost per seat.');
        return;
    }

    // seats per flight and cost per seat should both be validated that they are valid numbers
    if (isNaN(seatsBox.val()) || isNaN(costBox.val())) {
        showError('Seats per flight and cost per seat should both be valid numbers.');
        return;
    }

     if (!Number.isInteger(Number(seatsBox.val()))) {
        showError('Seats per flight should be an integer number.');
        return;
    }

    // Number of seats and cost per seat should be positive numbers. 
    if (Number(seatsBox.val()) < 0 || Number(costBox.val()) < 0) {
        showError('Cannot add flight with negative number of seats and/or cost per seat.');
        return;
    }
    // also link url should always start with “http”.
    // const regex = /^http.*$/;
    // if (!regex.test(urlBox.val())) {
    //     showError('Link URL should always start with “http”.')
    //     return;
    // }

    let flightData = {
        "destination": destinationBox.val(),
        "origin": originBox.val(),
        "departure": departureDateBox.val(),
        "departureTime": departureTimeBox.val(),
        "seats": Number(seatsBox.val()),
        "cost": Number(Number(costBox.val()).toFixed(2)),
        "image": imgBox.val(),
        "isPublished": isPublicCheckBox.is(":checked")
    }
    // console.log('flightData');
    // console.log(flightData);
    // POST https://baas.kinvey.com/appdata/app_key/flights
     $.ajax({
            method: 'POST',
            url: `https://baas.kinvey.com/appdata/${APP_KEY}/flights`,
            headers: {
                'Authorization': 'Kinvey ' + sessionStorage.getItem('authToken'),
                'Content-Type': 'application/json'
            },
            data: JSON.stringify(flightData),
            success: createFlightSuccess,
            error: handleAjaxError
        });

        function createFlightSuccess(response) {
            $('#errorBox').hide();
            showInfo('Created flight.');
            // Clear all input fields after successful creation.
            $('#formAddFlight').trigger('reset');
            loadHome();
        }
}

function loadFlightDetails(flightId) {
    // GET https://baas.kinvey.com/appdata/app_key/flights/flight_id
    $.ajax({
        method: 'GET',
        url: `https://baas.kinvey.com/appdata/${APP_KEY}/flights/${flightId}`,
        headers: {
            'Authorization': 'Kinvey ' + sessionStorage.getItem('authToken'),
        },
        success: getFlightSuccess,
        error: handleAjaxError
    });

    async function getFlightSuccess(flight) {
        // console.log(flight);
        flight.isEditable = false;
        flight.destination = flight.destination.toUpperCase();
        flight.departure = formatDate(flight.departure);
        if (flight._acl.creator === sessionStorage.getItem('userId')) {
            flight.isEditable = true;
        }
        let context = {
            user: {
                isAuthenticated: sessionStorage.getItem('authToken') !== null,
                username: sessionStorage.getItem('username')
            },
            flight
        };
        await containerFiller(context, './templates/flight-details.hbs', '#container');
    }
}
// EDIT FLIGHT
// Step 1 get flight to edit and display it
function loadEditFlightDetails(flightIdToEdit) {
    // console.log('editFlightDetails');
    // console.log(flightIdToEdit);
    
     // GET https://baas.kinvey.com/appdata/app_key/flights/flight_id
    $.ajax({
        method: 'GET',
        url: `https://baas.kinvey.com/appdata/${APP_KEY}/flights/${flightIdToEdit}`,
        headers: {
            'Authorization': 'Kinvey ' + sessionStorage.getItem('authToken'),
        },
        success: getFlightSuccess,
        error: handleAjaxError
    });

    async function getFlightSuccess(flight) {
        // console.log(flight);
        let context = {
            user: {
                isAuthenticated: sessionStorage.getItem('authToken') !== null,
                username: sessionStorage.getItem('username')
            },
            flight
        };
        await containerFiller(context, './templates/edit-flight-details.hbs', '#container');
    }
}

// Step 2 update flight details to database
function saveFlightChanges(event) {
    event.preventDefault();
    // console.log('save changes to databse');
    let destinationBox = $('#formEditFlight').find('input[name=destination]');
    let originBox = $('#formEditFlight').find('input[name=origin]');
    let departureDateBox = $('#formEditFlight').find('input[name=departureDate]');
    let departureTimeBox = $('#formEditFlight').find('input[name=departureTime]');
    let seatsBox = $('#formEditFlight').find('input[name=seats]');
    let costBox = $('#formEditFlight').find('input[name=cost]');
    let imgBox = $('#formEditFlight').find('input[name=img]');
    let isPublicCheckBox = $('#formEditFlight').find('input[name=public]');
    
    // Destination and origin station should be non-empty strings.
    if (destinationBox.val() === '' || originBox.val() === '') {
        showError('Cannot add flight with empty destination and/or origin.');
        return;
    }

    // seats per flight, cost per seat (both should be validated that they are valid numbers)
    if (!seatsBox.val() || !costBox.val()) {
        showError('Cannot add flight without number of seats and/or cost per seat.');
        return;
    }

    // seats per flight and cost per seat should both be validated that they are valid numbers
    if (isNaN(seatsBox.val()) || isNaN(costBox.val())) {
        showError('Seats per flight and cost per seat should both be valid numbers.');
        return;
    }

    if (!Number.isInteger(Number(seatsBox.val()))) {
        showError('Seats per flight should be an integer number.');
        return;
    }

    // Number of seats and cost per seat should be positive numbers. 
    if (Number(seatsBox.val()) < 0 || Number(costBox.val()) < 0) {
        showError('Cannot add flight with negative number of seats and/or cost per seat.');
        return;
    }
    // also link url should always start with “http”.
    // const regex = /^http.*$/;
    // if (!regex.test(urlBox.val())) {
    //     showError('Link URL should always start with “http”.')
    //     return;
    // }

    let flightData = {
        "destination": destinationBox.val(),
        "origin": originBox.val(),
        "departure": departureDateBox.val(),
        "departureTime": departureTimeBox.val(),
        "seats": Number(seatsBox.val()),
        "cost": Number(Number(costBox.val()).toFixed(2)),
        "image": imgBox.val(),
        "isPublished": isPublicCheckBox.is(":checked")
    }
    // console.log('flightData');
    // console.log(flightData);
    let flightId = $('#formEditFlight').attr('data-id');
    // PUT https://baas.kinvey.com/appdata/app_key/flights/flight_id
     $.ajax({
            method: 'PUT',
            url: `https://baas.kinvey.com/appdata/${APP_KEY}/flights/${flightId}`,
            headers: {
                'Authorization': 'Kinvey ' + sessionStorage.getItem('authToken'),
                'Content-Type': 'application/json'
            },
            data: JSON.stringify(flightData),
            success: createFlightSuccess,
            error: handleAjaxError
        });

        function createFlightSuccess(response) {
            $('#errorBox').hide();
            showInfo('Successfully edited flight.');
            // Clear all input fields after successful creation.
            $('#formEditFlight').trigger('reset');
            loadFlightDetails(flightId);
        }
}

function loadMyFlights() {
    // GET https://baas.kinvey.com/appdata/app_key/flights?query={"_acl.creator":"user_id"}
    let currentlyLoggedInUserId = sessionStorage.getItem('userId');
    $.ajax({
        method: 'GET',
        url: `https://baas.kinvey.com/appdata/${APP_KEY}/flights?query={"_acl.creator":"${currentlyLoggedInUserId}"}`,
        headers: {
            'Authorization': 'Kinvey ' + sessionStorage.getItem('authToken'),
        },
        success: getMyFlightsSuccess,
        error: handleAjaxError
    });

    async function getMyFlightsSuccess(flights) {
        // All authenticated users can view their OWN flights 
        // by clicking on the [Flights] button in the navigation.
        // console.log(flights);
        for (const flight of flights) {
            flight.destination = flight.destination.toUpperCase();
            flight.departure = formatDate(flight.departure);
        }
        let context = {
            user: {
                isAuthenticated: sessionStorage.getItem('authToken') !== null,
                username: sessionStorage.getItem('username')
            },
            flights
        };
        let sourceFlight_v2 = await $.get('./templates/flight-partial-v2.hbs');
        Handlebars.registerPartial('flight_v2', sourceFlight_v2);
        await containerFiller(context, './templates/my-flights.hbs', '#container');
    }
}

function removeFlight(flightIdToRemove) {
    // When the user successfully deletes a flight the message “Flight deleted.” 
    // should be shown and the user should be redirected to the same page.
    // DELETE https://baas.kinvey.com/appdata/app_key/flights/flight_id 
     $.ajax({
        method: 'DELETE',
        url: `https://baas.kinvey.com/appdata/${APP_KEY}/flights/${flightIdToRemove}`,
        headers: {
            'Authorization': 'Kinvey ' + sessionStorage.getItem('authToken'),
        },
        success: deleteFlightSuccess,
        error: handleAjaxError
    });

    function deleteFlightSuccess(response) {
        showInfo('Flight deleted.');
        loadMyFlights();
    }
}
    
// GRUD operations with messages --- END -------------------------------------