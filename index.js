const commandExists = require('command-exists');
const commandExistsSync = commandExists.syncs;

class NativeExecutableMissingError extends Error {
}

function _err(exeName) {
    return new NativeExecutableMissingError(`The native executable '${exeName}' was not found on your system but is required to load this application.`);
}

module.exports = {
    /**
     * Check if a native executable exist - if not, throw an error
     */
    requireNativeExecutableSync: function(exeName) {
        if(!commandExistsSync(exeName)) {
            throw _err(exeName);
        }
    },
    requireNativeExecutable: function(exeName) {
        return new Promise((resolve, reject) => {
            return commandExists(exeName).then(resolve).catch(() => {
                reject(_err(exeName));
            });
        });
    }
}
