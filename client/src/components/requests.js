import curr_api from "../main.js"

export function request_cards({limit, page, order, storage}) {
    // console.log(limit.value,page.value,order.value,storage.value)

    const url = new URL(`${curr_api}/card/get_all`)


    url.searchParams.set('card_limit', String(limit.value))
    url.searchParams.set('card_page', String(page.value))
    url.searchParams.set('ordering', String(order.value))
    url.searchParams.set('storage', String(storage.value))

    return fetch(url)
        .then(response => response.json())
        .catch(error => {
            throw error
        });

}

export function request_card_by_name(name) {
    const url = new URL(`${curr_api}/card/search_by_name`)
    url.searchParams.set('name', name)
    return fetch(url)
        .then(response => response.json())
}
