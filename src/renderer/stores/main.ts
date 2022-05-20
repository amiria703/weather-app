import { defineStore } from 'pinia'

export const useStore = defineStore('main', {
    state: () => ({
        state: 0,
        longtitude: 0,
        langtitude: 0,
        placeName: ""
    })
})
