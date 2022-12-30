const fs = require('fs');
const cron = require('node-cron');
const process = require('process')


function dbBackup(dbPath = './src/db.sqlite', destDir = './src/db_backups') {
    return fs.copyFile(dbPath, destDir + '/db-backup-at-' + Date.now() + '.sqlite', (err) => {
        if (err) {
            console.log(err)
            process.exit(0)
        } else {
            console.log('Database saved!!');
        }
    })
}

cron.schedule('0 0 1 * *', () => {
    dbBackup()
});