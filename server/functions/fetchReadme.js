async function fetchReadme (username) {
    const readmeLink = `https://api.github.com/repos/${username}/${username}/readme`

try {
    const encodedReadme = (await fetch(readmeLink).then(response => response.json())).content
    try {
        
        // return success message
    } catch (error) {
        // return database connection error
    }
} catch (error) {
    // if connection or no repo error
    // return fetching error
}
}

