type HTTPRequest = {
    method: string
    path: string
    headers?: Record<string, string | number>
    body?: string
};

const Http = {
    request<T = unknown>(
        { method, path, headers, body }: HTTPRequest,
        callback: (error: Error | null, response: T) => void
    ) {
        const METHOD = method.toUpperCase();

        http.request(METHOD, path, window.store.get("settings").token, body ?? "");

        function listener(response: string) {
            callback(null, JSON.parse(response));
            http.requestFinished.disconnect(listener);
        }

        http.requestFinished.connect(listener);
    },
};

export type Http = typeof Http;