import {useEffect} from "react";
import axios from "axios";

function useFetch ( dataUrl, setData, setCatchError, setIsLoading ) {
    // Run the effect on mount
    useEffect( () => {
        let isMounted = true;

        // Define request cancellation signal
        const controller = new AbortController();
        const { signal } = controller;

        // Fetch data function declaration
        const fetchData = async ( url ) => {
            setIsLoading( true );
            try {
                // Fetch the response
                    const response = await axios.get( url, {
                        signal
                    } )
                        // Catch cancellation error (couldn't be fetched in the catch block)
                        .catch( e => e.code === "ERR_CANCELED" && console.log( "Fetch Request Cancelled" ) );
                    // Set the data
                    if ( isMounted ) {
                        setData( response.data );
                        setCatchError( null );
                    }

            } catch ( err ) {
                // Catch the error
                if ( isMounted ) {
                    setCatchError( err.message );
                    setData( [] );
                }
            } finally {
                // Set loading to initial state
                isMounted && setIsLoading( false );
            }
        }
        // Call the Fetch Data function
        fetchData( dataUrl )

        // Cleanup the request on cancellation
        return function cleanUp() {
            console.log( 'Clean up function' );
            isMounted = false;
            controller.abort();
        };
    }, [dataUrl] );

}

export default useFetch;