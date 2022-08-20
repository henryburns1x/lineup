let port_var = 2026

config = {

    SECRET: 'Line Up - Team Alpha',

    // START >>>> CHANGE VALUES FOR PRODUCTION
    ORIGIN: `localhost:${port_var}`,
    // <<< END

    PORT: port_var,

}

module.exports = config;