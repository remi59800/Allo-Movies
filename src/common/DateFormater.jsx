export function dateFormater(date) {
    let [yy, mm, dd] = date.split('-');
    return [dd, mm, yy].join('/');
}