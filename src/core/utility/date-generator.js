const dateGenerator = () => {
    const date = new Date()
    const fullDate = date.toISOString()
    return fullDate
}

module.exports = { dateGenerator }