startText="<?xml version=\"1.0\" encoding=\"UTF-8\"?>
             <urlset
                   xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\"
                   xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\"
                   xsi:schemaLocation=\"http://www.sitemaps.org/schemas/sitemap/0.9
                         http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd\">

             <url>
               <loc>http://omgyoutube.com/</loc>
               <changefreq>always</changefreq>
             </url>
             <url>
                 <loc>http://omgyoutube.com/collection/Music/nepali</loc>
                 <changefreq>always</changefreq>
             </url>
             <url>
                 <loc>http://omgyoutube.com/collection/Music/hindi</loc>
                 <changefreq>always</changefreq>
             </url>
             <url>
                 <loc>http://omgyoutube.com/collection/Music/english</loc>
                 <changefreq>always</changefreq>
             </url>
             <url>
                 <loc>http://omgyoutube.com/collection/Music/lok-dohori</loc>
                 <changefreq>always</changefreq>
             </url>
             <url>
                 <loc>http://omgyoutube.com/collection/Movies/nepali</loc>
                 <changefreq>always</changefreq>
             </url>
             <url>
                 <loc>http://omgyoutube.com/collection/Movies/hindi</loc>
                 <changefreq>always</changefreq>
             </url>
             <url>
                 <loc>http://omgyoutube.com/collection/Movies/english</loc>
                 <changefreq>always</changefreq>
             </url>
             <url>
                 <loc>http://omgyoutube.com/collection/Movies/south-indian</loc>
                 <changefreq>always</changefreq>
             </url>
             <url>
               <loc>http://omgyoutube.com/playlist/cute</loc>
               <changefreq>always</changefreq>
             </url>
             <url>
               <loc>http://omgyoutube.com/playlist/doityourself</loc>
               <changefreq>always</changefreq>
             </url>
             <url>
               <loc>http://omgyoutube.com/playlist/funny</loc>
               <changefreq>always</changefreq>
             </url>
             <url>
               <loc>http://omgyoutube.com/playlist/amazing</loc>
               <changefreq>always</changefreq>
             </url>
             <url>
               <loc>http://omgyoutube.com/playlist/nsfw</loc>
               <changefreq>always</changefreq>
             </url>
             <url>
               <loc>http://omgyoutube.com/playlist/omg</loc>
               <changefreq>always</changefreq>
             </url>
             <url>
                 <loc>http://omgyoutube.com/playlist/live</loc>
                 <changefreq>always</changefreq>
             </url>"
endText="</urlset>"
urlStart="<url><loc>"
urlEnd="</loc><changefreq>weekly</changefreq></url>\n"

echo "$startText" > /var/www/omgyoutube.com/omgyoutube-raw/dist/sitemap.xml

awk '{ print $7 }' /var/log/nginx/access.log | awk '/watch/' | uniq | awk '{ printf "<url><loc>http://omgyoutube.com"; print $0;  print "</loc><changefreq>weekly</changefreq></url>\n"}' >> /var/www/omgyoutube.com/omgyoutube-raw/dist/sitemap.xml

echo $endText >> /var/www/omgyoutube.com/omgyoutube-raw/dist/sitemap.xml


