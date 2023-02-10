function parseQueryString<S extends string>(str: S): ParseQueryString<S>
function parseQueryString(str: string) {
  if (!str || !str.length) {
    return {}
  }
  const queryObj: Record<string, any> = {};
  const items = str.split('&');
  items.forEach(element => {
    const [key, value] = element.split('=')
    if (queryObj[key]) {
      if (Array.isArray(queryObj[key])) {
        queryObj[key].push(value)
      } else {
        queryObj[key] = [queryObj[key], value]
      }
    } else[
      queryObj[key] = value
    ]
  });
  return queryObj;
}

const params = parseQueryString('a=1&b=2&c=3')
params.a
