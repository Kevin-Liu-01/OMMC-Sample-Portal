import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html>
      <Head>
        <meta charSet="utf-8" />

        <meta
          name="description"
          content="Official Sample Test Portal for the OMMC Competition. Any student 18 or younger anywhere in the world can sign up!"
        />

        {/* Open Graph */}
        <meta property="og:title" content="OMMC Sample Test Portal" />
        <meta
          property="og:description"
          content="Official Sample Test Portal for the OMMC Competition. Any student 18 or younger anywhere in the world can sign up!"
        />
        <meta property="og:url" content="https://ommc-sample-portal.vercel.app" />
        <meta property="og:image" content="https://cdn.discordapp.com/attachments/1044744976942243880/1045383726756003880/OMMC-Logo_1.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="OMMC — Online Monmouth Math Competition" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="OMMC" />
        <meta property="og:locale" content="en_US" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@ommcofficial" />
        <meta name="twitter:creator" content="@kevskgs" />
        <meta name="twitter:title" content="OMMC Sample Test Portal" />
        <meta
          name="twitter:description"
          content="Official Sample Test Portal for the OMMC Competition. Any student 18 or younger anywhere in the world can sign up!"
        />
        <meta name="twitter:image" content="https://cdn.discordapp.com/attachments/1044744976942243880/1045383726756003880/OMMC-Logo_1.png" />
        <meta name="twitter:image:alt" content="OMMC — Online Monmouth Math Competition" />

        <meta name="robots" content="index, follow, max-image-preview:large" />
        <link rel="canonical" href="https://ommc-sample-portal.vercel.app" />

        <meta
          name="google-site-verification"
          content="mvNROFtoLu1hm048arKrTbsx_md-cJS2mZL8L2sQjQ4"
        />

        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/favicon.ico" />
        {/*
            Notice the use of %PUBLIC_URL% in the tags above.
            It will be replaced with the URL of the `public` folder during the build.
            Only files inside the `public` folder can be referenced from the HTML.
            Unlike "/favicon.ico" or "favicon.ico", "%PUBLIC_URL%/favicon.ico" will
            work correctly both with client-side routing and a non-root public URL.
            Learn how to configure a non-root public URL by running `npm run build`.
        */}

        <link
          href="https://fonts.googleapis.com/css2?family=Hanken+Grotesk:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://api.fontshare.com/v2/css?f[]=satoshi@900,700,500,301,701,300,501,401,901,400&f[]=general-sans@701,200,500,301,201,300,601,600,401,501,400,700&f[]=clash-grotesk@200,700,400,600,300,1,500&f[]=azeret-mono@501,701,800,801,200,401,500,601,900,600,300,901,700,400,100,1&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
