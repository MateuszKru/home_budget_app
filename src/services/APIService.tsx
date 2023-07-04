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

const sendRequest = async (request: APIRequest) => {
    const requestUrl = `${process.env.REACT_APP_HOME_BUDGET_API_URL}${request.url}`;
    const requestOptions = {
        method: request.method,
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(request.body),
    };

    const response = await fetch(requestUrl, requestOptions);
    if (response.ok) {
        const data: any = await response.json();
        return data;
    } else {
        throw new Error('Request failed');
    }
};
export default sendRequest;