import express from 'express';

import { router as routerFromv1 } from "./v1/routes.js";
import { router as routerFromv2 } from "./v2/routes.js";
import { router as routerFromv3 } from "./v3/routes.js";
import { router as routerFromv4 } from "./v4/routes.js";
import { router as routerFromv5 } from "./v5/routes.js";
import { router as routerFromv6 } from "./v6/routes.js";
import { router as routerFromv7 } from "./v7/routes.js";
import { router as routerFromv8 } from "./v8/routes.js";
import { router as routerFrommasters } from "./masters/routes.js";

const router = express.Router()
router.use("/masters", routerFrommasters);
router.use("/v8", routerFromv8);

router.use("/v7", routerFromv7);
router.use("/v6", routerFromv6);
router.use("/v5", routerFromv5);
router.use("/v4", routerFromv4);
router.use("/v3", routerFromv3);
router.use("/v2", routerFromv2);
router.use("/v1", routerFromv1);;

export { router };