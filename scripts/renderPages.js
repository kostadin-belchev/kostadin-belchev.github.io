async function containerFiller(context, templateURL, container) {
    let source = await $.get(templateURL);
    let compiled = Handlebars.compile(source);
    let template = compiled(context);
    //console.log(template);
    $(container).html(template);
}

async function loadHome() {
    let context = {
        user: {
            isAuthenticated: sessionStorage.getItem('authToken') !== null,
            username: sessionStorage.getItem('username')
        }
    };
    let sourceHeader = await $.get('./templates/header-partial.hbs');
    Handlebars.registerPartial('header', sourceHeader);
    let sourceFooter = await $.get('./templates/footer-partial.hbs');
    Handlebars.registerPartial('footer', sourceFooter);
    await containerFiller(context, './templates/home.hbs', '#main')
}

// async function loadRegister() {
//     let context = {
//         user: {
//             isAuthenticated: sessionStorage.getItem('authToken') !== null,
//             username: sessionStorage.getItem('username')
//         }
//     };
//     await containerFiller(context, './templates/register.hbs', '#app');
// }

async function loadLoginUser() {
    let context = {
        user: {
            isAuthenticated: sessionStorage.getItem('authToken') !== null,
            username: sessionStorage.getItem('username')
        }
    };
    await containerFiller(context, './templates/login.hbs', '#main');
}

// async function loadHomeLogged() {
//     // Ensure you handle properly all HTML special characters, e.g. the username could be "<pesho><br>".
//     let context = {
//         user: {
//             isAuthenticated: sessionStorage.getItem('authToken') !== null,
//             username: sessionStorage.getItem('username')
//         }
//     };
//     await containerFiller(context, './templates/home-logged.hbs', '#app');
// }

