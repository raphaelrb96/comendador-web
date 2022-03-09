import UserProvider from '../context/userContext'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import "../styles/navbar.css"
import { CacheProvider } from '@emotion/react';
import Head from 'next/head';
import { CssBaseline, ThemeProvider } from '@mui/material';
import createEmotionCache from '../src/createEmotionCache';
import theme from '../src/theme';
import PropTypes from 'prop-types';

export let metaPixel = null;
const clientSideEmotionCache = createEmotionCache();
// Custom App to wrap it with context provider
export default function App(props) {

  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  
  const router = useRouter()

  useEffect(() => {
    import('react-facebook-pixel')
      .then((x) => x.default)
      .then((ReactPixel) => {
        metaPixel = ReactPixel;
        metaPixel.init('264269985740413') // facebookPixelId
        metaPixel.pageView()

        router.events.on('routeChangeComplete', () => {
          metaPixel.pageView()
        })
      });
  }, [router.events])

    return (
      <CacheProvider value={emotionCache}>
        <Head>
          <meta name="viewport" content="initial-scale=1, width=device-width" />
          <meta name="facebook-domain-verification" content="8xr6a66z4w2qfyn8yv17ev2zvdddi4" />
        </Head>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </CacheProvider>
    )
}

App.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired,
};
