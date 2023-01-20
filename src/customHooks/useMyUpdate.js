import {useEffect} from "react";
import axios from "axios";

function useMyUpdate (dataUrl, json, setData, setCatchError, setIsLoading ) {

    useEffect( () => {

        // Define request cancellation signal
        const controller = new AbortController();
        const { signal } = controller;

        // Fetch data function declaration
        const updateData = async ( url ) => {
            setIsLoading( true );
            try {
                // Fetch the response
                const response = await axios.put( url, {json},{ headers: {
                        "Content-Type": "application/json",
                        Authorization: `${localStorage.getItem('token')}`,
                        signal
                    }})
                    // Catch cancellation error (couldn't be fetched in the catch block)
                    .catch( e => e.code === "ERR_CANCELED" && console.log( "Fetch Request Cancelled" ) );
                // Set the data

                setData( response.data );
                setCatchError( null );


            } catch ( err ) {
                // Catch the error
                setCatchError( err.message );

            } finally {
                // Set loading to initial state
                setIsLoading( false );
            }
        }
        // Call the Fetch Data function
        updateData( dataUrl )

        // Cleanup the request on cancellation
        return function cleanUp() {
            console.log( 'Clean up function' );
            controller.abort();
        };
    }, [dataUrl] );

}

export default useMyUpdate;