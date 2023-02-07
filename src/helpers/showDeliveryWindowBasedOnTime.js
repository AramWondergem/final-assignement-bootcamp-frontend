function showDeliveryWindowBasedOnTime(startTime,endTime){
    const startTimeArray = startTime.split(":");
    const endTimeArray = endTime.split(":");

    return startTimeArray[0] + ":" + startTimeArray[1] + " - " + endTimeArray[0] + ":" + endTimeArray[1];

}
export default showDeliveryWindowBasedOnTime