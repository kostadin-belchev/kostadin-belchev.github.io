// constants of the application
const BASE_URL = `https://baas.kinvey.com/`;
const APP_KEY = 'kid_SJ87Y2KnM';
const APP_SECRET = '1a500685e543479bb57324fedafff533';
const AUTH_HEADERS = {
    'Authorization': 'Basic ' + btoa(APP_KEY + ':' + APP_SECRET)
};

// Session functionality (logout, login, register, etc.)
// Session operations --- START -----------------------------------------------
function registerUser(event) {
    $('#errorBox').hide();
    event.preventDefault(); // not sure if needed, just in case
    let usernameBox = $('#formRegister input[name=username]');
    let passwordBox = $('#formRegister input[name=password]');
    let repeatPassBox = $('#formRegister input[name=repeatPass]');

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
        loadFeed();
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
        loadHome();
    }
}

function loginUser(event) {
    $('#errorBox').hide();
    event.preventDefault(); // not needed just in case
    let username = $('#formLogin input[name=username]');
    let password = $('#formLogin input[name=password]');

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
        loadFeed();
        showInfo('Login successful.');
        // clear form for next user
        $('#formLogin').trigger('reset');
    }
}
// Session operations --- END -----------------------------------------------

// GRUD operations with products --- START ----------------------------------
async function loadFeed() {
    // console.log('loadFeed() TO DO');
    // The feed screen contains all chirps from subscriptions or 
    // people that the user is following (sorted by time posted in 
    // descending). It also contains the create a chirp form.
    // GET https://baas.kinvey.com/appdata/app_key/chirps?query={"author":{"$in": [subs]}}&sort={"_kmd.ect": 1}
    let username = sessionStorage.getItem('username');
    let subs = sessionStorage.getItem('subscriptionsArray');
    // console.log('subs:');
    // console.log(subs);
    
    $.ajax({
        url: `https://baas.kinvey.com/appdata/${APP_KEY}/chirps?query={"author":{"$in":${subs}}}&sort={"_kmd.ect": 1}`,
        headers: {
            'Authorization': 'Kinvey ' + sessionStorage.getItem('authToken'),
        },
        success: chirpsLoadedSuccess,
        error: handleAjaxError
    });

    async function chirpsLoadedSuccess(chirps) {
        //console.log(chirps);
        for (const chirp of chirps) {
            chirp.date = calcTime(chirp._kmd.ect);
        }
        // Get the stats with 3 requests
        let chirpsCount = 0;
        let followingCount = 0;
        let followersCount = 0;

        await $.ajax({
            url: `https://baas.kinvey.com/appdata/${APP_KEY}/chirps?query={"author":"${username}"}`,
            headers: {
                'Authorization': 'Kinvey ' + sessionStorage.getItem('authToken'),
            }
        }).then(function (chirpsArray) {chirpsCount = chirpsArray.length}).catch(handleAjaxError);

        await $.ajax({
            url: `https://baas.kinvey.com/user/${APP_KEY}/?query={"username":"${username}"}`,
            headers: {
                'Authorization': 'Kinvey ' + sessionStorage.getItem('authToken'),
            }
        }).then(function (user) {
            // console.log('user data: ');
            // console.log(user);
            if (user[0].subscriptions === undefined) {
                user[0].subscriptions = [];
            }
            followingCount = user[0].subscriptions.length
            }).catch(handleAjaxError);

        await $.ajax({
            url: `https://baas.kinvey.com/user/${APP_KEY}/?query={"subscriptions":"${username}"}`,
            headers: {
                'Authorization': 'Kinvey ' + sessionStorage.getItem('authToken'),
            }
        }).then(function (usersSubscribedToUsername) {followersCount = usersSubscribedToUsername.length}).catch(handleAjaxError);

        let context = {
            user: {
                isAuthenticated: sessionStorage.getItem('authToken') !== null,
                username: sessionStorage.getItem('username')
            },
            chirps,
            chirpsCount,
            followingCount,
            followersCount
        };
        await containerFiller(context, './templates/feed.hbs', '#main');
    }
}

function postChirp(event) {
    event.preventDefault();
    //console.log('postChirp() TO DO');
    // POST https://baas.kinvey.com/appdata/app_key/chirps
    let username = sessionStorage.getItem('username');
    let textAreaBox = $($('.chirp-input')[0]);
    //A chirp text shouldn’t be empty and shouldn’t contain more than 150 symbols.
    if (!validChirp(textAreaBox.val())) {
         showError(`Invalid chirp format. 
        A chirp should no more than 150 characters long.
        A chirp cannot be empty.`);
        return;
    }

    let chirpData = {
        "text": escapeHtml(textAreaBox.val()),
        "author": username
    };
    //console.log(chirpData);
    
    $.ajax({
        method: 'POST',
        url: `https://baas.kinvey.com/appdata/${APP_KEY}/chirps`,
        headers: {
            'Authorization': 'Kinvey ' + sessionStorage.getItem('authToken'),
        },
        data: chirpData,
        success: createChirpSuccess,
        error: handleAjaxError
    });

    async function createChirpSuccess(response) {
        showInfo('Chirp published.');
        loadProfilePage();
        // Clear the create chirp input field after successful creation.
        textAreaBox.val('');
    }
}

function loadProfilePage() {
    //console.log('loadProfilePage TO DO');
    // Logged in users can view individual feeds (profile page). 
    // The currently logged user has an individual feed page where he can view his own chirps, 
    // create a chirp and delete his own chirps. 
    // Each logged in user can access their own feed by clicking the [Me] link.
    // GET https://baas.kinvey.com/appdata/app_key/chirps?query={"author":"username"}&sort={"_kmd.ect": 1}
    let username = sessionStorage.getItem('username');
    $.ajax({
        url: `https://baas.kinvey.com/appdata/${APP_KEY}/chirps?query={"author":"${username}"}&sort={"_kmd.ect": 1}`,
        headers: {
            'Authorization': 'Kinvey ' + sessionStorage.getItem('authToken'),
        },
        success: chirpsLoadedSuccess,
        error: handleAjaxError
    });

    async function chirpsLoadedSuccess(chirps) {
        //console.log(chirps);
        for (const chirp of chirps) {
            chirp.date = calcTime(chirp._kmd.ect);
        }
        // Get the stats with 3 requests
        let chirpsCount = 0;
        let followingCount = 0;
        let followersCount = 0;

        await $.ajax({
            url: `https://baas.kinvey.com/appdata/${APP_KEY}/chirps?query={"author":"${username}"}`,
            headers: {
                'Authorization': 'Kinvey ' + sessionStorage.getItem('authToken'),
            }
        }).then(function (chirpsArray) {chirpsCount = chirpsArray.length}).catch(handleAjaxError);

        await $.ajax({
            url: `https://baas.kinvey.com/user/${APP_KEY}/?query={"username":"${username}"}`,
            headers: {
                'Authorization': 'Kinvey ' + sessionStorage.getItem('authToken'),
            }
        }).then(function (user) {
            // console.log('user data: ');
            // console.log(user);
            if (user[0].subscriptions === undefined) {
                user[0].subscriptions = [];
            }
            followingCount = user[0].subscriptions.length
            }).catch(handleAjaxError);

        await $.ajax({
            url: `https://baas.kinvey.com/user/${APP_KEY}/?query={"subscriptions":"${username}"}`,
            headers: {
                'Authorization': 'Kinvey ' + sessionStorage.getItem('authToken'),
            }
        }).then(function (usersSubscribedToUsername) {followersCount = usersSubscribedToUsername.length}).catch(handleAjaxError);

        let context = {
            user: {
                isAuthenticated: sessionStorage.getItem('authToken') !== null,
                username: sessionStorage.getItem('username')
            },
            chirps,
            chirpsCount,
            followingCount,
            followersCount
        };
        await containerFiller(context, './templates/view-me.hbs', '#main');
    }
}

function loadOtherProfilePage(userIdToLoad) {
    //console.log('loadOtherProfilePage() TO DO');
    $.ajax({
        url: `https://baas.kinvey.com/user/${APP_KEY}/${userIdToLoad}`,
        headers: {
            'Authorization': 'Kinvey ' + sessionStorage.getItem('authToken'),
        },
        success: userLoadedSuccess,
        error: handleAjaxError
    });

    function userLoadedSuccess(user) {
        //console.log(user);
        $.ajax({
            url: `https://baas.kinvey.com/appdata/${APP_KEY}/chirps?query={"author":"${user.username}"}&sort={"_kmd.ect": 1}`,
            headers: {
                'Authorization': 'Kinvey ' + sessionStorage.getItem('authToken'),
            },
            success: chirpsLoadedSuccess,
            error: handleAjaxError
        });

        async function chirpsLoadedSuccess(chirps) {
            //console.log(chirps);
            for (const chirp of chirps) {
                chirp.date = calcTime(chirp._kmd.ect);
            }
            // Get the stats with 3 requests
            let chirpsCount = 0;
            let followingCount = 0;
            let followersCount = 0;

            await $.ajax({
                url: `https://baas.kinvey.com/appdata/${APP_KEY}/chirps?query={"author":"${user.username}"}`,
                headers: {
                    'Authorization': 'Kinvey ' + sessionStorage.getItem('authToken'),
                }
            }).then(function (chirpsArray) {chirpsCount = chirpsArray.length}).catch(handleAjaxError);

            // console.log('user data: ');
            // console.log(user);
            if (user.subscriptions === undefined) {
                user.subscriptions = [];
            }
            followingCount = user.subscriptions.length;

            await $.ajax({
                url: `https://baas.kinvey.com/user/${APP_KEY}/?query={"subscriptions":"${user.username}"}`,
                headers: {
                    'Authorization': 'Kinvey ' + sessionStorage.getItem('authToken'),
                }
            }).then(function (usersSubscribedToUsername) {followersCount = usersSubscribedToUsername.length}).catch(handleAjaxError);

            let subscriptionsArray;

            let currentlyLoggedUserId = sessionStorage.getItem('userId');
            await $.ajax({
                url: `https://baas.kinvey.com/user/${APP_KEY}/${currentlyLoggedUserId}`,
                headers: {
                    'Authorization': 'Kinvey ' + sessionStorage.getItem('authToken'),
                },
            }).then(function(currentlyLoggedUser) {
                subscriptionsArray = currentlyLoggedUser.subscriptions;
            }).catch(handleAjaxError);
            console.log("subscriptionsArray:");
            console.log(subscriptionsArray);
            let followOrUnfollow;
            if (subscriptionsArray.includes(user.username)) {
                followOrUnfollow = 'Unfollow';
            } else {
                followOrUnfollow = 'Follow';
            }
            let context = {
                user: {
                    isAuthenticated: sessionStorage.getItem('authToken') !== null,
                    username: user.username,
                    _id: user._id
                },
                chirps,
                chirpsCount,
                followingCount,
                followersCount,
                followOrUnfollow
            };

            await containerFiller(context, './templates/others-profile.hbs', '#main');
        }
    }
}

function follow(usernameOfUserToFollow) {
    console.log(`usernameOfUserToFollow: ${usernameOfUserToFollow} TO DO `);
    // PUT https://baas.kinvey.com/user/app_key/user_id
    // The PUT query does not need to include the whole user object. 
    // Submit only the modified subscriptions array.
    let currentlyLoggedUserId = sessionStorage.getItem('userId');

    $.ajax({
        url: `https://baas.kinvey.com/user/${APP_KEY}/${currentlyLoggedUserId}`,
        headers: {
            'Authorization': 'Kinvey ' + sessionStorage.getItem('authToken'),
        },
        success: userLoadedSuccess,
        error: handleAjaxError
    });

    function userLoadedSuccess(user) {
        // console.log('user: ');
        // console.log(user);
        let subscribed;
        if (user.subscriptions === undefined) {
            user.subscriptions = [];
        }
        console.log('user.subscriptions:');
        console.log(user.subscriptions);
        if (user.subscriptions.includes(usernameOfUserToFollow)) {
            user.subscriptions.splice(user.subscriptions.indexOf(usernameOfUserToFollow), 1);
            subscribed = false;
        } else {
            user.subscriptions.push(usernameOfUserToFollow);
            subscribed = true;
        }
        console.log('--------');
        console.log('user.subscriptions:');
        console.log(user.subscriptions);

        let updatedData = {
                "subscriptions": user.subscriptions
            }
        // console.log('updatedData: ');
        // console.log(updatedData);

        $.ajax({
            method: 'PUT',
            url: `https://baas.kinvey.com/user/${APP_KEY}/${currentlyLoggedUserId}`,
            headers: {
                'Authorization': 'Kinvey ' + sessionStorage.getItem('authToken'),
                'Content-Type': 'application/json'
            },
            data: JSON.stringify(updatedData),
            success: subcribedOrUnsubSuccess,
            error: handleAjaxError
        });

        async function subcribedOrUnsubSuccess(res) {
            if (subscribed) {
                showInfo(`Subscribed to ${usernameOfUserToFollow}`);
                $('#btnFollow').text('Unfollow');
            } else {
                showInfo(`Unsubscribed to ${usernameOfUserToFollow}`);
                $('#btnFollow').text('Follow');
            }
            let userIdOfUserToFollow = $('#btnFollow').attr('data-id');
            console.log('userIdOfUserToFollow:');
            console.log(userIdOfUserToFollow);
            loadOtherProfilePage(userIdOfUserToFollow);
        }
    }
}

function loadDiscover() {
    // console.log('loadDiscover TO DO');
    // GET https://baas.kinvey.com/user/app_key/
    $.ajax({
        url: `https://baas.kinvey.com/user/${APP_KEY}/`,
        headers: {
            'Authorization': 'Kinvey ' + sessionStorage.getItem('authToken')
        },
        success: getAllUsersSuccess,
        error: handleAjaxError
    });

    async function getAllUsersSuccess(allUsers) {
        //console.log(allUsers);
        let currentUserId = sessionStorage.getItem('userId');
        // let allUsersExceptCurrent = [];
        for (const user of allUsers) {
            if (user._id === currentUserId) {
                allUsers.splice(allUsers.indexOf(user), 1);
            }
        }
        // console.log('--------');
        // console.log(allUsers);
        // at this point we have deleted the currently logged user
        for (const user of allUsers) {
            await $.ajax({
                url: `https://baas.kinvey.com/user/${APP_KEY}/?query={"subscriptions":"${user.username}"}`,
                headers: {
                    'Authorization': 'Kinvey ' + sessionStorage.getItem('authToken'),
                }
            }).then(function (usersSubscribedToUsername) {user.followersCount = usersSubscribedToUsername.length}).catch(handleAjaxError);
        }

        let context = {
            user: {
                isAuthenticated: sessionStorage.getItem('authToken') !== null,
                username: sessionStorage.getItem('username')
            },
            allUsers
        };
        await containerFiller(context, './templates/discover.hbs', '#main');
    }
}

function deleteChirp(idToDelete) {
    // DELETE https://baas.kinvey.com/appdata/app_key/chirps/chirp_id 
    $.ajax({
        method: 'DELETE',
        url: `https://baas.kinvey.com/appdata/${APP_KEY}/chirps/${idToDelete}`,
        headers: {
            'Authorization': 'Kinvey ' + sessionStorage.getItem('authToken')
        },
        success: deleteChirpSuccess,
        error: handleAjaxError
    });

    function deleteChirpSuccess(response) {
        loadProfilePage();
        showInfo('Chirp deleted.');
    }
}
// GRUD operations with messages --- END -------------------------------------

// Helper functions --- START -----------------------------------------------
function saveAuthInSession(userInfo) {
    // saves authtoken, user id and username to sessionStorage
    sessionStorage.setItem('username', userInfo.username);
    sessionStorage.setItem('authToken', userInfo._kmd.authtoken);
    sessionStorage.setItem('userId', userInfo._id);
    if (userInfo.subscriptions === undefined) {
        userInfo.subscriptions = [""];
    }
    sessionStorage.setItem('subscriptionsArray', JSON.stringify(userInfo.subscriptions));
}

function showInfo(message) {
    let infoBox = $('#infoBox');
    infoBox.find('span').text(message);
    infoBox.show();
    setTimeout(function () {
        $('#infoBox').fadeOut()
    }, 3000)
}

function showError(errorMsg) {
    let errorBox = $('#errorBox');
    errorBox.find('span').text("Error: " + errorMsg);
    errorBox.show();
}

function handleAjaxError(response) {
    let errorMsg = JSON.stringify(response)
    if (response.readyState === 0)
        errorMsg = "Cannot connect due to network error."
    if (response.responseJSON && response.responseJSON.description)
        errorMsg = response.responseJSON.description
    showError(errorMsg)
}

// HTML escaping
function escapeHtml(unsafe) {
    return unsafe
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

function validCredentials(username, password) {
    const regexUsername = /^[a-zA-Z0-9_]{5,}$/gm;
    const regexPasword = /^[a-zA-Z0-9_]{1,}$/gm;
    if (!regexUsername.test(username)) {
        //console.log('before returning false 1');
        return false;
    } else if (!regexPasword.test(password)) {
        //console.log('before returning false 2');
        return false;
    }
    //console.log('before returning true');
    return true;
}

function validChirp(chirpText) {
    if (chirpText.length < 1 || chirpText.length > 150) {
        return false;
    }
    return true;
}

function calcTime(dateIsoFormat) {
    let diff = new Date - (new Date(dateIsoFormat));
    diff = Math.floor(diff / 60000);
    if (diff < 1) return 'less than a minute';
    if (diff < 60) return diff + ' minute' + pluralize(diff);
    diff = Math.floor(diff / 60);
    if (diff < 24) return diff + ' hour' + pluralize(diff);
    diff = Math.floor(diff / 24);
    if (diff < 30) return diff + ' day' + pluralize(diff);
    diff = Math.floor(diff / 30);
    if (diff < 12) return diff + ' month' + pluralize(diff);
    diff = Math.floor(diff / 12);
    return diff + ' year' + pluralize(diff);
    function pluralize(value) {
        if (value !== 1) return 's';
        else return '';
    }
}
// Helper functions --- END -----------------------------------------------