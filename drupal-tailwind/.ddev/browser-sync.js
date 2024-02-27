
let theme = process.env.DDEV_DOCROOT + '/themes/custom/**/*.{twig,js,css}';
let modules = process.env.DDEV_DOCROOT + '/modules/custom/**/*.{twig,js,css}';
let storybook = process.env.DDEV_COMPOSER_ROOT + '/storybook/stories/**/*.twig';
// #ddev-generated
let docroot = process.env.DDEV_DOCROOT;
let filesdir = process.env.DDEV_FILES_DIR;
let url = process.env.DDEV_HOSTNAME;

if (filesdir === "") {
    filesdir = null
}

module.exports = {

    files: [theme, modules, storybook, docroot, "app", "resources/views/**/*.php"],
    ignore: ["node_modules", filesdir, "vendor"],
    open: false,
    ui: false,
    server: false,
    proxy: {
        target: "localhost"
    },
    host: url,
}
