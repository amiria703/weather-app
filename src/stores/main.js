import { defineStore } from 'pinia'

export const useStore = defineStore('main', {
    state: () => ({
        state: 1,
        longtitude: 0,
        langtitude: 0,
        placeName: ""
    })
})
