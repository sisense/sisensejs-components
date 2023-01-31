//https://stackoverflow.com/questions/60633526/how-to-use-an-external-third-party-library-in-stencil-js
export default function loadLibrary(url) {
  // TODO: Also check the global scope for "Sisense" and "Dashboard"
  if (document.querySelector(`script[src="${url}"]`)) {
    return Promise.resolve(); // already exists
  }

  const script = document.createElement('script');
  script.src = url;

  document.head.appendChild(script);

  const promise = new Promise((resolve, reject) => {
    script.onload = resolve;
    script.onerror = reject;
  });
  return promise;
}
