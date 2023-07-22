export function parseResponseErrors(response) {
    const errorObj = response.data.errors
    const errors = []
    for (let field in errorObj)
        for (let err of errorObj[field]) errors.push(err)
    return errors
}
