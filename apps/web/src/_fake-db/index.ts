import mock from "./mock";

import "./auth/jwt";
import "./product";

mock.onAny().passThrough();
