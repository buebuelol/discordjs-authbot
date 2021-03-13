const getKey = function(bot){
    let key = generateKey();
    let count = bot.sql.query('SELECT COUNT(*) FROM `licenses` WHERE `key` = ?', [key])[0].count;
    if(count && count === 1) {
        getKey(bot);
        return;
    }
    return key;
}

const generateKey = function() {
    return 'xxxxxxx-xyxxxx-yxxxxx-yxxxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c){
        const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

module.exports = { getKey };