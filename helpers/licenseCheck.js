module.exports = (bot) => {
    let licenses =  bot.sql.query('SELECT `key`,`timestamp` FROM `licenses`');

    for(let license of licenses){
        if(license && license.timestamp < Date.now() && license.timestamp !== '-1'){
            bot.sql.query('DELETE FROM `licenses` WHERE `key` = ?', [license.key]);
        }
    }
}
