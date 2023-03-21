import React from 'react'
import { OneShoeStats } from '../cmps/one-shoe-stats.jsx'
import { OneShoeDetails } from '../cmps/one-shoe-details.jsx'
import { OneShoeSuits } from '../cmps/one-shoe-suits.jsx'

export function OneShoePage() {
    return (
        <section className='one-shoe-page'>
            <OneShoeStats />
            <OneShoeDetails />
            <OneShoeSuits />
        </section >
    )
}