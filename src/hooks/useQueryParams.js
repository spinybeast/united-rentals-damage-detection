import { useQueryParamsFactory } from 'react-router-query-params-hook';
import qs from 'qs';
import {omitBy, isNull} from 'lodash-es';

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
        filterby: value.filterby || null,
        filtervalue: value.filtervalue || null
    };
};

export const serializer = (value) => {
    const params = {
        after: value.after ? value.after.toString() : null,
        group1: value.group1 ? value.group1.toString() : null,
        group2: value.group2 ? value.group2.toString() : null,
        filterby: value.filterby ? value.filterby.toString() : null,
        filtervalue: value.filtervalue ? value.filtervalue.toString() : null,
    };
    return omitBy(params, isNull);
};
