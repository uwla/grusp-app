export function parseResponseErrors(response) {
    const errorObj = response.data.errors
    const errors = []
    for (let field in errorObj)
        for (let err of errorObj[field]) errors.push(err)
    return errors
}

export function defineHead(title, description, follow='index, follow') {
    return {
        title,
        meta: [
            { hid: 'description', name: 'description', content: description },
            { name: 'twitter:description', content: description },
            { name: 'twitter:title', content: title },
            { property: 'og:description', content: description },
            { property: 'og:title', content: title },
            { name: 'robots', content: follow },
        ],
    }
}
