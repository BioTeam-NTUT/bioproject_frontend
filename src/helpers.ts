import $ from "jquery";

export const getRequest = <T extends object>(
    url: string,
    data: T
): JQuery.jqXHR => {
    return $.get({
        url: url,
        data: data,
    });
};

export const postRequest = <T extends object>(
    url: string,
    data: T
): JQuery.jqXHR => {
    return $.post({
        url: url,
        data: data,
    });
};

export const sleep = (delay: number) => {
    return new Promise<string>((resolve) => {
        setTimeout(() => {
            resolve("Times up!");
        }, delay);
    });
};
