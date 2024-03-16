function FindProxyForURL(url, host) {
  let ignore = ['bobolj.com'];
  for (let i = 0; i < ignore.length; i++) {
    if (url.indexOf(ignore[i]) > -1) {
      return 'DIRECT';
    }
  }
  return `PROXY 127.0.0.1:10809`;
}
