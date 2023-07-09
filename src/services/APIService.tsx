export interface APIRequest {
    url: string,
    method: string,
    body?: object,
};

export interface APIResponse {
    responseData: any,
    isLoading: boolean,
    error: any
};
const getToken = () => {
    const tokenString = localStorage.getItem('token');
    if (tokenString) {
        const userToken = JSON.parse(tokenString);
        return userToken;
    };
};

const sendRequest = async (request: APIRequest) => {
    const requestUrl = `${process.env.REACT_APP_HOME_BUDGET_API_URL}${request.url}`;
    const token = getToken();
    const requestOptions = {
        method: request.method,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token ? 'Bearer ' + token : "",
        },
        body: JSON.stringify(request.body),
    };

    const response = await fetch(requestUrl, requestOptions);
    return response;
    
};
export default sendRequest;