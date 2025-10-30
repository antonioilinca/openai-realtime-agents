import Document, { Html, Head, Main, NextScript, DocumentContext } from "next/document";

// Document personnalisé pour injecter la police Inter et la couleur de fond par défaut.
class LexaIADocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang="fr" className="bg-background">
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link
            href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
            rel="stylesheet"
          />
          <meta name="description" content="LexaIA - Assistant juridique français intelligent" />
        </Head>
        <body className="bg-background font-sans text-text">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default LexaIADocument;
