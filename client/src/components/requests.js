import curr_api from "../main.js"

export function request_cards({limit, page, order, storage}) {
    // console.log(limit,page,order,storage)
    // console.log('card request')

    const url = new URL(`${curr_api}/card/get_all`)


    url.searchParams.set('card_limit', String(limit))
    url.searchParams.set('card_page', String(page))
    url.searchParams.set('ordering', String(order))
    url.searchParams.set('storage', String(storage))

    return fetch(url)
        .then(response => {
            if (response.ok) {
                return response.json()
            }
        })
        .catch(error => {
            throw error
        });

}

export function request_card_by_name({name,storage}) {
    const url = new URL(`${curr_api}/card/search_by_name`)

    url.searchParams.set('name', name)
    url.searchParams.set('storage', String(storage.value))

    return fetch(url)
        .then(response => response.json())
}
