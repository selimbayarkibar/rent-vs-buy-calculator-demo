// lib/shareUtils.js

export function generateShareableUrl(formValues, pathname) {
  const params = new URLSearchParams();

  Object.entries(formValues).forEach(([key, value]) => {
    if (value !== undefined && value !== "") {
      params.set(key, value);
    }
  });

  return `${window.location.origin}${pathname}?${params.toString()}`;
}

export function handleShare(formValues, pathname) {
  const url = generateShareableUrl(formValues, pathname);
  navigator.clipboard.writeText(url);
  alert("Custom mortgage link copied to clipboard!");
}
