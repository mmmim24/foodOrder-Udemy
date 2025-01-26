import React from "react";

async function sendHttpRequest(url, config) {
    const response = await fetch(url, config);
    const resData = await response.json();
    if (!response.ok) {
        throw new Error(resData.message || 'Something went wrong');
    }
    return resData;
}

export default function useHttp(url, config, initData) {
    const [error, setError] = React.useState();
    const [isLoading, setIsLoading] = React.useState(false);
    const [data, setData] = React.useState(initData);

    function clearData() {
        setData(initData);
    }

    const sendRequest = React.useCallback(async function sendRequest(data) {
        setIsLoading(true);
        try {
            const resData = await sendHttpRequest(url, { ...config, body: data });
            setData(resData);
        } catch (error) {
            setError(error.message || 'Something went wrong!');
        }
        setIsLoading(false);
    }, [url, config]);

    React.useEffect(() => {
        if (config && config.method === 'GET') {
            sendRequest();
        }
    }, [sendRequest, config]);

    return {
        data,
        isLoading,
        error,
        sendRequest,
        clearData
    }
}
