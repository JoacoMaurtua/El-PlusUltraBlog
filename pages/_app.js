import "../styles/tailwind.css"; //Esta cabeza global siempre debe estar en el app.js

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp
