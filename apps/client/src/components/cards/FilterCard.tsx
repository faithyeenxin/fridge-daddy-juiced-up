import React, { useState } from "react";

const FilterCard = () => {
    const [checkboxStatus, setCheckboxStatus] = useState({
        evergreen: false,
        rotten: false,
        trashed: false,
        pantry: false,
        fridge: false,
        freezer: false,
        today: false,
        in3Days: false,
        inAWeek: false,
    });

    return (
        <div className="w-full h-full flex bg-offWhite rounded-lg">
            <div className="flex flex-col m-5 justify-between w-full">
                <div className="flex items-center justify-center text-3xl font-lora text-orange">
                    Filters
                </div>
                <div>
                    <div className=" text-2xl font-lora font-bold text-orange">
                        Condition
                    </div>
                    <div className="flex flex-col gap-2 py-2">
                        <div className="flex justify-between pr-3 items-center">
                            <div className="font-lora tracking-wider text-orange font-bolder text-lg">
                                Evergreen
                            </div>
                            <img
                                src={
                                    checkboxStatus.evergreen
                                        ? `images/cards/check_ring.svg`
                                        : `images/cards/uncheck_ring.svg`
                                }
                                onClick={() => {

                                    setCheckboxStatus({
                                        ...checkboxStatus,
                                        evergreen: !checkboxStatus.evergreen,
                                    });

                                }}
                            />
                        </div>
                        <div className="flex justify-between pr-3">
                            <div className="font-lora tracking-wider text-orange font-bolder text-lg">
                                Rotten
                            </div>
                            <img
                                src={
                                    checkboxStatus.rotten
                                        ? `images/cards/check_ring.svg`
                                        : `images/cards/uncheck_ring.svg`
                                }
                                onClick={() => {

                                    setCheckboxStatus({
                                        ...checkboxStatus,
                                        rotten: !checkboxStatus.rotten,
                                    });

                                }}
                            />
                        </div>
                        <div className="flex justify-between pr-3">
                            <div className="font-lora tracking-wider text-orange font-bolder text-lg">
                                Trashed
                            </div>
                            <img
                                src={
                                    checkboxStatus.trashed
                                        ? `images/cards/check_ring.svg`
                                        : `images/cards/uncheck_ring.svg`
                                }
                                onClick={() => {

                                    setCheckboxStatus({
                                        ...checkboxStatus,
                                        trashed: !checkboxStatus.trashed,
                                    });

                                }}
                            />
                        </div>
                    </div>
                </div>
                <div>
                    <div className="my-3 text-2xl font-lora font-bold text-orange">
                        Compartment
                    </div>
                    <div className="flex flex-col gap-2">
                        <div className="flex justify-between pr-3">
                            <div className="font-lora tracking-wider text-orange font-bolder text-lg">
                                Pantry
                            </div>
                            <img
                                src={
                                    checkboxStatus.pantry
                                        ? `images/cards/check_ring.svg`
                                        : `images/cards/uncheck_ring.svg`
                                }
                                onClick={() => {

                                    setCheckboxStatus({
                                        ...checkboxStatus,
                                        pantry: !checkboxStatus.pantry,
                                    });

                                }}
                            />
                        </div>
                        <div className="flex justify-between pr-3">
                            <div className="font-lora tracking-wider text-orange font-bolder text-lg">
                                Fridge
                            </div>
                            <img
                                src={
                                    checkboxStatus.fridge
                                        ? `images/cards/check_ring.svg`
                                        : `images/cards/uncheck_ring.svg`
                                }
                                onClick={() => {

                                    setCheckboxStatus({
                                        ...checkboxStatus,
                                        fridge: !checkboxStatus.fridge,
                                    });

                                }}
                            />
                        </div>
                        <div className="flex justify-between pr-3">
                            <div className="font-lora tracking-wider text-orange font-bolder text-lg">
                                Freezer
                            </div>
                            <img
                                src={
                                    checkboxStatus.freezer
                                        ? `images/cards/check_ring.svg`
                                        : `images/cards/uncheck_ring.svg`
                                }
                                onClick={() => {

                                    setCheckboxStatus({
                                        ...checkboxStatus,
                                        freezer: !checkboxStatus.freezer,
                                    });

                                }}
                            />
                        </div>
                    </div>
                </div>
                <div>
                    <div className="my-3 text-2xl font-lora font-bold text-orange">
                        Expiring Soon
                    </div>
                    <div className="flex flex-col gap-2">
                        <div className="flex justify-between pr-3">
                            <div className="font-lora tracking-wider text-orange font-bolder text-lg">
                                Today
                            </div>
                            <img
                                src={
                                    checkboxStatus.today
                                        ? `images/cards/check_ring.svg`
                                        : `images/cards/uncheck_ring.svg`
                                }
                                onClick={() => {

                                    setCheckboxStatus({
                                        ...checkboxStatus,
                                        today: !checkboxStatus.today,
                                    });

                                }}
                            />
                        </div>
                        <div className="flex justify-between pr-3">
                            <div className="font-lora tracking-wider text-orange font-bolder text-lg">
                                In 3 Days
                            </div>
                            <img
                                src={
                                    checkboxStatus.in3Days
                                        ? `images/cards/check_ring.svg`
                                        : `images/cards/uncheck_ring.svg`
                                }
                                onClick={() => {

                                    setCheckboxStatus({
                                        ...checkboxStatus,
                                        in3Days: !checkboxStatus.in3Days,
                                    });

                                }}
                            />
                        </div>
                        <div className="flex justify-between pr-3">
                            <div className="font-lora tracking-wider text-orange font-bolder text-lg">
                                In A Week
                            </div>
                            <img
                                src={
                                    checkboxStatus.inAWeek
                                        ? `images/cards/check_ring.svg`
                                        : `images/cards/uncheck_ring.svg`
                                }
                                onClick={() => {

                                    setCheckboxStatus({
                                        ...checkboxStatus,
                                        inAWeek: !checkboxStatus.inAWeek,
                                    });

                                }}
                            />
                        </div>
                    </div>
                </div>
                <div className="flex justify-center">
                    <div
                        className="flex w-2/3 bg-orange font-lora font-bolder text-white justify-center rounded-3xl p-1"
                        onClick={() => {
                            setCheckboxStatus({
                                evergreen: false,
                                rotten: false,
                                trashed: false,
                                pantry: false,
                                fridge: false,
                                freezer: false,
                                today: false,
                                in3Days: false,
                                inAWeek: false,
                            });
                        }}
                    >
                        Clear All
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FilterCard;
