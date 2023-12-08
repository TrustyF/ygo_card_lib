import curr_api from "../main.js"

export function request_cards({limit, page, order, storage}) {
    console.log(limit.value,page.value,order.value,storage.value)
    console.log('card request')

    const url = new URL(`${curr_api}/card/get_all`)


    url.searchParams.set('card_limit', String(limit.value))
    url.searchParams.set('card_page', String(page.value))
    url.searchParams.set('ordering', String(order.value))
    url.searchParams.set('storage', String(storage.value))

    return fetch(url)
        .then(response => {
            console.log('card request ok')
            if (response.ok) {
                console.log('card request',response)
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
