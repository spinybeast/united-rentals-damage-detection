import * as _ from 'lodash';

export function getCategoryName(categories, id) {
    const category = _.first(_.filter(categories, category => category.id === id));
    return category.category.name;
}