import { differenceInDays } from 'date-fns'
import format from "date-fns/format";
import React, { useState } from 'react'
import { IItem } from '../interface';
import { capitalizeWords } from './utility/functions/capitalizeWord'

interface ISingleItemProps {
    item: IItem,
    colorState: boolean,
}
const SingleItemRow = ({ item, colorState }: ISingleItemProps) => {
    const today = new Date()
    const [binHoverState, setbinHoverState] = useState(false)
    const [isTrashedHoverState, setisTrashedHoverState] = useState(false)

    return (
        <div
            id={`item-${item.id}`}
            key={item.id}
            className={`flex ${colorState ? "bg-tableOffWhite" : "bg-tablePink"
                } font-lora text-black text-sm text-center items-center h-[40px]`}
        >
            <div className="w-2/12 tracking-wide">
                {differenceInDays(new Date(item.expiryDate), today)}
            </div>
            <div className="w-4/12">{capitalizeWords(item.name)}</div>
            <div className="w-1/12">{capitalizeWords(item.quantity)}</div>
            <div className="w-2/12">{item.storedIn}</div>
            <div className="w-2/12">
                {format(new Date(item.purchaseDate), "d MMM yy")}
            </div>
            <div className="w-2/12">
                {format(new Date(item.expiryDate), "d MMM yy")}
            </div>
            <div className="w-1/12 flex items-center justify-center" >
                {item.trashed ? (
                    <div onMouseEnter={() => setisTrashedHoverState(true)} onMouseLeave={() => setisTrashedHoverState(false)}>
                        <img src={isTrashedHoverState ? 'images/table/unchecked.svg' : 'images/table/checked.svg'} />
                    </div>
                ) : (
                    <div onMouseEnter={() => setbinHoverState(true)} onMouseLeave={() => setbinHoverState(false)}>
                        <img src={binHoverState ? 'images/table/untrashed-red.svg' : 'images/table/untrashed-black.svg'} />
                    </div>
                )}
            </div>
        </div>
    )
}

export default SingleItemRow