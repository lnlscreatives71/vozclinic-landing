Blog hero images go here.

Each post's frontmatter `image:` references a file in this folder by bare
filename, e.g.  image: vozclinic-article-1.webp
The build (scripts/build-blog.mjs) renders it as the article hero and uses it
for og:image. If the file is missing, the post still publishes without it.
