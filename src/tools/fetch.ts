enum METHOD {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  PATCH = "PATCH",
  DELETE = "DELETE"
}

type Options = {
  method: METHOD;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any;
};

type OptionsWithoutMethod = Omit<Options, "method">;

class HTTPTransport {
  get(url: string, options: OptionsWithoutMethod = {}):
    Promise<XMLHttpRequest> {
    return this.request(url, {...options, method: METHOD.GET});
  }

  post(url: string, options: OptionsWithoutMethod = {}):
    Promise<XMLHttpRequest> {
    return this.request(url, {...options, method: METHOD.POST});
  }

  put(url: string, options: OptionsWithoutMethod = {}):
    Promise<XMLHttpRequest> {
    return this.request(url, {...options, method: METHOD.PUT});
  }

  patch(url: string, options: OptionsWithoutMethod = {}):
    Promise<XMLHttpRequest> {
    return this.request(url, {...options, method: METHOD.PATCH});
  }

  delete(url: string, options: OptionsWithoutMethod = {}):
    Promise<XMLHttpRequest> {
    return this.request(url, {...options, method: METHOD.DELETE});
  }

  request(url: string, options: Options = {method: METHOD.GET}):
    Promise<XMLHttpRequest> {
    const {method, data} = options;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open(method, url);
      xhr.setRequestHeader("Content-Type", "application/json");

      xhr.onload = function() {
        resolve(xhr);
      };

      xhr.onabort = reject;
      xhr.onerror = reject;
      xhr.ontimeout = reject;

      if (method === METHOD.GET || !data) {
        xhr.send();
      } else {
        xhr.send(data);
      }
    });
  }
}

export default HTTPTransport;
