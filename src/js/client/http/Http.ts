type HTTPRequest = {
    method: string
    path: string
    headers?: Record<string, string | number>
    body?: any
}

const Http = {
    request<T = any>({ method, path, headers, body }: HTTPRequest, callback: (error: Error | null, response: T) => void) {
        method = method.toUpperCase();
        
        http.request(method, path, window.store.get("settings").token, body ?? "");
        function listener(response: string) {
            callback(null, JSON.parse(response));
            http.requestFinished.disconnect(listener);
        }
        http.requestFinished.connect(listener);
    }
};

export type Http = typeof Http;