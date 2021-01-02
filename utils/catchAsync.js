
module.exports = func => {
    // accepts a function then excecute that function but catches any error and passed them to next
    return (req, res, next) => {
        func(req, res, next).catch(next);
    }
}