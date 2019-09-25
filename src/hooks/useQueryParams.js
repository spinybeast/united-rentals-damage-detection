import { useQueryParamsFactory } from 'react-router-query-params-hook';
import qs from 'qs';

export const useQueryParams = useQueryParamsFactory(
    (queryString) => qs.parse(queryString, {ignoreQueryPrefix: true}),
    (params) => qs.stringify(params, {encode: true, addQueryPrefix: true})
);

export const deserializer = (value) => {
    if (value.group1) {
        if (!isNaN(value.group1)) {
            value.group1 = Number.parseInt(value.group1)
        }
    }
    if (value.group2) {
        if (!isNaN(value.group2)) {
            value.group2 = Number.parseInt(value.group2)
        }
    }
    return {
        after: value.after ? Number.parseInt(value.after) : 0,
        group1: value.group1 || null,
        group2: value.group2 || null,
    }
};

export const serializer = (value) => ({
    after: value.after ? value.after.toString() : '0',
    group1: value.group1 ? value.group1.toString() : null,
    group2: value.group2 ? value.group2.toString() : null,
});
