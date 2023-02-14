function showDeliveryWindow(startDeliveryWindow, endDeliveryWindow) {


    const startDate = new Date(startDeliveryWindow);
    const endDate = new Date(endDeliveryWindow);

    const startTime = new Intl.DateTimeFormat("nl", {
        timeStyle: 'short'
    }).format(startDate);

    const endTime = new Intl.DateTimeFormat("nl", {
        timeStyle: 'short'
    }).format(endDate);

    return startTime + " - " + endTime;

}


export default showDeliveryWindow;