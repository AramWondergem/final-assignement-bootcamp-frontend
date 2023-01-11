import jwtDecode from "jwt-decode";

function validateTokenDate(token) {

    const decoded = jwtDecode(token);
    const currentDate = Date.now();
    const { exp } = decoded;

    console.log("tokenvalidate" + (currentDate < exp*1000))


    return currentDate < exp*1000; // currentDate is in millisecond and exp is in seconds, that is why exp is multiplied by 1000
}

export default validateTokenDate;