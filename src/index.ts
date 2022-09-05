import "dotenv/config";
// import { defaultMetadataStorage } from "class-transformer/cjs/storage";
const { defaultMetadataStorage } = require("class-transformer/cjs/storage");

import { validationMetadatasToSchemas } from "class-validator-jsonschema";
import express, { Express } from "express";
import passport from "passport";
import { join } from "path";
import {
  getMetadataArgsStorage,
  RoutingControllersOptions,
  useContainer,
  useExpressServer,
} from "routing-controllers";
import { routingControllersToSpec } from "routing-controllers-openapi";
import swaggerUi from "swagger-ui-express";
import Container from "typedi";
import dataSource from "./data-source";
import passportJwtStrategy from "./security/passportJwtStrategy";

const app: Express = express();

const PORT = process.env.PORT || 5000;

const routingControllerOpts: RoutingControllersOptions = {
  routePrefix: "/api/v1",
  controllers: [join(__dirname, "/controllers/*.{js,ts}")],
};

useExpressServer(app, routingControllerOpts);

const schemas = validationMetadatasToSchemas({
  classTransformerMetadataStorage: defaultMetadataStorage,
  refPointerPrefix: "#/components/schemas/",
});

const storage = getMetadataArgsStorage();

const spec = routingControllersToSpec(storage, routingControllerOpts, {
  components: {
    schemas,
    // securitySchemes: {
    //   basicAuth: {
    //     scheme: "basic",
    //     type: "http",
    //   },
    // },
  },
  info: {
    title: "Estate Api",
    description: "API documentation for the `estate project`",
    version: "1.0.0",
  },
});

// Middlewares
app.use("/docs", swaggerUi.serve, swaggerUi.setup(spec));
useContainer(Container);

// passport
passport.use(passportJwtStrategy);

app.use(passport.initialize());

(async () => {
  try {
    const connection = await dataSource.initialize();

    // const flags: Flags = {
    //   direction: Direction.LR,
    //   format: Format.PNG,
    //   handwritten: false,
    //   // download:
    // };

    // const typeormUml = new TypeormUml();
    // const url = await typeormUml.build(connection, flags);

    // process.stdout.write("\nER Diagram URL: \n" + url + EOL);

    console.log(`\nConnected to db`);

    app.listen(PORT, () =>
      console.log(
        `\nExpress server running on http://localhost:${PORT}. Open http://localhost:${PORT}/docs/\n`
      )
    );
  } catch (error) {
    console.log("DB Error: ", error);
  }
})();
