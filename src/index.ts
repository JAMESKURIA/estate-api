import "dotenv/config";
import { CurrentUserDecorator } from "./security/CurrentUserDecorator";
// import { defaultMetadataStorage } from "class-transformer/cjs/storage";
const { defaultMetadataStorage } = require("class-transformer/cjs/storage");

import AdminJSExpress from "@adminjs/express";
import { Database, Resource } from "@adminjs/typeorm";
import AdminJS, { AdminJSOptions } from "adminjs";

import { validationMetadatasToSchemas } from "class-validator-jsonschema";
import cookieParser from "cookie-parser";
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
import signale from "signale";
import swaggerUi from "swagger-ui-express";
import Container from "typedi";
import dataSource from "./data-source";
import { Location } from "./models/Location";
import { Login } from "./models/Login";
import { SubLocation } from "./models/SubLocation";
import { User } from "./models/User";
import { UserRole } from "./models/UserRole";
import passportJwtStrategy from "./security/passportJwtStrategy";
import passportLoginStrategy from "./security/passportLoginStrategy";
import { RoleAuthorization } from "./security/RoleAuthorization";

AdminJS.registerAdapter({ Database, Resource });

(async () => {
  try {
    const connection = await dataSource.initialize();
    signale.success(`Typeorm connected to db\n`);

    const adminOptions: AdminJSOptions = {
      resources: [SubLocation, Location, User, Login, UserRole],
      // databases: [dataSource],
    };

    const app: Express = express();
    const admin = new AdminJS(adminOptions);
    const adminRouter = AdminJSExpress.buildRouter(admin);

    const PORT = process.env.PORT || 5000;

    // Middlewares
    app.use(cookieParser());
    app.use(express.json());
    app.use(admin.options.rootPath, adminRouter);
    useContainer(Container);

    // passport
    app.use(passport.initialize());
    passport.use(passportLoginStrategy);
    passport.use(passportJwtStrategy);

    const routingControllerOpts: RoutingControllersOptions = {
      routePrefix: "/api/v1",
      controllers: [join(__dirname, "/controllers/*.{js,ts}")],
      authorizationChecker: RoleAuthorization.checkAuthorization,
      currentUserChecker: CurrentUserDecorator.checkCurrentUser,
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

    app.use("/docs", swaggerUi.serve, swaggerUi.setup(spec));

    // const flags: Flags = {
    //   direction: Direction.LR,
    //   format: Format.PNG,
    //   handwritten: false,
    //   // download:
    // };

    // const typeormUml = new TypeormUml();
    // const url = await typeormUml.build(connection, flags);

    // process.stdout.write("\nER Diagram URL: \n" + url + EOL);

    app.listen(PORT, () => {
      signale.success(`Express server running on http://localhost:${PORT}\n`);

      signale.success(`Open Swagger docs on http://localhost:${PORT}/docs/\n`);

      signale.success(
        `AdminJS started on http://localhost:${PORT}${admin.options.rootPath}\n`
      );
    });
  } catch (error) {
    signale.error("DB Error: ", error);
  }
})();
