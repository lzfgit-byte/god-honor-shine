const ADAPTER_IMAGE_EXTRA_KEY = '__ghs_adapter_image_extra';

export const appendAdapterImageExtra = (url: string, extra?: Record<string, any>) => {
  if (!url || !extra || Object.keys(extra).length === 0) {
    return url;
  }
  const hashIndex = url.indexOf('#');
  const baseUrl = hashIndex >= 0 ? url.slice(0, hashIndex) : url;
  const hash = hashIndex >= 0 ? url.slice(hashIndex) : '';
  const separator = baseUrl.includes('?') ? '&' : '?';
  return `${baseUrl}${separator}${ADAPTER_IMAGE_EXTRA_KEY}=${encodeURIComponent(
    JSON.stringify(extra)
  )}${hash}`;
};

export const parseAdapterImageUrl = (url: string) => {
  if (!url || !url.includes(ADAPTER_IMAGE_EXTRA_KEY)) {
    return {
      url,
      extra: null,
    };
  }
  const hashIndex = url.indexOf('#');
  const baseWithQuery = hashIndex >= 0 ? url.slice(0, hashIndex) : url;
  const hash = hashIndex >= 0 ? url.slice(hashIndex) : '';
  const queryIndex = baseWithQuery.indexOf('?');
  if (queryIndex < 0) {
    return {
      url,
      extra: null,
    };
  }
  const baseUrl = baseWithQuery.slice(0, queryIndex);
  const searchParams = new URLSearchParams(baseWithQuery.slice(queryIndex + 1));
  const extraText = searchParams.get(ADAPTER_IMAGE_EXTRA_KEY);
  searchParams.delete(ADAPTER_IMAGE_EXTRA_KEY);
  const queryText = searchParams.toString();
  let extra = null;
  try {
    extra = extraText ? JSON.parse(extraText) : null;
  } catch (error) {
    extra = null;
  }
  return {
    url: `${baseUrl}${queryText ? `?${queryText}` : ''}${hash}`,
    extra,
  };
};
