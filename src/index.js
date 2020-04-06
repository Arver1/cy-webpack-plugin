const { exec } = require('child_process');

function CyWebpackPlugin(options) {
    this.countBuild = options && options.countBuild;
    this.headed = options && options.headed;
    this.command = this.headed ? 'yarn cypress run --headed' : 'yarn cypress run';
}
const statuses = {
    clientIsRunning: 0,
    serverIsRunning: 1
};

const getStatus = (() => {
    let count = 0;

    // eslint-disable-next-line no-plusplus
    return () => (count || count++);
})();

function isReady(status) {
    return this.countBuild === 2
        ? status === statuses.serverIsRunning
        : status === statuses.clientIsRunning;
}

CyWebpackPlugin.prototype.apply = function (compiler) {
    compiler.hooks.done.tap('CyWebpackPlugin', () => {

        if (isReady.call(this, getStatus())) {
            const { APP_MOCKS, CYPRESS_RUN } = process.env;

            if (APP_MOCKS && CYPRESS_RUN) {

                const cypress = exec(this.command);

                cypress.stdout.on('data', (messages) => {
                    if (messages.match('CypressError')) {
                        process.exit(1);
                    }
                });

                cypress.on('close', () => {
                    process.exit(0);
                });

                cypress.stdout.pipe(process.stdout);
            }
        }
    });
};

module.exports = CyWebpackPlugin;
