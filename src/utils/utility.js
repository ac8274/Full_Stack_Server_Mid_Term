// function checks if the 'string' is not undefined or not a string.
// if it isn't it will return false signifieng it ok.
// else it will return a error message using the provided variubles
export const basicStringCheck = (tested,errorStatus,errorMessage) => {
    if(!tested){
        return {
            status: errorStatus,
            Error: errorMessage + " wasn't sent!\n"
        }
    }
    else if(typeof(tested) !== typeof("")){
        return {
            status: errorStatus,
            Error: errorMessage + " must be 'String'\n"
        }
    }
    else{
        return false;
    }
}