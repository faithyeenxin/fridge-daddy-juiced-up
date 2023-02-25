import React from 'react'

const AddItemCard = () => {
    return (
        <div className="flex flex-col w-full h-[380px] bg-offWhite rounded-lg">
            <div>Add an Item</div>
            <input placeholder="Name" />
            <input placeholder="Quantity" />
            <input placeholder="Category" />
            <input placeholder="Compartment" />
            <div className="flex">
                <input placeholder="Purchased" type="date" />
            </div>

        </div>
    )
}

export default AddItemCard