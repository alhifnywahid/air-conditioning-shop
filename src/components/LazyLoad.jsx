function LazyLoad({ clause, children, loader }) {
  return clause ? clause && children : loader;
}

export default LazyLoad;