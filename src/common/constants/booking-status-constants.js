export const bookingStatus = {
    accepted: {
        id: 1,
        name: 'ACCEPTED'
    },
    declined: {
        id: 2,
        name: 'DECLINED',
        textToShow: 'Acceptance declined'
    },
    awaitingConfirmation: {
        id: 3,
        name: 'AWAITING CONFIRMATION',
        textToShow: 'Pending for acceptance'
    },
    notRequireConfirmation: {
        id: 4,
        name: 'NOT REQUIRE CONFIRMATION',
        textToShow: 'In use'
    }
}
