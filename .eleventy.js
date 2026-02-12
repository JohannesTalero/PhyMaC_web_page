const markdownIt = require("markdown-it");

module.exports = function (eleventyConfig) {
  // Passthrough: paginas y assets existentes que aun no migran a Eleventy
  eleventyConfig.addPassthroughCopy("index.html");
  eleventyConfig.addPassthroughCopy("servicios.html");
  eleventyConfig.addPassthroughCopy("publicaciones.html");
  eleventyConfig.addPassthroughCopy("config.js");
  eleventyConfig.addPassthroughCopy("components");
  eleventyConfig.addPassthroughCopy("imagenes");
  eleventyConfig.addPassthroughCopy("phymac-styles.css");
  eleventyConfig.addPassthroughCopy("main.js");
  eleventyConfig.addPassthroughCopy("blog-data.js");

  // Configuracion de Markdown (soporta HTML embebido dentro del contenido)
  const mdLib = markdownIt({
    html: true,
    linkify: true,
    typographer: true,
  });
  eleventyConfig.setLibrary("md", mdLib);

  // Coleccion de posts del blog
  eleventyConfig.addCollection("posts", function (collectionApi) {
    return collectionApi.getFilteredByGlob("src/posts/*.md").sort((a, b) => {
      return b.date - a.date;
    });
  });

  // Shortcodes para contenido rico (se implementan en la tarea create-shortcodes)
  eleventyConfig.addShortcode("youtube", function (id, title = "") {
    const safeTitle = title || "Video de YouTube";
    return `
      <div class="scroll-animate" style="text-align: center; margin: 2rem 0;">
        <div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 100%; border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.15);">
          <iframe 
            src="https://www.youtube.com/embed/${id}" 
            title="${safeTitle}"
            frameborder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
            allowfullscreen
            style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;">
          </iframe>
        </div>
      </div>
    `;
  });

  eleventyConfig.addShortcode("youtube_short", function (id, title = "") {
    const safeTitle = title || "YouTube Short";
    return `
      <div class="scroll-animate" style="text-align: center; margin: 2rem auto;">
        <div style="position: relative; padding-bottom: 177.78%; height: 0; overflow: hidden; max-width: 360px; margin: 0 auto; border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.15);">
          <iframe 
            src="https://www.youtube.com/embed/${id}" 
            title="${safeTitle}"
            frameborder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
            allowfullscreen
            style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;">
          </iframe>
        </div>
      </div>
    `;
  });

  eleventyConfig.addShortcode("figure", function (src, caption = "") {
    const safeCaption = caption || "";
    return `
      <figure class="scroll-animate" style="text-align: center; margin: 2rem 0;">
        <img src="${src}" alt="${safeCaption}" style="max-width: 500px; width: 100%; height: auto; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);" />
        ${
          safeCaption
            ? `<figcaption style="font-size: 0.9rem; color: #666; margin-top: 0.5rem; font-style: italic;">${safeCaption}</figcaption>`
            : ""
        }
      </figure>
    `;
  });

  eleventyConfig.addShortcode("pdf_link", function (href, text) {
    const safeText = text || "Descargar PDF";
    return `
      <p style="text-align: center; margin: 1.5rem 0;">
        <a href="${href}" 
           target="_blank" 
           rel="noopener noreferrer"
           class="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold transition-all"
           style="background-color: #2962FF; color: white; text-decoration: none; box-shadow: 0 3px 0 #0039CB;"
           onmouseover="this.style.backgroundColor='#768FFF'"
           onmouseout="this.style.backgroundColor='#2962FF'">
          ${safeText}
        </a>
      </p>
    `;
  });

  eleventyConfig.addShortcode("cta_whatsapp", function (message) {
    const encoded = encodeURIComponent(message || "Me interesa saber mas sobre PhyMaC");
    return `
      <a 
        href="https://wa.me/573197438210?text=${encoded}" 
        target="_blank"
        rel="noopener noreferrer"
        class="inline-flex items-center gap-2 bg-phymac-orange hover:bg-phymac-orange-light text-white font-display font-bold px-8 py-4 rounded-full transition-all transform hover:-translate-y-0.5"
        style="box-shadow: 0 4px 0 #C43E00;"
      >
        Consultar con PhyMaC
      </a>
    `;
  });

  return {
    dir: {
      input: "src",
      includes: "_includes",
      data: "_data",
      output: "_site",
    },
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
    dataTemplateEngine: "njk",
  };
};

