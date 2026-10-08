<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:sm="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
  exclude-result-prefixes="sm image">
  <xsl:output method="html" encoding="UTF-8"/>
  <xsl:template match="/">
    <html lang="en">
      <head>
        <title>~jaharrhy sitemap</title>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <style>
          :root { color-scheme: light; }
          body { margin: 0; background: #fff3ff; color: #231b2b; font: 16px/1.5 monospace; }
          main { max-width: 1100px; margin: auto; padding: 2rem 1rem; }
          h1 { font: bold 2.5rem Georgia, serif; margin: 1rem 0; }
          a { color: #52219a; text-underline-offset: .2em; }
          a:hover { color: #a31661; }
          a:focus-visible, summary:focus-visible { outline: 3px solid #a31661; outline-offset: 3px; }
          .table { overflow-x: auto; border: 1px solid #a88cb1; background: white; margin-top: 2rem; }
          table { width: 100%; border-collapse: collapse; text-align: left; }
          th { background: #ead8ef; }
          th, td { padding: .8rem 1rem; border-bottom: 1px solid #ead8ef; vertical-align: top; }
          th:first-child, td:first-child { width: 3rem; color: #67536e; }
          tr:last-child td { border-bottom: 0; }
          tbody tr:hover { background: #fff3ff; }
          td a { overflow-wrap: anywhere; }
          details { margin-top: .4rem; font-size: .85rem; }
          summary { cursor: pointer; }
          ul { padding-left: 1.25rem; }
          li { margin: .4rem 0; }
        </style>
      </head>
      <body>
        <main>
          <a href="./">← ~jaharrhy</a>
          <h1>sitemap</h1>
          <p><xsl:value-of select="count(sm:urlset/sm:url)"/> URLs: pages, images and downloads.</p>
          <div class="table">
            <table>
              <caption style="text-align:left;padding:1rem">All public URLs, including unlinked pages.</caption>
              <thead><tr><th scope="col">#</th><th scope="col">URL</th></tr></thead>
              <tbody>
                <xsl:for-each select="sm:urlset/sm:url">
                  <tr>
                    <td><xsl:value-of select="position()"/></td>
                    <td>
                      <a href="{sm:loc}"><xsl:value-of select="substring-after(sm:loc, 'https://www.cs.mun.ca')"/></a>
                      <xsl:if test="image:image">
                        <details>
                          <summary><xsl:value-of select="count(image:image)"/> images on this page</summary>
                          <ul>
                            <xsl:for-each select="image:image">
                              <li><a href="{image:loc}"><xsl:value-of select="substring-after(image:loc, 'https://www.cs.mun.ca')"/></a></li>
                            </xsl:for-each>
                          </ul>
                        </details>
                      </xsl:if>
                    </td>
                  </tr>
                </xsl:for-each>
              </tbody>
            </table>
          </div>
        </main>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
