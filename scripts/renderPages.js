async function containerFiller(context, templateURL, container) {
    let source = await $.get(templateURL);
    let compiled = Handlebars.compile(source);
    let template = compiled(context);
    //console.log(template);
    $(container).html(template);
}

async function loadWelcome() {
    let context = {
        user: {
            isAuthenticated: sessionStorage.getItem('authToken') !== null,
            username: sessionStorage.getItem('username')
        }
    };
    let sourceHeader = await $.get('./templates/navigation-partial.hbs');
    Handlebars.registerPartial('navigation', sourceHeader);
    let sourceFooter = await $.get('./templates/footer-partial.hbs');
    Handlebars.registerPartial('footer', sourceFooter);
    await containerFiller(context, './templates/register.hbs', '#container')
}

async function loadRegisterUser() {
    let context = {
        user: {
            isAuthenticated: sessionStorage.getItem('authToken') !== null,
            username: sessionStorage.getItem('username')
        }
    };
    await containerFiller(context, './templates/register.hbs', '#container');
}

async function loadLoginUser() {
    let context = {
        user: {
            isAuthenticated: sessionStorage.getItem('authToken') !== null,
            username: sessionStorage.getItem('username')
        }
    };
    await containerFiller(context, './templates/login.hbs', '#container');
}

async function loadAddFlight() {
    let context = {
        user: {
            isAuthenticated: sessionStorage.getItem('authToken') !== null,
            username: sessionStorage.getItem('username')
        }
    };
    await containerFiller(context, './templates/add-flight.hbs', '#container');
}

