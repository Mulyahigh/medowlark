const express = require("express");
const expressHandlebars = require("express3-handlebars");

const handlers = require("./lib/handlers");
const app = express();
app.disable("x-powered-by");
app.engine(
  "handlebars",
  expressHandlebars({
    defaultLayout: "main",
    helpers: {
      section: function (name, options) {
        if (!this._sections) this._sections = {};
        this._sections[name] = options.fn(this);
        return null;
      },
    },
  })
);
app.set("view engine", "handlebars");

const port = process.env.PORT || 3000;

app.get("/", handlers.home);

app.get("/about", handlers.about);

app.use(express.static(__dirname + "/public"));

app.use(handlers.notFound);

app.use(handlers.serverError);

if (require.main === module) {
  app.listen(port, () => {
    console.log(
      `Express запущен на http://localhost:${port}` +
        "; нажмите Ctrl+C для завершения."
    );
  });
} else {
  module.exports = app;
}
