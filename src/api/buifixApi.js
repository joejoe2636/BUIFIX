import axios from 'axios'


export default axios.create({
    baseURL:'https://buifix-api.nextreflexe.com'
});

export const activites = [
    {
        name: 'roof',
        budget: 500000,
        expenses: '400,0000',
        rest: '100,000',
        progress: '82 %'
    },
    {
        name: 'roofs',
        budget: 500000,
        expenses: '400,0000',
        rest: '100,000',
        progress: '82 %'
    },
    {
        name: 'roofss',
        budget: 500000,
        expenses: '400,0000',
        rest: '100,000',
        progress: '82 %'
    },
    {
        name: 'roofsss',
        budget: 500000,
        expenses: '400,0000',
        rest: '100,000',
        progress: '82 %'
    }
]

export const stock = [
    {
        mid: 1,
        name: 'ciment',
        qauntity: 25,
        unityPrice: 100000,
        activity: 'roof'
    },
    {
        mid: 2,
        name: 'ferabe',
        qauntity: 25,
        unityPrice: 100000,
        activity: 'roof'
    },
    {
        mid: 3,
        name: 'sss',
        qauntity: 25,
        unityPrice: 100000,
        activity: 'roof'
    },
    {
        mid: 4,
        name: 'bbbb',
        qauntity: 25,
        unityPrice: 100000,
        activity: 'roof'
    }
]